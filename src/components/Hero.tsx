import { VinminButton, VinminH1, VinminP } from "@eliasrrosa/vinmin";
import HeroImage from "./HeroImage";

interface HeroProps {}

function Hero(props: HeroProps) {
  return (
    <>
      <div className="flex gap-2">
        <HeroImage className="w-[50%] sm:w-[20%]" />
        <div className="flex flex-col">
          <VinminH1>Book Shelf</VinminH1>
          <VinminP className="mb-3">
            A place to organize, record and appreciate your personal book
            library. Document, rate and organize all your read books in a single
            place.
          </VinminP>
          <VinminButton vinminStyle="white bordered">
            Organize your Books
          </VinminButton>
        </div>
      </div>
    </>
  );
}

export default Hero;
