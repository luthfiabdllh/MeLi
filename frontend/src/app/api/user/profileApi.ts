import instance from "@/lib/axios";


export async function getOwnUserDetails(token: string, id: string) {
  try {
    const res = await instance.get(`/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.userDetails;
  } catch (error) {
    // Optional: log error detail
    // console.error(error);
    throw new Error("Failed to fetch user details");
  }
}

export async function getOwnUserFollowersFollowing(token: string, id: string) {
  try {
    const res = await instance.get(`/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = res.data;
    return {
      followersCount: data.followed_by?.length || 0,
      followingCount: data.follows?.length || 0,
    };
  } catch (error) {
    // Optional: log error detail
    // console.error(error);
    throw new Error("Failed to fetch user details");
  }
}

export async function uploadAvatar(token: string, file: File) {
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

export async function editUserDetails(token: string, id: string, data: any) {
  const res = await instance.put(`/users/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data.userDetailsEdited;
}