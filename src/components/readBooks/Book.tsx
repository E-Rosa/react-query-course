import {
  VinminButton,
  VinminP,
  VinminSpan,
  VinminStarRating,
} from "@eliasrrosa/vinmin";
import { useIsOnScreen } from "../../hooks/isOnScreenHook";
import { useEffect, useState } from "react";
import { useGetBookTags } from "../../hooks/bookHooks";
import { Tag } from "../books/Tag";

export type Book = {
  id: number;
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

  const [displayTags, setDisplayTags] = useState(false);

  const getTags = useGetBookTags({
    bookId: props.book.id,
    enabled: displayTags,
  });

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
      <VinminSpan vinminStyle="secondary" className="text-[1em] mb-5">
        {props.book.author}
      </VinminSpan>
      {props.book.quotes && props.book.quotes.length > 0 && (
        <VinminP vinminStyle="tertiary">{props.book.quotes[0]}</VinminP>
      )}
      {displayTags == false && (
        <VinminButton
          className="w-fit py-0 mt-5 rounded bg-white border-gray-600 text-gray-600"
          attributes={{
            onClick: () => {
              setDisplayTags(true);
            },
          }}
        >
          see tags
        </VinminButton>
      )}
      {displayTags && getTags.data && (
        <div className="flex gap-2 mt-5">
          {getTags.data.tags.map((tag) => (
            <Tag tag={tag} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Book;
