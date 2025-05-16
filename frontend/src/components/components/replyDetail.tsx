"use client"

import { useState, useCallback } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import {
  Heart,
  MessageSquare,
  Share2,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Copy,
  Facebook,
  Twitter,
  Linkedin,
} from "lucide-react"
import Link from "next/link"
import type { PostType, Reply } from "@/lib/data"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"
import { useToast } from "../../../hooks/use-toast"
import ImageViewer from "./imageViewer"
import ReplyDialog from "./replyDialog"
import Image from "next/image"

interface ReplyDetailProps {
  post: PostType
  reply: Reply
}

export default function ReplyDetail({ post, reply }: ReplyDetailProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [replyDialogOpen, setReplyDialogOpen] = useState(false)
  const [replyingTo, setReplyingTo] = useState<{
    id: string
    username: string
    text: string
    isPost?: boolean
  } | null>(null)
  const { toast } = useToast()
  const router = useRouter()
  const handleBack = () => {
    router.back()
  }

  // State for likes
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(reply.likes)

  // State for collapsible replies
  const [collapsedReplies, setCollapsedReplies] = useState<Record<string, boolean>>({})

  // State for pagination
  const REPLIES_PER_PAGE = 10
  const [visibleReplies, setVisibleReplies] = useState<Record<string, number>>({
    // Default to showing REPLIES_PER_PAGE replies
    [reply.id]: REPLIES_PER_PAGE,
  })

  // State for image viewer
  const [imageViewerOpen, setImageViewerOpen] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [selectedReplyId, setSelectedReplyId] = useState<string | null>(null)

  const toggleReplyCollapse = (replyId: string) => {
    setCollapsedReplies((prev) => ({
      ...prev,
      [replyId]: !prev[replyId],
    }))
  }

  const loadMoreReplies = (parentId: string) => {
    setVisibleReplies((prev) => ({
      ...prev,
      [parentId]: (prev[parentId] || REPLIES_PER_PAGE) + REPLIES_PER_PAGE,
    }))
  }

  const handleReplyToComment = useCallback((id: string, username: string, text: string) => {
    setReplyingTo({ id, username, text })
    setReplyDialogOpen(true)
  }, [])

  const handleSubmitReply = useCallback(
    (text: string, media: File[]) => {
      if ((!text.trim() && media.length === 0) || !replyingTo) return

      setIsSubmitting(true)

      // Simulate API call
      setTimeout(() => {
        console.log("Reply submitted:", { text, media, replyingTo })
        setIsSubmitting(false)
        setReplyDialogOpen(false)
        setReplyingTo(null)
        // In a real app, you would add the reply to the post
      }, 1000)
    },
    [replyingTo],
  )

  const handleLike = () => {
    setLiked(!liked)
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1))

    // Show toast notification
    if (!liked) {
      toast({
        title: "Reply liked",
        description: "You've liked this reply",
      })
    }
  }

  const handleShare = (platform: string) => {
    // In a real app, you would implement actual sharing functionality
    const shareUrl = `${window.location.origin}/post/${post.id}/reply/${reply.id}`

    // Show toast based on share type
    toast({
      title: `Shared on ${platform}`,
      description: platform === "copy" ? "Link copied to clipboard!" : `Reply shared on ${platform}`,
    })

    // If copying to clipboard
    if (platform === "copy") {
      navigator.clipboard.writeText(shareUrl)
    } else {
      console.log(`Sharing to ${platform}: ${shareUrl}`)
      // In a real app, you would open the respective sharing dialog
    }
  }

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index)
    setSelectedReplyId(null)
    setImageViewerOpen(true)
  }

  const handleReplyImageClick = (replyId: string, index: number) => {
    setSelectedImageIndex(index)
    setSelectedReplyId(replyId)
    setImageViewerOpen(true)
  }

  // Function to get images for the current context (main reply or nested reply)
  const getImagesForViewer = () => {
    if (selectedReplyId && selectedReplyId !== reply.id) {
      // Find the nested reply recursively
      const findNestedReply = (replies: Reply[] = []): Reply | null => {
        for (const r of replies) {
          if (r.id === selectedReplyId) {
            return r
          }
          if (r.replies && r.replies.length > 0) {
            const found = findNestedReply(r.replies)
            if (found) return found
          }
        }
        return null
      }

      const nestedReply = reply.replies ? findNestedReply(reply.replies) : null
      if (nestedReply) {
        return nestedReply.content.images || (nestedReply.content.image ? [nestedReply.content.image] : [])
      }
      return []
    } else {
      // Return main reply images
      return reply.content.images || (reply.content.image ? [reply.content.image] : [])
    }
  }

  // Function to render media grid for the main reply
  const renderMediaGrid = () => {
    // If there's no image, return null
    if (!reply.content.images && !reply.content.image) return null

    // Convert single image to array for consistent handling
    const images = reply.content.images || (reply.content.image ? [reply.content.image] : [])
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
              images.length === 2  ? "aspect-[11/12]" : images.length === 3 && index === 0 ? "col-span-1 row-span-2": images.length === 3 ? "aspect-video" : images.length === 4 ? "aspect-video" : ""
            }`}
            onClick={() => handleImageClick(index)}
          >
            <Image
              width={800}
              height={800}
              src={image || "/placeholder.svg"}
              alt={`Reply image ${index + 1}`}
              className={`w-full h-full object-cover ${
                images.length === 1 ? "max-h-[400px]" : "aspect-square"
              } cursor-pointer hover:opacity-90 transition-opacity`}
            />
          </div>
        ))}
      </div>
    )
  }

  // Function to render media grid for nested replies
  const renderReplyMediaGrid = (images?: string[], replyId?: string) => {
    if (!images || images.length === 0 || !replyId) return null

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
              images.length === 2  ? "aspect-[11/12]" : images.length === 3 && index === 0 ? "col-span-1 row-span-2": images.length === 3 ? "aspect-video" : images.length === 4 ? "aspect-video" : ""
            }`}
            onClick={() => handleReplyImageClick(replyId, index)}
          >
            <Image
              width={800}
              height={800}
              src={image || "/placeholder.svg"}
              alt={`Nested reply image ${index + 1}`}
              className={`w-full h-full object-cover ${
                images.length === 1 ? "max-h-[300px]" : "aspect-square"
              } cursor-pointer hover:opacity-90 transition-opacity`}
            />
          </div>
        ))}
      </div>
    )
  }

  // Recursive function to render nested replies
  const renderReplies = (replies: Reply[] = [], level = 0, parentId: string = reply.id) => {
    if (!replies || replies.length === 0) return null

    // Get the number of replies to show for this parent
    const visibleCount = visibleReplies[parentId] || REPLIES_PER_PAGE
    const hasMoreReplies = replies.length > visibleCount

    // Get the replies to display
    const displayReplies = replies.slice(0, visibleCount)

    return (
      <div className="space-y-0">
        {displayReplies.map((nestedReply) => {
          const isCollapsed = collapsedReplies[nestedReply.id] || false
          const hasNestedReplies = nestedReply.replies && nestedReply.replies.length > 0

          return (
            <div key={nestedReply.id} className="relative">
              {/* Vertical connecting line */}
              {level > 0 && (
                <div
                  className="absolute left-5 top-0 bottom-0 w-0.5 bg-slate-200"
                  style={{
                    left: `${20 - level * 4}px`,
                    height: "calc(100% - 20px)",
                  }}
                />
              )}

              {/* Horizontal connecting line */}
              {level > 0 && (
                <div
                  className="absolute w-4 h-0.5 bg-slate-200"
                  style={{
                    left: `${20 - level * 4}px`,
                    top: "30px",
                    width: `${level * 4 + 12}px`,
                  }}
                />
              )}

              <Card
                className={`border shadow-sm mb-4 hover:bg-slate-50 transition-colors cursor-pointer ${
                  level > 0 ? `ml-${level * 6}` : ""
                }`}
                style={{ marginLeft: `${level * 24}px` }}
                onClick={() => router.push(`/post/${post.id}/reply/${nestedReply.id}`)}
              >
                <CardHeader className="flex flex-row items-start gap-4 pb-2 pt-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={nestedReply.user.avatar || "/placeholder.svg"} alt={nestedReply.user.name} />
                    <AvatarFallback>{nestedReply.user.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold">{nestedReply.user.name}</span>
                      <span className="text-muted-foreground">@{nestedReply.user.username}</span>
                      <span className="text-muted-foreground">· {nestedReply.timestamp}</span>
                    </div>
                    {nestedReply.replyingTo && (
                      <p className="text-sm text-muted-foreground">
                        Replying to <span className="text-blue-500">@{nestedReply.replyingTo.username}</span>
                      </p>
                    )}
                  </div>
                  {hasNestedReplies && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => toggleReplyCollapse(nestedReply.id)}
                    >
                      {isCollapsed ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
                    </Button>
                  )}
                </CardHeader>
                <CardContent className="pb-2 pl-[60px]">
                  <p>{nestedReply.content.text}</p>

                  {/* Render media grid for nested reply */}
                  {nestedReply.content.images && renderReplyMediaGrid(nestedReply.content.images, nestedReply.id)}
                  {nestedReply.content.image &&
                    !nestedReply.content.images &&
                    renderReplyMediaGrid([nestedReply.content.image], nestedReply.id)}
                </CardContent>
                <CardFooter className="pt-2 pl-[60px]">
                  <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground">
                    <Heart className="h-4 w-4" />
                    <span>{nestedReply.likes}</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-1 text-muted-foreground"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleReplyToComment(nestedReply.id, nestedReply.user.username, nestedReply.content.text)
                    }}
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span>Reply</span>
                  </Button>
                </CardFooter>
              </Card>

              {/* Render nested replies if not collapsed */}
              {hasNestedReplies && !isCollapsed && nestedReply.replies && (
                <div className="ml-6">
                  {renderReplies(nestedReply.replies, level + 1, nestedReply.id)}

                  {/* Load more button for nested replies */}
                  {nestedReply.replies.length > (visibleReplies[nestedReply.id] || REPLIES_PER_PAGE) && (
                    <div className="ml-6 mb-4" style={{ marginLeft: `${(level + 1) * 24}px` }}>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-blue-500 hover:text-blue-600"
                        onClick={() => loadMoreReplies(nestedReply.id)}
                      >
                        Show more replies
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}

        {/* Load more button for this level */}
        {hasMoreReplies && (
          <div className="mb-4" style={{ marginLeft: level > 0 ? `${level * 24}px` : "0" }}>
            <Button
              variant="ghost"
              size="sm"
              className="text-blue-500 hover:text-blue-600"
              onClick={() => loadMoreReplies(parentId)}
            >
              Show more replies ({replies.length - visibleCount} remaining)
            </Button>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Back buttons */}
      <div className="mb-4 flex gap-2">
        <Button onClick={handleBack} variant="ghost" size="sm" asChild className="gap-2">
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </Link>
        </Button>
        <Button variant="ghost" size="sm" asChild className="gap-2">
          <Link href={`/post/${post.id}`}>
            <span>Back to Post</span>
          </Link>
        </Button>
      </div>

      {/* Context - what this is a reply to */}
      {reply.replyingTo && (
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground mb-1">
              Replying to{" "}
              <Link href={`/post/${post.id}`} className="text-blue-500 hover:underline">
                {reply.replyingTo.id === post.id ? "original post" : `@${reply.replyingTo.username}'s reply`}
              </Link>
            </p>
            <p className="text-sm line-clamp-2">
              {reply.replyingTo.id === post.id ? post.content.text : "This is the content of the parent reply..."}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Main reply */}
      <Card>
        <CardHeader className="flex flex-row items-start gap-4 pb-2">
          <Avatar className="h-12 w-12">
            <AvatarImage src={reply.user.avatar || "/placeholder.svg"} alt={reply.user.name} />
            <AvatarFallback>{reply.user.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-bold">{reply.user.name}</span>
              <span className="text-muted-foreground">@{reply.user.username}</span>
              <span className="text-muted-foreground">· {reply.timestamp}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pb-2">
          <p className="mb-3 text-lg">{reply.content.text}</p>
          {renderMediaGrid()}
        </CardContent>
        <CardFooter className="flex justify-between pt-2 border-t">
          <Button
            variant="ghost"
            size="sm"
            className={`gap-1 ${liked ? "text-rose-500" : "text-muted-foreground"}`}
            onClick={handleLike}
          >
            <Heart className={`h-4 w-4 ${liked ? "fill-rose-500" : ""}`} />
            <span>{likeCount}</span>
          </Button>
          <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground">
            <MessageSquare className="h-4 w-4" />
            <span>{reply.replies?.length || 0}</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground">
                <Share2 className="h-4 w-4" />
                <span>Share</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
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
          <Button
            variant="ghost"
            size="sm"
            className="gap-1 text-blue-500"
            onClick={() => handleReplyToComment(reply.id, reply.user.username, reply.content.text)}
          >
            Reply
          </Button>
        </CardFooter>
      </Card>

      {/* Nested Replies */}
      {reply.replies && reply.replies.length > 0 ? (
        <div>
          <h2 className="text-xl font-bold mb-4">Replies</h2>
          <div className="space-y-0">{renderReplies(reply.replies)}</div>
        </div>
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          <p>No replies yet. Be the first to reply!</p>
        </div>
      )}

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
        images={getImagesForViewer()}
        initialIndex={selectedImageIndex}
        open={imageViewerOpen}
        onOpenChange={setImageViewerOpen}
      />
    </div>
  )
}
