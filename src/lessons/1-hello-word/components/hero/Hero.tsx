import { VinminButton, VinminH1, VinminP } from "@eliasrrosa/vinmin";
import HeroImage from "./HeroImage";
import RandomQuote from "../toast/RandomQuoteToast";

interface HeroProps {
  className?: string;
}

function Hero(props: HeroProps) {
  return (
    <>
      <div className="flex flex-col">
        <div className={`flex gap-8 items-center ${props.className}`}>
          <HeroImage className="w-0 hidden lg:block lg:w-[300px] lg:h-[300px] lg:aspect-square" />
          <div className="flex flex-col">
            <VinminH1 attributes={{ className: "mt-0 mb-0" }}>
              Book Shelf
            </VinminH1>
            <VinminP className="mb-10">
              A place to organize, record and appreciate your personal book
              library. Document, rate and organize all your read books in a
              single place.
            </VinminP>
            <VinminButton vinminStyle="white bordered">
              Organize your Books
            </VinminButton>
          </div>
        </div>
        <RandomQuote className="mb-6 text-center italic" />
      </div>
    </>
  );
}

export default Hero;
