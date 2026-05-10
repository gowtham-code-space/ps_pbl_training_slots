// ── ALL DATA FOR PCDP ADMIN PORTAL ──────────────────────────────

export const allFaculty = [
  { id: 'F01', name: 'Dr. R. Kavitha',        initials: 'RK', dept: 'CSE',  venues: ['PBL Lab 1', 'PS Lab'],  slots: 3, status: 'active'   },
  { id: 'F02', name: 'Dr. S. Rajkumar',       initials: 'SR', dept: 'CSE',  venues: ['PBL Lab 2'],            slots: 2, status: 'active'   },
  { id: 'F03', name: 'Dr. P. Meenakshi',      initials: 'PM', dept: 'CSE',  venues: ['PBL Lab 3'],            slots: 2, status: 'active'   },
  { id: 'F04', name: 'Dr. A. Vignesh',        initials: 'AV', dept: 'ECE',  venues: ['ECE Lab 1'],            slots: 2, status: 'active'   },
  { id: 'F05', name: 'Dr. K. Pradeep',        initials: 'KP', dept: 'ECE',  venues: ['ECE Lab 2'],            slots: 1, status: 'active'   },
  { id: 'F06', name: 'Dr. M. Sundaram',       initials: 'MS', dept: 'MECH', venues: ['MECH Lab 1'],           slots: 2, status: 'active'   },
  { id: 'F07', name: 'Dr. L. Priya',          initials: 'LP', dept: 'MECH', venues: ['MECH Lab 2'],           slots: 1, status: 'active'   },
  { id: 'F08', name: 'Dr. T. Rajan',          initials: 'TR', dept: 'BIO',  venues: ['Bio Lab 1'],            slots: 1, status: 'active'   },
  { id: 'F09', name: 'Dr. V. Nandhini',       initials: 'VN', dept: 'CSE',  venues: ['PBL Lab 4'],            slots: 2, status: 'active'   },
  { id: 'F10', name: 'Dr. C. Balaji',         initials: 'CB', dept: 'ECE',  venues: ['ECE Lab 3'],            slots: 2, status: 'active'   },
  { id: 'F11', name: 'Dr. R. Suresh',         initials: 'RS', dept: 'CSE',  venues: [],                       slots: 0, status: 'inactive' },
  { id: 'F12', name: 'Dr. D. Aruna',          initials: 'DA', dept: 'MECH', venues: [],                       slots: 0, status: 'inactive' },
  { id: 'F13', name: 'Dr. J. Muthu',          initials: 'JM', dept: 'BIO',  venues: [],                       slots: 0, status: 'inactive' },
  { id: 'F14', name: 'Dr. N. Kaveri',         initials: 'NK', dept: 'ECE',  venues: [],                       slots: 0, status: 'inactive' },
  { id: 'F15', name: 'Dr. B. Ganesh',         initials: 'BG', dept: 'CSE',  venues: ['PS Lab 2'],             slots: 1, status: 'active'   },
  { id: 'F16', name: 'Dr. E. Lavanya',        initials: 'EL', dept: 'CSE',  venues: ['PBL Lab 5'],            slots: 2, status: 'active'   },
  { id: 'F17', name: 'Dr. H. Surya',          initials: 'HS', dept: 'ECE',  venues: ['ECE Lab 4'],            slots: 1, status: 'active'   },
  { id: 'F18', name: 'Dr. I. Priyadarshini',  initials: 'IP', dept: 'BIO',  venues: ['Bio Lab 2'],            slots: 1, status: 'active'   },
];

