"use client"

import type { ReactNode } from "react"
import Header from "./header"
import Sidebar from "./sidebar"
import BottomBar from "./bottomBar"
import DefaultRightSidebar from "./rightSidebat"
import SessionProviderWrapper from "./sessionProviderWrappar"

interface LayoutProps {
  children: ReactNode
  rightSidebarContent?: ReactNode
}

export default function AppLayout({ children, rightSidebarContent }: LayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50">
    {/* Fixed Header */}
    <Header />

    <div className="flex">
      {/* Left Sidebar - Collapses to icons on smaller screens */}
      <aside
        className="hidden sm:block fixed left-0 top-16 bottom-0 bg-white border-r overflow-y-auto transition-all duration-300 
                        sm:w-16 md:w-64 lg:w-72"
      >
        <Sidebar />
      </aside>

      {/* Main Content - Adjusts based on sidebar visibility */}
      <main
        className="flex-1 min-h-[calc(100vh-64px)] 
                       sm:ml-16 md:ml-64 lg:ml-72 
                       lg:mr-100 p-4"
      >
        <div className="max-w-2xl mx-auto pb-16 sm:pb-0">{children}</div>
      </main>

      {/* Right Sidebar - Fixed on large screens, hidden on smaller screens */}
      <aside className="hidden lg:block w-[400px] fixed right-0 top-16 bottom-0 scrollbar-hidden overflow-y-auto">
        <div className="p-4">{rightSidebarContent || <DefaultRightSidebar />}</div>
      </aside>
    </div>

    {/* Mobile Bottom Bar - Only visible on small screens */}
    <div className="sm:hidden">
      <BottomBar />
    </div>
  </div>
  )
}
