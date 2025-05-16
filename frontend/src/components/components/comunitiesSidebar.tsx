import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PlusCircle, TrendingUp, Users, Info } from "lucide-react"
import Link from "next/link"

export default function CommunitiesSidebar() {
  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-purple-600">About Communities</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm">
            Communities are groups of people who share similar interests. Join communities to connect with others, share
            content, and participate in discussions.
          </p>
          <Button className="w-full">
            <PlusCircle className="h-4 w-4 mr-2" />
            Create Community
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-purple-600">Trending Communities</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { name: "Health & Wellness", members: "12.5K", slug: "health-wellness", avatar: "HW" },
            { name: "Tech Enthusiasts", members: "8.7K", slug: "tech-enthusiasts", avatar: "TE" },
            { name: "Creative Arts", members: "6.2K", slug: "creative-arts", avatar: "CA" },
          ].map((community) => (
            <div key={community.slug} className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={`/placeholder.svg?height=40&width=40&text=${community.avatar}`}
                  alt={community.name}
                />
                <AvatarFallback>{community.avatar}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-medium text-sm">{community.name}</p>
                <p className="text-xs text-muted-foreground">{community.members} members</p>
              </div>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </div>
          ))}
          <Button variant="ghost" className="w-full">
            <TrendingUp className="h-4 w-4 mr-2" />
            See More Trending
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-purple-600">Your Communities</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { name: "Avengers Initiative", members: "12", slug: "avengers-initiative", avatar: "A" },
            { name: "Science Bros", members: "8.7K", slug: "science-bros", avatar: "SB" },
          ].map((community) => (
            <div key={community.slug} className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={`/placeholder.svg?height=40&width=40&text=${community.avatar}`}
                  alt={community.name}
                />
                <AvatarFallback>{community.avatar}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-medium text-sm">{community.name}</p>
                <p className="text-xs text-muted-foreground">{community.members} members</p>
              </div>
              <Link href={`/community/${community.slug}`}>
                <Button size="sm" variant="outline" className="h-8">
                  View
                </Button>
              </Link>
            </div>
          ))}
          <Button variant="ghost" className="w-full">
            <Users className="h-4 w-4 mr-2" />
            See All Your Communities
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-purple-600">Community Guidelines</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="bg-blue-100 text-blue-600 rounded-md p-2">
              <Info className="h-5 w-5" />
            </div>
            <div>
              <p className="font-medium">Be Respectful</p>
              <p className="text-xs text-muted-foreground">Treat others with respect and kindness</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-blue-100 text-blue-600 rounded-md p-2">
              <Info className="h-5 w-5" />
            </div>
            <div>
              <p className="font-medium">Stay On Topic</p>
              <p className="text-xs text-muted-foreground">Keep discussions relevant to the community</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-blue-100 text-blue-600 rounded-md p-2">
              <Info className="h-5 w-5" />
            </div>
            <div>
              <p className="font-medium">No Spam</p>
              <p className="text-xs text-muted-foreground">Avoid excessive self-promotion or spam</p>
            </div>
          </div>
          <Button variant="ghost" className="w-full text-sm">
            <Info className="h-4 w-4 mr-2" />
            Read Full Guidelines
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
