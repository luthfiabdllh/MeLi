import type { Metadata } from "next"
import { getCommunities } from "@/lib/data"
import AppLayoutFull from "@/components/components/appLayoutFull"
import CommunitiesContent from "@/components/components/comunitiesContent"

export const metadata: Metadata = {
  title: "Communities - MeLi",
  description: "Discover and join communities on MeLi social media app",
}

export default function CommunitiesPage() {
  const communities = getCommunities()

  return (
    <AppLayoutFull>
      <div className="pb-16 sm:pb-0">
        <CommunitiesContent communities={communities} />
      </div>
    </AppLayoutFull>
  )
}
