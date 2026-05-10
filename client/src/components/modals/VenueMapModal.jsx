import { useState } from "react";
import { venueBlocks } from "../../data/index";

export default function VenueMapModal({ open, onClose }) {
  const [tooltip, setTooltip] = useState({ visible: false, text: "", x: 0, y: 0 });

  if (!open) return null;

  function handleMouseEnter(e, v) {
    const title =
      v.name +
      (v.type ? ` [${v.type}]` : "") +
      (v.faculty ? ` — ${v.faculty}` : "");
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltip({
      visible: true,
      text: title,
      x: Math.min(rect.left + 12, window.innerWidth - 260),
      y: rect.top - 40,
    });
  }

  function handleMouseLeave() {
    setTooltip({ ...tooltip, visible: false });
  }

  function getCellStyle(v) {
    if (v.status === "occupied" && v.type === "PBL")
      return { bg: "rgba(108,71,255,0.18)", border: "#6c47ff" };
    if (v.status === "occupied" && v.type === "PS")
      return { bg: "rgba(16,185,129,0.18)", border: "#10b981" };
    if (v.status === "free" && v.type === "PBL")
      return { bg: "rgba(108,71,255,0.06)", border: "rgba(108,71,255,0.3)" };
    if (v.status === "free" && v.type === "PS")
      return { bg: "rgba(16,185,129,0.06)", border: "rgba(16,185,129,0.3)" };
    return { bg: "var(--bg)", border: "var(--border)" };
  }

  return (
    <>
      {/* Tooltip */}
      {tooltip.visible && (
        <div
          style={{
            position:    "fixed",
            left:        tooltip.x,
            top:         tooltip.y,
            background:  "#1a1a2e",
            color:       "#fff",
            fontSize:    "11px",
            fontWeight:  700,
            padding:     "6px 12px",
            borderRadius:"8px",
            zIndex:      9999,
            pointerEvents:"none",
            maxWidth:    "240px",
            lineHeight:  1.4,
            fontFamily:  "var(--font-body)",
          }}
        >
          {tooltip.text}
        </div>
      )}

      {/* Overlay */}
      <div
        className="fixed inset-0 z-[500] flex items-center justify-center p-4"
        style={{ background: "rgba(0,0,0,0.45)" }}
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      >
        <div
          className="relative flex flex-col rounded-2xl border-[1.5px] overflow-hidden"
          style={{
            background:  "var(--white)",
            borderColor: "var(--border)",
            width:       "95%",
            maxWidth:    "700px",
            maxHeight:   "90vh",
          }}
        >
          {/* HEADER */}
          <div className="flex-shrink-0 px-6 pt-6 pb-0">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div
                  className="text-base font-extrabold mb-1"
                  style={{ color: "var(--text)", fontFamily: "var(--font-head)" }}
                >
                  Venue Map — BIT Campus
                </div>
                <div className="text-xs mb-2.5" style={{ color: "var(--text2)" }}>
                  All venues with occupancy status and PBL/PS mapping
                </div>

                {/* Legend */}
                <div className="flex gap-2 flex-wrap mb-1">
                  {[
                    { color: "rgba(108,71,255,0.25)", label: "PBL",      round: false },
                    { color: "rgba(16,185,129,0.25)",  label: "PS",       round: false },
                    { color: "#ef4444",                label: "Occupied", round: true  },
                    { color: "#10b981",                label: "Free",     round: true  },
                    { color: "var(--border)",          label: "Not Mapped",round: true },
                  ].map(({ color, label, round }) => (
                    <span
                      key={label}
                      className="flex items-center gap-1.5 text-[11px] font-bold"
                      style={{ color: "var(--text2)" }}
                    >
                      <span
                        style={{
                          width:        "10px",
                          height:       "10px",
                          borderRadius: round ? "50%" : "3px",
                          background:   color,
                          display:      "inline-block",
                          flexShrink:   0,
                        }}
                      />
                      {label}
                    </span>
                  ))}
                </div>
              </div>

              {/* Close button */}
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg border-[1.5px] flex items-center justify-center text-lg cursor-pointer flex-shrink-0 transition-colors duration-150"
                style={{
                  borderColor: "var(--border)",
                  background:  "transparent",
                  color:       "var(--text2)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--purple)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
              >
                ✕
              </button>
            </div>
          </div>

          {/* SCROLLABLE BODY */}
          <div className="flex-1 overflow-y-auto px-6 pt-1 pb-2 flex flex-col gap-5">
            {venueBlocks.map((block, bi) => {
              const total    = block.venues.length;
              const occupied = block.venues.filter((v) => v.status === "occupied").length;
              const free     = block.venues.filter((v) => v.status === "free").length;
              const pbl      = block.venues.filter((v) => v.type === "PBL").length;
              const ps       = block.venues.filter((v) => v.type === "PS").length;

              return (
                <div key={bi}>
                  {/* Block header */}
                  <div className="flex items-center justify-between flex-wrap gap-2 mb-2.5">
                    <div>
                      <div
                        className="text-sm font-extrabold"
                        style={{ color: "var(--text)", fontFamily: "var(--font-head)" }}
                      >
                        {block.block}
                      </div>
                      <div className="text-[11px]" style={{ color: "var(--text3)" }}>
                        {total} venues total
                      </div>
                    </div>
                    <div className="flex gap-1.5 flex-wrap">
                      {[
                        { val: occupied, bg: "rgba(239,68,68,0.12)",    color: "#dc2626", label: "Occupied" },
                        { val: free,     bg: "rgba(16,185,129,0.12)",   color: "#059669", label: "Free"     },
                        { val: pbl,      bg: "var(--purple-dim)",       color: "var(--purple)", label: "PBL" },
                        { val: ps,       bg: "rgba(16,185,129,0.1)",    color: "#059669", label: "PS"       },
                      ].map(({ val, bg, color, label }) => (
                        <span
                          key={label}
                          className="text-[10px] font-bold px-2 py-0.5 rounded-md"
                          style={{ background: bg, color }}
                        >
                          {val} {label}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Cell grid */}
                  <div className="flex flex-wrap gap-1.5">
                    {block.venues.map((v, vi) => {
                      const { bg, border } = getCellStyle(v);
                      const dot = v.status === "occupied" ? "#ef4444" : "#10b981";
                      const shortName =
                        v.name.replace(/[A-Za-z\s]+/, "").trim() ||
                        v.name.substring(0, 4);

                      return (
                        <div
                          key={vi}
                          onMouseEnter={(e) => handleMouseEnter(e, v)}
                          onMouseLeave={handleMouseLeave}
                          className="relative flex items-center justify-center cursor-default transition-transform duration-150 hover:scale-110 flex-shrink-0"
                          style={{
                            width:        "36px",
                            height:       "36px",
                            borderRadius: "8px",
                            background:   bg,
                            border:       `1.5px solid ${border}`,
                          }}
                        >
                          <span
                            className="text-[8px] font-extrabold"
                            style={{
                              color: v.status === "occupied" ? "var(--text)" : "var(--text3)",
                            }}
                          >
                            {shortName}
                          </span>
                          <span
                            className="absolute top-[3px] right-[3px] w-[5px] h-[5px] rounded-full"
                            style={{ background: dot }}
                          />
                        </div>
                      );
                    })}
                  </div>

                  {/* Divider between blocks */}
                  {bi < venueBlocks.length - 1 && (
                    <div className="mt-5 h-px" style={{ background: "var(--border)" }} />
                  )}
                </div>
              );
            })}
          </div>

          {/* FOOTER */}
          <div
            className="flex-shrink-0 flex justify-end px-6 py-4 border-t"
            style={{ borderColor: "var(--border)" }}
          >
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-lg border-[1.5px] text-xs font-bold transition-all duration-150"
              style={{
                borderColor: "var(--border)",
                color:       "var(--text2)",
                background:  "transparent",
                fontFamily:  "var(--font-body)",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--purple)"; e.currentTarget.style.color = "var(--purple)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text2)"; }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
