import { useState, useEffect, useRef } from "react";
import Header from "../../components/Header";
import TransferModal from "../../components/modals/TransferModal";
import VenueMapModal from "../../components/modals/VenueMapModal";
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

export default function VenueAllocation() {
  const { state, dispatch, showToast } = useStore();
  const { venues, faculty } = state;

  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter,   setTypeFilter]   = useState("all");
  const [openMenu,     setOpenMenu]     = useState(null);
  const [transferCtx,  setTransferCtx]  = useState(null);
  const [showMap,      setShowMap]      = useState(false);
  const menuRef = useRef(null);

  // close dropdown on outside click
  useEffect(() => {
    function handler(e) {
      if (menuRef.current && !menuRef.current.contains(e.target))
        setOpenMenu(null);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filtered = venues.filter((v) => {
    if (statusFilter !== "all" && v.status !== statusFilter) return false;
    if (typeFilter   !== "all" && v.type   !== typeFilter)   return false;
    return true;
  });

  const occupiedCount = venues.filter((v) => v.status === "occupied").length;
  const freeCount     = venues.filter((v) => v.status === "free").length;

  function badge(status) {
    const map = {
      occupied: { cls: "rgba(108,71,255,0.12)", color: "var(--purple)",  label: "Occupied" },
      free:     { cls: "rgba(16,185,129,0.12)", color: "#059669",        label: "Free"     },
    };
    const s = map[status] || map.occupied;
    return (
      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full"
        style={{ background: s.cls, color: s.color }}>{s.label}</span>
    );
  }

  function typeBadge(type) {
    const isPBL = type === "PBL";
    return (
      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full"
        style={{
          background: isPBL ? "rgba(108,71,255,0.12)" : "rgba(16,185,129,0.15)",
          color:      isPBL ? "var(--purple)"          : "#059669",
        }}>
        {type}
      </span>
    );
  }

  const selectStyle = {
    padding:         "8px 28px 8px 12px",
    border:          "1.5px solid var(--border)",
    borderRadius:    "8px",
    background:      "var(--white)",
    fontSize:        "12px",
    fontWeight:      600,
    color:           "var(--text)",
    outline:         "none",
    cursor:          "pointer",
    appearance:      "none",
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
    backgroundRepeat:   "no-repeat",
    backgroundPosition: "right 8px center",
    fontFamily:         "var(--font-body)",
    transition:         "border-color 0.2s",
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ ...adminThemeVars, background: "var(--bg)" }}>
      <Header showBack backPage="dashboard" />

      <div className="flex-1 p-4 sm:p-6">
        <div className="text-[22px] font-extrabold mb-1" style={{ color: "var(--text)", fontFamily: "var(--font-head)" }}>
          Venue Allocation
        </div>
        <div className="text-[13px] mb-6" style={{ color: "var(--text2)" }}>
          Manage all labs, rooms and their current assignments
        </div>

        {/* Top row: mini stats + map button */}
        <div className="flex items-start justify-between gap-3 flex-wrap mb-4">
          <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-2.5 flex-1">
            {[
              { val: 12,            label: "Total Venues", accent: "purple" },
              { val: occupiedCount, label: "Occupied",     accent: "red"    },
              { val: freeCount,     label: "Free",         accent: "green"  },
            ].map(({ val, label, accent }) => {
              const styles = {
                purple: { border: "var(--purple-glow)", bg: "var(--purple-dim)", valColor: "var(--purple)" },
                red:    { border: "rgba(239,68,68,0.3)", bg: "rgba(239,68,68,0.06)", valColor: "#dc2626" },
                green:  { border: "rgba(16,185,129,0.3)", bg: "rgba(16,185,129,0.06)", valColor: "#059669" },
              }[accent];
              return (
                <div key={label} className="rounded-xl border-[1.5px] p-3.5 text-center"
                  style={{ borderColor: styles.border, background: styles.bg }}>
                  <div className="text-2xl font-extrabold" style={{ color: styles.valColor, fontFamily: "var(--font-head)" }}>{val}</div>
                  <div className="text-[11px] font-bold uppercase tracking-wide mt-1" style={{ color: "var(--text3)", letterSpacing: "0.5px" }}>{label}</div>
                </div>
              );
            })}
          </div>

          {/* Venue Map button */}
          <button
            onClick={() => setShowMap(true)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-[1.5px] text-[13px] font-extrabold flex-shrink-0 transition-all duration-200"
            style={{
              borderColor: "var(--purple-glow)",
              background:  "var(--purple-dim)",
              color:       "var(--purple)",
              fontFamily:  "var(--font-body)",
              whiteSpace:  "nowrap",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Venue Map
          </button>
        </div>

        {/* Table card */}
        <div className="rounded-[14px] border-[1.5px] overflow-hidden"
          style={{ background: "var(--white)", borderColor: "var(--border)" }}>
          <div className="p-5 pb-0">
            <div className="text-[14px] font-extrabold uppercase tracking-wide mb-3.5"
              style={{ color: "var(--text2)", letterSpacing: "0.5px" }}>
              All Venues
            </div>
            {/* Filters */}
            <div className="flex gap-2 flex-wrap mb-3.5">
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={selectStyle}>
                <option value="all">All Venues</option>
                <option value="occupied">Occupied</option>
                <option value="free">Free</option>
              </select>
              <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} style={selectStyle}>
                <option value="all">All Types</option>
                <option value="PBL">PBL Labs</option>
                <option value="PS">PS Labs</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto" ref={menuRef}>
            <table className="w-full border-collapse text-[13px]" style={{ tableLayout: "fixed" }}>
              <thead>
                <tr>
                  {["Venue Name","Block / Room","Type","Assigned Faculty","Current Slot","Status","Action"].map((h, i) => (
                    <th key={h} className="text-left px-3 py-2.5 text-[11px] font-extrabold uppercase border-b"
                      style={{
                        color: "var(--text3)", letterSpacing: "0.5px",
                        borderColor: "var(--border)",
                        width: ["20%","15%","12%","20%","18%","10%","15%"][i],
                      }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={7} className="text-center py-9 text-[13px] font-semibold" style={{ color: "var(--text3)" }}>
                    No venues match filter
                  </td></tr>
                ) : filtered.map((v) => {
                  const fac = v.faculty ? faculty.find((f) => f.id === v.faculty) : null;
                  const tf  = v.transferredTo ? faculty.find((f) => f.id === v.transferredTo) : null;
                  return (
                    <tr key={v.id}
                      onMouseEnter={(e) => Array.from(e.currentTarget.cells).forEach(c => c.style.background = "var(--purple-dim)")}
                      onMouseLeave={(e) => Array.from(e.currentTarget.cells).forEach(c => c.style.background = "transparent")}
                    >
                      <td className="px-3 py-2.5 border-b font-bold" style={{ borderColor: "var(--border)", color: "var(--text)" }}>{v.name}</td>
                      <td className="px-3 py-2.5 border-b" style={{ borderColor: "var(--border)", color: "var(--text2)", fontSize: "12px" }}>
                        {v.block}<br /><span style={{ color: "var(--text3)" }}>{v.room}</span>
                      </td>
                      <td className="px-3 py-2.5 border-b" style={{ borderColor: "var(--border)" }}>{typeBadge(v.type)}</td>
                      <td className="px-3 py-2.5 border-b" style={{ borderColor: "var(--border)" }}>
                        {fac ? (
                          <>
                            <div className="text-[13px] font-bold" style={{ color: "var(--text)" }}>{fac.name}</div>
                            <div className="text-[11px]" style={{ color: "var(--text3)" }}>{fac.dept}</div>
                          </>
                        ) : (
                          <span className="text-[12px]" style={{ color: "var(--text3)" }}>— Unassigned</span>
                        )}
                        {tf && (
                          <div className="mt-1">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md"
                              style={{ background: "rgba(245,158,11,0.15)", color: "#d97706" }}>
                              → Transferred to {tf.name}
                            </span>
                          </div>
                        )}
                      </td>
                      <td className="px-3 py-2.5 border-b text-[12px]" style={{ borderColor: "var(--border)", color: "var(--text2)" }}>
                        {v.slot || "—"}
                      </td>
                      <td className="px-3 py-2.5 border-b" style={{ borderColor: "var(--border)" }}>{badge(v.status)}</td>
                      <td className="px-3 py-2.5 border-b" style={{ borderColor: "var(--border)" }}>
                        <div className="relative inline-block">
                          <button
                            onClick={() => setOpenMenu(openMenu === v.id ? null : v.id)}
                            className="px-3.5 py-1 rounded-lg border-[1.5px] text-[11px] font-bold transition-all duration-150"
                            style={{ borderColor: "var(--purple)", color: "var(--purple)", background: "transparent", fontFamily: "var(--font-body)" }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = "var(--purple)"; e.currentTarget.style.color = "#fff"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--purple)"; }}
                          >
                            Manage ▾
                          </button>

                          {/* Dropdown */}
                          {openMenu === v.id && (
                            <div className="absolute right-0 top-[110%] rounded-[10px] border-[1.5px] overflow-hidden z-[200]"
                              style={{
                                background:  "var(--white)",
                                borderColor: "var(--border)",
                                boxShadow:   "0 6px 20px rgba(0,0,0,0.12)",
                                minWidth:    "160px",
                              }}>
                              <div
                                onClick={() => { setOpenMenu(null); setTransferCtx({ type: "swap", id: v.id }); }}
                                className="px-4 py-2.5 text-[12px] font-bold cursor-pointer transition-colors duration-150"
                                style={{ color: "#d97706" }}
                                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(245,158,11,0.08)")}
                                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                              >
                                ⇄ Swap Faculty
                              </div>
                              <div style={{ height: "1px", background: "var(--border)" }} />
                              <div
                                onClick={() => { setOpenMenu(null); setTransferCtx({ type: "move", id: v.id }); }}
                                className="px-4 py-2.5 text-[12px] font-bold cursor-pointer transition-colors duration-150"
                                style={{ color: "#2563eb" }}
                                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(59,130,246,0.08)")}
                                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                              >
                                ↗ Move Venue
                              </div>
                              {v.transferredTo && (
                                <>
                                  <div style={{ height: "1px", background: "var(--border)" }} />
                                  <div
                                    onClick={() => {
                                      setOpenMenu(null);
                                      dispatch({ type: "REVOKE_TRANSFER", venueId: v.id });
                                      showToast("Transfer revoked");
                                    }}
                                    className="px-4 py-2.5 text-[12px] font-bold cursor-pointer transition-colors duration-150"
                                    style={{ color: "#dc2626" }}
                                    onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(239,68,68,0.08)")}
                                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                                  >
                                    ✕ Revoke Transfer
                                  </div>
                                </>
                              )}
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modals */}
      <TransferModal
        open={!!transferCtx}
        onClose={() => setTransferCtx(null)}
        context={transferCtx}
      />
      <VenueMapModal open={showMap} onClose={() => setShowMap(false)} />
    </div>
  );
}
