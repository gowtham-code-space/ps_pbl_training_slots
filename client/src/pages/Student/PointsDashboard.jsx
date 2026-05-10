// PointsDashboard.jsx
// Extracted from renderPoints(), loadRP(), renderRPTable(),
// renderAP(), renderAPIndividual(), renderAPGroup(), genStudents(), genGroups()
// in index_working.html — 100% identical logic and design

import { useState, useEffect, useCallback } from 'react'
import Header from '../../components/Header'

const SELECT_ARROW_BG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E"

const selectArrowStyle = {
  backgroundImage: `url(\"${SELECT_ARROW_BG}\")`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 8px center',
  backgroundSize: '12px 12px',
}

// ── Constants extracted from original ─────────────────────────
const BASE_API = 'https://script.google.com/macros/s/AKfycbwUdK6oQZwo6SC-1eNUtQIyrNYp-RcKHSy-wBy-5RDonSuQaNDs_hdNfeXxpFnxsAx5/exec'

const DEPTS = ['AGRI','AIDS','AIML','BIOMEDICAL','BT','CIVIL','CSBS','CSD','CSE','CT','EEE','ECE','EIE','FT','ISE','IT','MECH','MTRS']

const DEPT_NAMES = {
  AGRI:'Agricultural Engg', AIDS:'AI & Data Science', AIML:'AI & ML',
  BIOMEDICAL:'Biomedical', BT:'Biotechnology', CIVIL:'Civil Engg',
  CSBS:'CS & Business Systems', CSD:'CS & Design', CSE:'Computer Science',
  CT:'Computer Technology', EEE:'Electrical & Electronics', ECE:'Electronics & Comm',
  EIE:'Electronics & Instr', FT:'Fashion Technology', ISE:'Info Science & Engg',
  IT:'Information Technology', MECH:'Mechanical Engg', MTRS:'Mechatronics',
}

const DEPT_CODES = {
  AGRI:'AGRI', AIDS:'AIDS', AIML:'AIML', BIOMEDICAL:'BM', BT:'BT',
  CIVIL:'CIVIL', CSBS:'CSBS', CSD:'CSD', CSE:'CSE', CT:'CT',
  EEE:'EEE', ECE:'ECE', EIE:'EIE', FT:'FT', ISE:'ISE',
  IT:'IT', MECH:'MECH', MTRS:'MTRS',
}

const FN = ['Aarav','Aditya','Akash','Anand','Arun','Arjun','Ashwin','Balaji','Bharath',
  'Deepak','Gokul','Gowtham','Harish','Karthik','Kumar','Lokesh','Madhan','Manoj',
  'Naveen','Nikhil','Pavan','Pradeep','Rahul','Raja','Ram','Ravi','Rohit','Sathish',
  'Senthil','Vignesh','Vijay','Vikram','Ananya','Aishwarya','Divya','Gayathri',
  'Harini','Janani','Kavitha','Keerthana','Lakshmi','Meenakshi','Nithya','Priya',
  'Ramya','Revathi','Sangeetha','Sneha','Swetha','Varsha']

const LN = ['A','B','C','D','G','J','K','L','M','N','P','R','S','T','V']

// ── sr, rn — extracted from original ──────────────────────────
function sr(s) { let x = Math.sin(s) * 10000; return x - Math.floor(x) }
function rn(s) {
  return FN[Math.floor(sr(s) * FN.length)] + ' ' + LN[Math.floor(sr(s + 1) * LN.length)]
}

// ── genStudents — extracted from genStudents() in original ────
function genStudents() {
  const st = []
  const per = Math.floor(1600 / 18)
  DEPTS.forEach((dept, di) => {
    const cnt = di < 1600 % 18 ? per + 1 : per
    const dc = DEPT_CODES[dept]
    for (let i = 0; i < cnt; i++) {
      const roll = `7376242${dc}${String(101 + i).padStart(3, '0')}`
      const seed = roll.split('').reduce((a, c) => a + c.charCodeAt(0), 0)
      st.push({ roll, name: rn(seed), dept, year: '2nd', points: Math.floor(sr(seed) * 1001) + 10000 })
    }
  })
  DEPTS.forEach((dept, di) => {
    const cnt = di < 1600 % 18 ? per + 1 : per
    const dc = DEPT_CODES[dept]
    for (let i = 0; i < cnt; i++) {
      const roll = `7376243${dc}${String(101 + i).padStart(3, '0')}`
      const seed = roll.split('').reduce((a, c) => a + c.charCodeAt(0), 0)
      st.push({ roll, name: rn(seed), dept, year: '1st', points: Math.floor(sr(seed) * 801) + 8000 })
    }
  })
  return st
}

// ── genGroups — extracted from genGroups() in original ────────
function genGroups(students) {
  const second = students.filter(s => s.year === '2nd')
  const first  = students.filter(s => s.year === '1st')
  const ROLES  = ['Captain','Vice Captain','Manager','Strategist','IPR Member','Member','Member','Member','Member','Member']
  let p2 = 0, p1 = 0
  const groups = []
  for (let g = 1; g <= 213; g++) {
    const grp = { id: `A#${100000 + g}`, members: [] }
    const used = new Set()
    for (let m = 0; m < 10; m++) {
      const pool = m < 7 ? second : first
      const ptr  = m < 7 ? p2 : p1
      if (pool[ptr % pool.length]) {
        grp.members.push({ ...pool[ptr % pool.length], role: ROLES[m] })
        used.add(ptr % pool.length)
        if (m < 7) p2++; else p1++
      }
    }
    grp.totalPts = grp.members.reduce((a, m) => a + m.points, 0)
    grp.avgPts   = Math.round(grp.totalPts / (grp.members.length || 1))
    groups.push(grp)
  }
  return groups
}

