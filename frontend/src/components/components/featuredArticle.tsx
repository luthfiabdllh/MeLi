import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, ArrowRight } from "lucide-react"
import Link from "next/link"
import type { Article } from "@/lib/data"

interface FeaturedArticleProps {
  article: Article
}

export default function FeaturedArticle({ article }: FeaturedArticleProps) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="md:flex">
        <div className="md:w-2/5 h-48 md:h-auto bg-slate-200 relative">
          <img
            src={article.coverImage || "/placeholder.svg"}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        <CardContent className="md:w-3/5 p-6 flex flex-col">
          <div className="mb-2">
            <Badge variant="secondary" className="text-xs">
              {article.category}
            </Badge>
            <Badge variant="outline" className="ml-2 text-xs bg-amber-50 text-amber-600 border-amber-200">
              Featured
            </Badge>
          </div>

          <Link href={`/article/${article.slug}`} className="group">
            <h3 className="font-bold text-xl mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
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

          <div className="mt-4 pt-4 border-t">
            <Link href={`/article/${article.slug}`}>
              <Button variant="ghost" className="gap-2 p-0 h-auto hover:bg-transparent hover:text-blue-600">
                Read Full Article
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </div>
    </Card>
  )
}
