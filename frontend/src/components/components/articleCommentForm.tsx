"use client"

import type React from "react"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"
import { useToast } from "../../../hooks/use-toast"

interface ArticleCommentFormProps {
  articleId: string
  onCommentAdded: () => void
}

export default function ArticleCommentForm({ articleId, onCommentAdded }: ArticleCommentFormProps) {
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!comment.trim()) return

    setIsSubmitting(true)

    // Simulate API call to add comment
    setTimeout(() => {
      console.log("Comment submitted:", { articleId, comment })

      // Show success toast
      toast({
        title: "Comment added",
        description: "Your comment has been added successfully",
      })

      // Reset form
      setComment("")
      setIsSubmitting(false)

      // Notify parent component
      onCommentAdded()
    }, 1000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src="/placeholder.svg?height=40&width=40&text=SR" alt="Your avatar" />
          <AvatarFallback>SR</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <Textarea
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="min-h-[100px] resize-none"
          />
        </div>
      </div>
      <div className="flex justify-end">
        <Button type="submit" disabled={!comment.trim() || isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Posting...
            </>
          ) : (
            "Post Comment"
          )}
        </Button>
      </div>
    </form>
  )
}
