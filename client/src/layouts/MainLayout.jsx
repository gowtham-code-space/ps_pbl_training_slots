import React from 'react';

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-dvh bg-[var(--color-bg)] text-slate-900">
      {children}
    </div>
  );
};

export default MainLayout;
