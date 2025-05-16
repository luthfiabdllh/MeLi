"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import type { ArticleComment as ArticleCommentType } from "@/lib/data"
import { useToast } from "../../../hooks/use-toast"
import ArticleCommentForm from "./articleCommentForm"
import ArticleComment from "./articleComment"

interface ArticleCommentsSectionProps {
  articleId: string
  initialComments: ArticleCommentType[]
}

export default function ArticleCommentsSection({ articleId, initialComments }: ArticleCommentsSectionProps) {
  const [comments, setComments] = useState<ArticleCommentType[]>(initialComments)
  const [showCommentForm, setShowCommentForm] = useState(false)
  const { toast } = useToast()

  const handleCommentAdded = () => {
    // In a real app, we would fetch the updated comments from the server
    // For now, we'll simulate adding a new comment
    const newComment: ArticleCommentType = {
      id: `comment-${Date.now()}`,
      user: {
        name: "Steve Rogers",
        username: "steve_rogers",
        avatar: "/placeholder.svg?height=40&width=40&text=SR",
      },
      text: "This is my new comment that I just added!",
      timestamp: "Just now",
      likes: 0,
      isLiked: false,
    }

    setComments([newComment, ...comments])
    setShowCommentForm(false)
  }

  const handleLike = (commentId: string) => {
    setComments(
      comments.map((comment) => {
        if (comment.id === commentId) {
          const isLiked = !comment.isLiked
          return {
            ...comment,
            isLiked,
            likes: isLiked ? comment.likes + 1 : comment.likes - 1,
          }
        }
        return comment
      }),
    )

    const comment = comments.find((c) => c.id === commentId)
    if (comment) {
      toast({
        title: comment.isLiked ? "Removed like" : "Comment liked",
        description: comment.isLiked ? "You've removed your like from this comment" : "You've liked this comment",
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Comments ({comments.length})</h2>
        {!showCommentForm && <Button onClick={() => setShowCommentForm(true)}>Add Comment</Button>}
      </div>

      {showCommentForm && (
        <div className="bg-slate-50 p-4 rounded-lg">
          <ArticleCommentForm articleId={articleId} onCommentAdded={handleCommentAdded} />
        </div>
      )}

      {comments.length > 0 ? (
        <div className="space-y-0 divide-y">
          {comments.map((comment) => (
            <ArticleComment key={comment.id} comment={comment} onLike={handleLike} />
          ))}
        </div>
      ) : (
        <div className="bg-slate-50 p-8 rounded-lg text-center">
          <p className="text-muted-foreground">No comments yet. Be the first to comment!</p>
          {!showCommentForm && (
            <Button className="mt-4" onClick={() => setShowCommentForm(true)}>
              Add Comment
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