// ── Rank medal — same as original ────────────────────────────
function RankCell({ rank }) {
  if (rank === 0) return <span style={{ fontSize:18, color:'#f59e0b' }}>🥇</span>
  if (rank === 1) return <span style={{ fontSize:18, color:'#9ca3af' }}>🥈</span>
  if (rank === 2) return <span style={{ fontSize:18, color:'#b87a3c' }}>🥉</span>
  return <span className="inline-block text-[15px] font-black text-[var(--text3)]">#{rank + 1}</span>
}

// ── Spinner — same as original ────────────────────────────────
function Spinner({ text }) {
  return (
    <div className="text-center py-10 px-5">
      <div
        className="mx-auto mb-3 h-8 w-8 rounded-full border-[3px] border-[var(--border)] border-t-[var(--purple)]"
        style={{ animation: 'ptSpin 0.7s linear infinite' }}
      />
      <div className="text-[13px] font-semibold text-[var(--text2)]">{text}</div>
    </div>
  )
}

// ── RP Section ────────────────────────────────────────────────
function RewardPoints() {
  const [dept,   setDept]   = useState('BT')
  const [year,   setYear]   = useState('ALL')
  const [search, setSearch] = useState('')
  const [data,   setData]   = useState([])
  const [loading,setLoading]= useState(false)
  const [error,  setError]  = useState('')

  // loadRP — extracted from loadRP() in original
  const loadRP = useCallback(async (d) => {
    setLoading(true); setError(''); setData([])
    try {
      const res = await fetch(`${BASE_API}?dept=${encodeURIComponent(d)}`)
      const json = await res.json()
      setData(Array.isArray(json) ? json : [])
    } catch(e) {
      setError('Failed to load data. Check your connection.')
    }
    setLoading(false)
  }, [])

  useEffect(() => { loadRP(dept) }, [dept])

  // renderRPTable filter logic — extracted from renderRPTable() in original
  const yearCode = { 'ALL': null, '3rd': '23', '2nd': '24', '1st': '25' }
  const sorted   = [...data].sort((a, b) => b.balance - a.balance)
  const byYear   = yearCode[year] ? sorted.filter(s => s.roll?.substring(4,6) === yearCode[year]) : sorted
  const q        = search.trim().toUpperCase()
  const filtered = byYear.filter(s => !q || s.name?.toUpperCase().includes(q) || s.roll?.includes(q))

  return (
    <div>
      {/* Filters */}
      <div className="mb-3.5 flex flex-wrap gap-2.5">
        <select
          className="cursor-pointer appearance-none rounded-lg border-[1.5px] border-[var(--border)] bg-[var(--white)] px-3 py-2 pr-7 text-[13px] font-semibold text-[var(--text)] outline-none focus:border-[var(--purple)]"
          style={selectArrowStyle}
          value={dept}
          onChange={e => setDept(e.target.value)}
        >
          {DEPTS.map(d => <option key={d} value={d}>{DEPT_NAMES[d] || d}</option>)}
        </select>
        <select
          className="cursor-pointer appearance-none rounded-lg border-[1.5px] border-[var(--border)] bg-[var(--white)] px-3 py-2 pr-7 text-[13px] font-semibold text-[var(--text)] outline-none focus:border-[var(--purple)]"
          style={selectArrowStyle}
          value={year}
          onChange={e => setYear(e.target.value)}
        >
          <option value="ALL">All Years</option>
          <option value="3rd">3rd Year</option>
          <option value="2nd">2nd Year</option>
          <option value="1st">1st Year</option>
        </select>
        <input
          className="min-w-40 flex-1 rounded-lg border-[1.5px] border-[var(--border)] bg-[var(--white)] px-3.5 py-2 text-[13px] text-[var(--text)] outline-none placeholder:text-[var(--text3)] focus:border-[var(--purple)]"
          placeholder="Search name or roll..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <div className="mb-2 text-right text-[11px] text-[var(--text3)]">
        Showing {filtered.length} of {byYear.length} students
      </div>

      {loading && <Spinner text={`Loading ${DEPT_NAMES[dept] || dept} rankings...`} />}
      {error   && <div className="text-center py-10 px-5 text-[14px]" style={{ color:'var(--red)' }}>{error}</div>}

      {!loading && !error && (
        <div className="overflow-hidden rounded-[14px] border border-[var(--border)] bg-[var(--white)]">
          <div className="grid grid-cols-[56px_1fr_100px_90px] border-b border-[var(--border)] bg-[linear-gradient(90deg,var(--head-grad-from),var(--head-grad-to))] px-[18px] py-2.5 text-[10px] font-extrabold uppercase tracking-[1.5px] text-[var(--text3)]">
            <div>Rank</div>
            <div>Student</div>
            <div>Department</div>
            <div className="text-right">Points</div>
          </div>
          {filtered.length === 0
            ? <div className="text-center py-10 px-5 text-[14px] text-[var(--text3)]">No students found.</div>
            : filtered.map((s, i) => {
              const globalRank = byYear.indexOf(s)
              const yrCode = s.roll?.substring(4,6)
              const yrTxt  = yrCode==='23'?'3rd Year':yrCode==='24'?'2nd Year':'1st Year'
              return (
                <div
                  className="grid grid-cols-[56px_1fr_100px_90px] items-center border-b border-b-[var(--row-border)] px-[18px] py-3 transition-colors last:border-b-0 hover:bg-[var(--row-hover)]"
                  key={s.roll || i}
                  style={{
                    animation: 'ptRowIn 0.3s ease both',
                    animationDelay: `${Math.min(i,20)*0.03}s`,
                  }}
                >
                  <div><RankCell rank={globalRank} /></div>
                  <div>
                    <div className="text-[13px] font-bold text-[var(--text)]">{s.name}</div>
                    <div className="mt-0.5 text-[11px] text-[var(--text3)]">{s.roll} · {yrTxt}</div>
                  </div>
                  <div className="text-[12px] font-semibold text-[var(--text2)]">{s.dept || dept}</div>
                  <div className="text-right text-[16px] font-black text-[var(--purple)]">{(s.balance||0).toLocaleString()}</div>
                </div>
              )
            })
          }
        </div>
      )}
    </div>
  )
}

