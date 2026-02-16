import {
  VinminButton,
  VinminP,
  VinminSpan,
  VinminStarRating,
} from "@eliasrrosa/vinmin";
import { useIsOnScreen } from "../../hooks/isOnScreenHook";
import { useEffect, useState } from "react";
import { useGetBookTags } from "../../hooks/useGetBookTags";
import { Tag } from "../books/Tag";

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

function Book(props: BookView) {
  const { isOnScreen, ref } = useIsOnScreen();

  const getTags = useGetBookTags({
    bookId: props.book.id,
    enabled: !props.isPlaceholder && isOnScreen,
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

      {getTags.status == "pending" &&
        !props.isPlaceholder &&
        !getTags.isLoading && (
          <VinminButton
            className="w-fit py-0 mt-5"
            vinminStyle="white bordered"
            attributes={{
              onClick: () => {
                getTags.refetch();
              },
            }}
          >
            see tags
          </VinminButton>
        )}

      {getTags.isLoading && (
        <div className="mt-5">
          <Tag tag={"Loading..."} />
        </div>
      )}

      {getTags.data && (
        <div className="flex gap-2 mt-5">
          {getTags.data.tags.map((tag, key) => (
            <Tag tag={tag} key={key} />
          ))}
        </div>
      )}

      {getTags.error && (
        <div className="flex justify-between items-center p-4 border mt-5">
          <VinminSpan vinminStyle="tertiary">Failed to get tags.</VinminSpan>
          <VinminButton
            className="w-fit py-0"
            attributes={{
              onClick: () => {
                getTags.refetch();
              },
            }}
          >
            Try Again
          </VinminButton>
        </div>
      )}
    </div>
  );
}

export default Book;
