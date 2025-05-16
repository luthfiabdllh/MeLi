import instance from "@/lib/axios";

// Like article/thread
export async function like(token: string, id: string) {
  try {
    const res = await instance.post(
      `/threads/${id}/likes`,
      { article_id: id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data.thread;
  } catch (error) {
    throw new Error("Failed to like thread");
  }
}

// Unlike article/thread
export async function unlike(token: string, id: string) {
  try {
    const res = await instance.delete(
      `/threads/${id}/likes`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // Response: { message, article: { id, like_count } }
    return res.data.thread;
  } catch (error) {
    throw new Error("Failed to unlike thread");
  }
}