// ── AP Section ────────────────────────────────────────────────
function ActivityPoints({ students, groups }) {
  const [apTab,  setApTab]  = useState('individual')
  const [apYear, setApYear] = useState('ALL')
  const [apDept, setApDept] = useState('ALL')
  const [apSearch,setApSearch]=useState('')
  const [grpSearch,setGrpSearch]=useState('')

  // Individual filter — extracted from filterAP() in original
  const filtInd = students.filter(s => {
    const matchYear = apYear === 'ALL' || s.year === apYear
    const matchDept = apDept === 'ALL' || s.dept === apDept
    const q = apSearch.trim().toUpperCase()
    const matchQ = !q || s.name.toUpperCase().includes(q) || s.roll.includes(q)
    return matchYear && matchDept && matchQ
  }).sort((a,b) => b.points - a.points)

  // Group filter — extracted from filterAPGroup() in original
  const filtGrp = groups.filter(g => {
    const q = grpSearch.trim().toUpperCase()
    return !q || g.id.includes(q)
  }).sort((a,b) => b.avgPts - a.avgPts)

  return (
    <div>
      {/* Sub-tabs — same as pt-subtabs in original */}
      <div className="mb-3.5 flex gap-2">
        <button
          className={
            `cursor-pointer rounded-full border px-4 py-[7px] text-[12px] font-bold transition-colors ` +
            (apTab === 'individual'
              ? 'border-[var(--purple-glow)] bg-[var(--purple-dim)] text-[var(--purple)]'
              : 'border-[var(--border)] bg-transparent text-[var(--text2)]')
          }
          onClick={() => setApTab('individual')}>Individual Ranking</button>
        <button
          className={
            `cursor-pointer rounded-full border px-4 py-[7px] text-[12px] font-bold transition-colors ` +
            (apTab === 'group'
              ? 'border-[var(--purple-glow)] bg-[var(--purple-dim)] text-[var(--purple)]'
              : 'border-[var(--border)] bg-transparent text-[var(--text2)]')
          }
          onClick={() => setApTab('group')}>Group Average Ranking</button>
      </div>

      {/* Individual */}
      {apTab === 'individual' && (
        <div>
          <div className="mb-3.5 flex flex-wrap gap-2.5">
            <select
              className="cursor-pointer appearance-none rounded-lg border-[1.5px] border-[var(--border)] bg-[var(--white)] px-3 py-2 pr-7 text-[13px] font-semibold text-[var(--text)] outline-none focus:border-[var(--purple)]"
              style={selectArrowStyle}
              value={apYear}
              onChange={e=>setApYear(e.target.value)}
            >
              <option value="ALL">All Years</option>
              <option value="2nd">2nd Year</option>
              <option value="1st">1st Year</option>
            </select>
            <select
              className="cursor-pointer appearance-none rounded-lg border-[1.5px] border-[var(--border)] bg-[var(--white)] px-3 py-2 pr-7 text-[13px] font-semibold text-[var(--text)] outline-none focus:border-[var(--purple)]"
              style={selectArrowStyle}
              value={apDept}
              onChange={e=>setApDept(e.target.value)}
            >
              <option value="ALL">All Depts</option>
              {DEPTS.map(d=><option key={d} value={d}>{d}</option>)}
            </select>
            <input
              className="min-w-40 flex-1 rounded-lg border-[1.5px] border-[var(--border)] bg-[var(--white)] px-3.5 py-2 text-[13px] text-[var(--text)] outline-none placeholder:text-[var(--text3)] focus:border-[var(--purple)]"
              placeholder="Search name or roll..."
              value={apSearch}
              onChange={e=>setApSearch(e.target.value)}
            />
          </div>
          <div className="mb-3.5 flex items-center gap-2.5 rounded-[10px] border border-[rgba(108,71,255,0.2)] border-l-[3px] border-l-[var(--purple)] bg-[linear-gradient(135deg,rgba(108,71,255,0.08),rgba(108,71,255,0.03))] px-4 py-3 text-[13px] font-medium text-[var(--motivator-text)]">
            <span>🏆</span>
            <span>
              Showing <strong className="font-extrabold">{filtInd.length}</strong> students sorted by activity points
            </span>
          </div>
          <div className="overflow-hidden rounded-[14px] border border-[var(--border)] bg-[var(--white)]">
            <div className="grid grid-cols-[56px_1fr_100px_90px] border-b border-[var(--border)] bg-[linear-gradient(90deg,var(--head-grad-from),var(--head-grad-to))] px-[18px] py-2.5 text-[10px] font-extrabold uppercase tracking-[1.5px] text-[var(--text3)]">
              <div>Rank</div><div>Student</div><div>Department</div>
              <div className="text-right">Pts</div>
            </div>
            {filtInd.length === 0
              ? <div className="text-center py-10 px-5 text-[14px] text-[var(--text3)]">No students found.</div>
              : filtInd.slice(0,50).map((s,i) => (
                <div
                  className="grid grid-cols-[56px_1fr_100px_90px] items-center border-b border-b-[var(--row-border)] px-[18px] py-3 transition-colors last:border-b-0 hover:bg-[var(--row-hover)]"
                  key={s.roll}
                  style={{
                    animation: 'ptRowIn 0.3s ease both',
                    animationDelay: `${Math.min(i,20)*0.03}s`,
                  }}
                >
                  <div><RankCell rank={i} /></div>
                  <div>
                    <div className="text-[13px] font-bold text-[var(--text)]">{s.name}</div>
                    <div className="mt-0.5 text-[11px] text-[var(--text3)]">{s.roll} · {s.year} Year</div>
                  </div>
                  <div className="text-[12px] font-semibold text-[var(--text2)]">{s.dept}</div>
                  <div className="text-right text-[16px] font-black text-[var(--purple)]">{s.points.toLocaleString()}</div>
                </div>
              ))
            }
          </div>
        </div>
      )}

      {/* Group */}
      {apTab === 'group' && (
        <div>
          <div className="mb-3.5 flex flex-wrap gap-2.5">
            <input
              className="min-w-40 flex-1 rounded-lg border-[1.5px] border-[var(--border)] bg-[var(--white)] px-3.5 py-2 text-[13px] text-[var(--text)] outline-none placeholder:text-[var(--text3)] focus:border-[var(--purple)]"
              placeholder="Search group ID..."
              value={grpSearch}
              onChange={e=>setGrpSearch(e.target.value)}
            />
          </div>
          <div className="mb-3.5 flex items-center gap-2.5 rounded-[10px] border border-[rgba(108,71,255,0.2)] border-l-[3px] border-l-[var(--purple)] bg-[linear-gradient(135deg,rgba(108,71,255,0.08),rgba(108,71,255,0.03))] px-4 py-3 text-[13px] font-medium text-[var(--motivator-text)]">
            <span>👥</span>
            <span>
              Showing <strong className="font-extrabold">{filtGrp.length}</strong> groups ranked by average points
            </span>
          </div>
          {filtGrp.slice(0,50).map((g,i) => (
            <div
              className="mb-2 flex items-center gap-3.5 rounded-xl border border-[var(--border)] bg-[var(--white)] px-4 py-3.5 transition-transform transition-colors hover:translate-x-[3px] hover:border-[var(--purple)]"
              key={g.id}
              style={{
                animation: 'ptRowIn 0.3s ease both',
                animationDelay: `${Math.min(i,20)*0.03}s`,
              }}
            >
              <div className="min-w-10 text-[18px] font-black text-[var(--text3)]"><RankCell rank={i} /></div>
              <div style={{ flex:1 }}>
                <div className="text-[14px] font-extrabold text-[var(--text)]">{g.id}</div>
                <div className="mt-0.5 text-[11px] text-[var(--text3)]">{g.members.length} members</div>
                <div className="mt-2 h-1 w-full overflow-hidden rounded-[2px] bg-[var(--grp-bar-bg)]">
                  <div
                    className="h-full rounded-[2px] bg-[linear-gradient(90deg,var(--purple),var(--purple-to))]"
                    style={{ width:`${Math.min((g.avgPts/12000)*100,100)}%` }} />
                </div>
              </div>
              <div>
                <div className="min-w-[72px] text-right text-[16px] font-black text-[var(--purple)]">{g.totalPts.toLocaleString()}</div>
                <div className="text-[10px] text-[var(--text3)]">Avg {g.avgPts.toLocaleString()}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Main PointsDashboard ──────────────────────────────────────
export default function PointsDashboard() {
  const [tab,      setTab]      = useState('rp')
  const [students, setStudents] = useState([])
  const [groups,   setGroups]   = useState([])

  // Generate students + groups once on mount
  useEffect(() => {
    const sts = genStudents()
    setStudents(sts)
    setGroups(genGroups(sts))
  }, [])

  const ptVars = {
    '--purple': '#6c47ff',
    '--purple-dim': 'rgba(108, 71, 255, 0.1)',
    '--purple-glow': 'rgba(108, 71, 255, 0.3)',
    '--bg': '#f0f2f8',
    '--white': '#fff',
    '--border': '#e5e4eb',
    '--text': '#1a1a2e',
    '--text2': '#6b7280',
    '--text3': '#9ca3af',
    '--green': '#10b981',
    '--red': '#ef4444',
    '--head-grad-from': '#f8f7ff',
    '--head-grad-to': '#f0eeff',
    '--row-border': '#f3f4f6',
    '--row-hover': '#f8f7ff',
    '--grp-bar-bg': '#f0f2f8',
    '--purple-to': '#9b7aff',
    '--motivator-text': '#5b4fdb',
    background: 'var(--bg)',
    color: 'var(--text)',
  }

  return (
    <div className="min-h-screen" style={ptVars}>
      <Header />
      <style>{`
        @keyframes ptRowIn {
          from { opacity: 0; transform: translateX(-8px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes ptSpin { to { transform: rotate(360deg); } }
      `}</style>

      <div className="px-6 pt-4 pb-8">
        {/* Tabs — extracted from switchPoints() in original */}
        <div className="mb-4 flex gap-1.5 rounded-xl border border-[var(--border)] bg-[var(--white)] p-[5px]">
          <button
            className={
              `flex-1 cursor-pointer rounded-lg px-3.5 py-2.5 text-[13px] font-bold transition-all ` +
              (tab === 'rp'
                ? 'bg-[var(--purple)] text-white shadow-[0_2px_8px_var(--purple-glow)]'
                : 'bg-transparent text-[var(--text2)]')
            }
            onClick={() => setTab('rp')}
          >
            Reward Points
          </button>
          <button
            className={
              `flex-1 cursor-pointer rounded-lg px-3.5 py-2.5 text-[13px] font-bold transition-all ` +
              (tab === 'ap'
                ? 'bg-[var(--purple)] text-white shadow-[0_2px_8px_var(--purple-glow)]'
                : 'bg-transparent text-[var(--text2)]')
            }
            onClick={() => setTab('ap')}
          >
            Activity Points
          </button>
        </div>

        {tab === 'rp' && <RewardPoints />}
        {tab === 'ap' && <ActivityPoints students={students} groups={groups} />}
      </div>
    </div>
  )
}

// /* ============================================================
//    Global Styles — extracted from index_working.html
//    100% identical to original
//    ============================================================ */

// @import './variables.css';

// *, *::before, *::after {
//   box-sizing: border-box;
//   margin: 0;
//   padding: 0;
// }

// html, body {
//   min-height: 100vh;
//   font-family: var(--font-body);
//   background: var(--bg);
//   color: var(--text);
//   -webkit-font-smoothing: antialiased;
// }

// /* ── HEADER ──────────────────────────────────────────────── */
// .pt-header {
//   background: var(--white);
//   border-bottom: 1px solid var(--border);
//   padding: 16px 24px;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   gap: 12px;
//   position: sticky;
//   top: 0;
//   z-index: 100;
//   box-shadow: 0 1px 8px rgba(0,0,0,0.05);
// }
// .pt-header-icon {
//   width: 36px; height: 36px;
//   border-radius: 10px;
//   background: var(--purple-dim);
//   display: flex; align-items: center; justify-content: center;
//   font-size: 18px;
// }
// .pt-header-title {
//   font-size: 18px; font-weight: 800;
//   color: var(--text);
//   font-family: var(--font-head);
// }
// .pt-header-sub {
//   font-size: 12px;
//   color: var(--text3);
//   margin-top: 1px;
// }

// /* ── DARK TOGGLE ─────────────────────────────────────────── */
// .pt-dark-toggle {
//   background: none;
//   border: 1.5px solid var(--border);
//   border-radius: 20px;
//   padding: 5px 11px;
//   cursor: pointer;
//   font-size: 13px;
//   color: var(--text2);
//   display: flex; align-items: center; gap: 5px;
//   transition: all 0.2s;
//   font-family: var(--font-body);
//   font-weight: 600;
//   white-space: nowrap;
// }
// .pt-dark-toggle:hover {
//   border-color: var(--purple);
//   color: var(--purple);
// }
// body.dark-mode .pt-dark-toggle {
//   background: #1f1f3a;
//   border-color: #2d2d4e;
//   color: #a89ec9;
// }
// body.dark-mode .pt-dark-toggle:hover {
//   border-color: var(--purple);
//   color: var(--purple);
// }

// /* ── BOXES (front page two boxes) ───────────────────────── */
// .pt-boxes-col {
//   display: flex; flex-direction: column;
//   gap: 12px;
//   padding: 20px 24px 0;
// }
// .pt-box {
//   background: var(--white);
//   border: 1.5px solid var(--border);
//   border-radius: 14px;
//   padding: 18px 20px;
//   cursor: pointer;
//   transition: all 0.22s;
//   display: flex; align-items: center; gap: 14px;
//   position: relative;
// }
// .pt-box:hover {
//   border-color: var(--purple);
//   box-shadow: 0 4px 16px rgba(108,71,255,0.1);
// }
// .pt-box.active {
//   border-color: var(--purple);
//   background: rgba(108,71,255,0.04);
// }
// .pt-box-icon-wrap {
//   width: 44px; height: 44px;
//   border-radius: 12px;
//   background: var(--purple-dim);
//   display: flex; align-items: center; justify-content: center;
//   flex-shrink: 0;
// }
// .pt-box-icon-wrap svg {
//   width: 22px; height: 22px;
//   color: var(--purple);
// }
// .pt-box-info { flex: 1; }
// .pt-box-label {
//   font-size: 15px; font-weight: 700;
//   color: var(--text);
// }
// .pt-box-desc {
//   font-size: 12px;
//   color: var(--text2);
//   margin-top: 2px;
// }
// .pt-box-arrow {
//   color: var(--text3);
//   font-size: 16px;
//   transition: color 0.2s;
// }
// .pt-box.active .pt-box-arrow { color: var(--purple); }

// /* ── CONTENT ─────────────────────────────────────────────── */
// .pt-content { padding: 16px 24px 32px; }

// /* ── TABS ────────────────────────────────────────────────── */
// .pt-tabs {
//   display: flex; gap: 6px;
//   margin-bottom: 16px;
//   background: var(--white);
//   border-radius: 12px;
//   padding: 5px;
//   border: 1px solid var(--border);
// }
// .pt-tab {
//   flex: 1;
//   padding: 10px 14px;
//   border-radius: 8px;
//   border: none;
//   background: transparent;
//   font-size: 13px; font-weight: 700;
//   color: var(--text2);
//   cursor: pointer;
//   transition: all 0.2s;
//   font-family: var(--font-body);
// }
// .pt-tab.active {
//   background: var(--purple);
//   color: #fff;
//   box-shadow: 0 2px 8px var(--purple-glow);
// }

// /* ── SUBTABS ─────────────────────────────────────────────── */
// .pt-subtabs { display: flex; gap: 8px; margin-bottom: 14px; }
// .pt-subtab {
//   padding: 7px 16px;
//   border-radius: 20px;
//   border: 1px solid var(--border);
//   background: transparent;
//   font-size: 12px; font-weight: 700;
//   color: var(--text2);
//   cursor: pointer;
//   transition: all 0.2s;
//   font-family: var(--font-body);
// }
// .pt-subtab.active {
//   background: var(--purple-dim);
//   border-color: var(--purple-glow);
//   color: var(--purple);
// }

// /* ── FILTERS ─────────────────────────────────────────────── */
// .pt-filters { display: flex; gap: 10px; margin-bottom: 14px; flex-wrap: wrap; }
// .pt-select {
//   padding: 8px 28px 8px 12px;
//   border: 1.5px solid var(--border);
//   border-radius: 8px;
//   background: var(--white);
//   font-size: 13px; font-weight: 600;
//   color: var(--text);
//   outline: none; cursor: pointer;
//   appearance: none;
//   background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
//   background-repeat: no-repeat;
//   background-position: right 8px center;
//   font-family: var(--font-body);
// }
// .pt-select:focus { border-color: var(--purple); }
// .pt-search {
//   flex: 1; min-width: 160px;
//   padding: 8px 14px;
//   border: 1.5px solid var(--border);
//   border-radius: 8px;
//   background: var(--white);
//   font-size: 13px; color: var(--text);
//   outline: none;
//   font-family: var(--font-body);
// }
// .pt-search:focus { border-color: var(--purple); }
// .pt-search::placeholder { color: var(--text3); }

// /* ── MOTIVATOR BANNER ────────────────────────────────────── */
// .pt-motivator {
//   background: linear-gradient(135deg, rgba(108,71,255,0.08), rgba(108,71,255,0.03));
//   border: 1px solid rgba(108,71,255,0.2);
//   border-left: 3px solid var(--purple);
//   border-radius: 10px;
//   padding: 12px 16px;
//   margin-bottom: 14px;
//   font-size: 13px; color: #5b4fdb;
//   font-weight: 500;
//   display: flex; align-items: center; gap: 10px;
// }
// .pt-motivator strong { font-weight: 800; }
// .pt-count { font-size: 11px; color: var(--text3); text-align: right; margin-bottom: 8px; }

// /* ── LEADERBOARD TABLE ───────────────────────────────────── */
// .pt-table-card {
//   background: var(--white);
//   border-radius: 14px;
//   border: 1px solid var(--border);
//   overflow: hidden;
// }
// .pt-table-head {
//   display: grid;
//   grid-template-columns: 56px 1fr 100px 90px;
//   padding: 10px 18px;
//   background: linear-gradient(90deg, #f8f7ff, #f0eeff);
//   font-size: 10px; font-weight: 800;
//   color: var(--text3);
//   letter-spacing: 1.5px; text-transform: uppercase;
//   border-bottom: 1px solid var(--border);
// }
// .pt-table-head-with-btn {
//   display: grid;
//   grid-template-columns: 56px 1fr 90px 100px 90px;
//   padding: 10px 18px;
//   background: linear-gradient(90deg, #f8f7ff, #f0eeff);
//   font-size: 10px; font-weight: 800;
//   color: var(--text3);
//   letter-spacing: 1.5px; text-transform: uppercase;
//   border-bottom: 1px solid var(--border);
// }
// .pt-table-head-pts { text-align: right; }
// .pt-table-row {
//   display: grid;
//   grid-template-columns: 56px 1fr 100px 90px;
//   align-items: center;
//   padding: 12px 18px;
//   border-bottom: 1px solid #f3f4f6;
//   transition: background 0.15s;
//   animation: rowIn 0.3s ease both;
// }
// .pt-table-row-with-btn {
//   display: grid;
//   grid-template-columns: 56px 1fr 90px 100px 90px;
//   align-items: center;
//   padding: 12px 18px;
//   border-bottom: 1px solid #f3f4f6;
//   transition: background 0.15s;
//   animation: rowIn 0.3s ease both;
// }
// .pt-table-row:last-child,
// .pt-table-row-with-btn:last-child { border-bottom: none; }
// .pt-table-row:hover,
// .pt-table-row-with-btn:hover { background: #f8f7ff; }
// .pt-rank { font-size: 15px; font-weight: 900; color: var(--text3); }
// .pt-name { font-size: 13px; font-weight: 700; color: var(--text); }
// .pt-roll { font-size: 11px; color: var(--text3); margin-top: 2px; }
// .pt-dept { font-size: 12px; color: var(--text2); font-weight: 600; }
// .pt-pts { font-size: 16px; font-weight: 900; color: var(--purple); text-align: right; }

// /* ── DETAILS BUTTON ──────────────────────────────────────── */
// .details-btn {
//   display: inline-flex; align-items: center; gap: 3px;
//   padding: 3px 9px; border-radius: 20px;
//   border: 1px solid rgba(108,71,255,0.25);
//   background: rgba(108,71,255,0.07);
//   color: var(--purple);
//   font-family: var(--font-body);
//   font-size: 10px; font-weight: 700;
//   cursor: pointer; transition: all 0.2s;
//   white-space: nowrap; letter-spacing: 0.5px;
// }
// .details-btn:hover {
//   background: rgba(108,71,255,0.16);
//   border-color: var(--purple);
// }

// @keyframes rowIn {
//   from { opacity: 0; transform: translateX(-8px); }
//   to   { opacity: 1; transform: translateX(0); }
// }

// /* ── GROUP CARDS ─────────────────────────────────────────── */
// .pt-grp-card {
//   display: flex; align-items: center; gap: 14px;
//   padding: 14px 16px;
//   background: var(--white);
//   border: 1px solid var(--border);
//   border-radius: 12px;
//   margin-bottom: 8px;
//   transition: all 0.2s;
//   animation: rowIn 0.3s ease both;
// }
// .pt-grp-card:hover { border-color: var(--purple); transform: translateX(3px); }
// .pt-grp-rank { font-size: 18px; font-weight: 900; color: var(--text3); min-width: 40px; }
// .pt-grp-id   { font-size: 14px; font-weight: 800; color: var(--text); }
// .pt-grp-cap  { font-size: 11px; color: var(--text3); margin-top: 2px; }
// .pt-grp-bar  { flex: 1; height: 4px; background: #f0f2f8; border-radius: 2px; overflow: hidden; }
// .pt-grp-bar-fill {
//   height: 100%;
//   background: linear-gradient(90deg, var(--purple), #9b7aff);
//   border-radius: 2px;
// }
// .pt-grp-pts { font-size: 16px; font-weight: 900; color: var(--purple); text-align: right; min-width: 72px; }
// .pt-grp-avg { font-size: 10px; color: var(--text3); }

// /* ── COURSE CARDS ────────────────────────────────────────── */
// .pt-course-grid {
//   display: grid;
//   grid-template-columns: repeat(4, 1fr);
//   gap: 14px;
// }
// .pt-ccard {
//   background: var(--white);
//   border: 1px solid var(--border);
//   border-radius: 16px;
//   overflow: hidden;
//   cursor: pointer;
//   transition: transform 0.25s cubic-bezier(0.22,1,0.36,1), box-shadow 0.25s, border-color 0.2s;
// }
// .pt-ccard:hover {
//   transform: translateY(-5px);
//   box-shadow: 0 16px 40px rgba(108,71,255,0.12);
//   border-color: rgba(108,71,255,0.3);
// }
// .pt-ccard-img {
//   position: relative; height: 160px;
//   background: linear-gradient(135deg, #e0dbff, #c5bfef);
//   overflow: hidden;
// }
// .pt-ccard-img img {
//   width: 100%; height: 100%;
//   object-fit: cover;
//   transition: transform 0.4s ease;
// }
// .pt-ccard:hover .pt-ccard-img img { transform: scale(1.04); }
// .pt-ccard-overlay {
//   position: absolute; inset: 0;
//   background: linear-gradient(to top, rgba(26,26,46,0.4), transparent);
// }
// .pt-ccard-badge {
//   position: absolute; top: 10px; left: 10px;
//   padding: 4px 10px; border-radius: 20px;
//   font-size: 10px; font-weight: 700;
//   backdrop-filter: blur(8px);
// }
// .pt-ccard-slots-badge {
//   position: absolute; top: 10px; right: 10px;
//   padding: 4px 10px; border-radius: 20px;
//   background: rgba(16,185,129,0.18);
//   border: 1px solid rgba(16,185,129,0.4);
//   color: #10b981;
//   font-size: 10px; font-weight: 700;
// }
// .pt-ccard-body { padding: 12px 14px 14px; }
// .pt-ccard-name { font-size: 13px; font-weight: 700; color: var(--text); line-height: 1.4; margin-bottom: 8px; }
// .pt-ccard-footer {
//   display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;
// }
// .pt-ccard-meta  { font-size: 11px; color: var(--text3); font-weight: 600; }
// .pt-ccard-status { font-size: 12px; font-weight: 700; color: var(--green); }
// .pt-ccard-status.warn { color: var(--red); }
// .pt-ccard-cta {
//   display: flex; align-items: center; justify-content: space-between;
//   background: var(--purple-dim);
//   border: 1px solid rgba(108,71,255,0.2);
//   border-radius: 8px;
//   padding: 8px 12px;
//   color: var(--purple);
//   font-size: 12px; font-weight: 700;
//   transition: all 0.2s;
// }
// .pt-ccard:hover .pt-ccard-cta {
//   background: rgba(108,71,255,0.15);
//   border-color: rgba(108,71,255,0.4);
// }

// /* ── DETAIL LAYOUT ───────────────────────────────────────── */
// .pt-detail-layout {
//   display: grid;
//   grid-template-columns: 1fr 300px;
//   gap: 18px;
// }
// .pt-detail-main {
//   background: var(--white);
//   border: 1px solid var(--border);
//   border-radius: 16px;
//   padding: 24px;
//   display: flex; flex-direction: column; gap: 18px;
// }
// .pt-section-back {
//   display: flex; align-items: center; gap: 8px;
//   background: var(--white);
//   border: 1.5px solid var(--border);
//   color: var(--text2);
//   padding: 9px 16px; border-radius: 10px;
//   font-size: 13px; font-weight: 700;
//   cursor: pointer; transition: all 0.2s;
//   width: fit-content; margin-bottom: 16px;
// }
// .pt-section-back:hover {
//   background: var(--purple-dim);
//   border-color: rgba(108,71,255,0.3);
//   color: var(--purple);
// }
// .pt-detail-back {
//   display: flex; align-items: center; gap: 8px;
//   background: rgba(0,0,0,0.04);
//   border: 1px solid var(--border);
//   color: var(--text2);
//   padding: 8px 16px; border-radius: 8px;
//   font-size: 13px; font-weight: 700;
//   cursor: pointer; transition: all 0.2s;
//   width: fit-content; margin-bottom: 4px;
// }
// .pt-detail-back:hover {
//   background: var(--purple-dim);
//   border-color: rgba(108,71,255,0.25);
//   color: var(--purple);
// }
// .pt-detail-section-label {
//   font-size: 17px; font-weight: 800; color: var(--text);
//   margin-bottom: 4px; font-family: var(--font-head);
// }
// .pt-detail-sublabel { font-size: 12px; color: var(--text3); }
// .pt-topics-list { display: flex; flex-direction: column; gap: 8px; }
// .pt-topic-item {
//   display: flex; align-items: flex-start; gap: 12px;
//   padding: 10px 14px;
//   background: #f8f7ff;
//   border: 1px solid rgba(108,71,255,0.08);
//   border-radius: 8px;
// }
// .pt-topic-num  { font-size: 12px; font-weight: 800; color: var(--text3); min-width: 22px; }
// .pt-topic-text { font-size: 13px; color: var(--text); line-height: 1.5; }
// .pt-detail-actions { display: flex; gap: 12px; margin-top: 4px; }
// .pt-open-link-btn {
//   flex: 1; padding: 13px; border-radius: 10px;
//   border: 1.5px solid rgba(108,71,255,0.3);
//   background: var(--purple-dim);
//   color: var(--purple);
//   font-family: var(--font-body); font-size: 13px; font-weight: 700;
//   cursor: pointer; transition: all 0.2s;
// }
// .pt-complete-btn {
//   flex: 1; padding: 13px; border-radius: 10px;
//   border: 1.5px solid rgba(16,185,129,0.3);
//   background: rgba(16,185,129,0.1);
//   color: var(--green);
//   font-family: var(--font-body); font-size: 13px; font-weight: 700;
//   cursor: pointer; transition: all 0.2s;
// }

// /* ── SIDE CARD ───────────────────────────────────────────── */
// .pt-detail-side { display: flex; flex-direction: column; gap: 14px; }
// .pt-side-card {
//   background: var(--white);
//   border: 1px solid var(--border);
//   border-radius: 16px;
//   padding: 20px;
// }
// .pt-side-card-title {
//   font-size: 11px; font-weight: 700; color: var(--text3);
//   letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 4px;
// }
// .pt-side-course-name {
//   font-size: 14px; font-weight: 800; color: var(--text);
//   margin-bottom: 16px; line-height: 1.4;
// }
// .pt-book-slot-btn {
//   width: 100%; padding: 13px;
//   background: var(--purple-dim);
//   border: 1.5px solid rgba(108,71,255,0.25);
//   border-radius: 8px;
//   color: var(--purple);
//   font-family: var(--font-head); font-size: 14px; font-weight: 800;
//   cursor: pointer; transition: all 0.2s;
// }
// .pt-book-slot-btn:hover {
//   background: rgba(108,71,255,0.18);
//   border-color: var(--purple);
// }
// .pt-materials-card {
//   background: var(--white);
//   border: 1px solid var(--border);
//   border-radius: 16px;
//   padding: 20px;
// }
// .pt-materials-title { font-size: 14px; font-weight: 800; color: var(--text); margin-bottom: 14px; }
// .pt-material-item { border: 1px solid var(--border); border-radius: 8px; overflow: hidden; }
// .pt-material-header {
//   display: flex; align-items: center; justify-content: space-between;
//   padding: 11px 14px; background: #f8f7ff;
//   font-size: 13px; font-weight: 700; color: var(--text);
// }
// .pt-material-count { font-size: 11px; color: var(--text3); }

// /* ── EMPTY / SPINNER ─────────────────────────────────────── */
// .pt-empty { text-align: center; padding: 40px 20px; color: var(--text3); font-size: 14px; }
// .pt-spinner-wrap { text-align: center; padding: 40px 20px; }
// .pt-spinner {
//   width: 32px; height: 32px;
//   border: 3px solid var(--border);
//   border-top-color: var(--purple);
//   border-radius: 50%;
//   animation: spin 0.7s linear infinite;
//   margin: 0 auto 12px;
// }
// .pt-spinner-text { font-size: 13px; color: var(--text2); font-weight: 600; }
// @keyframes spin { to { transform: rotate(360deg); } }

// /* ── DARK MODE OVERRIDES ─────────────────────────────────── */
// body.dark-mode .pt-header       { background: #151525; border-bottom: 1px solid #2d2d4e; }
// body.dark-mode .pt-box          { background: #1a1a2e; border-color: #2d2d4e; }
// body.dark-mode .pt-table-card   { background: #1a1a2e; }
// body.dark-mode .pt-table-head   { background: linear-gradient(90deg, #1f1f3a, #1a1a2e); }
// body.dark-mode .pt-table-row:hover,
// body.dark-mode .pt-table-row-with-btn:hover { background: #1f1f3a; }
// body.dark-mode .pt-table-row,
// body.dark-mode .pt-table-row-with-btn { border-bottom-color: #2d2d4e; }
// body.dark-mode .pt-tabs         { background: #1a1a2e; border-color: #2d2d4e; }
// body.dark-mode .pt-select,
// body.dark-mode .pt-search       { background: #1a1a2e; border-color: #2d2d4e; color: var(--text); }
// body.dark-mode .pt-ccard        { background: #1a1a2e; border-color: #2d2d4e; }
// body.dark-mode .pt-ccard-name   { color: var(--text); }
// body.dark-mode .pt-grp-card     { background: #1a1a2e; border-color: #2d2d4e; }
// body.dark-mode .pt-detail-main  { background: #1a1a2e; border-color: #2d2d4e; }
// body.dark-mode .pt-side-card    { background: #1a1a2e; border-color: #2d2d4e; }
// body.dark-mode .pt-materials-card { background: #1a1a2e; border-color: #2d2d4e; }
// body.dark-mode .pt-topic-item   { background: #1f1f3a; border-color: #2d2d4e; }
// body.dark-mode .pt-material-header { background: #1f1f3a; }
// body.dark-mode .pt-section-back { background: #1a1a2e; border-color: #2d2d4e; }
// body.dark-mode .pt-subtab       { border-color: #2d2d4e; }
// body.dark-mode tr:nth-child(even) td { background: rgba(255,255,255,0.02); }


// /* ============================================================
//    CSS Variables — extracted from index_working.html :root
//    100% identical to original
//    ============================================================ */

// :root {
//   --purple:      #6c47ff;
//   --purple-dim:  rgba(108, 71, 255, 0.1);
//   --purple-glow: rgba(108, 71, 255, 0.3);
//   --bg:          #f0f2f8;
//   --white:       #fff;
//   --border:      #e5e4eb;
//   --text:        #1a1a2e;
//   --text2:       #6b7280;
//   --text3:       #9ca3af;
//   --green:       #10b981;
//   --red:         #ef4444;
//   --gold:        #f59e0b;
//   --silver:      #9ca3af;
//   --bronze:      #b87a3c;
//   --font-head:   'Outfit', sans-serif;
//   --font-body:   'Plus Jakarta Sans', sans-serif;
// }

// /* Dark mode variable overrides — extracted from body.dark-mode in original */
// body.dark-mode {
//   --bg:     #0f0f1a;
//   --white:  #1a1a2e;
//   --border: #2d2d4e;
//   --text:   #e8e6f0;
//   --text2:  #a89ec9;
//   --text3:  #6b6b8a;
// }
