import db from '../../config/db.js';

const clampLimit = (limit) => {
  const n = Number(limit);
  if (Number.isNaN(n) || n <= 0) return 8;
  return Math.trunc(Math.min(Math.max(n, 1), 50));
};

const clampOffset = (offset) => {
  const n = Number(offset);
  if (Number.isNaN(n) || n < 0) return 0;
  return Math.trunc(n);
};

export const listCategories = async () => {
  const [rows] = await db.execute(
    `SELECT category_id, category_name
     FROM training_skill_category
     ORDER BY category_name ASC`
  );
  return rows ?? [];
};

export const listSkills = async ({ type, categoryId, search, limit, offset }) => {
  const lim = clampLimit(limit);
  const off = clampOffset(offset);

  const where = ['ts.is_active = 1', 'ts.skill_type = ?'];
  const params = [type];

  if (categoryId) {
    where.push('ts.category_id = ?');
    params.push(Number(categoryId));
  }

  if (search) {
    where.push('ts.skill_name LIKE ?');
    params.push(`%${search}%`);
  }

  const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : '';

  const query = `
    SELECT
      ts.training_skill_id,
      ts.category_id,
      c.category_name,
      ts.skill_name,
      ts.skill_type,
      ts.image_url,
      COALESCE(lv.levels_count, 0) AS levels_count,
      COALESCE(vm.slots_total, 0) AS slots_total,
      COALESCE(vm.capacity_total, 0) AS capacity_total,
      MAX(CASE WHEN sp.point_type = 'REWARD_POINTS' THEN sp.points_alloted END) AS reward_points,
      MAX(CASE WHEN sp.point_type = 'ACTIVITY_POINTS' THEN sp.points_alloted END) AS activity_points
    FROM training_skills ts
    LEFT JOIN training_skill_category c
      ON c.category_id = ts.category_id
    LEFT JOIN skill_points sp
      ON sp.training_skill_id = ts.training_skill_id
    LEFT JOIN (
      SELECT training_skill_id, COUNT(*) AS levels_count
      FROM skill_levels
      GROUP BY training_skill_id
    ) lv ON lv.training_skill_id = ts.training_skill_id
    LEFT JOIN (
      SELECT
        vm.training_skill_id,
        COUNT(*) AS slots_total,
        SUM(COALESCE(v.capacity, 0)) AS capacity_total
      FROM venue_mapping vm
      LEFT JOIN venues v ON v.venue_id = vm.venue_id
      GROUP BY vm.training_skill_id
    ) vm ON vm.training_skill_id = ts.training_skill_id
    ${whereSql}
    GROUP BY
      ts.training_skill_id,
      ts.category_id,
      c.category_name,
      ts.skill_name,
      ts.skill_type,
      ts.image_url,
      lv.levels_count,
      vm.slots_total,
      vm.capacity_total
    ORDER BY ts.training_skill_id ASC
    LIMIT ${lim} OFFSET ${off}
  `;

  const [rows] = await db.execute(query, params);
  return rows ?? [];
};

export const getSkillHeader = async (trainingSkillId) => {
  const [rows] = await db.execute(
    `SELECT
        ts.training_skill_id,
        ts.category_id,
        c.category_name,
        ts.skill_name,
        ts.skill_type,
        ts.image_url,
        MAX(CASE WHEN sp.point_type = 'REWARD_POINTS' THEN sp.points_alloted END) AS reward_points,
        MAX(CASE WHEN sp.point_type = 'ACTIVITY_POINTS' THEN sp.points_alloted END) AS activity_points
      FROM training_skills ts
      LEFT JOIN training_skill_category c ON c.category_id = ts.category_id
      LEFT JOIN skill_points sp ON sp.training_skill_id = ts.training_skill_id
      WHERE ts.training_skill_id = ?
      GROUP BY ts.training_skill_id, ts.category_id, c.category_name, ts.skill_name, ts.skill_type, ts.image_url`,
    [Number(trainingSkillId)]
  );
  return rows?.[0] || null;
};

export const getSkillLevels = async (trainingSkillId) => {
  const [rows] = await db.execute(
    `SELECT level_id, level_number, core_concept, max_attempts
     FROM skill_levels
     WHERE training_skill_id = ?
     ORDER BY level_number ASC`,
    [Number(trainingSkillId)]
  );
  return rows ?? [];
};

export const getLevelSyllabus = async (levelIds) => {
  if (!Array.isArray(levelIds) || levelIds.length === 0) return [];

  const placeholders = levelIds.map(() => '?').join(',');
  const [rows] = await db.execute(
    `SELECT syllabus_id, level_id, order_index, topic_title, topic_description
     FROM skill_syllabus
     WHERE level_id IN (${placeholders})
     ORDER BY level_id ASC, order_index ASC`,
    levelIds.map(Number)
  );
  return rows ?? [];
};

export const getSkillLevelPoints = async (trainingSkillId) => {
  const [rows] = await db.execute(
    `SELECT level_id, point_type, points_alloted
     FROM skill_points
     WHERE training_skill_id = ?
       AND level_id IS NOT NULL`,
    [Number(trainingSkillId)]
  );
  return rows ?? [];
};

export const listSkillSlots = async (trainingSkillId) => {
  const [rows] = await db.execute(
    `SELECT
        vm.mapping_id,
        st.slot_id,
        st.start_time,
        st.end_time,
        v.venue_id,
        v.venue_name,
        v.capacity,
        vm.current_bookings,
        (COALESCE(v.capacity, 0) - COALESCE(vm.current_bookings, 0)) AS seats_available
      FROM venue_mapping vm
      JOIN slot_timings st
        ON st.is_active = 1
       AND st.start_time = vm.start_time
       AND st.end_time = vm.end_time
      LEFT JOIN venues v ON v.venue_id = vm.venue_id
      WHERE vm.training_skill_id = ?
      ORDER BY st.start_time ASC, st.end_time ASC, vm.mapping_id ASC`,
    [Number(trainingSkillId)]
  );
  return rows ?? [];
};
