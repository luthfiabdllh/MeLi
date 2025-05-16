"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Calendar, LinkIcon, BadgeCheck } from "lucide-react"
import type { UserProfile, PostType } from "@/lib/data"
import { useToast } from "../../../hooks/use-toast"
import Post from "./post"

interface UserProfileContentProps {
  userProfile: UserProfile
  posts: PostType[]
}

export default function UserProfileContent({ userProfile, posts }: UserProfileContentProps) {
  const [isFollowing, setIsFollowing] = useState(false)
  const [followerCount, setFollowerCount] = useState(userProfile.followers)
  const { toast } = useToast()

  const handleFollow = () => {
    setIsFollowing(!isFollowing)
    setFollowerCount((prev) => (isFollowing ? prev - 1 : prev + 1))

    toast({
      title: isFollowing ? "Unfollowed" : "Followed",
      description: isFollowing ? `You unfollowed ${userProfile.name}` : `You are now following ${userProfile.name}`,
    })
  }

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="relative">
        <div className="h-40 bg-slate-200 rounded-lg overflow-hidden">
          <img
            src={userProfile.coverImage || "/placeholder.svg"}
            alt={`${userProfile.name}'s cover`}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute -bottom-16 left-4 border-4 border-white rounded-full">
          <Avatar className="h-32 w-32">
            <AvatarImage src={userProfile.avatar || "/placeholder.svg"} alt={userProfile.name} />
            <AvatarFallback>{userProfile.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex justify-end p-4">
          <Button variant={isFollowing ? "outline" : "default"} onClick={handleFollow}>
            {isFollowing ? "Following" : "Follow"}
          </Button>
        </div>
      </div>

      {/* Profile Info */}
      <div className="pt-16 px-4">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">{userProfile.name}</h1>
          {userProfile.isVerified && <BadgeCheck className="h-5 w-5 text-blue-500" />}
        </div>
        <p className="text-muted-foreground">@{userProfile.username}</p>
        {userProfile.profession && <p className="text-sm text-muted-foreground mt-1">{userProfile.profession}</p>}

        <p className="mt-3">{userProfile.bio}</p>

        <div className="flex flex-wrap gap-4 mt-3 text-sm text-muted-foreground">
          {userProfile.location && (
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{userProfile.location}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>Joined {userProfile.joinDate}</span>
          </div>
          {userProfile.website && (
            <div className="flex items-center gap-1">
              <LinkIcon className="h-4 w-4" />
              <a
                href={userProfile.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {userProfile.website.replace(/(^\w+:|^)\/\//, "")}
              </a>
            </div>
          )}
        </div>

        <div className="flex gap-4 mt-4">
          <div>
            <span className="font-bold">{userProfile.following.toLocaleString()}</span>{" "}
            <span className="text-muted-foreground">Following</span>
          </div>
          <div>
            <span className="font-bold">{followerCount.toLocaleString()}</span>{" "}
            <span className="text-muted-foreground">Followers</span>
          </div>
        </div>
      </div>

      {/* Profile Tabs */}
      <Tabs defaultValue="posts" className="w-full">
        <TabsList className="w-full justify-start border-b rounded-none h-auto p-0">
          <TabsTrigger
            value="posts"
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:shadow-none py-3"
          >
            Posts
          </TabsTrigger>
          <TabsTrigger
            value="replies"
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:shadow-none py-3"
          >
            Replies
          </TabsTrigger>
          <TabsTrigger
            value="media"
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:shadow-none py-3"
          >
            Media
          </TabsTrigger>
          <TabsTrigger
            value="likes"
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:shadow-none py-3"
          >
            Likes
          </TabsTrigger>
        </TabsList>
        <TabsContent value="posts" className="mt-6 space-y-4">
          {posts.length > 0 ? (
            posts.map((post) => <Post key={post.id} {...post} />)
          ) : (
            <div className="py-8 text-center text-muted-foreground">
              <p>No posts yet.</p>
            </div>
          )}
        </TabsContent>
        <TabsContent value="replies">
          <div className="py-8 text-center text-muted-foreground">No replies yet.</div>
        </TabsContent>
        <TabsContent value="media">
          <div className="py-8 text-center text-muted-foreground">No media yet.</div>
        </TabsContent>
        <TabsContent value="likes">
          <div className="py-8 text-center text-muted-foreground">No likes yet.</div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
