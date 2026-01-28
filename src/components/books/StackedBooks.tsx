import { VinminButton, VinminSpan } from "@eliasrrosa/vinmin";
import Book, { Book as BookT } from "../readBooks/Book";

interface StackedBooksProps {
  books: BookT[];
  onLoadMore?: () => void;
  onLastBookEnterScreen?: () => void;
  isFetching?: boolean;
}

function StackedBooks(props: StackedBooksProps) {
  return (
    <>
      <div className="flex flex-col gap-4">
        {props.books.map((book, index, books) => {
          const isLastBook = books.length == index + 1;
          return (
            <Book
              book={book}
              key={index}
              onEnterScreen={
                isLastBook ? props.onLastBookEnterScreen : undefined
              }
            />
          );
        })}
        {props.onLoadMore && !props.isFetching && (
          <VinminButton
            attributes={{
              onClick: props.onLoadMore,
            }}
          >
            Load more...
          </VinminButton>
        )}
        {props.isFetching && (
          <VinminSpan className="w-full text-center text-gray-600 italic">
            Loading...
          </VinminSpan>
        )}
      </div>
    </>
  );
}

export default StackedBooks;
