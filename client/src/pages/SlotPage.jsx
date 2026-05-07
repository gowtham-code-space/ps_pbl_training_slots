import React, { useEffect, useMemo, useState } from 'react';

import Modal from '../components/Modal.jsx';
import SectionBoxes from '../components/SectionBoxes.jsx';
import SlotHeader from '../components/SlotHeader.jsx';

const departments = [
  { code: 'BT', name: 'Biotechnology' },
  { code: 'CSE', name: 'Computer Science' },
  { code: 'IT', name: 'Information Technology' },
  { code: 'ECE', name: 'Electronics & Comm' },
  { code: 'EEE', name: 'Electrical & Electronics' },
  { code: 'MECH', name: 'Mechanical Engg' },
];

const slotOptions = [
  { key: 'test-now', label: '⚡ Immediate Test Slot (Unlocks in 5s)' },
  { key: '9-10', label: 'Monday — 9:00 AM to 10:00 AM' },
  { key: '10-11', label: 'Monday — 10:00 AM to 11:00 AM' },
  { key: '11-12', label: 'Tuesday — 11:00 AM to 12:00 PM' },
  { key: '2-3', label: 'Tuesday — 2:00 PM to 3:00 PM' },
  { key: '3-4', label: 'Wednesday — 3:00 PM to 4:00 PM' },
  { key: '9-10-th', label: 'Thursday — 9:00 AM to 10:00 AM' },
  { key: '2-3-th', label: 'Thursday — 2:00 PM to 3:00 PM' },
  { key: '10-11-f', label: 'Friday — 10:00 AM to 11:00 AM' },
  { key: '3-4-f', label: 'Friday — 3:00 PM to 4:00 PM' },
];

const SLOT_INFO = {
  'test-now': { day: 'Today', time: 'Immediate', venue: 'Online (Demo)', seats: 99 },
  '9-10': { day: 'Monday', time: '9:00 AM – 10:00 AM', venue: 'Lab Block D, Room 401', seats: 12 },
  '10-11': { day: 'Monday', time: '10:00 AM – 11:00 AM', venue: 'Lab Block D, Room 402', seats: 10 },
  '11-12': { day: 'Tuesday', time: '11:00 AM – 12:00 PM', venue: 'Lab Block D, Room 401', seats: 9 },
  '2-3': { day: 'Tuesday', time: '2:00 PM – 3:00 PM', venue: 'Lab Block D, Room 402', seats: 7 },
  '3-4': { day: 'Wednesday', time: '3:00 PM – 4:00 PM', venue: 'Lab Block D, Room 401', seats: 6 },
  '9-10-th': { day: 'Thursday', time: '9:00 AM – 10:00 AM', venue: 'Lab Block D, Room 401', seats: 11 },
  '2-3-th': { day: 'Thursday', time: '2:00 PM – 3:00 PM', venue: 'Lab Block D, Room 402', seats: 8 },
  '10-11-f': { day: 'Friday', time: '10:00 AM – 11:00 AM', venue: 'Lab Block D, Room 401', seats: 9 },
  '3-4-f': { day: 'Friday', time: '3:00 PM – 4:00 PM', venue: 'Lab Block D, Room 402', seats: 6 },
};

const makeRoll = (year, dept, idx) => `7376242${String(year).slice(-2)}${dept}${String(idx).padStart(3, '0')}`;

const buildMockRewardPoints = () => {
  const seed = [
    { name: 'Ramya', dept: 'BT' },
    { name: 'Arun', dept: 'CSE' },
    { name: 'Sanjay', dept: 'IT' },
    { name: 'Meena', dept: 'ECE' },
    { name: 'Divya', dept: 'EEE' },
    { name: 'Karthik', dept: 'MECH' },
  ];

  const students = [];
  let counter = 1;
  for (const dept of departments) {
    for (let i = 0; i < 18; i += 1) {
      const base = seed[i % seed.length];
      const year = i % 3 === 0 ? 2023 : i % 3 === 1 ? 2024 : 2025;
      students.push({
        roll: makeRoll(year, dept.code, counter),
        name: `${base.name} ${dept.code}${i + 1}`,
        dept: dept.code,
        year,
        balance: 500 + ((counter * 73) % 1800),
      });
      counter += 1;
    }
  }

  return students;
};

const buildMockDetailsByRoll = (students) => {
  const categories = ['P Skill', 'Initiative', 'Hackathon', 'Project'];
  const details = {};

  for (const s of students) {
    const entries = [];
    for (let i = 0; i < 6; i += 1) {
      const cat = categories[(s.balance + i) % categories.length];
      entries.push({
        category: cat,
        name: `${cat}: Activity ${i + 1}`,
        dateRange: i % 2 === 0 ? 'Jan 2026 – Feb 2026' : null,
        points: 10 + ((s.balance + i * 7) % 40),
      });
    }
    details[s.roll] = {
      total: entries.reduce((sum, e) => sum + e.points, 0),
      items: entries,
    };
  }

  return details;
};

const buildMockActivityPoints = (students) => {
  return students.map((s, i) => ({
    ...s,
    points: 50 + ((s.balance + i * 11) % 900),
    yearLabel: s.year === 2023 ? '3rd' : s.year === 2024 ? '2nd' : '1st',
  }));
};

const buildMockGroups = (activityStudents) => {
  const groups = [];
  for (let g = 1; g <= 18; g += 1) {
    const id = `A#${String(100000 + g)}`;
    const members = activityStudents.slice((g - 1) * 6, (g - 1) * 6 + 6).map((m, idx) => ({
      name: m.name,
      roll: m.roll,
      role: idx === 0 ? 'Captain' : idx === 1 ? 'Vice Captain' : idx === 2 ? 'Manager' : idx === 3 ? 'Strategist' : 'Member',
      points: m.points,
    }));
    const avgPoints = Math.round(members.reduce((sum, m) => sum + m.points, 0) / members.length);
    groups.push({ id, avgPoints, members });
  }
  return groups;
};

const psCourses = [
  {
    id: 1,
    name: 'UI/UX Fundamentals (Figma)',
    category: 'Software',
    levels: 2,
    topics: ['Wireframes & components', 'Auto layout basics', 'Responsive frames', 'Prototype & handoff'],
  },
  {
    id: 2,
    name: 'Git & GitHub Essentials',
    category: 'General Skill',
    levels: 1,
    topics: ['Git basics', 'Branching workflow', 'Pull requests', 'Conflict resolution'],
  },
  {
    id: 3,
    name: 'IoT Basics (Sensors)',
    category: 'Hardware',
    levels: 1,
    topics: ['Sensors overview', 'Analog vs digital', 'Reading values', 'Mini demo'],
  },
  {
    id: 4,
    name: 'React Basics',
    category: 'Software',
    levels: 2,
    topics: ['Components & props', 'State & effects', 'Lists & keys', 'Routing intro'],
  },
];

