import { useState } from "react";
import Header from "../../components/Header";
import AddSlotModal from "../../components/modals/AddSlotModal";
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

function SlotTable({ slots, faculty, onDelete, onAdd, type }) {
  const [showModal, setShowModal] = useState(false);
  const { showToast } = useStore();

  return (
    <div className="min-h-screen flex flex-col" style={{ ...adminThemeVars, background: "var(--bg)" }}>
      <Header showBack backPage="dashboard" />
      <div className="flex-1 p-6">
        <div className="text-[22px] font-extrabold mb-1" style={{ color: "var(--text)", fontFamily: "var(--font-head)" }}>
          {type} Slot Management
        </div>
        <div className="text-[13px] mb-6" style={{ color: "var(--text2)" }}>
          {type === "PS"
            ? "Create, edit and manage Problem Solving training slots"
            : "Create, edit and manage Project Based Learning slots"}
        </div>

        <div className="flex justify-end mb-3.5">
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 rounded-lg border-[1.5px] text-[13px] font-bold transition-all duration-150"
            style={{ borderColor: "var(--green)", color: "var(--green)", background: "transparent", fontFamily: "var(--font-body)" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "var(--green)"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--green)"; }}
          >
            + Add New Slot
          </button>
        </div>

        <div className="rounded-[14px] border-[1.5px] overflow-hidden" style={{ background: "var(--white)", borderColor: "var(--border)" }}>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-[13px]" style={{ tableLayout: "fixed" }}>
              <thead>
                <tr>
                  {[["Slot ID","10%"],["Day","16%"],["Time","20%"],["Venue","20%"],["Faculty Incharge","18%"],["Action","16%"]].map(([h,w]) => (
                    <th key={h} className="text-left px-3 py-2.5 text-[11px] font-extrabold uppercase border-b"
                      style={{ color:"var(--text3)",letterSpacing:"0.5px",borderColor:"var(--border)",width:w }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {slots.length === 0 ? (
                  <tr><td colSpan={6} className="text-center py-9 text-[13px] font-semibold" style={{ color:"var(--text3)" }}>
                    No slots yet. Add one above.
                  </td></tr>
                ) : slots.map((s, i) => {
                  const fac = faculty.find((f) => f.id === s.faculty);
                  return (
                    <tr key={s.id}
                      onMouseEnter={(e) => Array.from(e.currentTarget.cells).forEach(c => c.style.background = "var(--purple-dim)")}
                      onMouseLeave={(e) => Array.from(e.currentTarget.cells).forEach(c => c.style.background = "transparent")}
                    >
                      <td className="px-3 py-2.5 border-b font-bold" style={{ borderColor:"var(--border)",color:"var(--text)" }}>{s.id}</td>
                      <td className="px-3 py-2.5 border-b" style={{ borderColor:"var(--border)",color:"var(--text)" }}>{s.day}</td>
                      <td className="px-3 py-2.5 border-b font-bold" style={{ borderColor:"var(--border)",color:"var(--purple)" }}>{s.time}</td>
                      <td className="px-3 py-2.5 border-b text-xs" style={{ borderColor:"var(--border)",color:"var(--text2)" }}>{s.venue}</td>
                      <td className="px-3 py-2.5 border-b text-xs" style={{ borderColor:"var(--border)",color:"var(--text)" }}>{fac ? fac.name : "—"}</td>
                      <td className="px-3 py-2.5 border-b" style={{ borderColor:"var(--border)" }}>
                        <button
                          onClick={() => showToast("Reassign coming soon")}
                          className="px-3 py-1 rounded-lg border-[1.5px] text-[11px] font-bold mr-1 transition-all duration-150"
                          style={{ borderColor:"var(--gold)",color:"#d97706",background:"transparent",fontFamily:"var(--font-body)" }}
                          onMouseEnter={(e) => { e.currentTarget.style.background="var(--gold)"; e.currentTarget.style.color="#fff"; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background="transparent"; e.currentTarget.style.color="#d97706"; }}
                        >Reassign</button>
                        <button
                          onClick={() => onDelete(i)}
                          className="px-3 py-1 rounded-lg border-[1.5px] text-[11px] font-bold transition-all duration-150"
                          style={{ borderColor:"var(--red)",color:"var(--red)",background:"transparent",fontFamily:"var(--font-body)" }}
                          onMouseEnter={(e) => { e.currentTarget.style.background="var(--red)"; e.currentTarget.style.color="#fff"; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background="transparent"; e.currentTarget.style.color="var(--red)"; }}
                        >Delete</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <AddSlotModal open={showModal} onClose={() => setShowModal(false)} type={type} />
    </div>
  );
}

export function PSSlots() {
  const { state, dispatch, showToast } = useStore();
  return (
    <SlotTable
      slots={state.psSlots}
      faculty={state.faculty}
      type="PS"
      onDelete={(i) => { dispatch({ type: "DELETE_PS_SLOT", index: i }); showToast("PS Slot deleted"); }}
    />
  );
}

export function PBLSlots() {
  const { state, dispatch, showToast } = useStore();
  return (
    <SlotTable
      slots={state.pblSlots}
      faculty={state.faculty}
      type="PBL"
      onDelete={(i) => { dispatch({ type: "DELETE_PBL_SLOT", index: i }); showToast("PBL Slot deleted"); }}
    />
  );
}
