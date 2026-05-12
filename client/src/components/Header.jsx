export default function Header({ darkMode, onToggleDarkMode, onOpenHome }) {
  return (
    <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between px-4 sm:px-6 py-3 bg-white border-b border-gray-100 min-h-[64px]">
      <button
        type="button"
        className="flex items-center gap-3 bg-transparent border-none cursor-pointer p-0 text-left min-w-0"
        onClick={onOpenHome}
      >
        <span className="w-10 h-10 flex items-center justify-center bg-purple-100 rounded-xl text-xl">
          🥇
        </span>
        <span className="flex flex-col gap-0.5 min-w-0">
          <span className="text-[15px] font-bold text-gray-900 leading-tight truncate">
            Points &amp; Training
          </span>
          <span className="hidden sm:block text-[12.5px] text-gray-400 font-normal leading-tight truncate">
            Reward Points, Activity Points &amp; Training Slots
          </span>
        </span>
      </button>

      <button
        type="button"
        className="w-full sm:w-auto px-4 py-1.5 text-sm text-gray-700 border border-gray-300 rounded-full bg-white hover:bg-gray-50 transition-colors cursor-pointer"
        onClick={onToggleDarkMode}
      >
        {darkMode ? "Light" : "Dark"}
      </button>
    </header>
  );
}