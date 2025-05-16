import type { Metadata } from "next"
import { getArticles, getFeaturedArticles } from "@/lib/data"
import AppLayoutFull from "@/components/components/appLayoutFull"
import ArticlesContent from "@/components/components/articleContent"

export const metadata: Metadata = {
  title: "Articles - MeLi",
  description: "Discover insightful articles on MeLi social media app",
}

export default function ArticlesPage() {
  const articles = getArticles()
  const featuredArticles = getFeaturedArticles()

  return (
    <AppLayoutFull>
      <div className="pb-16 sm:pb-0">
        <ArticlesContent articles={articles} featuredArticles={featuredArticles} />
      </div>
    </AppLayoutFull>
  )
}
