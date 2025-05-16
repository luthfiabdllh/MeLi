import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getCommunityBySlug, getPostsByCommunity } from "@/lib/data"
import AppLayout from "@/components/components/appLayout"
import CommunityProfileContent from "@/components/components/comunityProfileContent"
import CommunityProfileSidebar from "@/components/components/comunityProfileSidebar"

interface CommunityProfilePageProps {
  params: {
    slug: string
  }
}

export function generateMetadata({ params }: CommunityProfilePageProps): Metadata {
  const { slug } = params
  const community = getCommunityBySlug(slug)

  if (!community) {
    return {
      title: "Community Not Found - MeLi",
      description: "This community does not exist",
    }
  }

  return {
    title: `${community.name} - MeLi Communities`,
    description: community.description,
  }
}

export default function CommunityProfilePage({ params }: CommunityProfilePageProps) {
  const { slug } = params
  const community = getCommunityBySlug(slug)

  if (!community) {
    notFound()
  }

  const communityPosts = getPostsByCommunity(community.id)

  return (
    <AppLayout rightSidebarContent={<CommunityProfileSidebar community={community} />}>
      <div className="pb-16 sm:pb-0">
        <CommunityProfileContent community={community} posts={communityPosts} />
      </div>
    </AppLayout>
  )
}
