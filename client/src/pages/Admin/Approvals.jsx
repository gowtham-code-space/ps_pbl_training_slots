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

function Badge({ status }) {
  const map = {
    pending:  { bg: "rgba(245,158,11,0.15)",  color: "#d97706",        label: "Pending"  },
    approved: { bg: "rgba(16,185,129,0.15)",  color: "#059669",        label: "Approved" },
    rejected: { bg: "rgba(239,68,68,0.15)",   color: "#dc2626",        label: "Rejected" },
  };
  const s = map[status] || map.pending;
  return (
    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full"
      style={{ background: s.bg, color: s.color }}>{s.label}</span>
  );
}

export default function Approvals() {
  const { state, dispatch, showToast } = useStore();
  const { labApprovals, apApprovals }  = state;
  const [tab, setTab] = useState("lab");

  function handleLab(id, action) {
    dispatch({ type: "UPDATE_LAB_APPROVAL", id, status: action });
    showToast(action === "approved" ? "Lab record approved!" : "Lab record rejected", action === "rejected");
  }
  function handleAP(id, action) {
    dispatch({ type: "UPDATE_AP_APPROVAL", id, status: action });
    showToast(action === "approved" ? "AP claim approved!" : "AP claim rejected", action === "rejected");
  }

  const tabStyle = (active) => ({
    flex: 1, padding: "9px 12px", borderRadius: "8px", border: "none",
    fontSize: "12px", fontWeight: 700, cursor: "pointer", fontFamily: "var(--font-body)",
    transition: "all 0.2s",
    background: active ? "var(--purple)" : "transparent",
    color:      active ? "#fff"          : "var(--text2)",
    boxShadow:  active ? "0 2px 8px var(--purple-glow)" : "none",
  });

  const btnStyle = (type) => {
    const map = {
      approve: { border: "var(--green)", color: "var(--green)", hoverBg: "var(--green)" },
      reject:  { border: "var(--red)",   color: "var(--red)",   hoverBg: "var(--red)"   },
      view:    { border: "var(--purple)","color": "var(--purple)", hoverBg: "var(--purple)" },
    };
    return map[type];
  };

  function ActionBtn({ type, onClick, children }) {
    const s = btnStyle(type);
    return (
      <button onClick={onClick}
        className="px-3 py-1 rounded-lg border-[1.5px] text-[11px] font-bold mr-1 transition-all duration-150"
        style={{ borderColor: s.border, color: s.color, background: "transparent", fontFamily: "var(--font-body)" }}
        onMouseEnter={(e) => { e.currentTarget.style.background = s.hoverBg; e.currentTarget.style.color = "#fff"; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = s.color; }}
      >{children}</button>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ ...adminThemeVars, background: "var(--bg)" }}>
      <Header showBack backPage="dashboard" />
      <div className="flex-1 p-6">
        <div className="text-[22px] font-extrabold mb-1" style={{ color: "var(--text)", fontFamily: "var(--font-head)" }}>System Approvals</div>
        <div className="text-[13px] mb-6" style={{ color: "var(--text2)" }}>All pending lab records and AP claims across all faculty</div>

        {/* Tabs */}
        <div className="flex gap-1.5 rounded-xl p-1 border mb-4" style={{ background: "var(--bg)", borderColor: "var(--border)" }}>
          <button style={tabStyle(tab === "lab")} onClick={() => setTab("lab")}>Lab Records</button>
          <button style={tabStyle(tab === "ap")}  onClick={() => setTab("ap")}>AP Claims</button>
        </div>

        {/* Lab Records */}
        {tab === "lab" && (
          <div className="rounded-[14px] border-[1.5px] overflow-hidden" style={{ background: "var(--white)", borderColor: "var(--border)" }}>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-[13px]" style={{ tableLayout: "fixed" }}>
                <thead>
                  <tr>
                    {[["Student","18%"],["Roll No","14%"],["Faculty","18%"],["Slot","12%"],["CQ Score","10%"],["PDF","10%"],["Status","8%"],["Action","10%"]].map(([h,w]) => (
                      <th key={h} className="text-left px-3 py-2.5 text-[11px] font-extrabold uppercase border-b"
                        style={{ color:"var(--text3)",letterSpacing:"0.5px",borderColor:"var(--border)",width:w }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {labApprovals.map((l) => (
                    <tr key={l.id}
                      onMouseEnter={(e) => Array.from(e.currentTarget.cells).forEach(c => c.style.background = "var(--purple-dim)")}
                      onMouseLeave={(e) => Array.from(e.currentTarget.cells).forEach(c => c.style.background = "transparent")}
                    >
                      <td className="px-3 py-2.5 border-b font-bold" style={{ borderColor:"var(--border)",color:"var(--text)" }}>{l.student}</td>
                      <td className="px-3 py-2.5 border-b text-[11px]" style={{ borderColor:"var(--border)",color:"var(--text2)" }}>{l.roll}</td>
                      <td className="px-3 py-2.5 border-b text-xs" style={{ borderColor:"var(--border)",color:"var(--text2)" }}>{l.faculty}</td>
                      <td className="px-3 py-2.5 border-b text-xs" style={{ borderColor:"var(--border)",color:"var(--text2)" }}>{l.slot}</td>
                      <td className="px-3 py-2.5 border-b text-xs" style={{ borderColor:"var(--border)",color:"var(--text)" }}>{l.cqScore}</td>
                      <td className="px-3 py-2.5 border-b" style={{ borderColor:"var(--border)" }}>
                        {l.pdfFile
                          ? <ActionBtn type="view" onClick={() => showToast("Opening PDF…")}>PDF</ActionBtn>
                          : <span style={{ color:"var(--text3)" }}>—</span>}
                      </td>
                      <td className="px-3 py-2.5 border-b" style={{ borderColor:"var(--border)" }}><Badge status={l.status}/></td>
                      <td className="px-3 py-2.5 border-b" style={{ borderColor:"var(--border)" }}>
                        {l.status === "pending" ? (
                          <>
                            <ActionBtn type="approve" onClick={() => handleLab(l.id,"approved")}>✓</ActionBtn>
                            <ActionBtn type="reject"  onClick={() => handleLab(l.id,"rejected")}>✕</ActionBtn>
                          </>
                        ) : <span className="text-[11px]" style={{ color:"var(--text3)" }}>Done</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* AP Claims */}
        {tab === "ap" && (
          <div className="rounded-[14px] border-[1.5px] overflow-hidden" style={{ background: "var(--white)", borderColor: "var(--border)" }}>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-[13px]" style={{ tableLayout: "fixed" }}>
                <thead>
                  <tr>
                    {[["Student","20%"],["Roll No","14%"],["Activity","24%"],["Points","10%"],["Faculty","16%"],["Status","8%"],["Action","8%"]].map(([h,w]) => (
                      <th key={h} className="text-left px-3 py-2.5 text-[11px] font-extrabold uppercase border-b"
                        style={{ color:"var(--text3)",letterSpacing:"0.5px",borderColor:"var(--border)",width:w }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {apApprovals.map((a) => (
                    <tr key={a.id}
                      onMouseEnter={(e) => Array.from(e.currentTarget.cells).forEach(c => c.style.background = "var(--purple-dim)")}
                      onMouseLeave={(e) => Array.from(e.currentTarget.cells).forEach(c => c.style.background = "transparent")}
                    >
                      <td className="px-3 py-2.5 border-b font-bold" style={{ borderColor:"var(--border)",color:"var(--text)" }}>{a.student}</td>
                      <td className="px-3 py-2.5 border-b text-[11px]" style={{ borderColor:"var(--border)",color:"var(--text2)" }}>{a.roll}</td>
                      <td className="px-3 py-2.5 border-b text-xs" style={{ borderColor:"var(--border)",color:"var(--text)" }}>{a.activity}</td>
                      <td className="px-3 py-2.5 border-b" style={{ borderColor:"var(--border)" }}>
                        <span className="text-xs font-extrabold" style={{ color:"var(--purple)" }}>+{a.pts}</span>
                      </td>
                      <td className="px-3 py-2.5 border-b text-xs" style={{ borderColor:"var(--border)",color:"var(--text2)" }}>{a.faculty}</td>
                      <td className="px-3 py-2.5 border-b" style={{ borderColor:"var(--border)" }}><Badge status={a.status}/></td>
                      <td className="px-3 py-2.5 border-b" style={{ borderColor:"var(--border)" }}>
                        {a.status === "pending" ? (
                          <>
                            <ActionBtn type="approve" onClick={() => handleAP(a.id,"approved")}>✓</ActionBtn>
                            <ActionBtn type="reject"  onClick={() => handleAP(a.id,"rejected")}>✕</ActionBtn>
                          </>
                        ) : <span className="text-[11px]" style={{ color:"var(--text3)" }}>Done</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
