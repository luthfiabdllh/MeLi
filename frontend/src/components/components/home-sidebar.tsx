"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users} from "lucide-react"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { getRecomendationsUsers } from "@/app/api/user/usersApi"

export default function HomeSidebar() {
  const { data: session } = useSession()
  const [recomendations, setRecomendations] = useState<any>(null)

  useEffect(() => {
    if (!session?.accessToken) return;
    getRecomendationsUsers(session.accessToken)
      .then(setRecomendations)
      .catch(console.error);
  }, [session?.accessToken]);
  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-purple-600">Rekomendasi</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {!recomendations ? (
            // Skeleton atau loading
            <div className="text-sm text-muted-foreground">Loading...</div>
          ) : (
            (Array.isArray(recomendations?.users) ? recomendations.users : recomendations || [])
              .filter((user: any) => user.id !== session?.user?.id)
              .slice(0, 5)
              .map((user: any) => (
                <div key={user.id} className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={user.image || "/placeholder.svg?height=96&width=96"} alt={user.username || "User"} />
                    <AvatarFallback>
                      {user.username?.[0]?.toUpperCase() || "?"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <p className="font-medium">{user.username || "Unknown User"}</p>
                    <p className="text-xs text-muted-foreground">@{user.username}</p>
                    {/* <p className="text-xs font-medium text-blue-500">6M+ Followers</p> */}
                  </div>
                </div>
              ))
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-purple-600">Groups You Might Like</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="bg-green-100 text-green-600 rounded-md p-2">
              <Users className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="font-medium">UI/UX Designers</p>
              <p className="text-xs text-muted-foreground">15.2K members</p>
              <Button size="sm" variant="outline" className="mt-1 h-7 text-xs">
                Join
              </Button>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-pink-100 text-pink-600 rounded-md p-2">
              <Users className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="font-medium">Frontend Developers</p>
              <p className="text-xs text-muted-foreground">8.7K members</p>
              <Button size="sm" variant="outline" className="mt-1 h-7 text-xs">
                Join
              </Button>
            </div>
          </div>
          <Button variant="outline" className="w-full">
            Discover Groups
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