const pblLabs = [
  { id: 1, name: 'Web App PBL Lab', dept: 'CSE', capacity: 60, slots: 12, activities: ['Problem definition', 'UI plan', 'Implementation'] },
  { id: 2, name: 'Embedded Systems PBL Lab', dept: 'ECE', capacity: 40, slots: 5, activities: ['Sensors', 'Microcontroller', 'Testing'] },
  { id: 3, name: 'Bio-Tech PBL Lab', dept: 'BT', capacity: 45, slots: 9, activities: ['Lab workflow', 'Safety', 'Record'] },
  { id: 4, name: 'Automation PBL Lab', dept: 'EEE', capacity: 35, slots: 7, activities: ['Design', 'Build', 'Evaluation'] },
];

const SegmentedTabs = ({ tabs, value, onChange }) => {
  return (
    <div className="flex w-full gap-1 rounded-[var(--radius-lg)] border border-slate-200 bg-white p-1">
      {tabs.map((t) => {
        const active = value === t.value;
        return (
          <button
            key={t.value}
            type="button"
            onClick={() => onChange(t.value)}
            className={[
              'flex-1 rounded-[var(--radius-md)] px-3 py-2 text-[length:var(--fs-xs)] font-extrabold transition',
              active
                ? 'bg-[var(--color-primary)] text-white shadow-lg'
                : 'text-slate-500 hover:text-slate-700',
            ].join(' ')}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
};

const PillTabs = ({ tabs, value, onChange }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((t) => {
        const active = value === t.value;
        return (
          <button
            key={t.value}
            type="button"
            onClick={() => onChange(t.value)}
            className={[
              'rounded-full border px-4 py-2 text-[length:var(--fs-xs)] font-extrabold transition',
              active
                ? 'border-[color:var(--color-primary-light)] bg-[color:var(--color-secondary)] text-[var(--color-primary)]'
                : 'border-slate-200 bg-transparent text-slate-500 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]',
            ].join(' ')}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
};

const SlotPage = () => {
  const [panel, setPanel] = useState(null);
  const [isDark, setIsDark] = useState(false);

  const [pointsTab, setPointsTab] = useState('rp');
  const [rpDept, setRpDept] = useState('BT');
  const [rpYear, setRpYear] = useState('ALL');
  const [rpSearch, setRpSearch] = useState('');

  const [apTab, setApTab] = useState('individual');
  const [apYear, setApYear] = useState('ALL');
  const [apDept, setApDept] = useState('ALL');
  const [apSearch, setApSearch] = useState('');
  const [apGroupSearch, setApGroupSearch] = useState('');

  const [slotsTab, setSlotsTab] = useState('ps');
  const [psSearch, setPsSearch] = useState('');
  const [psCat, setPsCat] = useState('ALL');
  const [pblSearch, setPblSearch] = useState('');
  const [pblDept, setPblDept] = useState('ALL');

  const [bookedPopupOpen, setBookedPopupOpen] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingType, setBookingType] = useState(null); // 'ps' | 'pbl'
  const [selectedSlotKey, setSelectedSlotKey] = useState('');

  const [selectedPsId, setSelectedPsId] = useState(null);
  const [selectedPblId, setSelectedPblId] = useState(null);

  const [bookingConfirm, setBookingConfirm] = useState(null);

  const [detailsOpen, setDetailsOpen] = useState(false);
  const [detailsRoll, setDetailsRoll] = useState(null);

  const allRewardStudents = useMemo(() => buildMockRewardPoints(), []);
  const detailsByRoll = useMemo(() => buildMockDetailsByRoll(allRewardStudents), [allRewardStudents]);
  const activityStudents = useMemo(() => buildMockActivityPoints(allRewardStudents), [allRewardStudents]);
  const activityGroups = useMemo(() => buildMockGroups(activityStudents), [activityStudents]);

  const [bookedSlots, setBookedSlots] = useState({});

  useEffect(() => {
    const stored = localStorage.getItem('pt-dark-mode');
    const next = stored === '1';
    setIsDark(next);
    document.documentElement.dataset.theme = next ? 'dark' : 'light';
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = isDark ? 'dark' : 'light';
    localStorage.setItem('pt-dark-mode', isDark ? '1' : '0');
  }, [isDark]);

  useEffect(() => {
    if (!bookedPopupOpen) return;

    const onDocClick = (e) => {
      const popup = document.getElementById('pt-booked-popup');
      const btn = document.getElementById('pt-booked-btn');
      if (!popup || !btn) return;
      if (popup.contains(e.target) || btn.contains(e.target)) return;
      setBookedPopupOpen(false);
    };

    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, [bookedPopupOpen]);

  const rpRows = useMemo(() => {
    const deptFiltered = allRewardStudents.filter((s) => s.dept === rpDept);
    const sorted = [...deptFiltered].sort((a, b) => b.balance - a.balance);

    const yearFiltered =
      rpYear === 'ALL'
        ? sorted
        : sorted.filter((s) => {
            const y = String(s.year).slice(-2);
            return y === rpYear;
          });

    const query = rpSearch.trim().toUpperCase();
    const filtered =
      query.length === 0
        ? yearFiltered
        : yearFiltered.filter((s) => s.roll.includes(query) || s.name.toUpperCase().includes(query));

    return { sorted: yearFiltered, rows: filtered };
  }, [allRewardStudents, rpDept, rpYear, rpSearch]);

  const apRows = useMemo(() => {
    let data = [...activityStudents];
    if (apYear !== 'ALL') data = data.filter((s) => s.yearLabel === apYear);
    if (apDept !== 'ALL') data = data.filter((s) => s.dept === apDept);

    const query = apSearch.trim().toUpperCase();
    if (query) data = data.filter((s) => s.roll.includes(query) || s.name.toUpperCase().includes(query));

    data.sort((a, b) => b.points - a.points);
    const top = data.slice(0, 100);
    return { total: data.length, rows: top };
  }, [activityStudents, apYear, apDept, apSearch]);

  const apGroupRows = useMemo(() => {
    const sorted = [...activityGroups].sort((a, b) => b.avgPoints - a.avgPoints);
    const query = apGroupSearch.trim().toUpperCase();
    const filtered = query ? sorted.filter((g) => g.id.toUpperCase().includes(query)) : sorted;
    return { sorted, filtered };
  }, [activityGroups, apGroupSearch]);

  const bookedList = useMemo(() => Object.entries(bookedSlots), [bookedSlots]);

  const openBookingFor = (type) => {
    setBookingType(type);
    setSelectedSlotKey('');
    setBookingModalOpen(true);
  };

  const confirmBooking = () => {
    if (!bookingType || !selectedSlotKey) return;
    const info = SLOT_INFO[selectedSlotKey];
    if (!info) return;

    const key = bookingType === 'ps' ? `ps_${selectedPsId}` : `pbl_${selectedPblId}`;
    const name = bookingType === 'ps' ? psCourses.find((c) => c.id === selectedPsId)?.name : pblLabs.find((l) => l.id === selectedPblId)?.name;
    const typeLabel = bookingType === 'ps' ? 'PS Training Slot' : 'PBL Training Slot';

    const next = {
      ...bookedSlots,
      [key]: { slot: selectedSlotKey, info, name: name || '—', type: typeLabel },
    };
    setBookedSlots(next);
    setBookingModalOpen(false);
    setBookedPopupOpen(false);

    setBookingConfirm({
      courseName: `${typeLabel} — Booking Confirmation`,
      name: name || '—',
      type: typeLabel,
      date: info.day,
      time: info.time,
      venue: info.venue,
      bookingType,
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const commonWrap = 'mx-auto w-full max-w-[var(--w-container)] px-[var(--space-page-x)]';

  const Card = ({ children, className = '' }) => (
    <div className={['rounded-[var(--radius-card)] border border-slate-200 bg-white', className].join(' ')}>{children}</div>
  );

  const BackButton = ({ onClick, label = '← Back' }) => (
    <button
      type="button"
      onClick={onClick}
      className="mb-[var(--space-4)] inline-flex items-center gap-2 rounded-[var(--radius-lg)] border-2 border-slate-200 bg-white px-4 py-2 text-[length:var(--fs-sm)] font-extrabold text-slate-600 transition hover:border-[var(--color-primary)] hover:bg-[color:var(--color-secondary)] hover:text-[var(--color-primary)]"
    >
      {label}
    </button>
  );

  if (bookingConfirm) {
    return (
      <div>
        <SlotHeader isDark={isDark} onToggleDark={() => setIsDark((v) => !v)} />

        <div className={`${commonWrap} py-[var(--space-4)]`}>
          <BackButton
            onClick={() => {
              setBookingConfirm(null);
            }}
          />

          <div className="mx-auto w-full max-w-[var(--w-modal-lg)]">
            <Card className="overflow-hidden shadow-lg">
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 px-[var(--space-6)] py-[var(--space-6)]">
                <div className="text-[length:var(--fs-xl)] font-black text-white">
                  Slot Booked Successfully!
                </div>
                <div className="mt-1 text-[length:var(--fs-sm)] text-white/70">{bookingConfirm.courseName}</div>
              </div>

              <div className="px-[var(--space-6)] py-[var(--space-6)]">
                <div className="overflow-hidden rounded-[var(--radius-xl)] border border-slate-200">
                  <div className="grid grid-cols-1 sm:grid-cols-2">
                    <div className="border-b border-slate-200 p-5 sm:border-r">
                      <div className="text-[length:var(--fs-2xs)] font-extrabold uppercase tracking-[0.14em] text-slate-400">
                        Course / Lab
                      </div>
                      <div className="mt-2 text-[length:var(--fs-md)] font-bold text-slate-900">{bookingConfirm.name}</div>
                    </div>
                    <div className="border-b border-slate-200 p-5">
                      <div className="text-[length:var(--fs-2xs)] font-extrabold uppercase tracking-[0.14em] text-slate-400">
                        Booking Type
                      </div>
                      <div className="mt-2 text-[length:var(--fs-md)] font-extrabold text-[var(--color-primary)]">
                        {bookingConfirm.type}
                      </div>
                    </div>

                    <div className="border-b border-slate-200 p-5 sm:border-r">
                      <div className="text-[length:var(--fs-2xs)] font-extrabold uppercase tracking-[0.14em] text-slate-400">
                        Assessment Date
                      </div>
                      <div className="mt-2 text-[length:var(--fs-md)] font-bold text-slate-900">{bookingConfirm.date}</div>
                    </div>
                    <div className="border-b border-slate-200 p-5">
                      <div className="text-[length:var(--fs-2xs)] font-extrabold uppercase tracking-[0.14em] text-slate-400">
                        Assessment Timings
                      </div>
                      <div className="mt-2 text-[length:var(--fs-md)] font-bold text-slate-900">{bookingConfirm.time}</div>
                    </div>

                    <div className="p-5 sm:col-span-2">
                      <div className="text-[length:var(--fs-2xs)] font-extrabold uppercase tracking-[0.14em] text-slate-400">
                        Assessment Venue
                      </div>
                      <div className="mt-2 text-[length:var(--fs-md)] font-bold text-slate-900">{bookingConfirm.venue}</div>
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex items-start gap-3 rounded-[var(--radius-lg)] border border-emerald-200 bg-emerald-50 p-4">
                  <div>
                    <div className="text-[length:var(--fs-sm)] font-extrabold text-emerald-700">Booking Confirmed</div>
                    <div className="mt-1 text-[length:var(--fs-xs)] text-slate-400">
                      You will receive a confirmation. This slot has been reserved for you.
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setBookingConfirm(null)}
                  className="mt-5 w-full rounded-[var(--radius-lg)] bg-[var(--color-primary)] px-4 py-3 text-[length:var(--fs-sm)] font-black text-white transition hover:brightness-95"
                >
                  Done
                </button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={isDark ? 'bg-slate-950 text-slate-100' : ''}>
      <SlotHeader isDark={isDark} onToggleDark={() => setIsDark((v) => !v)} />

      {panel === null ? (
        <SectionBoxes activeKey={panel} onSelect={(key) => setPanel(key)} />
      ) : null}

      <div className={`${commonWrap} py-[var(--space-4)]`}>
        {panel === null ? (
          <div className="rounded-[var(--radius-card)] border border-slate-200 bg-white p-10 text-center text-[length:var(--fs-sm)] font-semibold text-slate-400">
            Select a section above to get started
          </div>
        ) : null}

        {panel === 'points' ? (
          <div>
            <BackButton
              onClick={() => {
                setPanel(null);
                setPointsTab('rp');
              }}
            />

            <SegmentedTabs
              value={pointsTab}
              onChange={setPointsTab}
              tabs={[
                { value: 'rp', label: 'Reward Points' },
                { value: 'ap', label: 'Activity Points' },
              ]}
            />

            <div className="mt-[var(--space-4)]">
              {pointsTab === 'rp' ? (
                <div>
                  <div className="flex flex-wrap gap-3">
                    <select
                      value={rpDept}
                      onChange={(e) => setRpDept(e.target.value)}
                      className="rounded-[var(--radius-md)] border-2 border-slate-200 bg-white px-3 py-2 text-[length:var(--fs-sm)] font-bold text-slate-900 outline-none focus:border-[var(--color-primary)]"
                    >
                      {departments.map((d) => (
                        <option key={d.code} value={d.code}>
                          {d.name}
                        </option>
                      ))}
                    </select>

                    <select
                      value={rpYear}
                      onChange={(e) => setRpYear(e.target.value)}
                      className="rounded-[var(--radius-md)] border-2 border-slate-200 bg-white px-3 py-2 text-[length:var(--fs-sm)] font-bold text-slate-900 outline-none focus:border-[var(--color-primary)]"
                    >
                      <option value="ALL">Overall Ranking</option>
                      <option value="23">3rd Year</option>
                      <option value="24">2nd Year</option>
                      <option value="25">1st Year</option>
                    </select>

                    <input
                      value={rpSearch}
                      onChange={(e) => setRpSearch(e.target.value)}
                      placeholder="e.g. 7376242BT192"
                      className="min-w-[180px] flex-1 rounded-[var(--radius-md)] border-2 border-slate-200 bg-white px-3 py-2 text-[length:var(--fs-sm)] font-semibold text-slate-900 outline-none placeholder:text-slate-400 focus:border-[var(--color-primary)]"
                    />
                  </div>

                  <div className="mt-2 text-right text-[length:var(--fs-xs)] text-slate-400">
                    Showing {rpRows.rows.length} of {rpRows.sorted.length} students
                  </div>

                  <Card className="mt-2 overflow-hidden">
                    <div className="hidden grid-cols-[56px_1fr_90px_90px_100px] items-center gap-2 border-b border-slate-200 bg-gradient-to-r from-[color:var(--color-secondary)] to-[color:var(--color-secondary-dark)] px-4 py-3 text-[length:var(--fs-2xs)] font-black uppercase tracking-[0.16em] text-slate-400 sm:grid">
                      <span>Rank</span>
                      <span>Student</span>
                      <span></span>
                      <span>Year</span>
                      <span className="text-right">Points</span>
                    </div>

                    <div>
                      {rpRows.rows.length === 0 ? (
                        <div className="p-10 text-center text-[length:var(--fs-sm)] font-semibold text-slate-400">
                          No students found.
                        </div>
                      ) : (
                        rpRows.rows.map((s) => {
                          const rank = rpRows.sorted.indexOf(s) + 1;
                          const yearTxt = String(s.year).slice(-2) === '23' ? '3rd Year' : String(s.year).slice(-2) === '24' ? '2nd Year' : '1st Year';

                          return (
                            <div
                              key={s.roll}
                              className="grid grid-cols-1 gap-3 border-b border-slate-100 px-4 py-4 transition hover:bg-[color:var(--color-secondary)] sm:grid-cols-[56px_1fr_90px_90px_100px] sm:items-center"
                            >
                              <div className="text-[length:var(--fs-lg)] font-black text-slate-400">{rank}</div>
                              <div>
                                <div className="text-[length:var(--fs-sm)] font-extrabold text-slate-900">{s.name}</div>
                                <div className="mt-1 text-[length:var(--fs-xs)] text-slate-400">{s.roll}</div>
                              </div>
                              <div>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setDetailsRoll(s.roll);
                                    setDetailsOpen(true);
                                  }}
                                  className="inline-flex items-center gap-1 rounded-full border border-[color:var(--color-primary-light)] bg-[color:var(--color-secondary)] px-3 py-1 text-[length:var(--fs-2xs)] font-black tracking-wide text-[var(--color-primary)] transition hover:brightness-95"
                                >
                                  Details
                                </button>
                              </div>
                              <div className="text-[length:var(--fs-sm)] font-bold text-slate-600">{yearTxt}</div>
                              <div className="text-right text-[length:var(--fs-xl)] font-black text-[var(--color-primary)]">
                                {s.balance.toLocaleString()}
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </Card>
                </div>
              ) : (
                <div>
                  <PillTabs
                    value={apTab}
                    onChange={setApTab}
                    tabs={[
                      { value: 'individual', label: 'Individual Ranking' },
                      { value: 'group', label: 'Group Average Ranking' },
                    ]}
                  />

                  {apTab === 'individual' ? (
                    <div className="mt-[var(--space-4)]">
                      <div className="flex flex-wrap gap-3">
                        <select
                          value={apYear}
                          onChange={(e) => setApYear(e.target.value)}
                          className="rounded-[var(--radius-md)] border-2 border-slate-200 bg-white px-3 py-2 text-[length:var(--fs-sm)] font-bold text-slate-900 outline-none focus:border-[var(--color-primary)]"
                        >
                          <option value="ALL">All Years</option>
                          <option value="2nd">2nd Year</option>
                          <option value="1st">1st Year</option>
                          <option value="3rd">3rd Year</option>
                        </select>

                        <select
                          value={apDept}
                          onChange={(e) => setApDept(e.target.value)}
                          className="rounded-[var(--radius-md)] border-2 border-slate-200 bg-white px-3 py-2 text-[length:var(--fs-sm)] font-bold text-slate-900 outline-none focus:border-[var(--color-primary)]"
                        >
                          <option value="ALL">All Depts</option>
                          {departments.map((d) => (
                            <option key={d.code} value={d.code}>
                              {d.code}
                            </option>
                          ))}
                        </select>

                        <input
                          value={apSearch}
                          onChange={(e) => setApSearch(e.target.value)}
                          placeholder="e.g. 7376242BT192"
                          className="min-w-[180px] flex-1 rounded-[var(--radius-md)] border-2 border-slate-200 bg-white px-3 py-2 text-[length:var(--fs-sm)] font-semibold text-slate-900 outline-none placeholder:text-slate-400 focus:border-[var(--color-primary)]"
                        />
                      </div>

                      <div className="mt-2 text-right text-[length:var(--fs-xs)] text-slate-400">
                        Showing top {apRows.rows.length} of {apRows.total} students
                      </div>

                      <Card className="mt-2 overflow-hidden">
                        <div className="hidden grid-cols-[56px_1fr_100px_90px] items-center gap-2 border-b border-slate-200 bg-gradient-to-r from-[color:var(--color-secondary)] to-[color:var(--color-secondary-dark)] px-4 py-3 text-[length:var(--fs-2xs)] font-black uppercase tracking-[0.16em] text-slate-400 sm:grid">
                          <span>Rank</span>
                          <span>Student</span>
                          <span>Dept/Year</span>
                          <span className="text-right">Act. Pts</span>
                        </div>

                        {apRows.rows.map((s, idx) => (
                          <div
                            key={s.roll}
                            className="grid grid-cols-1 gap-3 border-b border-slate-100 px-4 py-4 transition hover:bg-[color:var(--color-secondary)] sm:grid-cols-[56px_1fr_100px_90px] sm:items-center"
                          >
                            <div className="text-[length:var(--fs-lg)] font-black text-slate-400">{idx + 1}</div>
                            <div>
                              <div className="text-[length:var(--fs-sm)] font-extrabold text-slate-900">{s.name}</div>
                              <div className="mt-1 flex flex-wrap items-center gap-2 text-[length:var(--fs-xs)] text-slate-400">
                                <span>{s.roll}</span>
                                <span className="rounded-full bg-[color:var(--color-secondary)] px-2 py-0.5 text-[length:var(--fs-2xs)] font-black text-[var(--color-primary)]">
                                  {s.yearLabel} Yr
                                </span>
                              </div>
                            </div>
                            <div className="text-[length:var(--fs-sm)] font-bold text-slate-600">{s.dept}</div>
                            <div className="text-right text-[length:var(--fs-xl)] font-black text-[var(--color-primary)]">
                              {s.points.toLocaleString()}
                            </div>
                          </div>
                        ))}
                      </Card>
                    </div>
                  ) : (
                    <div className="mt-[var(--space-4)]">
                      <div className="flex flex-wrap gap-3">
                        <input
                          value={apGroupSearch}
                          onChange={(e) => setApGroupSearch(e.target.value)}
                          placeholder="e.g. A#100027"
                          className="w-full max-w-[300px] rounded-[var(--radius-md)] border-2 border-slate-200 bg-white px-3 py-2 text-[length:var(--fs-sm)] font-semibold text-slate-900 outline-none placeholder:text-slate-400 focus:border-[var(--color-primary)]"
                        />
                      </div>

                      <div className="mt-2 text-[length:var(--fs-xs)] text-slate-400">
                        {apGroupRows.filtered.length} of {apGroupRows.sorted.length} groups ranked by average activity points
                      </div>

                      <div className="mt-3 flex flex-col gap-2">
                        {apGroupRows.filtered.map((g) => (
                          <div
                            key={g.id}
                            className="flex flex-col gap-3 rounded-[var(--radius-card)] border border-slate-200 bg-white p-4 transition hover:border-[var(--color-primary)] hover:shadow-lg sm:flex-row sm:items-center"
                          >
                            <div className="text-[length:var(--fs-xl)] font-black text-slate-400">{apGroupRows.sorted.indexOf(g) + 1}</div>
                            <div className="min-w-0 flex-1">
                              <div className="truncate text-[length:var(--fs-md)] font-black text-slate-900">{g.id}</div>
                              <div className="mt-1 text-[length:var(--fs-xs)] text-slate-400">
                                Captain: {g.members.find((m) => m.role === 'Captain')?.name || '—'} · {g.members.length} members
                              </div>
                              <button
                                type="button"
                                onClick={() => {
                                  setDetailsRoll(g.id);
                                  setDetailsOpen(true);
                                }}
                                className="mt-2 inline-flex items-center gap-1 rounded-full border border-[color:var(--color-primary-light)] bg-[color:var(--color-secondary)] px-3 py-1 text-[length:var(--fs-2xs)] font-black tracking-wide text-[var(--color-primary)]"
                              >
                                Details
                              </button>
                            </div>
                            <div className="text-right">
                              <div className="text-[length:var(--fs-xl)] font-black text-[var(--color-primary)]">{g.avgPoints}</div>
                              <div className="text-[length:var(--fs-2xs)] font-bold text-slate-400">avg pts</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ) : null}

        {panel === 'slots' ? (
          <div>
            <BackButton
              onClick={() => {
                setPanel(null);
                setSlotsTab('ps');
                setSelectedPsId(null);
                setSelectedPblId(null);
              }}
            />

            <div className="mb-[var(--space-3)] flex items-center justify-end">
              <div className="relative">
                <button
                  id="pt-booked-btn"
                  type="button"
                  onClick={() => setBookedPopupOpen((v) => !v)}
                  className="inline-flex items-center gap-2 rounded-full border-2 border-slate-200 bg-white px-4 py-2 text-[length:var(--fs-xs)] font-extrabold text-slate-600 transition hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  Booked Slots
                  <span
                    className="grid h-[18px] w-[18px] place-items-center rounded-full bg-[var(--color-primary)] text-[10px] font-black text-white"
                    aria-label="Booked slots count"
                  >
                    {bookedList.length}
                  </span>
                </button>

                {bookedPopupOpen ? (
                  <div
                    id="pt-booked-popup"
                    className="absolute right-0 top-full z-40 mt-2 w-[min(340px,calc(100vw-2rem))] overflow-hidden rounded-[var(--radius-xl)] border-2 border-slate-200 bg-white shadow-lg"
                  >
                    <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
                      <div className="text-[length:var(--fs-md)] font-black text-slate-900">My Booked Slots</div>
                      <button
                        type="button"
                        onClick={() => setBookedPopupOpen(false)}
                        className="grid h-7 w-7 place-items-center rounded-full border border-slate-200 text-slate-400 hover:bg-slate-50"
                        aria-label="Close"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="max-h-[320px] overflow-y-auto p-3">
                      {bookedList.length === 0 ? (
                        <div className="p-6 text-center text-[length:var(--fs-sm)] font-semibold text-slate-400">
                          No slots booked yet
                        </div>
                      ) : (
                        bookedList.map(([key, b]) => (
                          <div key={key} className="mb-2 rounded-[var(--radius-lg)] border border-slate-200 bg-[color:var(--color-secondary)] p-3 last:mb-0">
                            <div className="text-[length:var(--fs-sm)] font-extrabold text-slate-900">{b.name}</div>
                            <div className="mt-2 inline-block rounded-full bg-white px-3 py-1 text-[length:var(--fs-2xs)] font-black text-[var(--color-primary)]">
                              {b.type}
                            </div>
                            <div className="mt-2 grid gap-1 text-[length:var(--fs-xs)] text-slate-600">
                              <div>
                                <span className="font-extrabold text-slate-400">Date</span> — {b.info?.day || '—'}
                              </div>
                              <div>
                                <span className="font-extrabold text-slate-400">Timings</span> — {b.info?.time || '—'}
                              </div>
                              <div>
                                <span className="font-extrabold text-slate-400">Venue</span> — {b.info?.venue || '—'}
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>

            <SegmentedTabs
              value={slotsTab}
              onChange={(v) => {
                setSlotsTab(v);
                setSelectedPsId(null);
                setSelectedPblId(null);
              }}
              tabs={[
                { value: 'ps', label: 'PS Training Slots' },
                { value: 'pbl', label: 'PBL Training Slots' },
              ]}
            />

            <div className="mt-[var(--space-4)]">
              {slotsTab === 'ps' ? (
                <div>
                  {selectedPsId === null ? (
                    <div>
                      <div className="mb-3">
                        <div className="text-[length:var(--fs-md)] font-extrabold text-slate-900">PS Training Slots</div>
                        <div className="mt-1 text-[length:var(--fs-xs)] text-slate-400">
                          Book your practical skill training. Click a course to view syllabus and book your slot.
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <input
                          value={psSearch}
                          onChange={(e) => setPsSearch(e.target.value)}
                          placeholder="Search courses..."
                          className="min-w-[180px] flex-1 rounded-[var(--radius-md)] border-2 border-slate-200 bg-white px-3 py-2 text-[length:var(--fs-sm)] font-semibold text-slate-900 outline-none placeholder:text-slate-400 focus:border-[var(--color-primary)]"
                        />
                        <select
                          value={psCat}
                          onChange={(e) => setPsCat(e.target.value)}
                          className="rounded-[var(--radius-md)] border-2 border-slate-200 bg-white px-3 py-2 text-[length:var(--fs-sm)] font-bold text-slate-900 outline-none focus:border-[var(--color-primary)]"
                        >
                          <option value="ALL">All Categories</option>
                          <option value="Software">Software</option>
                          <option value="Hardware">Hardware</option>
                          <option value="General Skill">General Skill</option>
                        </select>
                      </div>

                      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {psCourses
                          .filter((c) =>
                            [psSearch.trim().toLowerCase() === '' || c.name.toLowerCase().includes(psSearch.trim().toLowerCase()), psCat === 'ALL' || c.category === psCat].every(Boolean)
                          )
                          .map((c) => (
                            <button
                              key={c.id}
                              type="button"
                              onClick={() => setSelectedPsId(c.id)}
                              className="group overflow-hidden rounded-[var(--radius-xl)] border border-slate-200 bg-white text-left transition hover:-translate-y-1 hover:border-[color:var(--color-primary-light)] hover:shadow-lg"
                            >
                              <div className="relative h-40 bg-gradient-to-br from-[color:var(--color-secondary)] to-[color:var(--color-secondary-dark)]">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                                <div className="absolute left-3 top-3 rounded-full border border-[color:var(--color-primary-light)] bg-white/80 px-3 py-1 text-[length:var(--fs-2xs)] font-black text-[var(--color-primary)] backdrop-blur">
                                  {c.category}
                                </div>
                              </div>

                              <div className="p-4">
                                <div className="text-[length:var(--fs-sm)] font-extrabold text-slate-900">{c.name}</div>
                                <div className="mt-2 flex items-center justify-between">
                                  <div className="text-[length:var(--fs-xs)] font-bold text-slate-400">
                                    {c.levels} Level{c.levels !== 1 ? 's' : ''}
                                  </div>
                                  <div className="text-[length:var(--fs-sm)] font-extrabold text-emerald-600">Slot Open</div>
                                </div>
                                <div className="mt-3 flex items-center justify-between rounded-[var(--radius-md)] border border-[color:var(--color-primary-light)] bg-[color:var(--color-secondary)] px-3 py-2 text-[length:var(--fs-sm)] font-black text-[var(--color-primary)]">
                                  <span>Book Slot</span>
                                  <span aria-hidden="true">›</span>
                                </div>
                              </div>
                            </button>
                          ))}
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_300px]">
                      <Card className="p-[var(--space-6)]">
                        <BackButton onClick={() => setSelectedPsId(null)} label="← Back to Courses" />

                        {(() => {
                          const course = psCourses.find((c) => c.id === selectedPsId);
                          if (!course) return null;
                          return (
                            <div>
                              <div className="text-[length:var(--fs-lg)] font-black text-slate-900">
                                {course.name} — Syllabus
                              </div>
                              <div className="mt-1 text-[length:var(--fs-xs)] text-slate-400">
                                {course.levels} Level{course.levels !== 1 ? 's' : ''} · {course.category}
                              </div>

                              <div className="mt-4 flex flex-col gap-2">
                                {course.topics.map((t, idx) => (
                                  <div key={t} className="flex gap-3 rounded-[var(--radius-md)] border border-[color:var(--color-primary-light)] bg-[color:var(--color-secondary)] px-4 py-3">
                                    <div className="w-6 shrink-0 text-[length:var(--fs-xs)] font-black text-slate-400">{idx + 1}</div>
                                    <div className="text-[length:var(--fs-sm)] font-semibold text-slate-900">{t}</div>
                                  </div>
                                ))}
                              </div>

                              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                                <button
                                  type="button"
                                  className="flex-1 rounded-[var(--radius-lg)] border-2 border-[color:var(--color-primary-light)] bg-[color:var(--color-secondary)] px-4 py-3 text-[length:var(--fs-sm)] font-black text-[var(--color-primary)]"
                                >
                                  Open Link
                                </button>
                                <button
                                  type="button"
                                  className="flex-1 rounded-[var(--radius-lg)] border-2 border-emerald-200 bg-emerald-50 px-4 py-3 text-[length:var(--fs-sm)] font-black text-emerald-600"
                                >
                                  Mark as Complete
                                </button>
                              </div>
                            </div>
                          );
                        })()}
                      </Card>

                      <div className="flex flex-col gap-4">
                        <Card className="p-[var(--space-6)]">
                          <div className="text-[length:var(--fs-2xs)] font-black uppercase tracking-[0.16em] text-slate-400">
                            Course Details
                          </div>
                          <div className="mt-2 text-[length:var(--fs-md)] font-black text-slate-900">
                            {psCourses.find((c) => c.id === selectedPsId)?.name} — Training Session
                          </div>

                          {bookedSlots[`ps_${selectedPsId}`] ? (
                            <div className="mt-4 rounded-[var(--radius-lg)] border border-emerald-200 bg-emerald-50 p-4">
                              <div className="text-[length:var(--fs-sm)] font-black text-emerald-700">Slot Booked</div>
                              <div className="mt-3 grid gap-2 text-[length:var(--fs-xs)] text-slate-700">
                                <div>
                                  <span className="font-black text-slate-400">Date</span> — {bookedSlots[`ps_${selectedPsId}`]?.info?.day || '—'}
                                </div>
                                <div>
                                  <span className="font-black text-slate-400">Timings</span> — {bookedSlots[`ps_${selectedPsId}`]?.info?.time || '—'}
                                </div>
                                <div>
                                  <span className="font-black text-slate-400">Venue</span> — {bookedSlots[`ps_${selectedPsId}`]?.info?.venue || '—'}
                                </div>
                              </div>
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => openBookingFor('ps')}
                              className="mt-4 w-full rounded-[var(--radius-lg)] border-2 border-[color:var(--color-primary-light)] bg-[color:var(--color-secondary)] px-4 py-3 text-[length:var(--fs-md)] font-black text-[var(--color-primary)] transition hover:brightness-95"
                            >
                              Book a Slot
                            </button>
                          )}
                        </Card>

                        <Card className="p-[var(--space-5)]">
                          <div className="text-[length:var(--fs-2xs)] font-black uppercase tracking-[0.16em] text-slate-400">
                            Assessment
                          </div>
                          <div className="mt-3 rounded-[var(--radius-md)] bg-slate-100 p-3 text-center text-[length:var(--fs-xs)] font-bold text-slate-400">
                            Not Available
                          </div>
                        </Card>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  {selectedPblId === null ? (
                    <div>
                      <div className="mb-3">
                        <div className="text-[length:var(--fs-md)] font-extrabold text-slate-900">PBL Training Slots</div>
                        <div className="mt-1 text-[length:var(--fs-xs)] text-slate-400">
                          Book your lab session for Project Based Learning. Choose your department lab.
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <input
                          value={pblSearch}
                          onChange={(e) => setPblSearch(e.target.value)}
                          placeholder="Search labs..."
                          className="min-w-[180px] flex-1 rounded-[var(--radius-md)] border-2 border-slate-200 bg-white px-3 py-2 text-[length:var(--fs-sm)] font-semibold text-slate-900 outline-none placeholder:text-slate-400 focus:border-[var(--color-primary)]"
                        />
                        <select
                          value={pblDept}
                          onChange={(e) => setPblDept(e.target.value)}
                          className="rounded-[var(--radius-md)] border-2 border-slate-200 bg-white px-3 py-2 text-[length:var(--fs-sm)] font-bold text-slate-900 outline-none focus:border-[var(--color-primary)]"
                        >
                          <option value="ALL">All Departments</option>
                          {departments.map((d) => (
                            <option key={d.code} value={d.code}>
                              {d.code}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {pblLabs
                          .filter((l) =>
                            [pblSearch.trim().toLowerCase() === '' || l.name.toLowerCase().includes(pblSearch.trim().toLowerCase()), pblDept === 'ALL' || l.dept === pblDept].every(Boolean)
                          )
                          .map((l) => {
                            const isBooked = Boolean(bookedSlots[`pbl_${l.id}`]);
                            const warn = l.slots < 6;
                            return (
                              <button
                                key={l.id}
                                type="button"
                                onClick={() => setSelectedPblId(l.id)}
                                className="group overflow-hidden rounded-[var(--radius-xl)] border border-slate-200 bg-white text-left transition hover:-translate-y-1 hover:border-[color:var(--color-primary-light)] hover:shadow-lg"
                              >
                                <div className="relative h-40 bg-gradient-to-br from-[color:var(--color-secondary)] to-[color:var(--color-secondary-dark)]">
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                                  <div className="absolute left-3 top-3 rounded-full border border-[color:var(--color-primary-light)] bg-white/80 px-3 py-1 text-[length:var(--fs-2xs)] font-black text-[var(--color-primary)] backdrop-blur">
                                    {l.dept}
                                  </div>
                                </div>

                                <div className="p-4">
                                  <div className="text-[length:var(--fs-sm)] font-extrabold text-slate-900">{l.name}</div>
                                  <div className="mt-2 flex items-center justify-between">
                                    <div className="text-[length:var(--fs-xs)] font-bold text-slate-400">
                                      {l.dept} Dept · Cap {l.capacity}
                                    </div>
                                    <div className={['text-[length:var(--fs-sm)] font-extrabold', warn ? 'text-rose-500' : 'text-emerald-600'].join(' ')}>
                                      {l.slots} slots
                                    </div>
                                  </div>

                                  {isBooked ? (
                                    <div className="mt-3 rounded-[var(--radius-md)] border border-emerald-200 bg-emerald-50 px-3 py-2 text-center text-[length:var(--fs-sm)] font-black text-emerald-700">
                                      Slot Booked
                                    </div>
                                  ) : (
                                    <div className="mt-3 flex items-center justify-between rounded-[var(--radius-md)] border border-[color:var(--color-primary-light)] bg-[color:var(--color-secondary)] px-3 py-2 text-[length:var(--fs-sm)] font-black text-[var(--color-primary)]">
                                      <span>Book Slot</span>
                                      <span aria-hidden="true">›</span>
                                    </div>
                                  )}
                                </div>
                              </button>
                            );
                          })}
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_300px]">
                      <Card className="p-[var(--space-6)]">
                        <BackButton onClick={() => setSelectedPblId(null)} label="← Back to Labs" />

                        {(() => {
                          const lab = pblLabs.find((l) => l.id === selectedPblId);
                          if (!lab) return null;
                          return (
                            <div>
                              <div className="text-[length:var(--fs-lg)] font-black text-slate-900">
                                {lab.name}
                              </div>
                              <div className="mt-1 text-[length:var(--fs-xs)] text-slate-400">
                                {lab.dept} Department · Capacity: {lab.capacity}
                              </div>

                              <div className="mt-4 flex flex-col gap-2">
                                {lab.activities.map((a, idx) => (
                                  <div key={a} className="flex gap-3 rounded-[var(--radius-md)] border border-[color:var(--color-primary-light)] bg-[color:var(--color-secondary)] px-4 py-3">
                                    <div className="w-6 shrink-0 text-[length:var(--fs-xs)] font-black text-slate-400">{idx + 1}</div>
                                    <div className="text-[length:var(--fs-sm)] font-semibold text-slate-900">{a}</div>
                                  </div>
                                ))}
                              </div>

                              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                                <button
                                  type="button"
                                  className="flex-1 rounded-[var(--radius-lg)] border-2 border-[color:var(--color-primary-light)] bg-[color:var(--color-secondary)] px-4 py-3 text-[length:var(--fs-sm)] font-black text-[var(--color-primary)]"
                                >
                                  Open Lab Guide
                                </button>
                                <button
                                  type="button"
                                  className="flex-1 rounded-[var(--radius-lg)] border-2 border-emerald-200 bg-emerald-50 px-4 py-3 text-[length:var(--fs-sm)] font-black text-emerald-600"
                                >
                                  Mark as Complete
                                </button>
                              </div>
                            </div>
                          );
                        })()}
                      </Card>

                      <div className="flex flex-col gap-4">
                        <Card className="p-[var(--space-6)]">
                          <div className="text-[length:var(--fs-2xs)] font-black uppercase tracking-[0.16em] text-slate-400">
                            Lab Details
                          </div>
                          <div className="mt-2 text-[length:var(--fs-md)] font-black text-slate-900">
                            {pblLabs.find((l) => l.id === selectedPblId)?.name} — PBL Session
                          </div>

                          {bookedSlots[`pbl_${selectedPblId}`] ? (
                            <div className="mt-4 rounded-[var(--radius-lg)] border border-emerald-200 bg-emerald-50 p-4">
                              <div className="text-[length:var(--fs-sm)] font-black text-emerald-700">Slot Booked</div>
                              <div className="mt-3 grid gap-2 text-[length:var(--fs-xs)] text-slate-700">
                                <div>
                                  <span className="font-black text-slate-400">Date</span> — {bookedSlots[`pbl_${selectedPblId}`]?.info?.day || '—'}
                                </div>
                                <div>
                                  <span className="font-black text-slate-400">Timings</span> — {bookedSlots[`pbl_${selectedPblId}`]?.info?.time || '—'}
                                </div>
                                <div>
                                  <span className="font-black text-slate-400">Venue</span> — {bookedSlots[`pbl_${selectedPblId}`]?.info?.venue || '—'}
                                </div>
                              </div>
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => openBookingFor('pbl')}
                              className="mt-4 w-full rounded-[var(--radius-lg)] border-2 border-[color:var(--color-primary-light)] bg-[color:var(--color-secondary)] px-4 py-3 text-[length:var(--fs-md)] font-black text-[var(--color-primary)] transition hover:brightness-95"
                            >
                              Book a Slot
                            </button>
                          )}
                        </Card>

                        <Card className="p-[var(--space-5)]">
                          <div className="text-[length:var(--fs-2xs)] font-black uppercase tracking-[0.16em] text-slate-400">
                            Assessment
                          </div>
                          <div className="mt-3 rounded-[var(--radius-md)] bg-slate-100 p-3 text-center text-[length:var(--fs-xs)] font-bold text-slate-400">
                            Not Available Yet
                          </div>
                        </Card>

                        <Card className="p-[var(--space-5)]">
                          <div className="text-[length:var(--fs-2xs)] font-black uppercase tracking-[0.16em] text-slate-400">
                            Lab Record
                          </div>
                          <div className="mt-3 rounded-[var(--radius-md)] bg-slate-100 p-3 text-center text-[length:var(--fs-xs)] font-bold text-slate-400">
                            Locked Until Slot Ends
                          </div>
                        </Card>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ) : null}
      </div>

      <Modal
        open={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        title={
          bookingType === 'ps'
            ? `${psCourses.find((c) => c.id === selectedPsId)?.name || 'Course'} — PS Training`
            : `${pblLabs.find((l) => l.id === selectedPblId)?.name || 'Lab'} — PBL Session`
        }
        subtitle={bookingType === 'ps' ? 'Practical Skill Training Session' : 'Project Based Learning Lab Session'}
        maxWidthClass="max-w-[var(--w-modal-sm)]"
      >
        <div className="text-[length:var(--fs-2xs)] font-black uppercase tracking-[0.16em] text-slate-400">Slot Timing</div>

        <div className="mt-2">
          <select
            value={selectedSlotKey}
            onChange={(e) => setSelectedSlotKey(e.target.value)}
            className="w-full rounded-[var(--radius-lg)] border-2 border-slate-200 bg-[color:var(--color-bg)] px-4 py-3 text-[length:var(--fs-sm)] font-bold text-slate-900 outline-none focus:border-[var(--color-primary)]"
          >
            <option value="">Select a slot...</option>
            {slotOptions.map((o) => (
              <option key={o.key} value={o.key}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        {selectedSlotKey && SLOT_INFO[selectedSlotKey] ? (
          <div className="mt-4 rounded-[var(--radius-lg)] border border-[color:var(--color-primary-light)] bg-[color:var(--color-secondary)] p-4">
            <div className="grid gap-1 text-[length:var(--fs-sm)] font-semibold text-slate-700">
              <div className="font-black text-[var(--color-primary)]">{SLOT_INFO[selectedSlotKey].day}</div>
              <div className="font-black text-[var(--color-primary)]">{SLOT_INFO[selectedSlotKey].time}</div>
              <div className="font-black text-[var(--color-primary)]">{SLOT_INFO[selectedSlotKey].venue}</div>
              <div className={['mt-1 font-black', SLOT_INFO[selectedSlotKey].seats < 8 ? 'text-rose-500' : 'text-emerald-600'].join(' ')}>
                {SLOT_INFO[selectedSlotKey].seats} seats available
              </div>
            </div>
          </div>
        ) : null}

        <button
          type="button"
          onClick={confirmBooking}
          disabled={!selectedSlotKey}
          className={[
            'mt-5 w-full rounded-[var(--radius-xl)] px-4 py-3 text-[length:var(--fs-md)] font-black transition',
            selectedSlotKey
              ? 'bg-[var(--color-primary)] text-white hover:brightness-95'
              : 'cursor-not-allowed bg-slate-200 text-slate-400',
          ].join(' ')}
        >
          Book Now
        </button>
      </Modal>

      <Modal
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        title={detailsRoll && detailsRoll.startsWith('A#') ? detailsRoll : allRewardStudents.find((s) => s.roll === detailsRoll)?.name || '—'}
        subtitle={detailsRoll && detailsRoll.startsWith('A#') ? 'Group details (mock)' : detailsRoll || '—'}
        maxWidthClass="max-w-[var(--w-modal-md)]"
      >
        {detailsRoll && detailsRoll.startsWith('A#') ? (
          <div>
            {(() => {
              const grp = activityGroups.find((g) => g.id === detailsRoll);
              if (!grp) return <div className="text-slate-400">No group found.</div>;

              return (
                <div>
                  <div className="rounded-[var(--radius-lg)] border border-[color:var(--color-primary-light)] bg-[color:var(--color-secondary)] p-4">
                    <div className="text-[length:var(--fs-2xs)] font-black uppercase tracking-[0.16em] text-slate-500">Group Average</div>
                    <div className="mt-2 text-[length:var(--fs-xl)] font-black text-[var(--color-primary)]">
                      {grp.avgPoints} <span className="text-[length:var(--fs-sm)] font-bold text-slate-500">avg pts</span>
                    </div>
                  </div>

                  <div className="mt-4">
                    {grp.members.map((m) => (
                      <div key={m.roll} className="border-b border-slate-200 py-3 last:border-b-0">
                        <div className="text-[length:var(--fs-2xs)] font-black text-[var(--color-primary)]">{m.role}</div>
                        <div className="mt-1 flex items-start justify-between gap-4">
                          <div>
                            <div className="text-[length:var(--fs-sm)] font-extrabold text-slate-900">{m.name}</div>
                            <div className="mt-1 text-[length:var(--fs-xs)] text-slate-400">{m.roll}</div>
                          </div>
                          <div className="text-[length:var(--fs-sm)] font-black text-[var(--color-primary)]">{m.points} pts</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}
          </div>
        ) : (
          <div>
            {(() => {
              const d = detailsRoll ? detailsByRoll[detailsRoll] : null;
              if (!d) {
                return <div className="text-[length:var(--fs-sm)] font-semibold text-slate-400">No data found.</div>;
              }

              const grouped = d.items.reduce((acc, it) => {
                acc[it.category] = acc[it.category] || [];
                acc[it.category].push(it);
                return acc;
              }, {});

              return (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between rounded-[var(--radius-lg)] border border-[color:var(--color-primary-light)] bg-[color:var(--color-secondary)] p-4">
                    <div className="text-[length:var(--fs-sm)] font-bold text-slate-600">Total Points from Activities</div>
                    <div className="text-[length:var(--fs-xl)] font-black text-[var(--color-primary)]">
                      {d.total} pts
                    </div>
                  </div>

                  {Object.entries(grouped).map(([cat, items]) => {
                    const catTotal = items.reduce((sum, i) => sum + i.points, 0);
                    return (
                      <div key={cat} className="overflow-hidden rounded-[var(--radius-lg)] border border-slate-200">
                        <div className="flex items-center justify-between bg-[color:var(--color-secondary)] px-4 py-3">
                          <div className="text-[length:var(--fs-xs)] font-black uppercase tracking-[0.12em] text-slate-600">{cat}</div>
                          <div className="text-[length:var(--fs-sm)] font-black text-[var(--color-primary)]">{catTotal} pts</div>
                        </div>
                        <div className="divide-y divide-slate-200">
                          {items.map((it) => (
                            <div key={it.name} className="flex items-start justify-between gap-4 px-4 py-3 hover:bg-[color:var(--color-secondary)]">
                              <div>
                                <div className="text-[length:var(--fs-sm)] font-semibold text-slate-900">{it.name}</div>
                                {it.dateRange ? (
                                  <div className="mt-1 text-[length:var(--fs-xs)] text-slate-400">{it.dateRange}</div>
                                ) : null}
                              </div>
                              <div className="shrink-0 text-[length:var(--fs-sm)] font-black text-[var(--color-primary)]">
                                +{it.points} pts
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })()}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default SlotPage;
