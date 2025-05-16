import instance from "@/lib/axios";

export async function uploadImage(token: string, file: File) {
  const formData = new FormData();
  formData.append("image", file);

  const res = await instance.post("/images", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data.id;
}

export async function createThread(token: string, data: any) {
  const res = await instance.post(`/threads`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data.threadsCreated;
}