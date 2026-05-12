import Header from "../../components/Header";
import { useStore } from "../../store/useStore";

const dashboardThemeVars = {
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
};

function StatCard({ label, value, dotColor, sub }) {
  return (
    <div
      className="rounded-[14px] border-[1.5px] p-4 transition-all duration-200 cursor-default"
      style={{ background: "var(--white)", borderColor: "var(--border)" }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--purple)";
        e.currentTarget.style.boxShadow  = "0 4px 16px var(--purple-dim)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--border)";
        e.currentTarget.style.boxShadow  = "none";
      }}
    >
      <div className="text-[11px] font-bold uppercase tracking-wide" style={{ color: "var(--text3)", letterSpacing: "0.5px" }}>
        {label}
      </div>
      <div className="text-[26px] font-extrabold my-1" style={{ color: "var(--text)", fontFamily: "var(--font-head)" }}>
        {value}
      </div>
      <div className="text-[11px]" style={{ color: "var(--text2)" }}>
        <span className="inline-block w-2 h-2 rounded-full mr-1.5" style={{ background: dotColor }} />
        {sub}
      </div>
    </div>
  );
}

function MiniChip({ children, variant }) {
  const styles = {
    green:  { background: "rgba(16,185,129,0.12)",  color: "#059669" },
    red:    { background: "rgba(239,68,68,0.12)",   color: "#dc2626" },
    purple: { background: "var(--purple-dim)",      color: "var(--purple)" },
    gray:   { background: "var(--bg)",              color: "var(--text2)", border: "1px solid var(--border)" },
  };
  return (
    <span
      className="text-[10px] font-bold px-2 py-0.5 rounded-md"
      style={styles[variant] || styles.gray}
    >
      {children}
    </span>
  );
}

function NavBox({ iconBg, icon, label, desc, badge, miniStats, onClick }) {
  return (
    <div
      className="flex items-center gap-3 p-4 rounded-[14px] border-[1.5px] cursor-pointer transition-all duration-200 relative"
      style={{ background: "var(--white)", borderColor: "var(--border)" }}
      onClick={onClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--purple)";
        e.currentTarget.style.boxShadow   = "0 4px 16px rgba(108,71,255,0.1)";
        e.currentTarget.style.transform   = "translateY(-1px)";
        e.currentTarget.querySelector(".box-arrow").style.color = "var(--purple)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--border)";
        e.currentTarget.style.boxShadow   = "none";
        e.currentTarget.style.transform   = "none";
        e.currentTarget.querySelector(".box-arrow").style.color = "var(--text3)";
      }}
    >
      {/* Icon */}
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: iconBg }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-[22px] h-[22px]">
          {icon}
        </svg>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="text-sm font-bold" style={{ color: "var(--text)" }}>
          {label}
        </div>
        <div className="text-[11px] mt-0.5" style={{ color: "var(--text2)" }}>
          {desc}
        </div>
        {miniStats && (
          <div className="flex gap-2 mt-2 flex-wrap">
            {miniStats.map((c, i) => (
              <MiniChip key={i} variant={c.variant}>{c.label}</MiniChip>
            ))}
          </div>
        )}
      </div>

      {/* Badge */}
      {badge && (
        <span className="text-[10px] font-extrabold text-white rounded-full px-2 py-0.5 min-w-[22px] text-center"
          style={{ background: "var(--red)" }}>
          {badge}
        </span>
      )}

      {/* Arrow */}
      <span className="box-arrow text-base flex-shrink-0 transition-colors duration-200" style={{ color: "var(--text3)" }}>
        ›
      </span>
    </div>
  );
}