export const allVenues = [
  { id: 'V01', name: 'PBL Lab 1',   block: 'IT Block',   room: 'R201', type: 'PBL', faculty: 'F01', slot: 'Mon 9–10 AM',   status: 'occupied', transferredTo: null },
  { id: 'V02', name: 'PBL Lab 2',   block: 'IT Block',   room: 'R202', type: 'PBL', faculty: 'F02', slot: 'Mon 10–11 AM',  status: 'occupied', transferredTo: null },
  { id: 'V03', name: 'PBL Lab 3',   block: 'IT Block',   room: 'R203', type: 'PBL', faculty: 'F03', slot: 'Tue 11–12 PM',  status: 'occupied', transferredTo: null },
  { id: 'V04', name: 'PBL Lab 4',   block: 'IT Block',   room: 'R204', type: 'PBL', faculty: 'F09', slot: 'Tue 2–3 PM',    status: 'occupied', transferredTo: null },
  { id: 'V05', name: 'PBL Lab 5',   block: 'IT Block',   room: 'R205', type: 'PBL', faculty: 'F16', slot: 'Wed 3–4 PM',    status: 'occupied', transferredTo: null },
  { id: 'V06', name: 'PS Lab',      block: 'CSE Block',  room: 'L1',   type: 'PS',  faculty: 'F01', slot: 'Tue 2–3 PM',    status: 'occupied', transferredTo: null },
  { id: 'V07', name: 'PS Lab 2',    block: 'CSE Block',  room: 'L2',   type: 'PS',  faculty: 'F15', slot: 'Thu 3–4 PM',    status: 'occupied', transferredTo: null },
  { id: 'V08', name: 'ECE Lab 1',   block: 'ECE Block',  room: 'E101', type: 'PBL', faculty: 'F04', slot: 'Mon 11–12 PM',  status: 'occupied', transferredTo: null },
  { id: 'V09', name: 'ECE Lab 2',   block: 'ECE Block',  room: 'E102', type: 'PS',  faculty: 'F05', slot: 'Wed 2–3 PM',    status: 'occupied', transferredTo: null },
  { id: 'V10', name: 'MECH Lab 1',  block: 'MECH Block', room: 'M101', type: 'PBL', faculty: null,  slot: null,            status: 'free',     transferredTo: null },
  { id: 'V11', name: 'Bio Lab 1',   block: 'Bio Block',  room: 'B101', type: 'PBL', faculty: null,  slot: null,            status: 'free',     transferredTo: null },
  { id: 'V12', name: 'Bio Lab 2',   block: 'Bio Block',  room: 'B102', type: 'PS',  faculty: null,  slot: null,            status: 'free',     transferredTo: null },
];

export const initialPSSlots = [
  { id: 'PS01', day: 'Monday',    time: '9:00 AM – 10:00 AM',  venue: 'PS Lab',    faculty: 'F01' },
  { id: 'PS02', day: 'Tuesday',   time: '2:00 PM – 3:00 PM',   venue: 'PS Lab',    faculty: 'F01' },
  { id: 'PS03', day: 'Thursday',  time: '3:00 PM – 4:00 PM',   venue: 'PS Lab 2',  faculty: 'F15' },
  { id: 'PS04', day: 'Wednesday', time: '2:00 PM – 3:00 PM',   venue: 'ECE Lab 2', faculty: 'F05' },
];

export const initialPBLSlots = [
  { id: 'PBL01', day: 'Monday',    time: '9:00 AM – 10:00 AM',  venue: 'PBL Lab 1', faculty: 'F01' },
  { id: 'PBL02', day: 'Monday',    time: '10:00 AM – 11:00 AM', venue: 'PBL Lab 2', faculty: 'F02' },
  { id: 'PBL03', day: 'Tuesday',   time: '11:00 AM – 12:00 PM', venue: 'PBL Lab 3', faculty: 'F03' },
  { id: 'PBL04', day: 'Tuesday',   time: '2:00 PM – 3:00 PM',   venue: 'PBL Lab 4', faculty: 'F09' },
  { id: 'PBL05', day: 'Wednesday', time: '3:00 PM – 4:00 PM',   venue: 'PBL Lab 5', faculty: 'F16' },
  { id: 'PBL06', day: 'Monday',    time: '11:00 AM – 12:00 PM', venue: 'ECE Lab 1', faculty: 'F04' },
];

