import React from "react";

export default function DashboardLayout({
  children,
  }: {
  children: React.ReactNode
}) {
  return (
    <div className="flex">
      <aside className="w-48 min-h-screen border-r border-gray-200 p-4">
        <nav className="space-y-2">
          <p className="font-bold mb-4">대시보드</p>
          <a href="/dashboard" className="block text-blue-500 hover:underline">홈</a>
          <a href="/about" className="block text-blue-500 hover:underline">About</a>
        </nav>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  )
}