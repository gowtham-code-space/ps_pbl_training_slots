import Header from "../../components/Header";
import { useStore } from "../../store/useStore";
import { notificationItems } from "../../data/index";

const adminThemeVars = {
  "--purple": "var(--color-primary)",
  "--purple-dim": "var(--color-secondary)",
  "--purple-glow": "var(--color-primary-light)",
  "--bg": "var(--color-bg)",
  "--border": "var(--color-secondary-dark)",
  "--white": "#fff",
  "--text": "rgb(15 23 42)",
  "--text2": "rgb(100 116 139)",
  "--text3": "rgb(148 163 184)",
  "--green": "rgb(16 185 129)",
  "--red": "rgb(239 68 68)",
  "--gold": "rgb(245 158 11)",
  "--blue": "rgb(59 130 246)",
};

// ── REPORTS ──────────────────────────────────────────────────────
export function Reports() {
  const depts = ["CSE", "ECE", "MECH", "BIO"];
  const pcts  = { CSE: 76, ECE: 62, MECH: 48, BIO: 55 };

  const stats = [
    { label: "Attendance Rate",         val: "87%", color: "var(--green)",  sub: "Across all slots today"  },
    { label: "Lab Records Submitted",   val: "78%", color: "var(--purple)", sub: "Out of total students"   },
    { label: "AP Claims Approved",      val: "62%", color: "var(--gold)",   sub: "This month"              },
    { label: "Slots with Incharge",     val: "92%", color: "var(--blue)",   sub: "Fully covered"           },
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ ...adminThemeVars, background: "var(--bg)" }}>
      <Header showBack backPage="dashboard" />
      <div className="flex-1 p-4 sm:p-6">
        <div className="text-[22px] font-extrabold mb-1" style={{ color: "var(--text)", fontFamily: "var(--font-head)" }}>
          Reports &amp; Analytics
        </div>
        <div className="text-[13px] mb-6" style={{ color: "var(--text2)" }}>
          System-wide performance, attendance and completion rates
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-[14px] border-[1.5px] p-5"
              style={{ background: "var(--white)", borderColor: "var(--border)" }}>
              <div className="text-[14px] font-extrabold uppercase tracking-wide mb-3"
                style={{ color: "var(--text2)", letterSpacing: "0.5px" }}>{s.label}</div>
              <div className="text-[36px] font-extrabold mb-1.5"
                style={{ color: s.color, fontFamily: "var(--font-head)" }}>{s.val}</div>
              <div className="text-xs" style={{ color: "var(--text2)" }}>{s.sub}</div>
            </div>
          ))}

          {/* Dept completion */}
          <div className="rounded-[14px] border-[1.5px] p-5 sm:col-span-2"
            style={{ background: "var(--white)", borderColor: "var(--border)" }}>
            <div className="text-[14px] font-extrabold uppercase tracking-wide mb-4"
              style={{ color: "var(--text2)", letterSpacing: "0.5px" }}>
              Department-wise Completion
            </div>
            {depts.map((d) => (
              <div key={d} className="flex items-center gap-3 mb-3">
                <div className="text-[13px] font-bold w-[50px]" style={{ color: "var(--text)" }}>{d}</div>
                <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
                  <div className="h-full rounded-full" style={{ width: `${pcts[d]}%`, background: "var(--purple)" }} />
                </div>
                <div className="text-xs font-extrabold w-9" style={{ color: "var(--purple)" }}>{pcts[d]}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── SETTINGS ─────────────────────────────────────────────────────
export function Settings() {
  const { showToast } = useStore();

  const rules = [
    ["Hackathon – 1st Place", 10],
    ["Paper Publication",     15],
    ["Sports – National",      8],
    ["Workshop Participation", 3],
    ["Seminar Presentation",   5],
  ];

  const inputStyle = {
    padding: "8px 12px", border: "1.5px solid var(--border)",
    borderRadius: "8px", background: "var(--white)", fontSize: "12px",
    fontWeight: 600, color: "var(--text)", outline: "none",
    fontFamily: "var(--font-body)", transition: "border-color 0.2s",
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ ...adminThemeVars, background: "var(--bg)" }}>
      <Header showBack backPage="dashboard" />
      <div className="flex-1 p-4 sm:p-6">
        <div className="text-[22px] font-extrabold mb-1" style={{ color: "var(--text)", fontFamily: "var(--font-head)" }}>
          Points Details
        </div>
        <div className="text-[13px] mb-6" style={{ color: "var(--text2)" }}>
          Configure academic year, departments and point rules
        </div>

        {/* Academic Year */}
        <div className="rounded-[14px] border-[1.5px] p-5 mb-5"
          style={{ background: "var(--white)", borderColor: "var(--border)" }}>
          <div className="text-[14px] font-extrabold uppercase tracking-wide mb-3.5"
            style={{ color: "var(--text2)", letterSpacing: "0.5px" }}>Academic Year</div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <input defaultValue="2025-2026" className="w-full sm:w-[160px]" style={inputStyle}
              onFocus={(e)  => (e.target.style.borderColor = "var(--purple)")}
              onBlur={(e)   => (e.target.style.borderColor = "var(--border)")} />
            <button
              onClick={() => showToast("Academic year updated")}
              className="px-3 py-2 rounded-lg border-[1.5px] text-[11px] font-bold transition-all duration-150"
              style={{ borderColor:"var(--green)",color:"var(--green)",background:"transparent",fontFamily:"var(--font-body)" }}
              onMouseEnter={(e) => { e.currentTarget.style.background="var(--green)"; e.currentTarget.style.color="#fff"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background="transparent"; e.currentTarget.style.color="var(--green)"; }}
            >Update</button>
          </div>
        </div>

        {/* Point Rules */}
        <div className="rounded-[14px] border-[1.5px] p-5 mb-5"
          style={{ background: "var(--white)", borderColor: "var(--border)" }}>
          <div className="text-[14px] font-extrabold uppercase tracking-wide mb-3.5"
            style={{ color: "var(--text2)", letterSpacing: "0.5px" }}>Point Rules</div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-[13px]">
              <thead>
                <tr>
                  {["Activity Type","Points","Action"].map((h) => (
                    <th key={h} className="text-left px-3 py-2.5 text-[11px] font-extrabold uppercase border-b"
                      style={{ color:"var(--text3)",letterSpacing:"0.5px",borderColor:"var(--border)" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rules.map(([activity, pts]) => (
                  <tr key={activity}
                    onMouseEnter={(e) => Array.from(e.currentTarget.cells).forEach(c => c.style.background = "var(--purple-dim)")}
                    onMouseLeave={(e) => Array.from(e.currentTarget.cells).forEach(c => c.style.background = "transparent")}
                  >
                    <td className="px-3 py-2.5 border-b" style={{ borderColor:"var(--border)",color:"var(--text)" }}>{activity}</td>
                    <td className="px-3 py-2.5 border-b" style={{ borderColor:"var(--border)" }}>
                      <input type="number" defaultValue={pts} style={{ ...inputStyle, width:"80px" }}
                        onFocus={(e)  => (e.target.style.borderColor = "var(--purple)")}
                        onBlur={(e)   => (e.target.style.borderColor = "var(--border)")} />
                    </td>
                    <td className="px-3 py-2.5 border-b" style={{ borderColor:"var(--border)" }}>
                      <button
                        onClick={() => showToast("Rule updated")}
                        className="px-3 py-1 rounded-lg border-[1.5px] text-[11px] font-bold transition-all duration-150"
                        style={{ borderColor:"var(--green)",color:"var(--green)",background:"transparent",fontFamily:"var(--font-body)" }}
                        onMouseEnter={(e) => { e.currentTarget.style.background="var(--green)"; e.currentTarget.style.color="#fff"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background="transparent"; e.currentTarget.style.color="var(--green)"; }}
                      >Save</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Departments */}
        <div className="rounded-[14px] border-[1.5px] p-5"
          style={{ background: "var(--white)", borderColor: "var(--border)" }}>
          <div className="text-[14px] font-extrabold uppercase tracking-wide mb-3.5"
            style={{ color: "var(--text2)", letterSpacing: "0.5px" }}>Departments</div>
          <div className="flex gap-2.5 flex-wrap mb-3">
            {["CSE","ECE","MECH","BIO","EEE"].map((d) => (
              <span key={d} className="px-4 py-1.5 rounded-full text-xs font-bold"
                style={{ background:"var(--purple-dim)",color:"var(--purple)" }}>{d}</span>
            ))}
          </div>
          <button
            onClick={() => showToast("Dept management coming soon")}
            className="px-3.5 py-2 rounded-lg border-[1.5px] text-[11px] font-bold transition-all duration-150"
            style={{ borderColor:"var(--green)",color:"var(--green)",background:"transparent",fontFamily:"var(--font-body)" }}
            onMouseEnter={(e) => { e.currentTarget.style.background="var(--green)"; e.currentTarget.style.color="#fff"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background="transparent"; e.currentTarget.style.color="var(--green)"; }}
          >+ Add Department</button>
        </div>
      </div>
    </div>
  );
}

// ── NOTIFICATIONS ────────────────────────────────────────────────
export function Notifications() {
  const { navigate } = useStore();

  return (
    <div className="min-h-screen flex flex-col" style={{ ...adminThemeVars, background: "var(--bg)" }}>
      <Header showBack backPage="dashboard" />
      <div className="flex-1 p-4 sm:p-6">
        <div className="text-[22px] font-extrabold mb-1" style={{ color: "var(--text)", fontFamily: "var(--font-head)" }}>
          Alerts &amp; Notifications
        </div>
        <div className="text-[13px] mb-6" style={{ color: "var(--text2)" }}>
          7 items need attention
        </div>

        <div className="flex flex-col gap-2.5">
          {notificationItems.map((n, i) => (
            <div key={i}
              className="flex items-start gap-3 p-4 rounded-xl border-[1.5px]"
              style={{ background:"var(--white)", borderColor:"var(--border)" }}
            >
              <div className="text-[22px] flex-shrink-0">{n.icon}</div>
              <div className="flex-1">
                <div className="text-sm font-bold" style={{ color:"var(--text)" }}>{n.msg}</div>
                <div className="text-[11px] mt-0.5" style={{ color:"var(--text3)" }}>{n.sub}</div>
              </div>
              <button
                onClick={() => navigate(n.action)}
                className="px-3 py-1 rounded-lg border-[1.5px] text-[11px] font-bold flex-shrink-0 transition-all duration-150"
                style={{ borderColor:"var(--purple)",color:"var(--purple)",background:"transparent",fontFamily:"var(--font-body)" }}
                onMouseEnter={(e) => { e.currentTarget.style.background="var(--purple)"; e.currentTarget.style.color="#fff"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background="transparent"; e.currentTarget.style.color="var(--purple)"; }}
              >Go</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
