"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageSquare, Share2, ChevronDown, ChevronUp } from "lucide-react"
import Image from "next/image"

interface ReplyType {
  id: string
  user: {
    name: string
    username: string
    avatar: string
  }
  content: {
    text: string
    image?: string
  }
  timestamp: string
  likes: number
}

interface PostProps {
  id: string
  user: {
    name: string
    username: string
    avatar: string
  }
  content: {
    text: string
    image?: string
    verified?: boolean
  }
  engagement: {
    likes: number
    replies: number
    shares: number
  }
  timestamp: string
  replies?: ReplyType[]
}

export default function Post({user, content, engagement, timestamp, replies = [] }: PostProps) {
  const [showReplies, setShowReplies] = useState(false)

  return (
    <Card className="mb-4">
      <CardHeader className="flex flex-row items-start gap-4 pb-2">
        <Avatar className="h-12 w-12">
          <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
          <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-bold">{user.name}</span>
            <span className="text-muted-foreground">@{user.username}</span>
            {content.verified && (
              <Badge variant="outline" className="ml-auto bg-green-50 text-green-600 border-green-200">
                Postingan diverifikasi
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground">Dokter spesialis klinik kesehatan GMC UGM</p>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="mb-3">{content.text}</p>
        {content.image && (
          <div className="rounded-md overflow-hidden">
            <Image width={800} height={800} src={content.image || "/placeholder.svg"} alt="Post image" className="w-full object-cover" />
          </div>
        )}
        <p className="text-xs text-muted-foreground mt-2">{timestamp}</p>
      </CardContent>
      <CardFooter className="flex justify-between pt-2 flex-wrap gap-2">
        <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground">
          <Heart className="h-4 w-4" />
          <span>Like {engagement.likes}</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="gap-1 text-muted-foreground"
          onClick={() => setShowReplies(!showReplies)}
        >
          <MessageSquare className="h-4 w-4" />
          <span>{engagement.replies} Replies</span>
          {replies.length > 0 &&
            (showReplies ? <ChevronUp className="h-3 w-3 ml-1" /> : <ChevronDown className="h-3 w-3 ml-1" />)}
        </Button>
        <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground">
          <Share2 className="h-4 w-4" />
          <span>{engagement.shares}</span>
        </Button>
        <Button variant="ghost" size="sm" className="text-muted-foreground">
          Reply
        </Button>
      </CardFooter>

      {/* Replies section */}
      {showReplies && replies.length > 0 && (
        <div className="px-4 pb-4">
          <div className="border-l-2 border-gray-200 pl-4 ml-6 mt-2 space-y-4">
            {replies.map((reply) => (
              <div key={reply.id} className="pt-2">
                <div className="flex gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={reply.user.avatar || "/placeholder.svg"} alt={reply.user.name} />
                    <AvatarFallback>{reply.user.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm">{reply.user.name}</span>
                      <span className="text-xs text-muted-foreground">@{reply.user.username}</span>
                      <span className="text-xs text-muted-foreground">· {reply.timestamp}</span>
                    </div>
                    <p className="text-sm mt-1">{reply.content.text}</p>
                    {reply.content.image && (
                      <div className="rounded-md overflow-hidden mt-2">
                        <Image
                          width={800}
                          height={800}
                          src={reply.content.image || "/placeholder.svg"}
                          alt="Reply image"
                          className="w-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex gap-4 mt-2">
                      <Button variant="ghost" size="sm" className="h-6 px-2 text-xs gap-1 text-muted-foreground">
                        <Heart className="h-3 w-3" />
                        <span>{reply.likes}</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="h-6 px-2 text-xs text-muted-foreground">
                        Reply
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  )
}
