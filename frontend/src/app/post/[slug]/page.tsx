"use client"

import AppLayout from "@/components/components/appLayout";
import PostDetail from "@/components/components/postDetail";
import PostDetailSidebar from "@/components/components/postDetailSidebar";
import { use, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getThreadsDetails } from "@/app/api/thread/detailThread";

export default function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { data: session } = useSession();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchThread = async () => {
      if (!session?.accessToken) {
        setLoading(false);
        return;
      }
      try {
        const apiRes = await getThreadsDetails(session.accessToken, slug);
        // Ambil data dari apiRes.thread
        const threadData = apiRes.thread.thread;
        const authorData = apiRes.thread.author;
        const commentsData = apiRes.thread.comments || [];

        const mappedPost = {
          id: threadData.id,
          user: {
            id: authorData.id,
            name: authorData.username,
            username: authorData.username,
            avatar: authorData.image ?? null,
          },
          content: {
            text: threadData.content,
            image: threadData.image ?? null,
            images: threadData.image ? [threadData.image] : [],
          },
          engagement: {
            likes: threadData.likes_count ?? 0,
            replies: commentsData.length,
            shares: 0,
          },
          replies: commentsData.map((c: any) => ({
            id: c.id,
            user: {
              id: c.user_id,
              name: authorData.username, // statis karena tidak ada di comment
              username: authorData.username,
              avatar: authorData.image ?? null,
            },
            content: {
              text: c.content,
              image: null,
              images: [],
            },
            likes: c.like_count ?? 0, // default 0 kalau tidak tersedia
            timestamp: c.created_at ?? "",
          })),
          timestamp: threadData.created_at ?? "",
        };
        setPost(mappedPost);
      } catch (err) {
        setPost(null);
      } finally {
        setLoading(false);
      }
    };
    fetchThread();
  }, [session, slug]);

  if (loading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center h-[60vh]">
          <p className="text-lg text-muted-foreground">Loading...</p>
        </div>
      </AppLayout>
    );
  }

  if (!post) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center h-[60vh]">
          <p className="text-lg text-muted-foreground">Post not found</p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout rightSidebarContent={<PostDetailSidebar post={post} />}>
      <div className="pb-16 sm:pb-0">
        <PostDetail post={post} />
      </div>
    </AppLayout>
  );
}