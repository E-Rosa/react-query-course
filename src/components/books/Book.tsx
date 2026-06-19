import { VinminP, VinminSpan, VinminStarRating } from "@eliasrrosa/vinmin";
import { useIsOnScreen } from "../../hooks/isOnScreenHook";
import { useEffect } from "react";
import TagsList from "./TagsList";
import { useGetBookTags } from "../../hooks/useGetBookTags";

export type Book = {
  id: string;
  title: string;
  author: string;
  rating: number;
  quotes?: string[];
};

export interface BookView {
  book: Book;
  isPlaceholder?: boolean;
  onEnterScreen?: () => unknown;
}

export default function Book(props: BookView) {
  const { isOnScreen, ref } = useIsOnScreen();

  useEffect(() => {
    if (isOnScreen) props.onEnterScreen?.();
  }, [isOnScreen]);

  const tags = useGetBookTags({
    bookId: props.book.id,
    enabled: isOnScreen && !props.isPlaceholder
  })

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

      {tags.data && <TagsList tags={tags.data.tags} />}

      {tags.isLoading && (
        <VinminSpan vinminStyle="tertiary" className="text-sm mt-4">
          Loading...
        </VinminSpan>
      )}

      {tags.isError && (
        <VinminSpan className="text-red-500 mt-4 text-sm">
          {tags.error.message || "Error!"}
        </VinminSpan>
      )}
    </div>
  );
}
