import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Stethoscope } from "lucide-react";

interface IheroProps {
    srcImage: string;
    title: string;
    text: string;
    button: {
        buttonHref: string;
        buttonIcon: React.ReactNode;
        buttonText: string;
    };
}

const HeroProps : IheroProps = {
    srcImage: "images/hero.svg",
    title: "MeLi siap memberikan fakta seputar dunia kesehatan",
    text: "Fakta kesehatan merupakan hal yang sangat penting untuk seluruh orang, jangan sampai hoax merenggut nyawa anda.",
    button: {
        buttonHref: "/",
        buttonIcon: <Stethoscope className="size-6" />,
        buttonText: "Mulai Percakapan",
    },
}


export default function Hero() {
    return (
        <div className="grid md:grid-cols-2 md:grid-flow-dense gap-4 items-center justify-items-center px-4 lg:px-14 mb-10 lg:my-0">
            <div className="w-full flex justify-center md:col-start-2">
            <Image
                src={HeroProps.srcImage}
                width={581.12}
                height={751.84}
                alt="logo"
                className="max-w-full h-auto"
            />
            </div>
            <div className="text-start space-y-10 md:col-start-1">
            <div className="space-y-4">
                <h2 className="text-gradient text-2xl sm:text-3xl md:text-5xl font-poppins font-bold">
                {HeroProps.title}
                </h2>
                <p className="text-[#6C87AE] text-sm sm:text-base md:text-lg">
                {HeroProps.text}
                </p>
            </div>
            <Button asChild variant="gradient" size="xl" className="rounded-full">
                <Link href={HeroProps.button.buttonHref} className="hover:text-gradient" aria-current="page">
                    {HeroProps.button.buttonIcon}
                    {HeroProps.button.buttonText}
                </Link>
            </Button>
            </div>
        </div>
    );
}