export default function Dashboard() {
  const { navigate } = useStore();

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ ...dashboardThemeVars, background: "var(--bg)" }}
    >
      <Header />

      {/* HERO STATS */}
      <div className="px-4 sm:px-6 pt-4 sm:pt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard label="Total Students"    value="331" dotColor="var(--green)"  sub="All Departments"    />
        <StatCard label="Total Faculty"     value="18"  dotColor="var(--purple)" sub="Across all labs"    />
        <StatCard label="Active Slots Today"value="14"  dotColor="var(--gold)"   sub="PS + PBL combined"  />
        <StatCard label="Pending Approvals" value="23"  dotColor="var(--red)"    sub="Needs attention"    />
      </div>

      {/* SECTION HEADER */}
      <div className="px-4 sm:px-6 pt-5 sm:pt-6 pb-2">
        <div className="text-[20px] font-extrabold" style={{ color: "var(--text)", fontFamily: "var(--font-head)" }}>
          Admin Dashboard
        </div>
        <div className="text-[13px] mt-1" style={{ color: "var(--text2)" }}>
          Bannari Amman Institute of Technology · PCDP System
        </div>
      </div>

      {/* GROUPS */}
      <div className="px-4 sm:px-6 pb-8 flex flex-col gap-6 mt-2">

        {/* Venue & Faculty Allocation */}
        <div>
          <div className="text-[13px] font-extrabold uppercase tracking-wide mb-2.5" style={{ color: "var(--text2)", letterSpacing: "0.6px" }}>
            Venue &amp; Faculty Allocation
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <NavBox
              iconBg="#6366f1"
              icon={<><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></>}
              label="Venue Allocation"
              desc="Manage labs, rooms & slot assignments"
              miniStats={[
                { label: "12 Total",  variant: "purple" },
                { label: "8 Occupied",variant: "red"    },
                { label: "4 Free",    variant: "green"  },
              ]}
              onClick={() => navigate("venue-allocation")}
            />
            <NavBox
              iconBg="#f97316"
              icon={<><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>}
              label="Faculty Allocation"
              desc="Assign faculty to venues & transfer slots"
              miniStats={[
                { label: "18 Total",    variant: "purple" },
                { label: "14 Assigned", variant: "red"    },
                { label: "4 Unassigned",variant: "green"  },
              ]}
              onClick={() => navigate("faculty-allocation")}
            />
          </div>
        </div>

        {/* Students & Approvals */}
        <div>
          <div className="text-[13px] font-extrabold uppercase tracking-wide mb-2.5" style={{ color: "var(--text2)", letterSpacing: "0.6px" }}>
            Students &amp; Approvals
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <NavBox
              iconBg="#10b981"
              icon={<><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>}
              label="Student Management"
              desc="View all students, PS/PBL points, override scores"
              onClick={() => navigate("students")}
            />
            <NavBox
              iconBg="#f59e0b"
              icon={<><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></>}
              label={
                <span>
                  System Approvals{" "}
                  <span className="inline-block w-2 h-2 rounded-full bg-red-500 align-middle ml-1" />
                </span>
              }
              desc="Lab records, AP claims across all faculty"
              badge="23"
              onClick={() => navigate("approvals")}
            />
          </div>
        </div>

        {/* Slot Management */}
        <div>
          <div className="text-[13px] font-extrabold uppercase tracking-wide mb-2.5" style={{ color: "var(--text2)", letterSpacing: "0.6px" }}>
            Slot Management
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <NavBox
              iconBg="var(--purple)"
              icon={<><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></>}
              label="PS Slot Management"
              desc="Create, edit, delete Problem Solving slots"
              onClick={() => navigate("ps-slots")}
            />
            <NavBox
              iconBg="#14b8a6"
              icon={<><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></>}
              label="PBL Slot Management"
              desc="Create, edit, delete Project Based Learning slots"
              onClick={() => navigate("pbl-slots")}
            />
          </div>
        </div>

        {/* Reports & Settings */}
        <div>
          <div className="text-[13px] font-extrabold uppercase tracking-wide mb-2.5" style={{ color: "var(--text2)", letterSpacing: "0.6px" }}>
            Reports &amp; Settings
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <NavBox
              iconBg="#3b82f6"
              icon={<><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></>}
              label="Reports & Analytics"
              desc="Attendance, scores, completion rates by dept"
              onClick={() => navigate("reports")}
            />
            <NavBox
              iconBg="#ef4444"
              icon={<><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93l-1.41 1.41M4.93 4.93l1.41 1.41M20 12h-2M6 12H4M19.07 19.07l-1.41-1.41M4.93 19.07l1.41-1.41M12 18v2M12 4V2"/></>}
              label="Points Details"
              desc="Academic year, departments, point rules"
              onClick={() => navigate("settings")}
            />
          </div>
        </div>

        {/* Notifications */}
        <div>
          <div className="text-[13px] font-extrabold uppercase tracking-wide mb-2.5" style={{ color: "var(--text2)", letterSpacing: "0.6px" }}>
            Notifications
          </div>
          <div className="grid grid-cols-1 gap-2.5">
            <NavBox
              iconBg="#f59e0b"
              icon={<><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></>}
              label={
                <span>
                  Alerts &amp; Notifications{" "}
                  <span className="inline-block w-2 h-2 rounded-full bg-red-500 align-middle ml-1" />
                </span>
              }
              desc="Slots without incharge, stuck approvals, transfers"
              badge="7"
              onClick={() => navigate("notifications")}
            />
          </div>
        </div>

      </div>
    </div>
  );
}
