"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Lock } from "lucide-react"
import Link from "next/link"
import type { Community } from "@/lib/data"
import { useToast } from "../../../hooks/use-toast"

interface CommunityCardProps {
  community: Community
}

export default function CommunityCard({ community }: CommunityCardProps) {
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
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="h-24 bg-slate-200 relative">
        <img
          src={community.coverImage || "/placeholder.svg"}
          alt={`${community.name} cover`}
          className="w-full h-full object-cover"
        />
        <Avatar className="absolute -bottom-6 left-4 h-12 w-12 border-2 border-white">
          <AvatarImage src={community.avatar || "/placeholder.svg"} alt={community.name} />
          <AvatarFallback>{community.name.substring(0, 2)}</AvatarFallback>
        </Avatar>
      </div>

      <CardContent className="pt-8">
        <div className="flex justify-between items-start mb-2">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold">{community.name}</h3>
              {community.isPrivate && <Lock className="h-4 w-4 text-amber-500" />}
            </div>
            <p className="text-xs text-muted-foreground">
              <Users className="h-3 w-3 inline mr-1" />
              {memberCount.toLocaleString()} members
            </p>
          </div>
          <Button variant={isJoined ? "outline" : "default"} size="sm" onClick={handleJoinToggle}>
            {isJoined ? "Joined" : "Join"}
          </Button>
        </div>

        <p className="text-sm line-clamp-2 mb-3">{community.description}</p>

        <div className="flex flex-wrap gap-1 mb-3">
          {community.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              #{tag}
            </Badge>
          ))}
        </div>

        <Link href={`/community/${community.slug}`}>
          <Button variant="ghost" size="sm" className="w-full">
            View Community
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
