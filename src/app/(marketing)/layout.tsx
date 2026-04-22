import React from "react";

export default function MarketingLayout({
  children,
  }: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <header className="p-4 border-b border-gray-200">
        <nav className="text-lg font-bold">Marketing Layout</nav>
      </header>
      <div className="p-8">{children}</div>
    </div>
  )
}