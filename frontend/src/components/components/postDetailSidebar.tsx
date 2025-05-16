import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { PostType } from "@/lib/data"
import Image from "next/image"

interface PostDetailSidebarProps {
  post: PostType
}

export default function PostDetailSidebar({ post }: PostDetailSidebarProps) {
  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-purple-600">About Author</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-14 w-14">
              <AvatarImage src={post.user.avatar || "/placeholder.svg"} alt={post.user.name} />
              <AvatarFallback>{post.user.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-bold">{post.user.name}</p>
              <p className="text-sm text-muted-foreground">@{post.user.username}</p>
            </div>
          </div>
          <p className="text-sm">
            {post.user.name === "Tony Stark" &&
              "Genius, billionaire, playboy, philanthropist. CEO of Stark Industries."}
            {post.user.name === "Paul Rudd" && "Actor, comedian, and part-time superhero. I can get really small."}
            {post.user.name === "Steve Rogers" && "Super soldier, World War II veteran, and former Avenger."}
            {post.user.name === "Thor Odinson" && "God of Thunder, Asgardian, Avenger. I'm still worthy."}
            {post.user.name === "Wanda Maximoff" && "Enhanced individual with reality manipulation abilities."}
          </p>
          <Button className="w-full">Follow</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-purple-600">Related Posts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-3 pb-3 border-b last:border-0 last:pb-0">
              <div className="flex-1">
                <p className="font-medium text-sm line-clamp-2">
                  {i === 1 && "The importance of food safety in public spaces"}
                  {i === 2 && "Common diseases that spread through contaminated food"}
                  {i === 3 && "How to protect yourself from foodborne illnesses"}
                </p>
                <p className="text-xs text-muted-foreground mt-1">{Math.floor(Math.random() * 10) + 1} hours ago</p>
              </div>
              <div className="w-16 h-16 bg-slate-100 rounded-md overflow-hidden flex-shrink-0">
                <Image
                  width={800}
                  height={800}
                  src={`/placeholder.svg?height=64&width=64&text=${i}`}
                  alt={`Related post ${i}`}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-purple-600">Who to Follow</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { name: "Clint Barton", username: "hawkeye", avatar: "CB" },
            { name: "Peter Parker", username: "spiderman", avatar: "PP" },
            { name: "Carol Danvers", username: "captain_marvel", avatar: "CD" },
          ].map((user) => (
            <div key={user.username} className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={`/placeholder.svg?height=40&width=40&text=${user.avatar}`} alt={user.name} />
                <AvatarFallback>{user.avatar}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-medium text-sm">{user.name}</p>
                <p className="text-xs text-muted-foreground">@{user.username}</p>
              </div>
              <Button size="sm" variant="outline" className="h-8">
                Follow
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
