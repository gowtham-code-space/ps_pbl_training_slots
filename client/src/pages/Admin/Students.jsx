import { useState } from "react";
import Header from "../../components/Header";
import { useStore } from "../../store/useStore";

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
import { allStudents } from "../../data/index";

function ScorePill({ score, max = 100 }) {
  const pct = score / max;
  const style =
    pct >= 0.6
      ? { background: "rgba(16,185,129,0.12)",  color: "#059669" }
      : pct >= 0.4
      ? { background: "rgba(245,158,11,0.12)",  color: "#d97706" }
      : { background: "rgba(239,68,68,0.12)",   color: "#dc2626" };
  return (
    <span
      className="text-xs font-extrabold px-2.5 py-0.5 rounded-full"
      style={style}
    >
      {score}
    </span>
  );
}

export default function Students() {
  const { showToast } = useStore();

  const [deptFilter, setDeptFilter] = useState("all");
  const [yearFilter, setYearFilter] = useState("all");
  const [search,     setSearch]     = useState("");

  const filtered = allStudents.filter((s) => {
    if (deptFilter !== "all" && s.dept !== deptFilter) return false;
    if (yearFilter !== "all" && s.year !== yearFilter) return false;
    if (search && !s.name.toLowerCase().includes(search.toLowerCase()) &&
        !s.roll.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const selectStyle = {
    padding:            "8px 28px 8px 12px",
    border:             "1.5px solid var(--border)",
    borderRadius:       "8px",
    background:         "var(--white)",
    fontSize:           "12px",
    fontWeight:         600,
    color:              "var(--text)",
    outline:            "none",
    cursor:             "pointer",
    appearance:         "none",
    backgroundImage:    `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
    backgroundRepeat:   "no-repeat",
    backgroundPosition: "right 8px center",
    fontFamily:         "var(--font-body)",
    transition:         "border-color 0.2s",
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ ...adminThemeVars, background: "var(--bg)" }}>
      <Header showBack backPage="dashboard" />

      <div className="flex-1 p-6">
        <div
          className="text-[22px] font-extrabold mb-1"
          style={{ color: "var(--text)", fontFamily: "var(--font-head)" }}
        >
          Student Management
        </div>
        <div className="text-[13px] mb-6" style={{ color: "var(--text2)" }}>
          331 students across all departments · View &amp; override points
        </div>

        {/* Filters */}
        <div className="flex gap-2 flex-wrap items-center mb-4">
          <select
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            style={selectStyle}
          >
            <option value="all">All Departments</option>
            <option value="CSE">CSE</option>
            <option value="ECE">ECE</option>
            <option value="MECH">MECH</option>
            <option value="BIO">BIO</option>
          </select>

          <select
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
            style={selectStyle}
          >
            <option value="all">All Years</option>
            <option value="I Year">I Year</option>
            <option value="II Year">II Year</option>
            <option value="III Year">III Year</option>
            <option value="IV Year">IV Year</option>
          </select>

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name / roll…"
            className="rounded-lg border-[1.5px] px-3 py-2 text-xs font-semibold outline-none transition-colors duration-200"
            style={{
              width:       "180px",
              borderColor: "var(--border)",
              background:  "var(--white)",
              color:       "var(--text)",
              fontFamily:  "var(--font-body)",
            }}
            onFocus={(e)  => (e.target.style.borderColor = "var(--purple)")}
            onBlur={(e)   => (e.target.style.borderColor = "var(--border)")}
          />
        </div>

        {/* Table card */}
        <div
          className="rounded-[14px] border-[1.5px] overflow-hidden"
          style={{ background: "var(--white)", borderColor: "var(--border)" }}
        >
          <div className="overflow-x-auto">
            <table
              className="w-full border-collapse text-[13px]"
              style={{ tableLayout: "fixed" }}
            >
              <thead>
                <tr>
                  {[
                    { label: "Student Name", w: "22%" },
                    { label: "Roll No",      w: "16%" },
                    { label: "Year",         w: "10%" },
                    { label: "Dept",         w: "8%"  },
                    { label: "PS Points",    w: "12%" },
                    { label: "PBL Points",   w: "12%" },
                    { label: "AP Points",    w: "10%" },
                    { label: "Action",       w: "10%" },
                  ].map(({ label, w }) => (
                    <th
                      key={label}
                      className="text-left px-3 py-2.5 text-[11px] font-extrabold uppercase border-b"
                      style={{
                        color:        "var(--text3)",
                        letterSpacing:"0.5px",
                        borderColor:  "var(--border)",
                        width:        w,
                      }}
                    >
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td
                      colSpan={8}
                      className="text-center py-9 text-[13px] font-semibold"
                      style={{ color: "var(--text3)" }}
                    >
                      No students match filter
                    </td>
                  </tr>
                ) : (
                  filtered.map((s) => (
                    <tr
                      key={s.roll}
                      onMouseEnter={(e) =>
                        Array.from(e.currentTarget.cells).forEach(
                          (c) => (c.style.background = "var(--purple-dim)")
                        )
                      }
                      onMouseLeave={(e) =>
                        Array.from(e.currentTarget.cells).forEach(
                          (c) => (c.style.background = "transparent")
                        )
                      }
                    >
                      <td
                        className="px-3 py-2.5 border-b font-bold"
                        style={{ borderColor: "var(--border)", color: "var(--text)" }}
                      >
                        {s.name}
                      </td>
                      <td
                        className="px-3 py-2.5 border-b text-[11px]"
                        style={{ borderColor: "var(--border)", color: "var(--text2)" }}
                      >
                        {s.roll}
                      </td>
                      <td
                        className="px-3 py-2.5 border-b text-xs"
                        style={{ borderColor: "var(--border)", color: "var(--text)" }}
                      >
                        {s.year}
                      </td>
                      <td
                        className="px-3 py-2.5 border-b text-xs"
                        style={{ borderColor: "var(--border)", color: "var(--text2)" }}
                      >
                        {s.dept}
                      </td>
                      <td className="px-3 py-2.5 border-b" style={{ borderColor: "var(--border)" }}>
                        <ScorePill score={s.ps} />
                      </td>
                      <td className="px-3 py-2.5 border-b" style={{ borderColor: "var(--border)" }}>
                        <ScorePill score={s.pbl} />
                      </td>
                      <td className="px-3 py-2.5 border-b" style={{ borderColor: "var(--border)" }}>
                        <ScorePill score={s.ap} />
                      </td>
                      <td className="px-3 py-2.5 border-b" style={{ borderColor: "var(--border)" }}>
                        <button
                          onClick={() => showToast("Edit coming soon", false)}
                          className="px-3 py-1 rounded-lg border-[1.5px] text-[11px] font-bold transition-all duration-150"
                          style={{
                            borderColor: "var(--blue)",
                            color:       "var(--blue)",
                            background:  "transparent",
                            fontFamily:  "var(--font-body)",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = "var(--blue)";
                            e.currentTarget.style.color      = "#fff";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "transparent";
                            e.currentTarget.style.color      = "var(--blue)";
                          }}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
