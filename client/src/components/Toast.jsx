import { useStore } from "../store/useStore";

export default function Toast() {
  const { state } = useStore();
  const { toast } = state;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "24px",
        left: "50%",
        transform: "translateX(-50%)",
        padding: "12px 24px",
        borderRadius: "10px",
        fontSize: "13px",
        fontWeight: "700",
        zIndex: 9999,
        opacity: toast.visible ? 1 : 0,
        transition: "opacity 0.3s",
        pointerEvents: "none",
        whiteSpace: "nowrap",
        fontFamily: "var(--font-body)",
        background: toast.isError ? "#ef4444" : "#10b981",
        color: "#fff",
      }}
    >
      {toast.msg}
    </div>
  );
}
