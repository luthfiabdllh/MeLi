"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ImageIcon, FileText, Award } from "lucide-react"
import Image from "next/image"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { getOwnUserDetails } from "@/app/api/user/profileApi"
import { follow, getRecomendationsUsers } from "@/app/api/user/usersApi"

export default function ProfileSidebar() {
  const { data: session } = useSession()
  const [user, setUser] = useState<any>(null)
  const [recomendations, setRecomendations] = useState<any>(null)
  
  useEffect(() => {
    if (!session?.accessToken || !session?.user?.id) return;
    getOwnUserDetails(session.accessToken, session.user.id)
      .then(setUser)
      .catch(console.error);
  }, [session?.accessToken, session?.user?.id]);

  useEffect(() => {
    if (!session?.accessToken) return;
    getRecomendationsUsers(session.accessToken)
      .then(setRecomendations)
      .catch(console.error);
  }, [session?.accessToken]);

  const handleFollow = async (userId: string) => {
    if (!session?.accessToken) return;
    try {
      await follow(session.accessToken,session.user.id, userId);
      setRecomendations((prev: any) => ({
        ...prev,
        users: (prev?.users || []).filter((u: any) => u.id !== userId),
      }));
    } catch (error) {
      // Optional: tampilkan pesan error
      console.error(error);
    }
  };


  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-purple-600">About</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm break-all">
            {user?.bio || "No bio available."}
          </p>
        </CardContent>
      </Card>

      {/* Recomendation */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-purple-600">Similar Profiles</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {(Array.isArray(recomendations?.users) ? recomendations.users : recomendations || [])
            .filter((user: any) => user.id !== session?.user?.id)
            .slice(0, 5)
            .map((user: any) => (
              <div key={user.id} className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user.image || `/placeholder.svg?height=40&width=40&text=${user.username[0]?.toUpperCase()}`} alt={user.username} />
                  <AvatarFallback>{user.username[0]?.toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium text-sm">{user.username}</p>
                  <p className="text-xs text-muted-foreground">@{user.username}</p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8"
                  onClick={() => handleFollow(user.id)}
                >
                  Follow
                </Button>
              </div>
            ))}
        </CardContent>
      </Card>
    </div>
  )
}
