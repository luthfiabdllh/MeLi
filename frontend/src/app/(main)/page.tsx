
import { Cta } from "@/components/components/cta";
import { Feature } from "@/components/components/feature";
import Hero from "@/components/components/hero";
import SectionBorder from "@/components/components/sectionBorder";
import SectionImage, { eImagePosition, sectionProps1, sectionProps2 } from "@/components/components/sectionImage";
import ToggleTheme from "@/components/ui/toggleTheme";

export default function Home() {
  return (
    <>
      <Hero/>
      <ToggleTheme/>
      <SectionBorder />
      <Feature />
      <SectionImage sectionProps={sectionProps1} imagePosition={eImagePosition.RIGHT} />
      <SectionImage sectionProps={sectionProps2} imagePosition={eImagePosition.LEFT} />
      <Cta />
    </>
  );
}
