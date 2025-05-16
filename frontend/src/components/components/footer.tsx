import Image from "next/image";
import Link from "next/link";
import { FaFacebookSquare, FaWhatsapp, FaYoutube  } from "react-icons/fa";

const sections = [
  {
    title: "Company Info",
    links: [
      { name: "Tentang Kami", href: "#" },
      { name: "Karir", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Info Layanan", href: "#" },
    ],
  },
  {
    title: "Kontak Kami",
    links: [
      { name: "+626564465455", href: "#" },
      { name: "info@klinik24.com", href: "#" },
      { name: "Telp: +5646544654", href: "#" },
    ],
  },
];

interface footerProps {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
}
const Footer = ({
  logo = {
    url: "/",
    src: "/logo.svg",
    alt: "logo",
    title: "Meli",
  },
}: footerProps) => {
  return (
    <section className=" px-4 lg:px-34 py-15 bg-destructive text-white dark:text-black" id="contact">
      <div className="container">
        <div className="flex w-full flex-col items-center justify-between gap-10 text-center lg:flex-row lg:items-start lg:text-left">
          <div className="flex w-full flex-col items-center justify-between gap-6 lg:items-start">
            {/* Logo */}
            <div className="flex items-center gap-2 lg:justify-start">
              <Link href="/">
                <Image
                  width={32}
                  height={32}
                  src={logo.src}
                  alt={logo.alt}
                  title={logo.title}
                  className="size-10"
                />
              </Link>
              <h2 className="text-3xl font-semibold">{logo.title}</h2>
            </div>
            <p className="text-sm ">
              Lorem Ipsum
            </p>
            <ul className="flex items-center space-x-6   ">
              <li className="font-medium hover:text-primary">
                <a href="#">
                  <FaYoutube className="size-6" />
                </a>
              </li>
              <li className="font-medium hover:text-primary">
                <a href="#">
                  <FaFacebookSquare className="size-6" />
                </a>
              </li>
              <li className="font-medium hover:text-primary">
                <a href="#">
                  <FaWhatsapp className="size-6" />
                </a>
              </li>
            </ul>
          </div>
          <div className="grid w-full lg:w-1/2 grid-cols-2 gap-6">
            {sections.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-6 font-bold">{section.title}</h3>
                <ul className="space-y-4 text-sm   ">
                  {section.links.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className="font-medium hover:text-primary"
                    >
                      <a href={link.href}>{link.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm font-medium    ">
          <p>© 2025 GDGoC Meli.</p>
        </div>
      </div>
    </section>
  );
};

export { Footer };
