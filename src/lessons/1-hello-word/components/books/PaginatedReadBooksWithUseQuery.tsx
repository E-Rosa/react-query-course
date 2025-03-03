import { VinminPagination } from "@eliasrrosa/vinmin";
import Book from "../readBooks/Book";
import { useNavigate, useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchReadBooks } from "../../../../shared-assets/repo/bookRepo";
import { GetBooksResponse } from "../../hooks/bookHooks";

function PaginatedReadBooksWithUseQuery() {
  const readBooks = useQuery({
    queryKey: ["getPaginatedBooks"],
    queryFn: async () => {
      const res = await fetchReadBooks({
        take: 5,
        offset: offset,
      });
      if (res.status != 200) throw new Error("Failed to get books.");
      return res.json() as GetBooksResponse;
    },
  });
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchParamsOffset = searchParams.get("offset");
  const offset = searchParamsOffset ? parseInt(searchParamsOffset) : 0;

  return (
    <>
      {readBooks.data &&
        readBooks.data.books &&
        readBooks.data.books.length > 0 && (
          <div className="flex flex-col gap-4">
            {readBooks.data.books.map((book, key) => {
              return <Book book={book} key={key} />;
            })}
            <VinminPagination
              className="self-center mt-2"
              itemsPerPage={5}
              offset={offset}
              totalItemsCount={readBooks.data.totalBooksCount}
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

export default PaginatedReadBooksWithUseQuery;
