// "use client";

// import { usePathname } from "next/navigation";
// import { ThemeProvider } from "next-themes";
// import Navbar from "@/components/components/navbar";
// import { Footer } from "@/components/components/footer";
// import Image from "next/image";

// export function Providers({ children }: { children: React.ReactNode }) {
//   const pathname = usePathname();
//   const isAuthRoute = pathname.startsWith("/login") || pathname.startsWith("/register");

//   return (
//     isAuthRoute ? (
//       <div className="grid min-h-svh h-screen lg:grid-cols-2">
//         <div className="relative hidden lg:block">
//           <div className="absolute inset-0 grid grid-cols-10">
//           <div className="col-span-8 bg-[#E2EDFF]"></div>
//           <div className="col-span-2 bg-white"></div>
//           </div>
//           <Image
//           fill
//           src="/images/auth.svg"
//           alt="Image"
//           className="absolute top-0 left-0 object-cover h-screen"
//           />
//         </div>
//         <div className="flex flex-col gap-4 p-6 md:p-10">
//           <div className="flex flex-1 items-center justify-center">
//           <div className="w-full max-w-xs">
//             {children}
//           </div>
//           </div>
//         </div>
//       </div>
//     ) : (
//       <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
//       <Navbar />
//       <div className="flex flex-col min-h-screen">
//         <div className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8">
//         {children}
//         </div>
//       </div>
//       <Footer />
//         </ThemeProvider>
//       )
//     );
// }
