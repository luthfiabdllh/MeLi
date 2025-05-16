import instance from "@/lib/axios";

interface ReplyRequest {
  content: string;
  parent_id?: number;
}

export async function replyThread(
  token: string,
    id: string,
  data: ReplyRequest
) {
  try {
    const res = await instance.post(
      `/threads/${id}/comments`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // Response: { message, comment: { ... } }
    return res.data.comment;
  } catch (error) {
    throw new Error("Failed to create comment");
  }
}