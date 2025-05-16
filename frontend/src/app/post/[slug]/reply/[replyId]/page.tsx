import type { Metadata } from "next"
import { getPosts, findReplyById } from "@/lib/data"
import AppLayout from "@/components/components/appLayout"
import ReplyDetail from "@/components/components/replyDetail"
import PostDetailSidebar from "@/components/components/postDetailSidebar"

export const metadata: Metadata = {
  title: "Reply - MeLi",
  description: "View reply and conversation on MeLi social media app",
}

interface ReplyPageProps {
  params: {
    slug: string
    replyId: string
  }
}

export default function ReplyPage({ params }: ReplyPageProps) {
  const { slug, replyId } = params
  const posts = getPosts()
  const post = posts.find((post) => post.id === slug)

  if (!post) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center h-[60vh]">
          <p className="text-lg text-muted-foreground">Post not found</p>
        </div>
      </AppLayout>
    )
  }

  const reply = findReplyById(post.replies, replyId)

  if (!reply) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center h-[60vh]">
          <p className="text-lg text-muted-foreground">Reply not found</p>
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout rightSidebarContent={<PostDetailSidebar post={post} />}>
      <div className="pb-16 sm:pb-0">
        <ReplyDetail post={post} reply={reply} />
      </div>
    </AppLayout>
  )
}