export const initialLabApprovals = [
  { id: 'LA01', student: 'Arun Kumar S',  roll: '2021UBT001', faculty: 'Dr. R. Kavitha',  slot: 'Mon 9–10 AM',   cqScore: '18/20', pdfFile: 'lab_manual_arun.pdf',   status: 'pending'  },
  { id: 'LA02', student: 'Priya R',       roll: '2021UBT002', faculty: 'Dr. R. Kavitha',  slot: 'Mon 9–10 AM',   cqScore: '15/20', pdfFile: 'lab_manual_priya.pdf',  status: 'pending'  },
  { id: 'LA03', student: 'Karthik M',     roll: '2021UBT003', faculty: 'Dr. R. Kavitha',  slot: 'Mon 11–12 PM',  cqScore: '20/20', pdfFile: 'lab_manual_karthik.pdf',status: 'pending'  },
  { id: 'LA04', student: 'Bala Murugan',  roll: '2022UBT011', faculty: 'Dr. R. Kavitha',  slot: 'Tue 2–3 PM',    cqScore: '9/20',  pdfFile: 'lab_manual_bala.pdf',   status: 'pending'  },
  { id: 'LA05', student: 'Rahul S',       roll: '2022UBT009', faculty: 'Dr. S. Rajkumar', slot: 'Mon 11–12 PM',  cqScore: '12/20', pdfFile: 'lab_manual_rahul.pdf',  status: 'approved' },
];

export const initialAPApprovals = [
  { id: 'AP01', student: 'Arun Kumar S',  roll: '2021UBT001', activity: 'Hackathon – 1st Place',     pts: 10, faculty: 'Dr. R. Kavitha',  status: 'pending'  },
  { id: 'AP02', student: 'Priya R',       roll: '2021UBT002', activity: 'Paper Publication',          pts: 15, faculty: 'Dr. R. Kavitha',  status: 'pending'  },
  { id: 'AP03', student: 'Karthik M',     roll: '2021UBT003', activity: 'Sports – District Level',    pts: 5,  faculty: 'Dr. R. Kavitha',  status: 'pending'  },
  { id: 'AP04', student: 'Bala Murugan',  roll: '2022UBT011', activity: 'Coding Contest – Top 10',    pts: 6,  faculty: 'Dr. R. Kavitha',  status: 'pending'  },
  { id: 'AP05', student: 'Thenmozhi K',   roll: '2022UBT012', activity: 'Seminar Presentation',       pts: 5,  faculty: 'Dr. S. Rajkumar', status: 'pending'  },
  { id: 'AP06', student: 'Rahul S',       roll: '2022UBT009', activity: 'Workshop Participation',     pts: 3,  faculty: 'Dr. S. Rajkumar', status: 'approved' },
];

export const allStudents = [
  { name: 'Arun Kumar S',  roll: '2021UBT001', year: 'III Year', dept: 'CSE',  ps: 45, pbl: 38, ap: 25 },
  { name: 'Priya R',       roll: '2021UBT002', year: 'III Year', dept: 'CSE',  ps: 52, pbl: 41, ap: 30 },
  { name: 'Karthik M',     roll: '2021UBT003', year: 'III Year', dept: 'CSE',  ps: 60, pbl: 55, ap: 15 },
  { name: 'Divya Lakshmi', roll: '2021UBT004', year: 'III Year', dept: 'CSE',  ps: 38, pbl: 42, ap: 10 },
  { name: 'Suresh Kumar',  roll: '2021UBT005', year: 'III Year', dept: 'CSE',  ps: 55, pbl: 48, ap: 20 },
  { name: 'Rahul S',       roll: '2022UBT009', year: 'II Year',  dept: 'CSE',  ps: 30, pbl: 28, ap: 18 },
  { name: 'Sneka P',       roll: '2022UBT010', year: 'II Year',  dept: 'CSE',  ps: 42, pbl: 35, ap: 22 },
  { name: 'Bala Murugan',  roll: '2022UBT011', year: 'II Year',  dept: 'CSE',  ps: 25, pbl: 20, ap: 12 },
  { name: 'Thenmozhi K',   roll: '2022UBT012', year: 'II Year',  dept: 'CSE',  ps: 48, pbl: 44, ap: 28 },
  { name: 'Vignesh A',     roll: '2023UBT018', year: 'I Year',   dept: 'CSE',  ps: 18, pbl: 15, ap: 5  },
  { name: 'Kaviya N',      roll: '2023UBT019', year: 'I Year',   dept: 'CSE',  ps: 22, pbl: 18, ap: 8  },
  { name: 'Surya P',       roll: '2020UBT024', year: 'IV Year',  dept: 'CSE',  ps: 75, pbl: 68, ap: 45 },
  { name: 'Meena R',       roll: '2020UBT025', year: 'IV Year',  dept: 'CSE',  ps: 80, pbl: 72, ap: 50 },
];

