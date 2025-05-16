import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Share2, Flag, Bell, Users, MessageSquare } from "lucide-react"
import Link from "next/link"
import type { Community } from "@/lib/data"

interface CommunityProfileSidebarProps {
  community: Community
}

export default function CommunityProfileSidebar({ community }: CommunityProfileSidebarProps) {
  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-purple-600">Community Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-start">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Share2 className="h-4 w-4 mr-2" />
            Share Community
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Flag className="h-4 w-4 mr-2" />
            Report Community
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-purple-600">Similar Communities</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { name: "Science & Technology", members: "15.2K", slug: "science-tech", avatar: "ST" },
            { name: "Research Group", members: "8.7K", slug: "research-group", avatar: "RG" },
            { name: "Innovation Hub", members: "5.3K", slug: "innovation-hub", avatar: "IH" },
          ].map((similarCommunity) => (
            <div key={similarCommunity.slug} className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={`/placeholder.svg?height=40&width=40&text=${similarCommunity.avatar}`}
                  alt={similarCommunity.name}
                />
                <AvatarFallback>{similarCommunity.avatar}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-medium text-sm">{similarCommunity.name}</p>
                <p className="text-xs text-muted-foreground">{similarCommunity.members} members</p>
              </div>
              <Button size="sm" variant="outline" className="h-8">
                View
              </Button>
            </div>
          ))}
          <Link href="/communities">
            <Button variant="ghost" className="w-full">
              <Users className="h-4 w-4 mr-2" />
              Browse More Communities
            </Button>
          </Link>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-purple-600">Top Contributors</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {community.members.slice(0, 3).map((member, index) => (
            <div key={member} className="flex items-center gap-3">
              <div className="relative">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={`/placeholder.svg?height=40&width=40&text=TC${index + 1}`} alt={member} />
                  <AvatarFallback>TC{index + 1}</AvatarFallback>
                </Avatar>
                <div className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {index + 1}
                </div>
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">@{member}</p>
                <p className="text-xs text-muted-foreground">{Math.floor(Math.random() * 100) + 50} posts</p>
              </div>
              <Link href={`/user/${member}`}>
                <Button size="sm" variant="ghost" className="h-8">
                  View
                </Button>
              </Link>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-purple-600">Recent Discussions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border-b pb-3 last:border-0 last:pb-0">
              <p className="font-medium text-sm line-clamp-2">
                {i === 1 && "The future of quantum computing and its applications"}
                {i === 2 && "How to optimize research methodologies for better results"}
                {i === 3 && "Collaborative projects: seeking partners for innovation"}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <MessageSquare className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{Math.floor(Math.random() * 20) + 5} replies</span>
                <span className="text-xs text-muted-foreground">· {Math.floor(Math.random() * 12) + 1}h ago</span>
              </div>
            </div>
          ))}
          <Button variant="ghost" className="w-full text-sm">
            <MessageSquare className="h-4 w-4 mr-2" />
            View All Discussions
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
