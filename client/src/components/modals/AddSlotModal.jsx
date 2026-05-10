import { useState, useEffect } from "react";
import { useStore } from "../../store/useStore";

export default function AddSlotModal({ open, onClose, type }) {
  const { state, dispatch, showToast } = useStore();
  const { venues, faculty } = state;

  const [day,   setDay]   = useState("Monday");
  const [start, setStart] = useState("");
  const [end,   setEnd]   = useState("");
  const [venue, setVenue] = useState("");
  const [fac,   setFac]   = useState("");

  // reset on open
  useEffect(() => {
    if (open) {
      setDay("Monday");
      setStart("");
      setEnd("");
      setVenue(venues[0]?.name || "");
      setFac(faculty[0]?.id || "");
    }
  }, [open]);

  if (!open) return null;

  function fmtTime(t) {
    const [h, m] = t.split(":");
    const hr = parseInt(h);
    return (hr > 12 ? hr - 12 : hr) + ":" + (m || "00") + " " + (hr >= 12 ? "PM" : "AM");
  }

  function handleConfirm() {
    if (!start || !end) { showToast("Please enter times", true); return; }
    if (start >= end)   { showToast("End must be after start", true); return; }

    const timeStr = fmtTime(start) + " – " + fmtTime(end);
    const slot    = { day, time: timeStr, venue, faculty: fac };

    if (type === "PS") {
      dispatch({ type: "ADD_PS_SLOT",  slot });
      showToast("PS Slot added!");
    } else {
      dispatch({ type: "ADD_PBL_SLOT", slot });
      showToast("PBL Slot added!");
    }
    onClose();
  }

  // shared input style helpers
  const inputStyle = {
    borderColor: "var(--border)",
    background:  "var(--white)",
    color:       "var(--text)",
    fontFamily:  "var(--font-body)",
  };

  const labelStyle = {
    fontSize:      "12px",
    fontWeight:    700,
    color:         "var(--text3)",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    marginBottom:  "6px",
    display:       "block",
  };

  return (
    <div
      className="fixed inset-0 z-[500] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.45)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="relative flex flex-col rounded-2xl border-[1.5px] w-[90%] overflow-hidden"
        style={{
          background:  "var(--white)",
          borderColor: "var(--border)",
          maxWidth:    "440px",
          maxHeight:   "90vh",
        }}
      >
        {/* HEADER */}
        <div className="flex-shrink-0 px-6 pt-6 pb-0">
          <div
            className="text-base font-extrabold mb-1"
            style={{ color: "var(--text)", fontFamily: "var(--font-head)" }}
          >
            Add New {type} Slot
          </div>
          <div className="text-xs mb-4" style={{ color: "var(--text2)" }}>
            {type === "PS" ? "Problem Solving Slot" : "Project Based Learning Slot"}
          </div>
        </div>

        {/* BODY */}
        <div className="flex-1 overflow-y-auto px-6 pb-2">
          <div className="flex flex-col gap-3 mb-2">

            {/* Day */}
            <div>
              <label style={labelStyle}>Day</label>
              <select
                value={day}
                onChange={(e) => setDay(e.target.value)}
                className="w-full rounded-lg border-[1.5px] px-3 py-2 text-xs font-semibold outline-none appearance-none cursor-pointer transition-colors duration-200"
                style={{
                  ...inputStyle,
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
                  backgroundRepeat:   "no-repeat",
                  backgroundPosition: "right 8px center",
                  paddingRight:       "28px",
                }}
                onFocus={(e)  => (e.target.style.borderColor = "var(--purple)")}
                onBlur={(e)   => (e.target.style.borderColor = "var(--border)")}
              >
                {["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"].map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </div>

            {/* Start + End Time */}
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label style={labelStyle}>Start Time</label>
                <input
                  type="time"
                  value={start}
                  onChange={(e) => setStart(e.target.value)}
                  className="w-full rounded-lg border-[1.5px] px-3 py-2 text-xs font-semibold outline-none transition-colors duration-200"
                  style={inputStyle}
                  onFocus={(e)  => (e.target.style.borderColor = "var(--purple)")}
                  onBlur={(e)   => (e.target.style.borderColor = "var(--border)")}
                />
              </div>
              <div>
                <label style={labelStyle}>End Time</label>
                <input
                  type="time"
                  value={end}
                  onChange={(e) => setEnd(e.target.value)}
                  className="w-full rounded-lg border-[1.5px] px-3 py-2 text-xs font-semibold outline-none transition-colors duration-200"
                  style={inputStyle}
                  onFocus={(e)  => (e.target.style.borderColor = "var(--purple)")}
                  onBlur={(e)   => (e.target.style.borderColor = "var(--border)")}
                />
              </div>
            </div>

            {/* Venue */}
            <div>
              <label style={labelStyle}>Venue</label>
              <select
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                className="w-full rounded-lg border-[1.5px] px-3 py-2 text-xs font-semibold outline-none appearance-none cursor-pointer transition-colors duration-200"
                style={{
                  ...inputStyle,
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
                  backgroundRepeat:   "no-repeat",
                  backgroundPosition: "right 8px center",
                  paddingRight:       "28px",
                }}
                onFocus={(e)  => (e.target.style.borderColor = "var(--purple)")}
                onBlur={(e)   => (e.target.style.borderColor = "var(--border)")}
              >
                {venues.map((v) => (
                  <option key={v.id} value={v.name}>{v.name}</option>
                ))}
              </select>
            </div>

            {/* Faculty */}
            <div>
              <label style={labelStyle}>Faculty Incharge</label>
              <select
                value={fac}
                onChange={(e) => setFac(e.target.value)}
                className="w-full rounded-lg border-[1.5px] px-3 py-2 text-xs font-semibold outline-none appearance-none cursor-pointer transition-colors duration-200"
                style={{
                  ...inputStyle,
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
                  backgroundRepeat:   "no-repeat",
                  backgroundPosition: "right 8px center",
                  paddingRight:       "28px",
                }}
                onFocus={(e)  => (e.target.style.borderColor = "var(--purple)")}
                onBlur={(e)   => (e.target.style.borderColor = "var(--border)")}
              >
                {faculty.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.name} ({f.dept})
                  </option>
                ))}
              </select>
            </div>

          </div>
        </div>

        {/* FOOTER */}
        <div
          className="flex-shrink-0 flex justify-end gap-2.5 px-6 py-4 border-t"
          style={{ borderColor: "var(--border)" }}
        >
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border-[1.5px] text-xs font-bold transition-all duration-150"
            style={{
              borderColor: "var(--border)",
              color:       "var(--text2)",
              background:  "transparent",
              fontFamily:  "var(--font-body)",
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 rounded-lg border-[1.5px] text-[13px] font-bold transition-all duration-150"
            style={{
              borderColor: "var(--green)",
              color:       "var(--green)",
              background:  "transparent",
              fontFamily:  "var(--font-body)",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "var(--green)"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--green)"; }}
          >
            Add Slot
          </button>
        </div>
      </div>
    </div>
  );
}
