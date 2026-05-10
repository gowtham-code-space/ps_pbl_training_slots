// psCoursesData.js
// Extracted from PS_COURSES array in index_working.html
// One course only — CyberSecurity (id: 19)
// getCatStyle logic extracted from getCatStyle() in index_working.html

// ── Category style — extracted from getCatStyle() in original ──
export function getCatStyle(cat) {
  if (cat === 'Software')
    return { bg: 'rgba(74,144,232,0.14)', color: '#1a6abf', border: 'rgba(74,144,232,0.3)' }
  if (cat === 'Hardware')
    return { bg: 'rgba(232,144,74,0.14)', color: '#a85b10', border: 'rgba(232,144,74,0.3)' }
  if (cat === 'General Skill')
    return { bg: 'rgba(16,185,129,0.14)', color: '#0a6644', border: 'rgba(16,185,129,0.3)' }
  return { bg: 'rgba(108,71,255,0.1)', color: '#6c47ff', border: 'rgba(108,71,255,0.2)' }
}

// ── One PS course — extracted from PS_COURSES[18] in original ──
export const PS_COURSES = [
  {
    id:       19,
    name:     'CyberSecurity - Level 1',
    category: 'Software',
    levels:   1,
    topics: [
      'Networking Fundamentals',
      'Nmap Mastery',
      'Wireshark Analysis',
      'Network Enumeration',
    ],
  },
]
