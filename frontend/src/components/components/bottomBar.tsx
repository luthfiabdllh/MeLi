"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, User, Users, Settings, CirclePlus, BookOpen } from "lucide-react"
import PostCreatorDialog from "./postCreatorDialog"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { getOwnUserDetails } from "@/app/api/user/profileApi"

export default function BottomBar() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { data: session } = useSession();
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

  return (
    <>
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 py-2">
      <div className="flex items-center justify-around">
        <Button variant="ghost" size="icon" asChild className="flex flex-col items-center gap-1 h-auto py-1">
          <Link href="/">
            <Home className="h-5 w-5" />
            <span className="text-xs">Home</span>
          </Link>
        </Button>
        <Button variant="ghost" size="icon" asChild className="flex flex-col items-center gap-1 h-auto py-1">
          <Link href="/articles">
            <BookOpen className="h-5 w-5" />
            <span className="text-xs">Artikel</span>
          </Link>
        </Button>
        <Button variant="ghost" onClick={openDialog} size="icon" asChild className="flex flex-col items-center gap-1 h-auto py-1">
          <div>
            <CirclePlus className="h-5 w-5" />
            <span className="text-xs">Posting</span>
          </div>
        </Button>
        <Button variant="ghost" size="icon" asChild className="flex flex-col items-center gap-1 h-auto py-1">
          <Link href="/communities">
            <Users className="h-5 w-5" />
            <span className="text-xs">Komunitas</span>
          </Link>
        </Button>
        <Button variant="ghost" size="icon" asChild className="flex flex-col items-center gap-1 h-auto py-1">
          <Link href="/profile">
            <User className="h-5 w-5" />
            <span className="text-xs">Profil</span>
          </Link>
        </Button>
      </div>
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
