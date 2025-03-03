import { VinminButton, VinminSpan } from "@eliasrrosa/vinmin";
import Book from "../readBooks/Book";
import { useGetReadBooksStacked } from "../../hooks/bookHooks";
import { useState } from "react";

interface StackedBooksProps {
}

function StackedBooks(_: StackedBooksProps) {
  const [offset, setOffset] = useState(0);
  const take = 5;
  const getStackedBooks = useGetReadBooksStacked({
    offset: offset,
    take: take,
  });

  const stackedBooks =
    getStackedBooks.data?.pages
      ?.flatMap((page) => {
        return page.books;
      })
      .filter((page) => page != undefined) || [];
  return (
    <>
      <div className="flex flex-col gap-4">
        {stackedBooks.map((book, index, books) => {
          const isLastBook = books.length == index + 1;
          return (
            <Book
              book={book}
              key={index}
              onEnterScreen={
                isLastBook
                  ? () => {
                      getStackedBooks.fetchNextPage();
                      setOffset((prev) => prev + take);
                    }
                  : undefined
              }
            />
          );
        })}
        {getStackedBooks.hasNextPage && !getStackedBooks.isFetching && (
          <VinminButton
            attributes={{
              onClick: getStackedBooks.hasNextPage
                ? () => {
                    getStackedBooks.fetchNextPage();
                    setOffset((prev) => prev + take);
                  }
                : undefined,
            }}
          >
            Load more...
          </VinminButton>
        )}
        {getStackedBooks.isFetching && (
          <VinminSpan className="w-full text-center text-gray-600 italic">
            Loading...
          </VinminSpan>
        )}
      </div>
    </>
  );
}

export default StackedBooks;
