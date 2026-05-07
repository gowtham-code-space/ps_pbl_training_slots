import React, { useEffect } from 'react';

const Modal = ({ open, onClose, title, subtitle, children, maxWidthClass = 'max-w-lg' }) => {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose?.();
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
      role="dialog"
      aria-modal="true"
    >
      <div className={`w-full ${maxWidthClass} overflow-hidden rounded-[var(--radius-xl)] bg-white shadow-xl`}>
        <div className="flex items-start justify-between gap-4 bg-gradient-to-br from-slate-900 to-slate-800 px-[var(--space-card-x)] py-[var(--space-card-y)]">
          <div className="min-w-0">
            {title ? (
              <div className="truncate text-[length:var(--fs-lg)] font-extrabold text-white">
                {title}
              </div>
            ) : null}
            {subtitle ? (
              <div className="mt-1 text-[length:var(--fs-xs)] text-white/70">{subtitle}</div>
            ) : null}
          </div>
          <button
            type="button"
            className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/20 text-white/80 transition hover:bg-white/10 hover:text-white"
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="max-h-[85dvh] overflow-y-auto px-[var(--space-card-x)] py-[var(--space-card-y)]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
