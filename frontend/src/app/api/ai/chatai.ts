import instance from "@/lib/axios";

export async function startAiConversation(token: string, data: any) {
  const res = await instance.post(`/gemini/start`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}

export async function sendAiMessage(token: string, data: any) {
  const res = await instance.post(`/gemini/chat`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}