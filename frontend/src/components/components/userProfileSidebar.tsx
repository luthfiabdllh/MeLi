import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ImageIcon, FileText, Award, Users } from "lucide-react"
import type { UserProfile } from "@/lib/data"
import Link from "next/link"

interface UserProfileSidebarProps {
  userProfile: UserProfile
}

export default function UserProfileSidebar({ userProfile }: UserProfileSidebarProps) {
  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-purple-600">Communities</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {userProfile.communities.length > 0 ? (
            userProfile.communities.map((communityId, index) => (
              <div key={communityId} className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={`/placeholder.svg?height=40&width=40&text=${index + 1}`} alt="Community" />
                  <AvatarFallback>C{index + 1}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium text-sm">
                    {communityId === "comm1" && "Avengers Initiative"}
                    {communityId === "comm2" && "Science Bros"}
                    {communityId === "comm3" && "Quantum Realm Explorers"}
                    {communityId === "comm4" && "Enhanced Individuals Support"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {communityId === "comm1" && "12 members"}
                    {communityId === "comm2" && "8.7K members"}
                    {communityId === "comm3" && "3.4K members"}
                    {communityId === "comm4" && "1.8K members"}
                  </p>
                </div>
                <Link
                  href={`/community/${
                    communityId === "comm1"
                      ? "avengers-initiative"
                      : communityId === "comm2"
                        ? "science-bros"
                        : communityId === "comm3"
                          ? "quantum-realm"
                          : "enhanced-support"
                  }`}
                >
                  <Button size="sm" variant="outline" className="h-8">
                    View
                  </Button>
                </Link>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">Not a member of any communities yet.</p>
          )}
          <Link href="/communities">
            <Button variant="ghost" className="w-full mt-2">
              <Users className="h-4 w-4 mr-2" />
              Browse Communities
            </Button>
          </Link>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-purple-600">Photos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="aspect-square rounded-md bg-slate-100 flex items-center justify-center overflow-hidden"
              >
                <img
                  src={`/placeholder.svg?height=100&width=100&text=${i}`}
                  alt={`Photo ${i}`}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
          <Button variant="ghost" className="w-full mt-3 text-sm">
            <ImageIcon className="h-4 w-4 mr-2" />
            See all photos
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-purple-600">Achievements</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="bg-amber-100 text-amber-600 rounded-md p-2">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <p className="font-medium">Top Contributor</p>
              <p className="text-xs text-muted-foreground">Awarded for exceptional engagement</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-blue-100 text-blue-600 rounded-md p-2">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <p className="font-medium">Verified Expert</p>
              <p className="text-xs text-muted-foreground">Recognized for expertise in their field</p>
            </div>
          </div>
          <Button variant="ghost" className="w-full text-sm">
            <FileText className="h-4 w-4 mr-2" />
            View all achievements
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-purple-600">Similar Profiles</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { name: "Bruce Banner", username: "hulk_smash", avatar: "BB" },
            { name: "Natasha Romanoff", username: "black_widow", avatar: "NR" },
            { name: "Clint Barton", username: "hawkeye", avatar: "CB" },
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
              <Link href={`/user/${user.username}`}>
                <Button size="sm" variant="outline" className="h-8">
                  View
                </Button>
              </Link>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
