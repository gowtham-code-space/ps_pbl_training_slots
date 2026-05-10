import { useState } from "react";
import Header from "../../components/Header";
import TransferModal from "../../components/modals/TransferModal";
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

export default function FacultyAllocation() {
  const { state } = useStore();
  const { faculty, facultySlotMap } = state;

  const [transferCtx, setTransferCtx] = useState(null);

  const assigned   = faculty.filter((f) => f.status === "active" && f.venues.length > 0).length;
  const unassigned = faculty.filter((f) => f.venues.length === 0).length;

  function statusBadge(status) {
    const isActive = status === "active";
    return (
      <span
        className="text-[10px] font-extrabold px-2 py-0.5 rounded-full"
        style={{
          background: isActive ? "rgba(16,185,129,0.15)" : "rgba(156,163,175,0.2)",
          color:      isActive ? "#059669"                : "var(--text3)",
        }}
      >
        {isActive ? "Active" : "Inactive"}
      </span>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ ...adminThemeVars, background: "var(--bg)" }}>
      <Header showBack backPage="dashboard" />

      <div className="flex-1 p-6">
        <div
          className="text-[22px] font-extrabold mb-1"
          style={{ color: "var(--text)", fontFamily: "var(--font-head)" }}
        >
          Faculty Allocation
        </div>
        <div className="text-[13px] mb-6" style={{ color: "var(--text2)" }}>
          Assign faculty to venues and transfer slot responsibilities
        </div>

        {/* Mini stat cards */}
        <div className="grid grid-cols-3 gap-2.5 mb-6">
          {[
            { val: 18,         label: "Total Faculty", accent: "purple" },
            { val: assigned,   label: "Assigned",      accent: "red"    },
            { val: unassigned, label: "Unassigned",    accent: "green"  },
          ].map(({ val, label, accent }) => {
            const styles = {
              purple: { border: "var(--purple-glow)",       bg: "var(--purple-dim)",          valColor: "var(--purple)" },
              red:    { border: "rgba(239,68,68,0.3)",       bg: "rgba(239,68,68,0.06)",        valColor: "#dc2626"       },
              green:  { border: "rgba(16,185,129,0.3)",      bg: "rgba(16,185,129,0.06)",       valColor: "#059669"       },
            }[accent];
            return (
              <div
                key={label}
                className="rounded-xl border-[1.5px] p-3.5 text-center"
                style={{ borderColor: styles.border, background: styles.bg }}
              >
                <div
                  className="text-2xl font-extrabold"
                  style={{ color: styles.valColor, fontFamily: "var(--font-head)" }}
                >
                  {val}
                </div>
                <div
                  className="text-[11px] font-bold uppercase tracking-wide mt-1"
                  style={{ color: "var(--text3)", letterSpacing: "0.5px" }}
                >
                  {label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Table card */}
        <div
          className="rounded-[14px] border-[1.5px] overflow-hidden"
          style={{ background: "var(--white)", borderColor: "var(--border)" }}
        >
          <div className="px-5 pt-5 pb-0">
            <div
              className="text-[14px] font-extrabold uppercase tracking-wide mb-3.5"
              style={{ color: "var(--text2)", letterSpacing: "0.5px" }}
            >
              Faculty &amp; Their Assignments
            </div>
          </div>

          <div className="overflow-x-auto">
            <table
              className="w-full border-collapse text-[13px]"
              style={{ tableLayout: "fixed" }}
            >
              <thead>
                <tr>
                  {[
                    { label: "Faculty Name",    w: "22%" },
                    { label: "Dept",            w: "12%" },
                    { label: "Assigned Venues", w: "22%" },
                    { label: "Slots Today",     w: "16%" },
                    { label: "Status",          w: "12%" },
                    { label: "Action",          w: "16%" },
                  ].map(({ label, w }) => (
                    <th
                      key={label}
                      className="text-left px-3 py-2.5 text-[11px] font-extrabold uppercase border-b"
                      style={{
                        color:       "var(--text3)",
                        letterSpacing:"0.5px",
                        borderColor: "var(--border)",
                        width:       w,
                      }}
                    >
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {faculty.map((f) => {
                  const mySlots = facultySlotMap[f.id] || [];
                  return (
                    <tr
                      key={f.id}
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
                      {/* Faculty Name */}
                      <td
                        className="px-3 py-3 border-b"
                        style={{ borderColor: "var(--border)" }}
                      >
                        <div className="flex items-center gap-2.5">
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-extrabold flex-shrink-0"
                            style={{
                              background: "var(--purple-dim)",
                              color:      "var(--purple)",
                            }}
                          >
                            {f.initials}
                          </div>
                          <div
                            className="text-[13px] font-bold"
                            style={{ color: "var(--text)" }}
                          >
                            {f.name}
                          </div>
                        </div>
                      </td>

                      {/* Dept */}
                      <td
                        className="px-3 py-3 border-b text-[12px]"
                        style={{ borderColor: "var(--border)", color: "var(--text2)" }}
                      >
                        {f.dept}
                      </td>

                      {/* Assigned Venues */}
                      <td
                        className="px-3 py-3 border-b text-[12px]"
                        style={{ borderColor: "var(--border)", color: "var(--text2)" }}
                      >
                        {f.venues.length ? f.venues.join(", ") : "—"}
                      </td>

                      {/* Slots with per-slot transfer */}
                      <td
                        className="px-3 py-3 border-b"
                        style={{ borderColor: "var(--border)" }}
                      >
                        {mySlots.length === 0 ? (
                          <span
                            className="text-[12px]"
                            style={{ color: "var(--text3)" }}
                          >
                            —
                          </span>
                        ) : (
                          <div className="flex flex-wrap gap-1">
                            {mySlots.map((s) => (
                              <span
                                key={s.id}
                                className="inline-flex items-center gap-1.5 text-[10px] font-bold px-2 py-0.5 rounded-md"
                                style={{
                                  background: "var(--purple-dim)",
                                  color:      "var(--purple)",
                                }}
                              >
                                {s.time}
                                {/* per-slot transfer button */}
                                <span
                                  title="Transfer this slot"
                                  className="cursor-pointer text-[11px] font-black ml-0.5 transition-colors duration-150"
                                  style={{ color: "var(--gold)" }}
                                  onClick={() =>
                                    setTransferCtx({
                                      type:      "singleslot",
                                      facultyId: f.id,
                                      slotId:    s.id,
                                    })
                                  }
                                  onMouseEnter={(e) =>
                                    (e.currentTarget.style.color = "#b45309")
                                  }
                                  onMouseLeave={(e) =>
                                    (e.currentTarget.style.color = "var(--gold)")
                                  }
                                >
                                  ⇄
                                </span>
                              </span>
                            ))}
                          </div>
                        )}
                        <div
                          className="text-[10px] mt-1"
                          style={{ color: "var(--text3)" }}
                        >
                          {mySlots.length} slot{mySlots.length !== 1 ? "s" : ""} · click ⇄ to transfer one
                        </div>
                      </td>

                      {/* Status */}
                      <td
                        className="px-3 py-3 border-b"
                        style={{ borderColor: "var(--border)" }}
                      >
                        {statusBadge(f.status)}
                      </td>

                      {/* Action */}
                      <td
                        className="px-3 py-3 border-b"
                        style={{ borderColor: "var(--border)" }}
                      >
                        <button
                          onClick={() =>
                            setTransferCtx({ type: "faculty", id: f.id })
                          }
                          className="px-3 py-1 rounded-lg border-[1.5px] text-[11px] font-bold transition-all duration-150"
                          style={{
                            borderColor: "var(--gold)",
                            color:       "#d97706",
                            background:  "transparent",
                            fontFamily:  "var(--font-body)",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = "var(--gold)";
                            e.currentTarget.style.color      = "#fff";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "transparent";
                            e.currentTarget.style.color      = "#d97706";
                          }}
                        >
                          Transfer All
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Transfer Modal */}
      <TransferModal
        open={!!transferCtx}
        onClose={() => setTransferCtx(null)}
        context={transferCtx}
      />
    </div>
  );
}
