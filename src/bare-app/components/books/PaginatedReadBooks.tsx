import { VinminPagination } from "@eliasrrosa/vinmin";
import Book, { Book as BookT } from "../readBooks/Book";
import { useNavigate, useSearchParams } from "react-router";

function PaginatedReadBooks() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchParamsOffset = searchParams.get("offset");
  const offset = searchParamsOffset ? parseInt(searchParamsOffset) : 0;
  const readBooks = [{
    author: "Loading...",
    title: "Loading...",
    rating: 0
  }];
  
  return (
    <>
      <div className="flex flex-col gap-4">
        {readBooks.map((book, key) => {
          return <Book book={book} key={key} />;
        })}
        <VinminPagination
          className="self-center mt-2"
          itemsPerPage={5}
          offset={offset}
          totalItemsCount={readBooks.length}
          onPageClick={(opts) => {
            searchParams.set("offset", `${opts.offset}`);
            navigate(`?${searchParams.toString()}`);
          }}
        />
      </div>
    </>
  );
}

export default PaginatedReadBooks;