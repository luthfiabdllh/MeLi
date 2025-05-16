"use client"

import { useEffect, useState } from "react";
import { getThreads } from "@/app/api/thread/getThread";
import Post from "./post";
import PostCreator from "./post-creator";
import { useSession } from "next-auth/react";

export default function FeedContent() {
  const { data: session } = useSession();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchThreads = async () => {
      if (!session?.accessToken) return;
      try {
        const threads = await getThreads(session.accessToken);
        setPosts(threads);
      } catch (err) {
        // handle error
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchThreads();
  }, [session]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <PostCreator />
      {posts.map((thread) => (
        <Post
          key={thread.id}
          id={thread.id}
          user={{
            // id: thread.author.id,
            name: thread.author.username,
            username: thread.author.username,
            avatar: thread.author.image,
          }}
          content={{
            text: thread.content,
            image: thread.image,
            images: thread.image ? [thread.image] : [],
          }}
          engagement={{
            likes: thread.likes_count,
            replies: 0,
            shares: 0,
          }}
          timestamp={"now"}
          replies={[]}
        />
      ))}
    </div>
  );
}