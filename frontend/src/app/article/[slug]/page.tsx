import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getArticleBySlug, getRelatedArticles } from "@/lib/data"
import App from "next/app"
import AppLayoutFull from "@/components/components/appLayoutFull"
import ArticleDetail from "@/components/components/articleDetail"

interface ArticlePageProps {
  params: {
    slug: string
  }
}

export function generateMetadata({ params }: ArticlePageProps): Metadata {
  const { slug } = params
  const article = getArticleBySlug(slug)

  if (!article) {
    return {
      title: "Article Not Found - MeLi",
      description: "This article does not exist",
    }
  }

  return {
    title: `${article.title} - MeLi Articles`,
    description: article.excerpt,
  }
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = params
  const article = getArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  const relatedArticles = getRelatedArticles(article.id)

  return (
    <AppLayoutFull>
      <div className="pb-16 sm:pb-0">
        <ArticleDetail article={article} relatedArticles={relatedArticles} />
      </div>
    </AppLayoutFull>
  )
}
