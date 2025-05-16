import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getUserProfileByUsername, getPostsByUsername } from "@/lib/data"
import UserProfileSidebar from "@/components/components/userProfileSidebar"
import UserProfileContent from "@/components/components/userProfileContent"
import AppLayout from "@/components/components/appLayout"

interface UserProfilePageProps {
  params: {
    username: string
  }
}

export function generateMetadata({ params }: UserProfilePageProps): Metadata {
  const { username } = params
  const userProfile = getUserProfileByUsername(username)

  if (!userProfile) {
    return {
      title: "User Not Found - MeLi",
      description: "This user profile does not exist",
    }
  }

  return {
    title: `${userProfile.name} (@${userProfile.username}) - MeLi`,
    description: userProfile.bio,
  }
}

export default function UserProfilePage({ params }: UserProfilePageProps) {
  const { username } = params
  const userProfile = getUserProfileByUsername(username)

  if (!userProfile) {
    notFound()
  }

  const userPosts = getPostsByUsername(username)

  return (
    <AppLayout rightSidebarContent={<UserProfileSidebar userProfile={userProfile} />}>
      <div className="pb-16 sm:pb-0">
        <UserProfileContent userProfile={userProfile} posts={userPosts} />
      </div>
    </AppLayout>
  )
}
