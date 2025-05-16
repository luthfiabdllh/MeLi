"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import Link from "next/link"
import type { ArticleComment } from "@/lib/data"

interface ArticleCommentProps {
  comment: ArticleComment
  onLike: (commentId: string) => void
}

export default function ArticleComment({ comment, onLike }: ArticleCommentProps) {
  return (
    <div className="flex gap-3 py-4 border-b last:border-0">
      <Avatar className="h-10 w-10">
        <AvatarImage src={comment.user.avatar || "/placeholder.svg"} alt={comment.user.name} />
        <AvatarFallback>{comment.user.name.substring(0, 2)}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <Link href={`/user/${comment.user.username}`} className="font-medium hover:underline">
            {comment.user.name}
          </Link>
          <span className="text-xs text-muted-foreground">@{comment.user.username}</span>
          <span className="text-xs text-muted-foreground">· {comment.timestamp}</span>
        </div>
        <p className="text-sm mb-2">{comment.text}</p>
        <Button
          variant="ghost"
          size="sm"
          className={`gap-1 h-7 px-2 ${comment.isLiked ? "text-rose-500" : "text-muted-foreground"}`}
          onClick={() => onLike(comment.id)}
        >
          <Heart className={`h-4 w-4 ${comment.isLiked ? "fill-rose-500" : ""}`} />
          <span>{comment.likes}</span>
        </Button>
      </div>
    </div>
  )
}
