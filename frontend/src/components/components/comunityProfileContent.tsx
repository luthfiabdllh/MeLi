"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, Lock } from "lucide-react"
import type { Community, PostType } from "@/lib/data"
import { useToast } from "../../../hooks/use-toast"
import Post from "./post"

interface CommunityProfileContentProps {
  community: Community
  posts: PostType[]
}

export default function CommunityProfileContent({ community, posts }: CommunityProfileContentProps) {
  const [isJoined, setIsJoined] = useState(community.members.includes("steve_rogers"))
  const [memberCount, setMemberCount] = useState(community.memberCount)
  const { toast } = useToast()

  const handleJoinToggle = () => {
    setIsJoined(!isJoined)
    setMemberCount((prev) => (isJoined ? prev - 1 : prev + 1))

    toast({
      title: isJoined ? "Left Community" : "Joined Community",
      description: isJoined ? `You left ${community.name}` : `You joined ${community.name}`,
    })
  }

  return (
    <div className="space-y-6">
      {/* Community Header */}
      <div className="relative">
        <div className="h-40 bg-slate-200 rounded-lg overflow-hidden">
          <img
            src={community.coverImage || "/placeholder.svg"}
            alt={`${community.name} cover`}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute -bottom-16 left-4 border-4 border-white rounded-full">
          <Avatar className="h-32 w-32">
            <AvatarImage src={community.avatar || "/placeholder.svg"} alt={community.name} />
            <AvatarFallback>{community.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex justify-end p-4">
          <Button variant={isJoined ? "outline" : "default"} onClick={handleJoinToggle}>
            {isJoined ? "Joined" : "Join Community"}
          </Button>
        </div>
      </div>

      {/* Community Info */}
      <div className="pt-16 px-4">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">{community.name}</h1>
          {community.isPrivate && <Lock className="h-5 w-5 text-amber-500" />}
        </div>
        <p className="text-muted-foreground">r/{community.slug}</p>

        <p className="mt-3">{community.description}</p>

        <div className="flex flex-wrap gap-2 mt-3">
          {community.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              #{tag}
            </Badge>
          ))}
        </div>

        <div className="flex flex-wrap gap-4 mt-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{memberCount.toLocaleString()} members</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>Created {community.createdAt}</span>
          </div>
        </div>
      </div>

      {/* Community Tabs */}
      <Tabs defaultValue="posts" className="w-full">
        <TabsList className="w-full justify-start border-b rounded-none h-auto p-0">
          <TabsTrigger
            value="posts"
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:shadow-none py-3"
          >
            Posts
          </TabsTrigger>
          <TabsTrigger
            value="about"
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:shadow-none py-3"
          >
            About
          </TabsTrigger>
          <TabsTrigger
            value="members"
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:shadow-none py-3"
          >
            Members
          </TabsTrigger>
          <TabsTrigger
            value="media"
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:shadow-none py-3"
          >
            Media
          </TabsTrigger>
        </TabsList>
        <TabsContent value="posts" className="mt-6 space-y-4">
          {posts.length > 0 ? (
            posts.map((post) => <Post key={post.id} {...post} />)
          ) : (
            <div className="py-8 text-center text-muted-foreground">
              <p>No posts in this community yet.</p>
              <Button className="mt-4">Create the first post</Button>
            </div>
          )}
        </TabsContent>
        <TabsContent value="about" className="mt-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">About {community.name}</h3>
            <p>{community.description}</p>

            <div className="bg-slate-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Community Rules</h4>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Be respectful to all members</li>
                <li>Stay on topic and keep discussions relevant</li>
                <li>No spam or self-promotion</li>
                <li>No hate speech or harassment</li>
                <li>Follow the platform's terms of service</li>
              </ol>
            </div>

            <div>
              <h4 className="font-medium mb-2">Admins</h4>
              <div className="space-y-3">
                {community.admins.map((admin, index) => (
                  <div key={admin} className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={`/placeholder.svg?height=32&width=32&text=A${index + 1}`} alt={admin} />
                      <AvatarFallback>A{index + 1}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">@{admin}</p>
                      <p className="text-xs text-muted-foreground">Admin</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="members" className="mt-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Members ({memberCount.toLocaleString()})</h3>
              <Button variant="outline" size="sm">
                Invite Members
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {community.members.map((member, index) => (
                <div key={member} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={`/placeholder.svg?height=40&width=40&text=M${index + 1}`} alt={member} />
                    <AvatarFallback>M{index + 1}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium">@{member}</p>
                    <p className="text-xs text-muted-foreground">
                      {community.admins.includes(member) ? "Admin" : "Member"}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <a href={`/user/${member}`}>View</a>
                  </Button>
                </div>
              ))}
            </div>

            {memberCount > community.members.length && (
              <Button variant="outline" className="w-full">
                Load More Members
              </Button>
            )}
          </div>
        </TabsContent>
        <TabsContent value="media" className="mt-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Media</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="aspect-square bg-slate-100 rounded-md overflow-hidden">
                  <img
                    src={`/placeholder.svg?height=150&width=150&text=${i + 1}`}
                    alt={`Community media ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full">
              View All Media
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
