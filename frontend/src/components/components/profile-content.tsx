"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Calendar, LinkIcon } from "lucide-react"
import Post from "@/components/ui/post"
import { getOwnUserDetails, getOwnUserFollowersFollowing } from "@/app/api/user/profileApi"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { FaBirthdayCake } from "react-icons/fa"
import { formatDate, formatNumber, truncate } from "@/lib/formatter/format"
import { EditProfileDialog } from "./editProfileDialog"

export default function ProfileContent() {
  const { data: session } = useSession();
  const [user, setUser] = useState<any>(null);
  const [followData, setFollowData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.accessToken) return;
    getOwnUserDetails(session.accessToken, session.user.id)
      .then(setUser)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [session?.accessToken, session?.user?.id]);

  useEffect(() => {
    if (!session?.accessToken || !session?.user?.id) return;
    getOwnUserFollowersFollowing(session.accessToken, session.user.id)
      .then(setFollowData)
      .catch(console.error);
  }, [session?.accessToken, session?.user?.id]);

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>User not found</div>;

  const posts = [
    {
      id: "post1",
      user: {
        name: "Steve Rogers",
        username: "steve_rogers",
        avatar: "/placeholder.svg?height=48&width=48&text=SR",
      },
      content: {
        text: "Just finished my morning run. 10 miles in 30 minutes. Not bad for someone who was frozen for 70 years!",
      },
      engagement: {
        likes: 120,
        replies: 25,
        shares: 15,
      },
      timestamp: "8 jam yang lalu",
      replies: [],
    },
    {
      id: "post2",
      user: {
        name: "Steve Rogers",
        username: "steve_rogers",
        avatar: "/placeholder.svg?height=48&width=48&text=SR",
      },
      content: {
        text: "Throwback to the 1940s. Things were simpler back then.",
        image: "/placeholder.svg?height=400&width=600",
      },
      engagement: {
        likes: 250,
        replies: 42,
        shares: 30,
      },
      timestamp: "2 hari yang lalu",
      replies: [],
    },
  ]

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="relative">
        <div className="h-40 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg"></div>
        <div className="absolute -bottom-16 left-4 border-4 border-white rounded-full">
          <Avatar className="h-32 w-32">
            <AvatarImage src={user.image} alt="Steve Rogers" />
            <AvatarFallback>SR</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex justify-end p-4">
          <EditProfileDialog trigger={<Button>Edit Profile</Button>} />
        </div>
      </div>

      {/* Profile Info */}
      <div className="pt-16 px-4">
        <h1 className="text-2xl font-bold">{user.username}</h1>
        <p className="text-muted-foreground">@{user.username}</p>

        <div className="flex flex-wrap gap-4 mt-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span>{user.address ? truncate(user.address, 45) : "not set"}</span>
          </div>
          <div className="flex items-center gap-1">
            <FaBirthdayCake className="h-4 w-4" />
            <span>{user.birthDate ? formatDate(user?.birthDate) : "not set"}</span>
          </div>
        </div>

        <div className="flex gap-4 mt-4">
          <div>
            <span className="font-bold">{formatNumber(followData?.followingCount ?? 0)}</span> <span className="text-muted-foreground">Following</span>
          </div>
          <div>
            <span className="font-bold">{formatNumber(followData?.followers ?? 0)}</span> <span className="text-muted-foreground">Followers</span>
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
          {posts.map((post) => (
            <Post key={post.id} {...post} />
          ))}
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
