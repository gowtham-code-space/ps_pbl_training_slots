import { useStore } from "../store/useStore";

export default function Header({ showBack = false, backPage = "dashboard" }) {
  const { state, navigate, toggleDark } = useStore();
  const { darkMode } = state;

  return (
    <header
      className="sticky top-0 z-50 flex items-center justify-between gap-3 px-6 py-3.5 border-b shadow-sm transition-colors duration-300"
      style={{
        background: "var(--white)",
        borderColor: "var(--border)",
        boxShadow: "0 1px 8px rgba(0,0,0,0.06)",
      }}
    >
      {/* LEFT */}
      <div className="flex items-center gap-2.5">
        {showBack ? (
          <button
            onClick={() => navigate(backPage)}
            className="flex items-center gap-2 px-4 py-2 rounded-[10px] text-sm font-bold transition-all duration-200 border-[1.5px]"
            style={{
              borderColor: "var(--border)",
              color: "var(--text2)",
              background: "transparent",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--purple)";
              e.currentTarget.style.color = "var(--purple)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border)";
              e.currentTarget.style.color = "var(--text2)";
            }}
          >
            ← Back
          </button>
        ) : (
          <div
            className="text-[17px] font-extrabold"
            style={{ color: "var(--text)", fontFamily: "var(--font-head)" }}
          >
            PCDP Portal{" "}
            <span
              className="text-[10px] font-bold rounded-md px-1.5 py-0.5 ml-1 border"
              style={{
                background: "rgba(239,68,68,0.12)",
                color: "#dc2626",
                borderColor: "rgba(239,68,68,0.3)",
              }}
            >
              Admin
            </span>
          </div>
        )}
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-2.5">
        {/* Dark mode toggle */}
        <button
          onClick={toggleDark}
          className="px-3.5 py-1.5 rounded-lg border-[1.5px] text-xs font-bold transition-all duration-200"
          style={{
            borderColor: "var(--border)",
            color: "var(--text2)",
            background: "transparent",
            fontFamily: "var(--font-body)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--purple)";
            e.currentTarget.style.color = "var(--purple)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--border)";
            e.currentTarget.style.color = "var(--text2)";
          }}
        >
          {darkMode ? "☀️" : "🌙 Dark"}
        </button>

        {/* Admin avatar + name */}
        {!showBack && (
          <div className="flex items-center gap-2.5 cursor-pointer">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-extrabold text-white flex-shrink-0"
              style={{
                background: "linear-gradient(135deg, #ef4444 0%, #f97316 100%)",
                fontFamily: "var(--font-head)",
              }}
            >
              AD
            </div>
            <div>
              <div
                className="text-[13px] font-bold hidden sm:block"
                style={{ color: "var(--text)", fontFamily: "var(--font-head)" }}
              >
                ADMIN
              </div>
              <div className="text-[11px]" style={{ color: "var(--text3)" }}>
                BIT · Super Admin
              </div>
            </div>
          </div>
        )}

        {/* Back pages — show only avatar */}
        {showBack && (
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-extrabold text-white flex-shrink-0"
            style={{
              background: "linear-gradient(135deg, #ef4444 0%, #f97316 100%)",
              fontFamily: "var(--font-head)",
            }}
          >
            AD
          </div>
        )}
      </div>
    </header>
  );
}
