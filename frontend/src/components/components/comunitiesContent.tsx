"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, PlusCircle, Users, Info } from "lucide-react"
import type { Community } from "@/lib/data"
import CommunityCard from "./comunitiesCard"

interface CommunitiesContentProps {
  communities: Community[]
}

export default function CommunitiesContent({ communities }: CommunitiesContentProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // Filter communities based on search query and selected category
  const filteredCommunities = communities.filter((community) => {
    const matchesSearch =
      searchQuery === "" ||
      community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      community.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      community.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = selectedCategory === null || community.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  // Get unique categories
  const categories = Array.from(new Set(communities.map((community) => community.category)))

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Communities</h1>
          <p className="text-muted-foreground">Discover and join communities based on your interests</p>
        </div>
        <Button className="md:self-start">
          <PlusCircle className="h-4 w-4 mr-2" />
          Create Community
        </Button>
      </div>

      {/* Search and filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search communities..."
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

      {/* Communities list */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="w-full justify-start border-b rounded-none h-auto p-0">
          <TabsTrigger
            value="all"
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:shadow-none py-3"
          >
            All Communities
          </TabsTrigger>
          <TabsTrigger
            value="popular"
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:shadow-none py-3"
          >
            Popular
          </TabsTrigger>
          <TabsTrigger
            value="newest"
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:shadow-none py-3"
          >
            Newest
          </TabsTrigger>
          <TabsTrigger
            value="joined"
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:shadow-none py-3"
          >
            Joined
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCommunities.length > 0 ? (
              filteredCommunities.map((community) => <CommunityCard key={community.id} community={community} />)
            ) : (
              <div className="col-span-3 py-8 text-center text-muted-foreground">
                <p>No communities found matching your criteria.</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="popular" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCommunities
              .sort((a, b) => b.memberCount - a.memberCount)
              .map((community) => (
                <CommunityCard key={community.id} community={community} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="newest" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCommunities
              .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
              .map((community) => (
                <CommunityCard key={community.id} community={community} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="joined" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCommunities
              .filter((community) => community.members.includes("steve_rogers"))
              .map((community) => (
                <CommunityCard key={community.id} community={community} />
              ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Community Guidelines */}
      <div className="bg-slate-50 p-6 rounded-lg mt-8">
        <div className="flex items-start gap-3 mb-4">
          <div className="bg-blue-100 text-blue-600 rounded-md p-2">
            <Info className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-bold text-lg">Community Guidelines</h3>
            <p className="text-muted-foreground">
              Follow these guidelines to ensure a positive experience for everyone
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="bg-white p-4 rounded-md shadow-sm">
            <h4 className="font-medium mb-2">Be Respectful</h4>
            <p className="text-sm text-muted-foreground">Treat others with respect and kindness in all interactions</p>
          </div>
          <div className="bg-white p-4 rounded-md shadow-sm">
            <h4 className="font-medium mb-2">Stay On Topic</h4>
            <p className="text-sm text-muted-foreground">Keep discussions relevant to the community's purpose</p>
          </div>
          <div className="bg-white p-4 rounded-md shadow-sm">
            <h4 className="font-medium mb-2">No Spam</h4>
            <p className="text-sm text-muted-foreground">Avoid excessive self-promotion or irrelevant content</p>
          </div>
        </div>

        <Button variant="outline" className="mt-4">
          <Users className="h-4 w-4 mr-2" />
          Read Full Guidelines
        </Button>
      </div>
    </div>
  )
}
