import { VinminP, VinminSpan, VinminStarRating } from "@eliasrrosa/vinmin";
import { useIsOnScreen } from "../../hooks/isOnScreenHook";
import { useEffect } from "react";

export type Book = {
  title: string;
  author: string;
  rating: number;
  quotes?: string[];
};
interface BookProps {
  book: Book;
  onEnterScreen?: () => unknown;
}

function Book(props: BookProps) {
  const { isOnScreen, ref } = useIsOnScreen();
  useEffect(() => {
    if (isOnScreen) props.onEnterScreen?.();
  }, [isOnScreen]);
  const rating = props.book.rating || 0;
  return (
    <div className="p-6 flex flex-col border border-black" ref={ref}>
      <div className="flex justify-between items-center">
        <VinminSpan vinminStyle="primary">{props.book.title}</VinminSpan>
        <VinminStarRating filledStarsCount={rating} />
      </div>
      <VinminSpan vinminStyle="secondary" className="mb-5 text-[1em]">
        {props.book.author}
      </VinminSpan>
      {props.book.quotes && props.book.quotes.length > 0 && (
        <VinminP vinminStyle="tertiary">{props.book.quotes[0]}</VinminP>
      )}
    </div>
  );
}

export default Book;
