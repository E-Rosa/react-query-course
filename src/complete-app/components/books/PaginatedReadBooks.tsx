import { VinminPagination } from "@eliasrrosa/vinmin";
import Book from "../readBooks/Book";
import { useEffect } from "react";
import { useGetReadBooksPaginated } from "../../hooks/bookHooks";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router";

function PaginatedReadBooks() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const searchParamsOffset = searchParams.get("offset");
  const offset = searchParamsOffset ? parseInt(searchParamsOffset) : 0;
  const take = 5;

  const getPaginatedBooks = useGetReadBooksPaginated({
    offset: offset,
    take: take,
  });

  useEffect(() => {
    if (getPaginatedBooks.isStale) {
      getPaginatedBooks.refetch();
    }
  }, [offset]);

  return (
    <>
      {getPaginatedBooks.data &&
        getPaginatedBooks.data.books &&
        getPaginatedBooks.data.books.length > 0 && (
          <div className="flex flex-col gap-4">
            {getPaginatedBooks.data.books.map((book, key) => {
              return <Book book={book} key={key} />;
            })}
            <VinminPagination
              className="self-center mt-2"
              itemsPerPage={5}
              offset={offset}
              totalItemsCount={getPaginatedBooks.data.totalBooksCount}
              onPageClick={(opts) => {
                queryClient.invalidateQueries({
                  queryKey: ["getBooksPaginated"],
                });
                searchParams.set("offset", `${opts.offset}`)
                navigate(`?${searchParams.toString()}`)
              }}
            />
          </div>
        )}
    </>
  );
}

export default PaginatedReadBooks;
