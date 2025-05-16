import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Clock, MessageSquare, Heart, Eye } from "lucide-react"
import Link from "next/link"
import type { Article } from "@/lib/data"

interface ArticleCardProps {
  article: Article
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
      <div className="h-48 bg-slate-200 relative">
        <img
          src={article.coverImage || "/placeholder.svg"}
          alt={article.title}
          className="w-full h-full object-cover"
        />
      </div>

      <CardContent className="pt-4 flex-1 flex flex-col">
        <div className="mb-2">
          <Badge variant="secondary" className="text-xs">
            {article.category}
          </Badge>
        </div>

        <Link href={`/article/${article.slug}`} className="group">
          <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
            {article.title}
          </h3>
        </Link>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{article.excerpt}</p>

        <div className="flex items-center gap-2 mt-auto">
          <Avatar className="h-8 w-8">
            <AvatarImage src={article.author.avatar || "/placeholder.svg"} alt={article.author.name} />
            <AvatarFallback>{article.author.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <Link href={`/user/${article.author.username}`} className="text-sm font-medium hover:underline">
              {article.author.name}
            </Link>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span>{article.publishedAt}</span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {article.readTime} min read
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t text-xs text-muted-foreground">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Heart className="h-3 w-3" />
              {article.likes.toLocaleString()}
            </span>
            <span className="flex items-center gap-1">
              <MessageSquare className="h-3 w-3" />
              {article.comments.toLocaleString()}
            </span>
          </div>
          <span className="flex items-center gap-1">
            <Eye className="h-3 w-3" />
            {article.views.toLocaleString()} views
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
