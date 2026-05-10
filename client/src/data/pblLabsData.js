// pblLabsData.js
// Extracted from PBL_LABS array in index_working.html
// One lab only — Software Development Lab (id: 1)
// getDeptStyle logic extracted from getDeptStyle() in index_working.html

// ── Dept style — extracted from getDeptStyle() in original ────
export function getDeptStyle(dept) {
  const map = {
    CSE:   { bg: 'rgba(74,144,232,0.12)',  color: '#1a6abf', border: 'rgba(74,144,232,0.25)'  },
    ECE:   { bg: 'rgba(232,144,74,0.12)',  color: '#a85b10', border: 'rgba(232,144,74,0.25)'  },
    MECH:  { bg: 'rgba(16,185,129,0.12)',  color: '#0a6644', border: 'rgba(16,185,129,0.25)'  },
    CIVIL: { bg: 'rgba(245,158,11,0.12)',  color: '#92400e', border: 'rgba(245,158,11,0.25)'  },
    IT:    { bg: 'rgba(139,92,246,0.12)',  color: '#5b21b6', border: 'rgba(139,92,246,0.25)'  },
    BT:    { bg: 'rgba(236,72,153,0.12)',  color: '#9d174d', border: 'rgba(236,72,153,0.25)'  },
    ALL:   { bg: 'rgba(108,71,255,0.1)',   color: '#6c47ff', border: 'rgba(108,71,255,0.2)'   },
  }
  return map[dept] || map['ALL']
}

// ── One PBL lab — extracted from PBL_LABS[0] in original ──────
export const PBL_LABS = [
  {
    id:       1,
    name:     'Software Development Lab',
    dept:     'CSE',
    slots:    12,
    capacity: 30,
    activities: [
      'Web App Development',
      'Algorithm Implementation',
      'Database Design',
      'API Integration',
      'Code Review Sessions',
    ],
  },
]
