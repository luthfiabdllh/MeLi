"use client"

import type React from "react"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageSquare, Share2, ChevronDown, ChevronUp, Copy, Facebook, Twitter, Linkedin } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import type { PostType, Reply } from "@/lib/data"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "../../../hooks/use-toast"
import ImageViewer from "./imageViewer"
import ReplyDialog from "./replyDialog"
import { useSession } from "next-auth/react"
import { like, unlike } from "@/app/api/thread/like"
import { replyThread } from "@/app/api/thread/replyThread"

interface PostProps extends PostType {}

export default function Post({ id, user, content, engagement, timestamp, replies = [] }: PostProps) {
  const { data: session } = useSession();
  const [showReplies, setShowReplies] = useState(false)
  const [replyDialogOpen, setReplyDialogOpen] = useState(false)
  const [replyingTo, setReplyingTo] = useState<{
    id: string
    username: string
    text: string
    isPost?: boolean
  } | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  // State for likes and shares
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(engagement.likes)
  const [shareCount, setShareCount] = useState(engagement.shares)

  // State for image viewer
  const [imageViewerOpen, setImageViewerOpen] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  const handlePostClick = (e: React.MouseEvent) => {
    // Don't navigate if clicking on a button or link
    if ((e.target as HTMLElement).closest("button") || (e.target as HTMLElement).closest("a")) {
      return
    }

    router.push(`/post/${id}`)
  }

  const handleReplyToPost = (e: React.MouseEvent) => {
    e.stopPropagation()
    setReplyingTo({
      id,
      username: user.username,
      text: content.text,
      isPost: true,
    })
    setReplyDialogOpen(true)
  }

  const handleReplyToComment = (replyId: string, username: string, text: string) => {
    setReplyingTo({
      id: replyId,
      username,
      text,
    })
    setReplyDialogOpen(true)
  }

  const handleSubmitReply = async (text: string) => {
    setIsSubmitting(true);

    try {
      // Kirim reply ke thread atau comment
      const comment = await replyThread(
        session?.accessToken!,
        id,
        {
          content: text,
        }
      );
      toast({
        title: "Reply sent",
        description: "Your reply has been posted.",
      });
      setReplyDialogOpen(false);
      setReplyingTo(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send reply.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!session?.accessToken) {
      toast({
        title: "Login required",
        description: "You must be logged in to like a post.",
        variant: "destructive",
      });
      return;
    }

    try {
      if (!liked) {
        // Like thread
        const thread = await like(session.accessToken, id);
        setLiked(true);
        setLikeCount(thread.like_count);
        toast({
          title: "Post liked",
          description: "You've liked this post",
        });
      } else {
        // Unlike thread
        const thread = await unlike(session.accessToken, id);
        setLiked(false);
        setLikeCount(thread.like_count);
        toast({
          title: "Like removed",
          description: "You've unliked this post",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update like status.",
        variant: "destructive",
      });
    }
  };

    const handleShare = (platform: string) => {
      // Increase share count
      setShareCount((prev) => prev + 1)

      // In a real app, you would implement actual sharing functionality
      const shareUrl = `${window.location.origin}/post/${id}`

      // Show toast based on share type
      toast({
        title: `Shared on ${platform}`,
        description: platform === "copy" ? "Link copied to clipboard!" : `Post shared on ${platform}`,
      })

      // If copying to clipboard
      if (platform === "copy") {
        navigator.clipboard.writeText(shareUrl)
      } else {
        console.log(`Sharing to ${platform}: ${shareUrl}`)
        // In a real app, you would open the respective sharing dialog
      }
    }

    const handleImageClick = (index: number, e: React.MouseEvent) => {
      e.stopPropagation()
      setSelectedImageIndex(index)
      setImageViewerOpen(true)
    }

  // Function to render media grid for replies
  const renderReplyMediaGrid = (images?: string[], replyId?: string) => {
    if (!images || images.length === 0) return null

    return (
      <div
        className={`grid gap-1 mt-2 rounded-lg overflow-hidden ${
          images.length === 1
            ? "grid-cols-1"
            : images.length === 2
              ? "grid-cols-2"
              : images.length >= 3
                ? "grid-cols-2"
                : ""
        }`}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className={`relative ${
              images.length === 3 && index === 0 ? "col-span-2 row-span-2" : images.length === 4 ? "aspect-square" : ""
            }`}
            onClick={(e) => {
              e.stopPropagation()
              setSelectedImageIndex(index)
              setImageViewerOpen(true)
            }}
          >
            <img
              src={image || "/placeholder.svg"}
              alt={`Reply image ${index + 1}`}
              className={`w-full h-full object-cover ${
                images.length === 1 ? "max-h-[200px]" : "aspect-square"
              } cursor-pointer hover:opacity-90 transition-opacity`}
            />
          </div>
        ))}
      </div>
    )
  }

  // Function to render replies with proper nesting
  const renderReplies = (replies: Reply[], level = 0, parentId?: string) => {
    // For the feed, only show first level replies and limit to 2
    if (level > 0 || replies.length === 0) return null

    const displayReplies = replies.slice(0, 2)

    return (
      <div className="border-l-2 border-gray-200 pl-4 ml-6 mt-2 space-y-4">
        {displayReplies.map((reply) => (
          <div
            key={reply.id}
            className="pt-2 relative cursor-pointer hover:bg-slate-100 rounded-md transition-colors"
            onClick={(e) => {
              e.stopPropagation()
              router.push(`/post/${id}/reply/${reply.id}`)
            }}
          >
            {/* Horizontal connecting line */}
            <div className="absolute w-4 h-0.5 bg-slate-200 left-[-16px] top-[30px]" />

            <div className="flex gap-3">
              <Link href={`/user/${reply.user.username}`} onClick={(e) => e.stopPropagation()}>
                <Avatar className="h-8 w-8">
                  <AvatarImage src={reply.user.avatar || "/placeholder.svg"} alt={reply.user.name} />
                  <AvatarFallback>{reply.user.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
              </Link>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Link
                    href={`/user/${reply.user.username}`}
                    className="font-semibold text-sm hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {reply.user.name}
                  </Link>
                  <Link
                    href={`/user/${reply.user.username}`}
                    className="text-xs text-muted-foreground hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    @{reply.user.username}
                  </Link>
                  <span className="text-xs text-muted-foreground">· {reply.timestamp}</span>
                </div>
                {reply.replyingTo && (
                  <p className="text-xs text-muted-foreground">
                    Replying to <span className="text-blue-500">@{reply.replyingTo.username}</span>
                  </p>
                )}
                <p className="text-sm mt-1">{reply.content.text}</p>

                {/* Render media grid for reply */}
                {reply.content.images && renderReplyMediaGrid(reply.content.images, reply.id)}
                {reply.content.image && !reply.content.images && renderReplyMediaGrid([reply.content.image], reply.id)}

                <div className="flex gap-4 mt-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 px-2 text-xs gap-1 text-muted-foreground"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span>{reply.likes}</span>
                    <Heart className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 px-2 text-xs text-muted-foreground"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleReplyToComment(reply.id, reply.user.username, reply.content.text)
                    }}
                  >
                    Reply
                  </Button>
                </div>
              </div>
            </div>

            {/* Show indicator if this reply has nested replies */}
            {reply.replies && reply.replies.length > 0 && (
              <div className="ml-8 mt-2 text-xs text-blue-500">
                <Link
                  href={`/post/${id}/reply/${reply.id}`}
                  className="hover:underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  Show {reply.replies.length} more {reply.replies.length === 1 ? "reply" : "replies"}
                </Link>
              </div>
            )}
          </div>
        ))}

        {/* Show "View more" link if there are more replies */}
        {replies.length > 2 && (
          <Link
            href={`/post/${id}`}
            className="text-sm text-blue-500 hover:underline block pt-2"
            onClick={(e) => e.stopPropagation()}
          >
            Show all {replies.length} replies
          </Link>
        )}
      </div>
    )
  }

  // Function to render media grid
  const renderMediaGrid = () => {
    // If there's no image, return null
    if (!content.images && !content.image) return null

    // Convert single image to array for consistent handling
    const images = content.images || (content.image ? [content.image] : [])
    if (images.length === 0) return null

    return (
      <div
        className={`grid gap-1 mt-3 rounded-lg overflow-hidden ${
          images.length === 1
            ? "grid-cols-1"
            : images.length === 2
              ? "grid-cols-2"
              : images.length >= 3
                ? "grid-cols-2"
                : ""
        }`}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className={`relative ${
              images.length === 3 && index === 0 ? "col-span-2 row-span-2" : images.length === 4 ? "aspect-square" : ""
            }`}
            onClick={(e) => handleImageClick(index, e)}
          >
            <img
              src={image || "/placeholder.svg"}
              alt={`Post image ${index + 1}`}
              className={`w-full h-full object-cover ${
                images.length === 1 ? "max-h-[400px]" : "aspect-square"
              } cursor-pointer hover:opacity-90 transition-opacity`}
            />
          </div>
        ))}
      </div>
    )
  }

  // Get all images for the image viewer
  const getAllImages = () => {
    return content.images || (content.image ? [content.image] : [])
  }

  return (
    <>
      <Card className="mb-4 cursor-pointer hover:bg-slate-50 transition-colors" onClick={handlePostClick}>
        <CardHeader className="flex flex-row items-start gap-4 pb-2">
          <Link href={`/user/${user.username}`} onClick={(e) => e.stopPropagation()}>
            <Avatar className="h-12 w-12">
              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
              <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
          </Link>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <Link
                href={`/user/${user.username}`}
                className="font-bold hover:underline"
                onClick={(e) => e.stopPropagation()}
              >
                {user.name}
              </Link>
              {content.verified && (
                <Badge variant="outline" className="ml-auto bg-green-50 text-green-600 border-green-200">
                  Postingan diverifikasi
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">@{user.username}</p>
          </div>
        </CardHeader>
        <CardContent className="pb-2">
          <p className="mb-3">{content.text}</p>
          {renderMediaGrid()}
          <p className="text-xs text-muted-foreground mt-2">{timestamp}</p>
        </CardContent>
        <CardFooter className="flex justify-between pt-2 flex-wrap gap-2">
            <Button
            variant="ghost"
            size="sm"
            className={`gap-1 ${liked ? "text-muted-foreground" : "text-muted-foreground"}`}
            onClick={handleLike}
            >
            <Heart className={`h-4 w-4 ${liked ? "fill-muted-foreground" : ""}`} />
            <span>{likeCount} Likes</span>
            </Button>
          <Button
            variant="ghost"
            size="sm"
            className="gap-1 text-muted-foreground"
            onClick={(e) => {
              e.stopPropagation()
              if (replies.length > 0) {
                setShowReplies(!showReplies)
              } else {
                router.push(`/post/${id}`)
              }
            }}
          >
            <MessageSquare className="h-4 w-4" />
            <span>{engagement.replies} Replies</span>
            {replies.length > 0 &&
              (showReplies ? <ChevronUp className="h-3 w-3 ml-1" /> : <ChevronDown className="h-3 w-3 ml-1" />)}
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="gap-1 text-muted-foreground"
                onClick={(e) => e.stopPropagation()}
              >
                <Share2 className="h-4 w-4" />
                <span>{shareCount}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
              <DropdownMenuItem onClick={() => handleShare("copy")}>
                <Copy className="h-4 w-4 mr-2" />
                Copy Link
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleShare("Facebook")}>
                <Facebook className="h-4 w-4 mr-2" />
                Share on Facebook
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleShare("Twitter")}>
                <Twitter className="h-4 w-4 mr-2" />
                Share on Twitter
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleShare("LinkedIn")}>
                <Linkedin className="h-4 w-4 mr-2" />
                Share on LinkedIn
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="ghost" size="sm" className="text-blue-500" onClick={handleReplyToPost}>
            Reply
          </Button>
        </CardFooter>

        {/* Replies section */}
        {showReplies && replies.length > 0 && (
          <div className="px-4 pb-4" onClick={(e) => e.stopPropagation()}>
            {renderReplies(replies)}
          </div>
        )}
      </Card>

      {/* Reply Dialog */}
      <ReplyDialog
        open={replyDialogOpen}
        onOpenChange={setReplyDialogOpen}
        replyingTo={replyingTo}
        onSubmitReply={handleSubmitReply}
        isSubmitting={isSubmitting}
      />

      {/* Image Viewer */}
      <ImageViewer
        images={getAllImages()}
        initialIndex={selectedImageIndex}
        open={imageViewerOpen}
        onOpenChange={setImageViewerOpen}
      />
    </>
  )
}