export const initialFacultySlotMap = {
  F01: [
    { id: 'F01-S1', time: 'Mon 9–10 AM',   venue: 'PBL Lab 1', day: 'Monday',    full: '9:00 AM – 10:00 AM'  },
    { id: 'F01-S2', time: 'Mon 11–12 PM',  venue: 'PBL Lab 1', day: 'Monday',    full: '11:00 AM – 12:00 PM' },
    { id: 'F01-S3', time: 'Tue 2–3 PM',    venue: 'PS Lab',    day: 'Tuesday',   full: '2:00 PM – 3:00 PM'   },
  ],
  F02: [
    { id: 'F02-S1', time: 'Mon 10–11 AM',  venue: 'PBL Lab 2', day: 'Monday',    full: '10:00 AM – 11:00 AM' },
    { id: 'F02-S2', time: 'Wed 3–4 PM',    venue: 'PBL Lab 2', day: 'Wednesday', full: '3:00 PM – 4:00 PM'   },
  ],
  F03: [
    { id: 'F03-S1', time: 'Tue 11–12 PM',  venue: 'PBL Lab 3', day: 'Tuesday',   full: '11:00 AM – 12:00 PM' },
    { id: 'F03-S2', time: 'Thu 2–3 PM',    venue: 'PBL Lab 3', day: 'Thursday',  full: '2:00 PM – 3:00 PM'   },
  ],
  F04: [
    { id: 'F04-S1', time: 'Mon 11–12 PM',  venue: 'ECE Lab 1', day: 'Monday',    full: '11:00 AM – 12:00 PM' },
    { id: 'F04-S2', time: 'Thu 9–10 AM',   venue: 'ECE Lab 1', day: 'Thursday',  full: '9:00 AM – 10:00 AM'  },
  ],
  F05: [
    { id: 'F05-S1', time: 'Wed 2–3 PM',    venue: 'ECE Lab 2', day: 'Wednesday', full: '2:00 PM – 3:00 PM'   },
  ],
  F06: [
    { id: 'F06-S1', time: 'Mon 9–10 AM',   venue: 'MECH Lab 1',day: 'Monday',    full: '9:00 AM – 10:00 AM'  },
    { id: 'F06-S2', time: 'Fri 10–11 AM',  venue: 'MECH Lab 1',day: 'Friday',    full: '10:00 AM – 11:00 AM' },
  ],
  F07: [
    { id: 'F07-S1', time: 'Tue 3–4 PM',    venue: 'MECH Lab 2',day: 'Tuesday',   full: '3:00 PM – 4:00 PM'   },
  ],
  F08: [
    { id: 'F08-S1', time: 'Wed 11–12 PM',  venue: 'Bio Lab 1', day: 'Wednesday', full: '11:00 AM – 12:00 PM' },
  ],
  F09: [
    { id: 'F09-S1', time: 'Tue 2–3 PM',    venue: 'PBL Lab 4', day: 'Tuesday',   full: '2:00 PM – 3:00 PM'   },
    { id: 'F09-S2', time: 'Fri 9–10 AM',   venue: 'PBL Lab 4', day: 'Friday',    full: '9:00 AM – 10:00 AM'  },
  ],
  F10: [
    { id: 'F10-S1', time: 'Mon 2–3 PM',    venue: 'ECE Lab 3', day: 'Monday',    full: '2:00 PM – 3:00 PM'   },
    { id: 'F10-S2', time: 'Thu 11–12 PM',  venue: 'ECE Lab 3', day: 'Thursday',  full: '11:00 AM – 12:00 PM' },
  ],
  F15: [
    { id: 'F15-S1', time: 'Thu 3–4 PM',    venue: 'PS Lab 2',  day: 'Thursday',  full: '3:00 PM – 4:00 PM'   },
  ],
  F16: [
    { id: 'F16-S1', time: 'Wed 3–4 PM',    venue: 'PBL Lab 5', day: 'Wednesday', full: '3:00 PM – 4:00 PM'   },
    { id: 'F16-S2', time: 'Fri 2–3 PM',    venue: 'PBL Lab 5', day: 'Friday',    full: '2:00 PM – 3:00 PM'   },
  ],
  F17: [
    { id: 'F17-S1', time: 'Tue 10–11 AM',  venue: 'ECE Lab 4', day: 'Tuesday',   full: '10:00 AM – 11:00 AM' },
  ],
  F18: [
    { id: 'F18-S1', time: 'Mon 3–4 PM',    venue: 'Bio Lab 2', day: 'Monday',    full: '3:00 PM – 4:00 PM'   },
  ],
};

