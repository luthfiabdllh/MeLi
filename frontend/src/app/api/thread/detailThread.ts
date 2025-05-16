import instance from "@/lib/axios";

export async function getThreadsDetails(token: string, id: string) {
  try {
    const res = await instance.get(`/threads/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
        throw new Error("Failed to fetch thread details");
  }
}