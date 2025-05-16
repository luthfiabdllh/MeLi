"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"
import {
  Clock,
  Calendar,
  Heart,
  MessageSquare,
  Share2,
  Bookmark,
  Copy,
  Facebook,
  Twitter,
  Linkedin,
  ArrowLeft,
} from "lucide-react"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { Article } from "@/lib/data"
import { getArticleComments } from "@/lib/data"
import { useToast } from "../../../hooks/use-toast"
import ArticleCommentsSection from "./articleCommentSection"
import ArticleCard from "./articleCard"

interface ArticleDetailProps {
  article: Article
  relatedArticles: Article[]
}

export default function ArticleDetail({ article, relatedArticles }: ArticleDetailProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [likeCount, setLikeCount] = useState(article.likes)
  const { toast } = useToast()

  // Get article comments
  const articleComments = getArticleComments(article.id)

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1))

    toast({
      title: isLiked ? "Removed Like" : "Article Liked",
      description: isLiked ? "You've removed your like from this article" : "You've liked this article",
    })
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)

    toast({
      title: isBookmarked ? "Removed from Bookmarks" : "Added to Bookmarks",
      description: isBookmarked
        ? "This article has been removed from your bookmarks"
        : "This article has been added to your bookmarks",
    })
  }

  const handleShare = (platform: string) => {
    // In a real app, you would implement actual sharing functionality
    const shareUrl = `${window.location.origin}/article/${article.slug}`

    // Show toast based on share type
    toast({
      title: `Shared on ${platform}`,
      description: platform === "copy" ? "Link copied to clipboard!" : `Article shared on ${platform}`,
    })

    // If copying to clipboard
    if (platform === "copy") {
      navigator.clipboard.writeText(shareUrl)
    } else {
      console.log(`Sharing to ${platform}: ${shareUrl}`)
      // In a real app, you would open the respective sharing dialog
    }
  }

  return (
    <div className="space-y-8">
      {/* Back button */}
      <div>
        <Button variant="ghost" size="sm" asChild className="gap-2">
          <Link href="/articles">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Articles</span>
          </Link>
        </Button>
      </div>

      {/* Article Header */}
      <div>
        <div className="space-y-2 mb-4">
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{article.category}</Badge>
            {article.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                #{tag}
              </Badge>
            ))}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold">{article.title}</h1>
          <p className="text-lg text-muted-foreground">{article.excerpt}</p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={article.author.avatar || "/placeholder.svg"} alt={article.author.name} />
              <AvatarFallback>{article.author.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <Link href={`/user/${article.author.username}`} className="font-medium hover:underline">
                {article.author.name}
              </Link>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {article.publishedAt}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {article.readTime} min read
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className={`gap-1 ${isLiked ? "text-rose-500" : "text-muted-foreground"}`}
              onClick={handleLike}
            >
              <Heart className={`h-4 w-4 ${isLiked ? "fill-rose-500" : ""}`} />
              <span>{likeCount.toLocaleString()}</span>
            </Button>
            <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground">
              <MessageSquare className="h-4 w-4" />
              <span>{article.comments.toLocaleString()}</span>
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
              className={`gap-1 ${isBookmarked ? "text-blue-500" : "text-muted-foreground"}`}
              onClick={handleBookmark}
            >
              <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-blue-500" : ""}`} />
              <span>Save</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Cover Image */}
      <div className="rounded-lg overflow-hidden">
        <img
          src={article.coverImage || "/placeholder.svg"}
          alt={article.title}
          className="w-full h-auto max-h-[500px] object-cover"
        />
      </div>

      {/* Article Content */}
      <div className="prose prose-lg max-w-none">
        <div dangerouslySetInnerHTML={{ __html: article.content }} />
      </div>

      {/* Article Footer */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t">
        <div className="flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              #{tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className={`gap-1 ${isLiked ? "text-rose-500" : "text-muted-foreground"}`}
            onClick={handleLike}
          >
            <Heart className={`h-4 w-4 ${isLiked ? "fill-rose-500" : ""}`} />
            <span>{likeCount.toLocaleString()}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={`gap-1 ${isBookmarked ? "text-blue-500" : "text-muted-foreground"}`}
            onClick={handleBookmark}
          >
            <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-blue-500" : ""}`} />
            <span>Save</span>
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
        </div>
      </div>

      {/* Author Card */}
      <Card className="bg-slate-50 border-slate-200">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start">
            <Avatar className="h-16 w-16">
              <AvatarImage src={article.author.avatar || "/placeholder.svg"} alt={article.author.name} />
              <AvatarFallback>{article.author.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-xl font-bold">{article.author.name}</h3>
              <p className="text-muted-foreground mb-4">@{article.author.username}</p>
              <p className="mb-4">
                {article.author.username === "tony_stark_3000" &&
                  "Genius, billionaire, playboy, philanthropist. CEO of Stark Industries."}
                {article.author.username === "steve_rogers" &&
                  "Super soldier, World War II veteran, and former Avenger. I believe in freedom, justice, and the American way."}
                {article.author.username === "hulk_smash" && "Scientist with anger management issues. Seven PhDs."}
                {article.author.username === "black_widow" && "Former KGB, former SHIELD. Avenger."}
                {article.author.username === "scarlet_witch" &&
                  "Enhanced individual with reality manipulation abilities."}
              </p>
              <Link href={`/user/${article.author.username}`}>
                <Button variant="outline">View Profile</Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <div className="space-y-6">
          <Separator />
          <h2 className="text-2xl font-bold">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((relatedArticle) => (
              <ArticleCard key={relatedArticle.id} article={relatedArticle} />
            ))}
          </div>
        </div>
      )}

      {/* Comments Section */}
      <div className="space-y-6">
        <Separator />
        <ArticleCommentsSection articleId={article.id} initialComments={articleComments} />
      </div>
    </div>
  )
}