export const venueBlocks = [
  {
    block: 'Auditorium',
    venues: [
      { name: 'Auditorium Main', type: 'PBL', status: 'occupied', faculty: 'Dr. R. Kavitha' },
    ],
  },
  {
    block: 'EW Block',
    venues: Array.from({ length: 5 }, (_, i) => ({
      name: 'EW ' + (i + 1),
      type: i < 3 ? 'PBL' : 'PS',
      status: i < 4 ? 'occupied' : 'free',
      faculty: i < 4 ? ['Dr. S. Rajkumar','Dr. P. Meenakshi','Dr. A. Vignesh','Dr. K. Pradeep'][i] : null,
    })),
  },
  {
    block: 'NAS WW Block',
    venues: Array.from({ length: 50 }, (_, i) => ({
      name: 'NAS WW ' + (i + 1),
      type: i % 3 === 0 ? 'PS' : i % 3 === 1 ? 'PBL' : null,
      status: i < 35 ? 'occupied' : 'free',
      faculty: i < 35 ? 'Faculty ' + (i + 1) : null,
    })),
  },
  {
    block: 'ME Block',
    venues: Array.from({ length: 50 }, (_, i) => ({
      name: 'ME ' + (301 + i),
      type: i % 2 === 0 ? 'PBL' : 'PS',
      status: i < 30 ? 'occupied' : 'free',
      faculty: i < 30 ? 'Faculty ' + (i + 1) : null,
    })),
  },
];

export const notificationItems = [
  { icon: '🔴', msg: 'PBL Lab 3 has no faculty incharge for Thursday slot',      sub: 'Venue Alert',          action: 'venue-allocation'   },
  { icon: '🟡', msg: '23 lab record approvals pending system-wide',              sub: 'Lab Records',          action: 'approvals'          },
  { icon: '🟣', msg: '5 AP claims pending for more than 7 days',                 sub: 'Activity Points',      action: 'approvals'          },
  { icon: '🔵', msg: 'Dr. R. Suresh has no slot assigned this week',             sub: 'Faculty Alert',        action: 'faculty-allocation' },
  { icon: '🟠', msg: '3 venues free with no upcoming bookings',                  sub: 'Venue Utilization',    action: 'venue-allocation'   },
  { icon: '🟡', msg: 'New student batch import pending approval',                sub: 'Student Management',   action: 'students'           },
  { icon: '🔴', msg: 'Transfer request: Dr. Meenakshi → Dr. Rajkumar (Slot Tue 2PM)', sub: 'Transfer Request', action: 'faculty-allocation' },
];
