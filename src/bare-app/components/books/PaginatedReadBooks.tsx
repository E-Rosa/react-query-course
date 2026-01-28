import { VinminPagination } from "@eliasrrosa/vinmin";
import Book from "../readBooks/Book";
import { useNavigate, useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchReadBooks } from "../../../shared-assets/repo/bookRepo";
import { GetBooksResponse } from "../../hooks/bookHooks";
import { useEffect, useState } from "react";
import { useFeedback } from "@eliasrrosa/react-ui";

function PaginatedReadBooks() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchParamsOffset = searchParams.get("offset");
  const offset = searchParamsOffset ? parseInt(searchParamsOffset) : 0;
  const readBooks = useQuery({
    queryKey: ["paginatedReadBooks"],
    queryFn: async () => {
      throw new Error("Failed to fetch books.");
      const response = await fetchReadBooks({
        take: 5,
        offset: offset,
      });
      return response.json() as GetBooksResponse;
    },
  });

  const feedback = useFeedback();
  useEffect(() => {
    feedback.setLoading(readBooks.isFetching);
  }, [readBooks.isFetching]);

  return (
    <>
      <div className="flex flex-col gap-4">
        {readBooks.data?.books?.map((book, key) => {
          return <Book book={book} key={key} />;
        })}
        {!readBooks.isError && (
          <VinminPagination
            className="self-center mt-2"
            itemsPerPage={5}
            offset={offset}
            totalItemsCount={readBooks.data?.totalBooksCount}
            onPageClick={(opts) => {
              searchParams.set("offset", `${opts.offset}`);
              navigate(`?${searchParams.toString()}`);
            }}
          />
        )}
      </div>
    </>
  );
}

export default PaginatedReadBooks;
