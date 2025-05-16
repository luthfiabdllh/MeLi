import instance from "@/lib/axios";

export async function getThreads(token: string) {
  try {
    const res = await instance.get(`/threads`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.threads;
  } catch (error) {
        throw new Error("Failed to fetch user details");
  }
}