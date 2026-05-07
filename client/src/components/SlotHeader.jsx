import React from 'react';

const SlotHeader = ({ isDark, onToggleDark }) => {
  return (
    <div className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 px-[var(--space-page-x)] py-[var(--space-3)] backdrop-blur">
      <div className="mx-auto flex w-full max-w-[var(--w-container)] items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-[var(--radius-md)] bg-[color:var(--color-secondary)] text-[length:var(--fs-md)]">
            🏅
          </div>
          <div className="min-w-0">
            <div className="truncate text-[length:var(--fs-lg)] font-extrabold text-slate-900">
              Points &amp; Training
            </div>
            <div className="mt-0.5 truncate text-[length:var(--fs-xs)] text-slate-400">
              Reward Points, Activity Points &amp; Training Slots
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onToggleDark}
          className="rounded-full border border-slate-200 bg-white px-4 py-2 text-[length:var(--fs-xs)] font-bold text-slate-600 transition hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
        >
          {isDark ? 'Light' : 'Dark'}
        </button>
      </div>
    </div>
  );
};

export default SlotHeader;
