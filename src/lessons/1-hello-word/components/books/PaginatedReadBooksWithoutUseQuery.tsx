import { VinminPagination } from "@eliasrrosa/vinmin";
import Book from "../readBooks/Book";
import { useNavigate, useSearchParams } from "react-router";
import { fetchReadBooks } from "../../../../shared-assets/repo/bookRepo";
import { GetBooksResponse } from "../../hooks/bookHooks";
import { useEffect, useState } from "react";

function PaginatedReadBooksWithoutUseQuery() {
  const [readBooks, setReadBooks] = useState<GetBooksResponse>();

  useEffect(() => {
    fetchReadBooks({
      take: 5,
      offset: offset,
    }).then((res) => {
      setReadBooks(res.json() as GetBooksResponse);
    });
  }, []);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchParamsOffset = searchParams.get("offset");
  const offset = searchParamsOffset ? parseInt(searchParamsOffset) : 0;

  return (
    <>
      {readBooks && readBooks.books && readBooks.books.length > 0 && (
        <div className="flex flex-col gap-4">
          {readBooks.books.map((book, key) => {
            return <Book book={book} key={key} />;
          })}
          <VinminPagination
            className="self-center mt-2"
            itemsPerPage={5}
            offset={offset}
            totalItemsCount={readBooks.totalBooksCount}
            onPageClick={(opts) => {
              searchParams.set("offset", `${opts.offset}`);
              navigate(`?${searchParams.toString()}`);
            }}
          />
        </div>
      )}
    </>
  );
}

export default PaginatedReadBooksWithoutUseQuery;
