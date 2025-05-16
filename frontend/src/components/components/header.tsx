"use client"

import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Home, Bell, Search, BotMessageSquare } from "lucide-react"
import { useMediaQuery } from "../../../hooks/use-media-query"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { getOwnUserDetails } from "@/app/api/user/profileApi"

export default function Header() {
  const isDesktop = useMediaQuery("(min-width: 768px)")
    const { data: session } = useSession();

  const [user, setUser] = useState<any>(null)
  
  useEffect(() => {
    if (!session?.accessToken || !session?.user?.id) return;
    getOwnUserDetails(session.accessToken, session.user.id)
      .then(setUser)
      .catch(console.error);
  }, [session?.accessToken, session?.user?.id]);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4 md:gap-6">
          <Link href="/app" className="text-2xl font-bold text-blue-500">
            MeLi
          </Link>
          <div className="relative hidden md:block w-[400px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for friends here..."
              className="w-full rounded-full pl-8 bg-slate-100 border-none"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <nav className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild className="text-slate-600">
              <Link href="/app">
                <Home className="h-5 w-5" />
                <span className="sr-only">Home</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild className="text-slate-600">
              <Link href="/chatAi">
                <BotMessageSquare className="h-5 w-5" />
                <span className="sr-only">Messages</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild className="text-slate-600">
              <Link href="/notifications">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
              </Link>
            </Button>
          </nav>

          <div className="flex items-center gap-2">
            <Avatar className="h-9 w-9 bg-rose-200">
              <AvatarImage src={user?.image} alt="@user?.username" />
              <AvatarFallback>SR</AvatarFallback>
            </Avatar>
            {isDesktop && (
              <div className="text-sm">
                <p className="font-medium">{user?.username}</p>
                <p className="text-xs text-muted-foreground">@{user?.username}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
