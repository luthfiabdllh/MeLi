"use client"

import type { ReactNode } from "react"
import Header from "./header"
import Sidebar from "./sidebar"
import BottomBar from "./bottomBar"
import { SessionProvider } from "next-auth/react"

interface FullWidthLayoutProps {
  children: ReactNode
}

export default function AppLayoutFull({ children }: FullWidthLayoutProps) {
  return (
    <SessionProvider>
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

        {/* Main Content - Full width without right sidebar */}
        <main
          className="flex-1 min-h-[calc(100vh-64px)] 
                         sm:ml-16 md:ml-64 lg:ml-72 
                         p-4"
        >
          <div className="max-w-5xl mx-auto">{children}</div>
        </main>
      </div>

      {/* Mobile Bottom Bar - Only visible on small screens */}
      <div className="sm:hidden">
        <BottomBar />
      </div>
    </div>
    </SessionProvider>
  )
}
