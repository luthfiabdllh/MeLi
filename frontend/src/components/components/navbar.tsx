import { Menu, Stethoscope } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import Image from "next/image";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface NavbarProps {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  menu?: MenuItem[];
  auth?: {
    login: {
      title: string;
      url: string;
    };
   };
}

const Navbar = ({
  logo = {
    url: "/",
    src: "/logo.svg",
    alt: "logo",
    title: "Meli",
  },
  menu = [
    { title: "Beranda", url: "/" },
    { title: "Tentang Kami", url: "#about" },
    { title: "Layanan", url: "#service" },
    { title: "Kontak Kami", url: "#contact" },
  ],
  auth = {
    login: { title: "Masuk", url: "/login" },
  },
}: NavbarProps) => {
  return (
    <section className="py-4 px-8 fixed top-0 left-0 right-0 z-50">
      <div className="container">
        {/* Desktop Menu */}
        <nav className="hidden justify-between lg:flex">
          <div className="flex items-center gap-18 bg-white/80 backdrop-blur rounded-full p-2 ">
            {/* Logo */}
            <Link href={logo.url} className="flex items-center gap-10">
              <Image
              src={logo.src} width={32} height={32} className=" size-14" alt={logo.alt} 
              />
              <span className="text-3xl font-semibold text-gradient">
                {logo.title}
              </span>
            </Link>
            <div className="flex items-center">
            <ul className="flex flex-1 list-none items-center justify-center gap-10">
                {menu.map((item) => (
                    <li
                        key={item.title}
                        className="inline-flex h-9 w-max items-center justify-center rounded-md text-sm font-medium text-muted-foreground hover:text-[#3A8EF6]"
                    >
                        <Link href={item.url} className="hover:text-gradient">
                            {item.title}
                        </Link>
                    </li>
                ))}
                <Button asChild variant="gradient" size="xl" className="rounded-full ml-38">
                    <Link href={auth.login.url} className="hover:text-gradient" aria-current="page">
                    <Stethoscope className="size-6"/>
                    {auth.login.title}
                    </Link>
                </Button>
            </ul>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="bg-white/80 backdrop-blur-md lg:hidden p-4 rounded-full">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href={logo.url} className="flex items-center gap-4">
              <Image
              src={logo.src} width={32} height={32} className="size-10" alt={logo.alt} 
              />
              <span className="text-3xl font-semibold text-gradient block lg:hidden">
          {logo.title}
              </span>
            </Link>

            <Sheet>
              <SheetTrigger asChild>
          <Button variant="outline" size="icon">
            <Menu className="size-4" />
          </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto backdrop-blur-md">
          <SheetHeader>
            <SheetTitle>
              <Link href={logo.url} className="flex items-center gap-4 ml-4">
              <Image
              src={logo.src} width={32} height={32} className="size-14" alt={logo.alt} 
              />
              </Link>
            </SheetTitle>
          </SheetHeader>
          <div className="flex flex-col gap-6 p-4">
              <ul className="flex flex-col list-none items-start gap-4">
            {menu.map((item) => (
                <li
              key={item.title}
              className="inline-flex h-9 w-max items-center justify-start rounded-md bg-background text-sm font-medium text-[#6C87AE] hover:text-[#3A8EF6]"
                >
              <Link href={item.url} className="hover:text-gradient">
                  {item.title}
              </Link>
                </li>
            ))}
              </ul>
            <div className="flex flex-col gap-3">
              <Button asChild variant="gradient" size="xl" >
              <Link href={auth.login.url} className="hover:text-gradient" aria-current="page">
              <Stethoscope className="size-6"/>
              {auth.login.title}
              </Link>
              </Button>
            </div>
          </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

export default  Navbar ;