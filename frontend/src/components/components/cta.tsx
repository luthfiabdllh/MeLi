import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ctaProps {
  heading?: string;
  description?: string;
  buttons?: {
    primary?: {
      text: string;
      url: string;
    };
    secondary?: {
      text: string;
      url: string;
    };
  };
}

const Cta = ({
  heading = "Gabung ke diskusi kami sekarang",
  description = "Rumah sakit adalah bagian integral dari suatu organisasi sosial dan kesehatan dengan fungsi menyediakan pelayanan paripurna (komprehensif).",
  buttons = {
    primary: {
      text: "Masuk",
      url: "/login",
    },
    secondary: {
      text: "Daftar Akun",
      url: "/register",
    },
  },
}: ctaProps) => {
  return (
    <section className="py-20 px-4">
      <div className="container text-white dark:text-black">
        <div className="flex flex-col items-center rounded-lg background-gradient p-8 text-center md:rounded-3xl lg:p-20">
          <h3 className="mb-3 max-w-3xl text-2xl font-semibold md:mb-4 md:text-4xl lg:mb-6">
            {heading}
          </h3>
          <p className="mb-10 max-w-3xl">
            {description}
          </p>
          <div className="flex w-full flex-col justify-center gap-2 sm:flex-row">
            {buttons.secondary && (
              <Button size="xl" className="w-full sm:w-auto rounded-full bg-transparent border border-white text-lg font-semibold" asChild>
                <Link href={buttons.secondary.url}>{buttons.secondary.text}</Link>
              </Button>
            )}
            {buttons.primary && (
              <Button size="xl" className="w-full sm:w-auto rounded-full bg-white text-primary text-lg font-semibold hover:bg-white/80" asChild>
                <Link href={buttons.primary.url}>{buttons.primary.text}</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Cta };
