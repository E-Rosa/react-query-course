import { VinminButton, VinminSpan } from "@eliasrrosa/vinmin";
import Book from "./Book";

interface StackedBooksProps {}

function StackedBooks(_: StackedBooksProps) {
  const readBooks = [
    {
      author: "Loading...",
      title: "Loading...",
      rating: 1,
      id: "00000"
    },
  ];
  return (
    <>
      <div className="flex flex-col gap-4">
        {readBooks.map((book, index, books) => {
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
