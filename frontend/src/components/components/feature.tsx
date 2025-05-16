import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

interface buttonProps {
  buttonHref: string;
  buttonIcon: string;
  buttonText: string;
}

interface FeatureProps {
  srcImage: string;
  title: string;
  text: string;
  button: buttonProps;
}

const FeatureData = [
{
  srcImage: "/icon/icon_drug.svg",
  title: "Performance",
  text: "Anda dapat bertukar informasi dan tanya jawab di postingan sesama pengguna lain MeLi",
  button: {
    buttonHref: "/login",
    buttonIcon: "/icon/icon_whatsapp.svg",
    buttonText: "Mulai Bersosialisasi",
  },
},
{
  srcImage: "/icon/icon_hearth.svg",
  title: "Baca Artikel Kesehatan",
  text: "Dapatkan informasi kesehatan terpercaya dari para ahli di bidangnya.",
  button: {
    buttonHref: "/login",
    buttonIcon: "/icon/icon_whatsapp.svg",
    buttonText: "Hubungi",
  },
},
{
  srcImage: "/icon/icon_syringe.svg",
  title: "Chatbot AI",
  text: "Toko tempat meramu dan menjual obat berdasarkan resep dokter serta memperdagangkan barang medis",
  button: {
    buttonHref: "/login",
    buttonIcon: "/icon/icon_whatsapp.svg",
    buttonText: "Mulai Percakapan",
  },
},
];

const Feature = () => {
  return (
    <section className="items-center justify-items-center my-20 px-4 lg:px-14" id="service">
      <div className="container">
        <div className="lg:flex justify-between">
            <h2 className="text-3xl font-semibold font-poppins lg:text-4xl">Daftar Layanan</h2>
            <p className="text-muted-foreground">Ahli kesehatan seperti dokter maupun tenaga kesehatan lainnya .....</p>
        </div>
        <div className="mt-14 grid gap-9 lg:mt-20 lg:grid-cols-3">
          {FeatureData.map((item, index) => (
            <FeatureCard
              key={index}
              srcImage={item.srcImage}
              title={item.title}
              text={item.text}
              button={item.button}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ( 
  { srcImage, title, text, button }: FeatureProps
) => {
  return (
    <div className="rounded-lg p-8 shadow-lg content-between grid">
        <div >
          <div className="mb-8 flex items-center justify-center w-20 h-20 rounded-full bg-primary/10">
            <Image src={srcImage} width={40} height={40} className="w-10 h-10" alt="icon" />
          </div>
          <h3 className="mb-3 text-2xl font-medium font-poppins">{title}</h3>
          <p className="mb-6 text-sm leading-7 text-muted-foreground">{text}</p>
        </div>
        <Button asChild variant="gradient" size="xl" className="rounded-full w-full">
              <Link href={button.buttonHref} className="hover:text-gradient" aria-current="page">
              <Image src={button.buttonIcon} width={24} height={24} className="size-6" alt="syringe" />
              {button.buttonText}
              </Link>
          </Button>
      </div>
  );
}

export { Feature };
