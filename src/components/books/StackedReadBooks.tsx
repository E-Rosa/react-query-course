import { VinminButton, VinminSpan } from "@eliasrrosa/vinmin";
import Book from "../readBooks/Book";
import { useGetReadBooksStacked } from "../../hooks/useGetReadBooksStacked";
import { PlaceholderBook } from "../readBooks/PlaceholderBook";

interface StackedBooksProps {}

function StackedBooks(_: StackedBooksProps) {
  const offset = 0;
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
        {getStackedBooks.isSuccess &&
          stackedBooks.map((book, index, books) => {
            const isLastBook = books.length == index + 1;
            return getStackedBooks.isPlaceholderData ? (
              <PlaceholderBook key={index} />
            ) : (
              <Book
                book={book}
                key={book.id}
                onEnterScreen={
                  isLastBook
                    ? () => {
                        getStackedBooks.fetchNextPage();
                      }
                    : undefined
                }
              />
            );
          })}

        {getStackedBooks.isError && (
          <div className="flex items-center justify-between border p-4 text-center w-full border-gray-600 mt-2">
            <VinminSpan vinminStyle="primary" className="text-gray-600">
              {getStackedBooks.error.message}
            </VinminSpan>
            <VinminButton
              attributes={{
                onClick: () => {
                  getStackedBooks.refetch();
                },
              }}
              className="p-2 ml-4 w-fit place-self-center self-center"
            >
              Try again
            </VinminButton>
          </div>
        )}

        {getStackedBooks.hasNextPage &&
          !getStackedBooks.isFetching &&
          !getStackedBooks.isError && (
            <VinminButton
              attributes={{
                onClick: getStackedBooks.hasNextPage
                  ? () => {
                      getStackedBooks.fetchNextPage();
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
