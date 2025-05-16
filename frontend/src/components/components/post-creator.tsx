"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Pencil, ImageIcon, Video } from "lucide-react"
import PostCreatorDialog from "./postCreatorDialog"

export default function PostCreator() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

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
      <Card className="mb-4">
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              className="flex-1 gap-2 bg-amber-50 hover:bg-amber-100 border-amber-200"
              onClick={openDialog}
            >
              <Pencil className="h-4 w-4" />
              <span>Write a post</span>
            </Button>
            <Button
              variant="outline"
              className="flex-1 gap-2 bg-amber-50 hover:bg-amber-100 border-amber-200"
              onClick={openDialog}
            >
              <ImageIcon className="h-4 w-4" />
              <span>Upload photo</span>
            </Button>
            <Button
              variant="outline"
              className="flex-1 gap-2 bg-amber-50 hover:bg-amber-100 border-amber-200"
              onClick={openDialog}
            >
              <Video className="h-4 w-4" />
              <span>Upload video</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      <PostCreatorDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmitPost={handleSubmitPost}
        isSubmitting={isSubmitting}
      />
    </>
  )
}
