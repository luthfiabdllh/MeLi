import Image from "next/image";


export const SectionBorder = () => {
    return (
        <div className="flex flex-col lg:flex-row justify-center items-center w-full gap-6 bg-primary/10 p-4 lg:p-20 h-auto" id="border"> 
            <Image
            src="/icon/icon_gdgoc.svg"
            width={214}
            height={93}
            className="w-32 lg:w-auto"
            alt="icon"/>
            <Image
            src="/images/logo_gdgoc.svg"
            width={607}
            height={107}
            className="w-48 lg:w-auto"
            alt="icon"/>
        </div>
    );
}

export default SectionBorder;