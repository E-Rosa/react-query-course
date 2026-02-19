import { VinminDivider } from "@eliasrrosa/vinmin";
import Hero from "../hero/Hero";
import ReadBooksSection from "../books/ReadBooksSection";
import { LocalStorage } from "../../storage/localStorage";

LocalStorage.createReadBooksIfNotExists();

function MainPage() {
  return (
    <div className="bg-white max-w-[860px] px-8 md:px-18 pt-14 pb-14">
      <Hero className="mb-14" />
      <VinminDivider />
      <ReadBooksSection className="mt-4 mb-3" />
    </div>
  );
}

export default MainPage;
