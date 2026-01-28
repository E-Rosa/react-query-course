import { VinminPagination } from "@eliasrrosa/vinmin";
import Book, { Book as BookT } from "../readBooks/Book";

interface PaginatedBooksProps {
  books: BookT[];
  totalBooksCount?: number
  offset: number;
  onPageClick?: (opts: { itemsPerPage: number; offset: number }) => void;
}

function PaginatedBooks(props: PaginatedBooksProps) {
  return (
    <>
      <div className="flex flex-col gap-4">
        {props.books.map((book, key) => {
          return <Book book={book} key={key} />;
        })}
        <VinminPagination
          className="self-center mt-2"
          itemsPerPage={5}
          offset={props.offset}
          totalItemsCount={props.totalBooksCount}
          onPageClick={(opts) => {
            props.onPageClick?.(opts);
          }}
        />
      </div>
    </>
  );
}

export default PaginatedBooks;
