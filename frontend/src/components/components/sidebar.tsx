"use client"

import { BookOpen, CirclePlus, Home, LogOut, Settings, User, Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import PostCreatorDialog from "./postCreatorDialog";
import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getOwnUserDetails } from "@/app/api/user/profileApi";


export default function Sidebar() {
    const [dialogOpen, setDialogOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { data: session } = useSession();
    const Router = useRouter()
    const [user, setUser] = useState<any>(null)

    useEffect(() => {
      if (!session?.accessToken || !session?.user?.id) return;
      getOwnUserDetails(session.accessToken, session.user.id)
        .then(setUser)
        .catch(console.error);
    }, [session?.accessToken, session?.user?.id]);

    const handleSubmitPost = (text: string, media: File[]) => {
      setIsSubmitting(true)
  
      // Simulate API call
      setTimeout(() => {
        console.log("Post submitted:", { text, media })
        setIsSubmitting(false)
        setDialogOpen(false)
        // In a real app, you would add the post to the feed
      }, 1500)
    }
  
    const openDialog = () => {
      setDialogOpen(true)
    }

    const handleLogout = () => {
      signOut({
        callbackUrl: "/",
      })
    }

    const handleProfileClick = () => {
      Router.push("/app/profile")
    }

    const handleHomeClick = () => {
      Router.push("/app")
    }

    const handleCommunityClick = () => {
      Router.push("/communities")
    }
    
    const handleArticlesClick = () => {
      Router.push("/articles")
    }

  return (
    <>
      <div className="flex flex-col gap-6 p-4 h-full">
        <div className="flex flex-col items-center text-center py-4">
          <Avatar className="h-10 w-10 md:h-20 md:w-20 mb-3">
            <AvatarImage src={user?.image} alt="Steve Rogers" />
            <AvatarFallback>           
              {user?.username
                ? user?.username.split(" ").map((n: string) => n[0]).join("").toUpperCase()
                : "US"}
                </AvatarFallback>
          </Avatar>
          <h2 className="text-xl font-bold hidden md:block">
             {user?.username || "username"}
          </h2>
        </div>

        <Button onClick={handleHomeClick} variant="outline" className="w-full  gap-2 justify-center rounded-full hidden md:flex">
          <span className="font-medium text-gradient">Explore panel</span>
        </Button>

        <Button onClick={handleHomeClick} variant="outline" className="w-10 h-10 p-0 rounded-full flex md:hidden mx-auto">
          <Home className="h-5 w-5" />
        </Button>

        <nav className="flex flex-col gap-2">
          <Button onClick={handleProfileClick} variant="ghost" className="justify-start gap-2 text-slate-700 sm:px-2 md:px-4">
            <User className="h-5 w-5 flex-shrink-0" />
            <span className="hidden md:inline">Profil</span>
          </Button>
          <Button onClick={handleCommunityClick} variant="ghost" className="justify-start gap-2 text-slate-700 sm:px-2 md:px-4">
            <Users className="h-5 w-5 flex-shrink-0" />
            <span className="hidden md:inline">Komunitas Sehat</span>
          </Button>
          <Button onClick={handleArticlesClick} variant="ghost" className="justify-start gap-2 text-slate-700 sm:px-2 md:px-4">
            <BookOpen className="h-5 w-5 flex-shrink-0" />
            <span className="hidden md:inline">Artikel</span>
          </Button>
          <Button variant="ghost" onClick={openDialog} className="justify-start gap-2 text-slate-700 sm:px-2 md:px-4">
            <CirclePlus className="h-5 w-5 flex-shrink-0" />
            <span className="hidden md:inline">Buat Postingan</span>
          </Button>
          <Button variant="ghost" className="justify-start gap-2 text-slate-700 sm:px-2 md:px-4">
            <Settings className="h-5 w-5 flex-shrink-0" />
            <span className="hidden md:inline">Pengaturan</span>
          </Button>
          <Button onClick={handleLogout} variant="ghost" className="justify-start gap-2 text-red-600 sm:px-2 md:px-4">
            <LogOut className="h-5 w-5 flex-shrink-0" />
            <span className="hidden md:inline">Log out</span>
          </Button>
        </nav>
      </div>
      <PostCreatorDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmitPost={handleSubmitPost}
        isSubmitting={isSubmitting}
      />
    </>
  )
}
