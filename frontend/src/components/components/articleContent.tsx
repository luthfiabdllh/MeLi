"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search } from "lucide-react"
import type { Article } from "@/lib/data"
import ArticleCard from "./articleCard"
import FeaturedArticle from "./featuredArticle"

interface ArticlesContentProps {
  articles: Article[]
  featuredArticles: Article[]
}

export default function ArticlesContent({ articles, featuredArticles }: ArticlesContentProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // Get unique categories
  const categories = Array.from(new Set(articles.map((article) => article.category)))

  // Filter articles based on search query and selected category
  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      searchQuery === "" ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = selectedCategory === null || article.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Articles</h1>
        <p className="text-muted-foreground">Discover insightful articles on a variety of topics</p>
      </div>

      {/* Featured Articles */}
      {featuredArticles.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Featured</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {featuredArticles.slice(0, 2).map((article) => (
              <FeaturedArticle key={article.id} article={article} />
            ))}
          </div>
        </div>
      )}

      {/* Search and filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search articles..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button
          variant="outline"
          onClick={() => setSelectedCategory(null)}
          className={selectedCategory === null ? "bg-blue-50 border-blue-200" : ""}
        >
          All Categories
        </Button>
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant="outline"
            size="sm"
            className={selectedCategory === category ? "bg-blue-50 border-blue-200" : ""}
            onClick={() => setSelectedCategory(category === selectedCategory ? null : category)}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Articles list */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="w-full justify-start border-b rounded-none h-auto p-0">
          <TabsTrigger
            value="all"
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:shadow-none py-3"
          >
            All Articles
          </TabsTrigger>
          <TabsTrigger
            value="popular"
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:shadow-none py-3"
          >
            Popular
          </TabsTrigger>
          <TabsTrigger
            value="recent"
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:shadow-none py-3"
          >
            Recent
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.length > 0 ? (
              filteredArticles.map((article) => <ArticleCard key={article.id} article={article} />)
            ) : (
              <div className="col-span-3 py-8 text-center text-muted-foreground">
                <p>No articles found matching your criteria.</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="popular" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles
              .sort((a, b) => b.views - a.views)
              .map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="recent" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles
              .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
              .map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
