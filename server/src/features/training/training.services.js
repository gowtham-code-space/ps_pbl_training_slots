import * as trainingModel from './training.model.js';

const normalizeStr = (v) => {
  if (v == null) return '';
  return String(v).trim();
};

export const getCategories = async () => {
  return trainingModel.listCategories();
};

export const getSkills = async ({ type, categoryId, search, limit, offset }) => {
  const t = normalizeStr(type).toUpperCase();
  if (t !== 'PS' && t !== 'PBL') {
    const err = new Error('Invalid skill type');
    err.status = 400;
    throw err;
  }

  const cat = normalizeStr(categoryId);
  const q = normalizeStr(search);

  return trainingModel.listSkills({
    type: t,
    categoryId: cat && cat !== 'ALL' ? cat : null,
    search: q || null,
    limit,
    offset,
  });
};

export const getSkillDetails = async (trainingSkillId) => {
  const header = await trainingModel.getSkillHeader(trainingSkillId);
  if (!header) {
    const err = new Error('Skill not found');
    err.status = 404;
    throw err;
  }

  const levels = await trainingModel.getSkillLevels(trainingSkillId);
  const levelPointsRows = await trainingModel.getSkillLevelPoints(trainingSkillId);
  const syllabusRows = await trainingModel.getLevelSyllabus(levels.map((l) => l.level_id));

  const pointsByLevelId = new Map();
  for (const r of levelPointsRows || []) {
    const id = r.level_id;
    if (!pointsByLevelId.has(id)) pointsByLevelId.set(id, {});
    const entry = pointsByLevelId.get(id);
    if (r.point_type === 'REWARD_POINTS') entry.reward_points = Number(r.points_alloted || 0);
    if (r.point_type === 'ACTIVITY_POINTS') entry.activity_points = Number(r.points_alloted || 0);
  }

  const byLevel = new Map();
  for (const lvl of levels) {
    const pts = pointsByLevelId.get(lvl.level_id) || {};
    byLevel.set(lvl.level_id, {
      ...lvl,
      reward_points: pts.reward_points,
      activity_points: pts.activity_points,
      syllabus: [],
    });
  }

  for (const s of syllabusRows) {
    const item = byLevel.get(s.level_id);
    if (item) item.syllabus.push(s);
  }

  return {
    ...header,
    levels: Array.from(byLevel.values()),
  };
};

export const getSkillSlots = async (trainingSkillId) => {
  return trainingModel.listSkillSlots(trainingSkillId);
};
