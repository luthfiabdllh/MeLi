import instance from "@/lib/axios";

export async function getRecomendationsUsers(token: string) {
  try {
    const res = await instance.get(`/follows`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data.users;

  } catch (error) {
    // Optional: log error detail
    // console.error(error);
    throw new Error("Failed to fetch user details");
  }
}

export async function follow(token: string, idUser: string ,id: string) {
  try {
    const res = await instance.post(
      `/users/${idUser}/follows`,
      { followed_id: id }, // body data
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data.followed_user;

  } catch (error) {
    // Optional: log error detail
    console.error(error);
    throw new Error("Failed to follow user");
  }
}