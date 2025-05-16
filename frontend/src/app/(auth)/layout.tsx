import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import AuthLayout from "@/components/components/authLayout";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (session) {
    // Jika sudah login, redirect ke dashboard
    redirect("/app");
  }

  return (
    <AuthLayout>
      {children}
    </AuthLayout>
  );
}