import { VinminButton, VinminSpan } from "@eliasrrosa/vinmin";
import Book from "../readBooks/Book";
import { readBooks } from "../../../../shared-assets/storage/data/books";

interface StackedBooksProps {}

function StackedBooks(_: StackedBooksProps) {
  const stackedBooks = readBooks;
  return (
    <>
      <div className="flex flex-col gap-4">
        {stackedBooks.slice(0, 5).map((book, index, books) => {
          const isLastBook = books.length == index + 1;
          return (
            <Book
              book={book}
              key={index}
              onEnterScreen={isLastBook ? () => {} : undefined}
            />
          );
        })}
        <VinminButton
          attributes={{
            onClick: () => {},
          }}
        >
          Load more...
        </VinminButton>
        <VinminSpan className="w-full text-center text-gray-600 italic">
          Loading...
        </VinminSpan>
      </div>
    </>
  );
}

export default StackedBooks;
