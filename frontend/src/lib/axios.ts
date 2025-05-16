import axios from "axios";
// import { getSession } from "next-auth/react";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor untuk menyisipkan token setiap request
// instance.interceptors.request.use(
//   async (config) => {
//     const session = await getSession(); // Ambil token dari NextAuth session
//     if (session?.accessToken) {
//       config.headers.Authorization = `Bearer ${session.accessToken}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

export default instance;
