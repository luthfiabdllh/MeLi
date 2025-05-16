"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ImageIcon, Video, Loader2 } from "lucide-react"
import MediaPreviewSlider from "./mediaPreviewSlider"
import { useSession } from "next-auth/react"
import { createThread, uploadImage } from "@/app/api/thread/createThread"
import { getOwnUserDetails } from "@/app/api/user/profileApi"

interface PostCreatorDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmitPost: (text: string, media: File[]) => void
  isSubmitting: boolean
}

export default function PostCreatorDialog({ open, onOpenChange, onSubmitPost, isSubmitting }: PostCreatorDialogProps) {
  const [postText, setPostText] = useState("")
  const [mediaFiles, setMediaFiles] = useState<File[]>([])
  const [mediaPreviews, setMediaPreviews] = useState<string[]>([])
  const [user, setUser] = useState<any>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { data: session } = useSession()

  useEffect(() => {
    if (!session?.accessToken || !session?.user?.id) return;
    getOwnUserDetails(session.accessToken, session.user.id)
      .then(setUser)
      .catch(console.error);
  }, [session?.accessToken, session?.user?.id]);

  const handleSubmit = async () => {
    if (!postText.trim() && mediaFiles.length === 0) return
    if (!session?.accessToken) return;

    try {
      let imageId: number | null = null;

      // Upload image jika ada file
      if (mediaFiles.length > 0) {
        imageId = await uploadImage(session.accessToken, mediaFiles[0]);
      }

      console.log("Image ID:", imageId);

      // Selalu kirim image_id (null jika tidak upload)
      const payload: any = {
        content: postText,
        image_id: imageId,
      };

      await createThread(session.accessToken, payload);

      resetForm();
      onOpenChange(false);
    } catch (error) {
      console.error("Error creating post:", error)
    }
  }

  const resetForm = () => {
    setPostText("")
    setMediaFiles([])
    setMediaPreviews([])
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const newFiles: File[] = []
    const newPreviews: string[] = []

    // Only add files if we're under the limit of 4
    for (let i = 0; i < files.length; i++) {
      if (mediaFiles.length + newFiles.length >= 1) break

      const file = files[i]
      newFiles.push(file)

      // Create preview URL
      const previewUrl = URL.createObjectURL(file)
      newPreviews.push(previewUrl)
    }

    setMediaFiles([...mediaFiles, ...newFiles])
    setMediaPreviews([...mediaPreviews, ...newPreviews])

    // Reset the input so the same file can be selected again
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const removeMedia = (index: number) => {
    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(mediaPreviews[index])

    const newFiles = [...mediaFiles]
    const newPreviews = [...mediaPreviews]

    newFiles.splice(index, 1)
    newPreviews.splice(index, 1)

    setMediaFiles(newFiles)
    setMediaPreviews(newPreviews)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(newOpen) => {
        if (!newOpen && !isSubmitting) {
          resetForm()
        }
        onOpenChange(newOpen)
      }}
    >
      <DialogContent className="sm:max-w-md md:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create Post</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user?.image} alt="PR" />
              <AvatarFallback>SR</AvatarFallback>
            </Avatar>
            <Textarea
              placeholder="What's happening?"
              className="flex-1 resize-none border-1 shadow-none focus-visible:ring-2 text-lg break-all"
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              rows={3}
              
              autoFocus
            />
          </div>

          {/* Media previews slider */}
          {mediaPreviews.length > 0 && (
            <MediaPreviewSlider mediaPreviews={mediaPreviews} mediaFiles={mediaFiles} onRemove={removeMedia} />
          )}
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2 sm:justify-between items-center">
          <div className="flex gap-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*,video/*"
              multiple
              className="hidden"
              disabled={mediaFiles.length >= 1 || isSubmitting}
            />
            <Button
              variant="outline"
              size="sm"
              className="text-blue-500"
              onClick={() => fileInputRef.current?.click()}
              disabled={mediaFiles.length >= 1 || isSubmitting}
            >
              <ImageIcon className="h-4 w-4 mr-2" />
              Photo
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-blue-500"
              onClick={() => fileInputRef.current?.click()}
              disabled={mediaFiles.length >= 1 || isSubmitting}
            >
              <Video className="h-4 w-4 mr-2" />
              Video
            </Button>
            <div className="text-xs text-muted-foreground">{mediaFiles.length}/1</div>
          </div>
          <Button
            onClick={handleSubmit}
            disabled={(!postText.trim() && mediaFiles.length === 0) || isSubmitting}
            className="w-full sm:w-auto"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Posting...
              </>
            ) : (
              "Post"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
