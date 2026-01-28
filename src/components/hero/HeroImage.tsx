import heroImage from "../../assets/hero-image.webp";

interface HeroImageProps {
  className?: string;
}

function HeroImage(props: HeroImageProps) {
  return <img src={heroImage} className={props.className} />;
}

export default HeroImage;
