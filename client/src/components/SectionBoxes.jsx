import React from 'react';

const SectionBoxes = ({ activeKey, onSelect }) => {
  const boxClass = (isActive) =>
    [
      'group flex w-full items-center gap-4 rounded-[var(--radius-card)] border-2 bg-white px-[var(--space-card-x)] py-[var(--space-card-y)] transition',
      isActive
        ? 'border-[var(--color-primary)] bg-[color:var(--color-secondary)]'
        : 'border-slate-200 hover:border-[var(--color-primary)] hover:shadow-lg',
    ].join(' ');

  const iconWrapClass =
    'grid h-11 w-11 shrink-0 place-items-center rounded-[var(--radius-md)] bg-[color:var(--color-secondary)] text-[var(--color-primary)]';

  const arrowClass = (isActive) =>
    ['text-xl leading-none transition', isActive ? 'text-[var(--color-primary)]' : 'text-slate-400'].join(
      ' '
    );

  return (
    <div className="flex flex-col gap-[var(--space-2)] px-[var(--space-page-x)] pt-[var(--space-4)]">
      <button type="button" className={boxClass(activeKey === 'points')} onClick={() => onSelect('points')}>
        <div className={iconWrapClass} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
            <rect x="18" y="3" width="4" height="18" />
            <rect x="10" y="8" width="4" height="13" />
            <rect x="2" y="13" width="4" height="8" />
          </svg>
        </div>
        <div className="min-w-0 flex-1 text-left">
          <div className="truncate text-[length:var(--fs-md)] font-bold text-slate-900">Points Dashboard</div>
          <div className="mt-0.5 truncate text-[length:var(--fs-xs)] font-medium text-slate-500">
            Reward &amp; Activity Points Rankings
          </div>
        </div>
        <span className={arrowClass(activeKey === 'points')} aria-hidden="true">
          ›
        </span>
      </button>

      <button type="button" className={boxClass(activeKey === 'slots')} onClick={() => onSelect('slots')}>
        <div className={iconWrapClass} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        </div>
        <div className="min-w-0 flex-1 text-left">
          <div className="truncate text-[length:var(--fs-md)] font-bold text-slate-900">Training Slots</div>
          <div className="mt-0.5 truncate text-[length:var(--fs-xs)] font-medium text-slate-500">
            PS &amp; PBL Lab Booking
          </div>
        </div>
        <span className={arrowClass(activeKey === 'slots')} aria-hidden="true">
          ›
        </span>
      </button>
    </div>
  );
};

export default SectionBoxes;
