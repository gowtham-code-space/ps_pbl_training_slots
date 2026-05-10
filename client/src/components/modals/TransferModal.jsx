import { useState, useEffect } from "react";
import { useStore } from "../../store/useStore";

export default function TransferModal({ open, onClose, context }) {
  const { state, dispatch, showToast } = useStore();
  const { faculty, venues, facultySlotMap } = state;

  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [selectedVenue, setSelectedVenue]     = useState(null);
  const [reason, setReason]                   = useState("");

  // reset selections when modal opens
  useEffect(() => {
    if (open) {
      setSelectedFaculty(null);
      setSelectedVenue(null);
      setReason("");
    }
  }, [open, context]);

  if (!open || !context) return null;

  // ── derive display info ──────────────────────────────────────
  const isSwap        = context.type === "swap";
  const isMove        = context.type === "move";
  const isSingleSlot  = context.type === "singleslot";
  const isFaculty     = context.type === "faculty";

  let title = "";
  let sub   = "";
  let modePill = null;

  if (isSwap) {
    const v   = venues.find((x) => x.id === context.id);
    const fac = v?.faculty ? faculty.find((f) => f.id === v.faculty) : null;
    title    = "Swap Faculty Incharge";
    sub      = `${v?.name} · ${v?.block}, ${v?.room}${fac ? " · Current: " + fac.name : " · No faculty assigned"}`;
    modePill = (
      <div className="flex gap-1.5 flex-wrap mb-2">
        <span style={{ fontSize:"10px",fontWeight:700,padding:"3px 10px",borderRadius:"6px",background:"rgba(245,158,11,0.12)",color:"#d97706" }}>
          Swap Faculty = same venue, new incharge
        </span>
        <span style={{ fontSize:"10px",fontWeight:700,padding:"3px 10px",borderRadius:"6px",background:"rgba(59,130,246,0.12)",color:"#2563eb" }}>
          Move Venue = same faculty, new room
        </span>
      </div>
    );
  } else if (isMove) {
    const v   = venues.find((x) => x.id === context.id);
    const fac = v?.faculty ? faculty.find((f) => f.id === v.faculty) : null;
    title    = "Move Faculty to Another Venue";
    sub      = `${fac ? fac.name : "Faculty"} · Currently at ${v?.name} (${v?.block}, ${v?.room})`;
    modePill = (
      <div className="flex gap-1.5 flex-wrap mb-2">
        <span style={{ fontSize:"10px",fontWeight:700,padding:"3px 10px",borderRadius:"6px",background:"rgba(245,158,11,0.12)",color:"#d97706" }}>
          Swap Faculty = same venue, new incharge
        </span>
        <span style={{ fontSize:"10px",fontWeight:700,padding:"3px 10px",borderRadius:"6px",background:"rgba(59,130,246,0.12)",color:"#2563eb" }}>
          Move Venue = same faculty, new room
        </span>
      </div>
    );
  } else if (isSingleSlot) {
    const f    = faculty.find((x) => x.id === context.facultyId);
    const slots = facultySlotMap[context.facultyId] || [];
    const slot  = slots.find((s) => s.id === context.slotId);
    title = "Transfer Single Slot";
    sub   = `${f?.name} · ${slot?.venue} · ${slot?.day} ${slot?.full}`;
    modePill = (
      <div className="flex gap-1.5 flex-wrap mb-2">
        <span style={{ fontSize:"10px",fontWeight:700,padding:"4px 12px",borderRadius:"6px",background:"var(--purple-dim)",color:"var(--purple)" }}>
          Transferring: {slot?.venue} · {slot?.day} {slot?.full}
        </span>
      </div>
    );
  } else if (isFaculty) {
    const f = faculty.find((x) => x.id === context.id);
    title   = `${f?.name} · Transfer Slots`;
    sub     = `Transfer all assigned slots from ${f?.name} to another faculty`;
    modePill = (
      <div className="flex gap-1.5 flex-wrap mb-2">
        <span style={{ fontSize:"10px",fontWeight:700,padding:"3px 10px",borderRadius:"6px",background:"rgba(245,158,11,0.12)",color:"#d97706" }}>
          Swap Faculty = same venue, new incharge
        </span>
        <span style={{ fontSize:"10px",fontWeight:700,padding:"3px 10px",borderRadius:"6px",background:"rgba(59,130,246,0.12)",color:"#2563eb" }}>
          Move Venue = same faculty, new room
        </span>
      </div>
    );
  }

  // ── eligible faculty list (exclude current) ──────────────────
  const excludeId = isSwap ? venues.find((x) => x.id === context.id)?.faculty
    : isMove        ? null
    : isSingleSlot  ? context.facultyId
    : context.id;

  const eligibleFaculty = faculty.filter((f) => f.id !== excludeId);

  // ── free venues (for move) ───────────────────────────────────
  const freeVenues = isMove
    ? venues.filter((v) => v.id !== context.id && v.status === "free")
    : [];

  // ── confirm ──────────────────────────────────────────────────
  function handleConfirm() {
    if (!reason.trim()) { showToast("Please enter a reason", true); return; }

    if (isSwap) {
      if (!selectedFaculty) { showToast("Please select a faculty", true); return; }
      const v     = venues.find((x) => x.id === context.id);
      const toFac = faculty.find((f) => f.id === selectedFaculty);
      dispatch({ type: "SWAP_FACULTY", venueId: context.id, newFacultyId: selectedFaculty });
      showToast(`Faculty swapped to ${toFac.name} for ${v.name}`);
      onClose();

    } else if (isMove) {
      if (!selectedVenue) { showToast("Please select a destination venue", true); return; }
      const fromV = venues.find((x) => x.id === context.id);
      const toV   = venues.find((x) => x.id === selectedVenue);
      const fac   = fromV.faculty ? faculty.find((f) => f.id === fromV.faculty) : null;
      dispatch({ type: "MOVE_VENUE", fromVenueId: context.id, toVenueId: selectedVenue });
      showToast(`${fac ? fac.name : "Faculty"} moved to ${toV.name} (${toV.block})`);
      onClose();

    } else if (isSingleSlot) {
      if (!selectedFaculty) { showToast("Please select a faculty", true); return; }
      const toFac = faculty.find((f) => f.id === selectedFaculty);
      const slots = facultySlotMap[context.facultyId] || [];
      const slot  = slots.find((s) => s.id === context.slotId);
      dispatch({ type: "TRANSFER_SINGLE_SLOT", fromFacultyId: context.facultyId, slotId: context.slotId, toFacultyId: selectedFaculty });
      showToast(`${slot?.venue} ${slot?.full} transferred to ${toFac.name}`);
      onClose();

    } else {
      if (!selectedFaculty) { showToast("Please select a faculty", true); return; }
      const toFac     = faculty.find((f) => f.id === selectedFaculty);
      const fromSlots = facultySlotMap[context.id] || [];
      dispatch({ type: "TRANSFER_ALL_SLOTS", fromFacultyId: context.id, toFacultyId: selectedFaculty });
      showToast(`All ${fromSlots.length} slots transferred to ${toFac.name}`);
      onClose();
    }
  }

  return (
    <div
      className="fixed inset-0 z-[500] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.45)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="relative flex flex-col rounded-2xl border-[1.5px] w-[90%] overflow-hidden"
        style={{
          background: "var(--white)",
          borderColor: "var(--border)",
          maxWidth: "440px",
          maxHeight: "90vh",
        }}
      >
        {/* HEADER */}
        <div className="flex-shrink-0 px-6 pt-6 pb-0">
          <div className="text-base font-extrabold mb-1" style={{ color: "var(--text)", fontFamily: "var(--font-head)" }}>
            {title}
          </div>
          <div className="text-xs mb-4" style={{ color: "var(--text2)" }}>{sub}</div>
          {modePill}
        </div>

        {/* SCROLL BODY */}
        <div className="flex-1 overflow-y-auto px-6 pb-2">

          {/* Faculty list */}
          {!isMove && (
            <>
              <div className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: "var(--text3)", letterSpacing: "0.5px" }}>
                {isSingleSlot || isFaculty ? "Select faculty to take over:" : "Select new faculty incharge for this venue:"}
              </div>
              <div className="flex flex-col gap-2 mb-4">
                {eligibleFaculty.map((f) => (
                  <div
                    key={f.id}
                    onClick={() => setSelectedFaculty(f.id)}
                    className="flex items-center gap-3 p-2.5 rounded-[10px] border-[1.5px] cursor-pointer transition-all duration-150"
                    style={{
                      borderColor: selectedFaculty === f.id ? "var(--purple)" : "var(--border)",
                      background:  selectedFaculty === f.id ? "var(--purple-dim)" : "transparent",
                    }}
                  >
                    <div
                      className="w-[34px] h-[34px] rounded-full flex items-center justify-center text-xs font-extrabold flex-shrink-0"
                      style={{ background: "var(--purple-dim)", color: "var(--purple)" }}
                    >
                      {f.initials}
                    </div>
                    <div>
                      <div className="text-[13px] font-bold" style={{ color: "var(--text)" }}>{f.name}</div>
                      <div className="text-[11px]" style={{ color: "var(--text3)" }}>
                        {f.dept} · {f.venues.join(", ") || "No venue"} · {f.slots} slots
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Venue list (move only) */}
          {isMove && (
            <>
              <div className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: "var(--text3)", letterSpacing: "0.5px" }}>
                Select destination venue:
              </div>
              <div className="flex flex-col gap-2 mb-4">
                {freeVenues.length === 0 && (
                  <div className="text-[13px] py-3" style={{ color: "var(--text3)" }}>No free venues available</div>
                )}
                {freeVenues.map((v) => (
                  <div
                    key={v.id}
                    onClick={() => setSelectedVenue(v.id)}
                    className="flex items-center gap-3 p-2.5 rounded-[10px] border-[1.5px] cursor-pointer transition-all duration-150"
                    style={{
                      borderColor: selectedVenue === v.id ? "var(--green)" : "var(--border)",
                      background:  selectedVenue === v.id ? "rgba(16,185,129,0.08)" : "transparent",
                    }}
                  >
                    <div
                      className="w-[34px] h-[34px] rounded-lg flex items-center justify-center text-[10px] font-extrabold flex-shrink-0"
                      style={{ background: "rgba(16,185,129,0.1)", color: "#059669" }}
                    >
                      {v.type}
                    </div>
                    <div>
                      <div className="text-[13px] font-bold" style={{ color: "var(--text)" }}>{v.name}</div>
                      <div className="text-[11px]" style={{ color: "var(--text3)" }}>{v.block} · {v.room} · Free</div>
                    </div>
                    <span
                      className="ml-auto text-[10px] font-bold px-2 py-0.5 rounded-md"
                      style={{ background: "rgba(16,185,129,0.12)", color: "#059669" }}
                    >
                      Free
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Reason */}
          <div className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: "var(--text3)", letterSpacing: "0.5px" }}>
            Reason
          </div>
          <textarea
            rows={3}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="e.g. Faculty on leave, block maintenance…"
            className="w-full rounded-lg border-[1.5px] px-3 py-2.5 text-[13px] resize-none outline-none transition-colors duration-200"
            style={{
              borderColor: "var(--border)",
              background: "var(--bg)",
              color: "var(--text)",
              fontFamily: "var(--font-body)",
            }}
            onFocus={(e)  => (e.target.style.borderColor = "var(--purple)")}
            onBlur={(e)   => (e.target.style.borderColor = "var(--border)")}
          />
        </div>

        {/* FOOTER */}
        <div
          className="flex-shrink-0 flex justify-end gap-2.5 px-6 py-4 mt-2 border-t"
          style={{ borderColor: "var(--border)" }}
        >
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border-[1.5px] text-xs font-bold transition-all duration-150"
            style={{ borderColor: "var(--border)", color: "var(--text2)", background: "transparent", fontFamily: "var(--font-body)" }}
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 rounded-lg border-[1.5px] text-[13px] font-bold transition-all duration-150"
            style={{ borderColor: "var(--green)", color: "var(--green)", background: "transparent", fontFamily: "var(--font-body)" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "var(--green)"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--green)"; }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
