// app/(auth)/layout.tsx
"use client";

import Image from "next/image";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-svh h-screen lg:grid-cols-2">
      <div className="relative hidden lg:block">
        <div className="absolute inset-0 grid grid-cols-10">
          <div className="col-span-8 bg-[#E2EDFF]" />
          <div className="col-span-2 bg-white" />
        </div>
        <Image
          fill
          src="/images/auth.svg"
          alt="Image"
          className="absolute top-0 left-0 object-cover h-screen"
        />
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">{children}</div>
        </div>
      </div>
    </div>
  );
}
