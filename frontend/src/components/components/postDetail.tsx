"use client"

import { useState, useCallback } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
import { useSession } from "next-auth/react"
import { replyThread } from "@/app/api/thread/replyThread";


interface PostDetailProps {
  post: PostType
}

export default function PostDetail({ post }: PostDetailProps) {
  const { data: session } = useSession();
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

  // State for likes and shares
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(post.engagement.likes)
  const [shareCount, setShareCount] = useState(post.engagement.shares)

  // State for collapsible replies
  const [collapsedReplies, setCollapsedReplies] = useState<Record<string, boolean>>({})

  // State for pagination
  const REPLIES_PER_PAGE = 10
  const [visibleReplies, setVisibleReplies] = useState<Record<string, number>>({
    // Default to showing REPLIES_PER_PAGE replies for the main post
    [post.id]: REPLIES_PER_PAGE,
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

  const handleReplyToComment = useCallback((id: string, username: string, text: string, isPost = false) => {

    setReplyingTo({ id, username, text, isPost })
    setReplyDialogOpen(true)
  }, [])

  const handleSubmitReply = useCallback(
    async (text: string, media: File[]) => {
      if ((!text.trim() && media.length === 0) || !replyingTo) return;
      
      // Pastikan user sudah login
      if (!session?.accessToken) {
        toast({
          title: "Authentication required",
          description: "Please login to reply",
          variant: "destructive",
        });
        return;
      }
      
      setIsSubmitting(true);
      
      try {
        // Persiapkan data request
        const replyData = {
          content: text,
          // Jika bukan balasan ke post utama, tambahkan parent_id
          ...(replyingTo.isPost ? {} : { parent_id: parseInt(replyingTo.id) }),
        };
        
        // Kirim request ke API
        const response = await replyThread(
          session.accessToken,
          replyingTo.isPost ? post.id : post.id, // ID post
          replyData
        );
        
        // Sukses
        toast({
          title: "Reply submitted",
          description: "Your reply has been posted successfully",
        });
        
        // Tutup dialog dan reset state
        setReplyDialogOpen(false);
        setReplyingTo(null);
        
        // Refresh halaman untuk mendapatkan data terbaru
        // Alternatif: Update state lokal dengan balasan baru
        router.refresh();
        
      } catch (error) {
        // Tangani error
        toast({
          title: "Failed to submit reply",
          description: error instanceof Error ? error.message : "An unknown error occurred",
          variant: "destructive",
        });
        console.error("Error submitting reply:", error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [replyingTo, post.id, session, toast, router],
  );

  const handleLike = () => {
    setLiked(!liked)
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1))

    // Show toast notification
    if (!liked) {
      toast({
        title: "Post liked",
        description: "You've liked this post",
      })
    }
  }

  const handleShare = (platform: string) => {
    // Increase share count
    setShareCount((prev) => prev + 1)

    // In a real app, you would implement actual sharing functionality
    const shareUrl = `${window.location.origin}/post/${post.id}`

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

  // Function to get images for the current context (post or specific reply)
  const getImagesForViewer = () => {
    if (selectedReplyId) {
      // Find the reply recursively
      const findReply = (replies: Reply[]): Reply | null => {
        for (const reply of replies) {
          if (reply.id === selectedReplyId) {
            return reply
          }
          if (reply.replies && reply.replies.length > 0) {
            const found = findReply(reply.replies)
            if (found) return found
          }
        }
        return null
      }

      const reply = findReply(post.replies)
      if (reply) {
        return reply.content.images || (reply.content.image ? [reply.content.image] : [])
      }
      return []
    } else {
      // Return post images
      return post.content.images || (post.content.image ? [post.content.image] : [])
    }
  }

  // Function to render media grid
  const renderMediaGrid = () => {
    // If there's no image, return null
    if (!post.content.images && !post.content.image) return null

    // Convert single image to array for consistent handling
    const images = post.content.images || (post.content.image ? [post.content.image] : [])
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

  // Function to render media grid for replies
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
              alt={`Reply image ${index + 1}`}
              className={`w-full h-full object-cover ${
                images.length === 1 ? "max-h-[300px]" : "aspect-square"
              } cursor-pointer hover:opacity-90 transition-opacity`}
            />
          </div>
        ))}
      </div>
    )
  }

  // Recursive function to render replies with proper nesting
  const renderReplies = (replies: Reply[], level = 0, parentId: string = post.id) => {
    // Get the number of replies to show for this parent
    const visibleCount = visibleReplies[parentId] || REPLIES_PER_PAGE
    const hasMoreReplies = replies.length > visibleCount

    // Get the replies to display
    const displayReplies = replies.slice(0, visibleCount)

    return (
      <div className="space-y-0">
        {displayReplies.map((reply) => {
          const isCollapsed = collapsedReplies[reply.id] || false
          const hasNestedReplies = reply.replies && reply.replies.length > 0

          return (
            <div key={reply.id} className="relative">
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
                onClick={() => router.push(`/post/${post.id}/reply/${reply.id}`)}
              >
                <CardHeader className="flex flex-row items-start gap-4 pb-2 pt-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={reply.user.avatar || "/placeholder.svg"} alt={reply.user.name} />
                    <AvatarFallback>{reply.user.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex gap-0">
                      <div className="flex flex-col">
                        <span className="font-bold">{reply.user.name}</span>
                        <span className="text-muted-foreground">@{reply.user.username}</span>
                      </div>
                      {/* <span className="text-muted-foreground">· {reply.timestamp}</span> */}
                    </div>
                    {reply.replyingTo && (
                      <p className="text-sm text-muted-foreground">
                        Replying to <span className="text-blue-500">@{reply.replyingTo.username}</span>
                      </p>
                    )}
                  </div>
                  {hasNestedReplies && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleReplyCollapse(reply.id)
                      }}
                    >
                      {isCollapsed ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
                    </Button>
                  )}
                </CardHeader>
                <CardContent className="pb-2 pl-[60px]">
                  <p>{reply.content.text}</p>

                  {/* Render media grid for reply */}
                  {reply.content.images && renderReplyMediaGrid(reply.content.images, reply.id)}
                  {reply.content.image &&
                    !reply.content.images &&
                    renderReplyMediaGrid([reply.content.image], reply.id)}
                </CardContent>
                <CardFooter className="pt-2 pl-[60px]">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-1 text-muted-foreground"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Heart className="h-4 w-4" />
                    <span>{reply.likes}</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-1 text-muted-foreground"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleReplyToComment(reply.id, reply.user.username, reply.content.text)
                    }}
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span>Reply</span>
                  </Button>
                </CardFooter>
              </Card>

              {/* Render nested replies if not collapsed */}
              {hasNestedReplies && !isCollapsed && reply.replies && (
                <div className="ml-6">
                  {renderReplies(reply.replies, level + 1, reply.id)}

                  {/* Load more button for nested replies */}
                  {reply.replies.length > (visibleReplies[reply.id] || REPLIES_PER_PAGE) && (
                    <div className="ml-6 mb-4" style={{ marginLeft: `${(level + 1) * 24}px` }}>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-blue-500 hover:text-blue-600"
                        onClick={(e) => {
                          e.stopPropagation()
                          loadMoreReplies(reply.id)
                        }}
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
      {/* Back button */}
      <div className="mb-4">
        <Button variant="ghost"  onClick={handleBack} size="sm" asChild className="gap-2">
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </Link>
        </Button>
      </div>

      {/* Main post */}
      <Card>
        <CardHeader className="flex flex-row items-start gap-4 pb-2">
          <Avatar className="h-12 w-12">
            <AvatarImage src={post.user.avatar || "/placeholder.svg"} alt={post.user.name} />
            <AvatarFallback>{post.user.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-bold">{post.user.name}</span>
              <span className="text-muted-foreground">@{post.user.username}</span>
              {post.content.verified && (
                <Badge variant="outline" className="ml-auto bg-green-50 text-green-600 border-green-200">
                  Postingan diverifikasi
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">Dokter spesialis klinik kesehatan GMC UGM</p>
          </div>
        </CardHeader>
        <CardContent className="pb-2">
          <p className="mb-3 text-lg">{post.content.text}</p>
          {renderMediaGrid()}
          <p className="text-sm text-muted-foreground mt-4">{post.timestamp}</p>
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
            <span>{post.engagement.replies}</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground">
                <Share2 className="h-4 w-4" />
                <span>{shareCount}</span>
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
            onClick={() => handleReplyToComment(post.id, post.user.username, post.content.text, true)}
          >
            Reply
          </Button>
        </CardFooter>
      </Card>

      {/* Replies */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Replies</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleReplyToComment(post.id, post.user.username, post.content.text, true)}
        >
          <MessageSquare className="h-4 w-4 mr-2" />
          Add Reply
        </Button>
      </div>

      {post.replies.length > 0 ? (
        <div className="space-y-0">{renderReplies(post.replies)}</div>
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
