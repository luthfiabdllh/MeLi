import Navbar from "@/components/components/navbar";
import { Footer } from "@/components/components/footer";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (session) {
    // Jika sudah login, redirect ke dashboard
    redirect("/app");
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}
