export default function Header({ darkMode, onToggleDarkMode, onOpenHome }) {
  return (
    <header className="flex items-center justify-between px-6 py-3 bg-white border-b border-gray-100 min-h-[64px]">
      <button
        type="button"
        className="flex items-center gap-3 bg-transparent border-none cursor-pointer p-0 text-left"
        onClick={onOpenHome}
      >
        <span className="w-10 h-10 flex items-center justify-center bg-purple-100 rounded-xl text-xl">
          🥇
        </span>
        <span className="flex flex-col gap-0.5">
          <span className="text-[15px] font-bold text-gray-900 leading-tight">
            Points &amp; Training
          </span>
          <span className="text-[12.5px] text-gray-400 font-normal leading-tight">
            Reward Points, Activity Points &amp; Training Slots
          </span>
        </span>
      </button>

      <button
        type="button"
        className="px-4 py-1.5 text-sm text-gray-700 border border-gray-300 rounded-full bg-white hover:bg-gray-50 transition-colors cursor-pointer"
        onClick={onToggleDarkMode}
      >
        {darkMode ? "Light" : "Dark"}
      </button>
    </header>
  );
}