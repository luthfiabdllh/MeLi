import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

interface IsectionProps {
    srcImage: React.ReactNode;
    title: string;
    text: string;
    button: {
        buttonHref: string;
        buttonIcon: React.ReactNode;
        buttonText: string;
    };
}

export enum eImagePosition {
    LEFT = "left",
    RIGHT = "right",
}


export const sectionProps1 : IsectionProps = {
    srcImage: 
    <Image
        src="images/clinic.svg"
        width={523}
        height={405}
        alt="logo"
        className="max-w-full h-auto "
    />,
    title: "Sehat bersama fakta, jauhi berita hoax !!",
    text: "Fakta kesehatan merupakan hal yang sangat penting untuk seluruh orang, jangan sampai hoax merenggut nyawa anda.",
    button: {
        buttonHref: "/login",
        buttonIcon: 
        <Image
        src="/icon/icon_whatsapp.svg"
        width={24}
        height={24}
        className="size-6"
        alt="logo"
        />,
        buttonText: "Konsultasi",
    },
}

export const sectionProps2 : IsectionProps = {
    srcImage: 
    <Image
        src="/images/home.svg"
        width={518}
        height={510}
        alt="logo"
        className="max-w-full h-auto"
    />,
    title: "Berbagi bersama, sehat bersama",
    text: "Fakta kesehatan merupakan hal yang sangat penting untuk seluruh orang, jangan sampai hoax merenggut nyawa anda.",
    button: {
        buttonHref: "/register",
        buttonIcon: 
        <Image
        src="/icon/icon_whatsapp.svg"
        width={24}
        height={24}
        className="size-6"
        alt="logo"
        />,
        buttonText: "Bergabung",
    },
}


export default function SectionImage( { sectionProps, imagePosition }: { sectionProps: IsectionProps, imagePosition: eImagePosition }) {
    return (
        <div
            className= "grid md:grid-cols-2 md:grid-flow-dense gap-4 items-center justify-items-center px-4 lg:px-14 mb-10 my-18 lg:my-36" 
            id="about"
        >
            <div className={`w-full flex justify-center ${imagePosition === eImagePosition.RIGHT ? "md:col-start-2" : "md:col-start-1"}`}>
                {sectionProps.srcImage}
            </div>
            <div className={`text-start space-y-10 ${imagePosition === eImagePosition.RIGHT ? "md:col-start-1" : "md:col-start-2"}`}>
                <div className="space-y-4">
                    <h2 className="text-2xl sm:text-3xl md:text-5xl font-poppins font-bold">
                    {sectionProps.title}
                    </h2>
                    <p className="text-[#6C87AE] text-sm sm:text-base md:text-lg">
                    {sectionProps.text}
                    </p>
                </div>
                <Button asChild variant="gradient" size="xl" className="rounded-full">
                    <Link href={sectionProps.button.buttonHref} className="hover:text-gradient" aria-current="page">
                    {sectionProps.button.buttonIcon}
                    {sectionProps.button.buttonText}
                    </Link>
                </Button>
            </div>
        </div>
    );
}