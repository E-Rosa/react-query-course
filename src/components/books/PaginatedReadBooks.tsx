import { VinminPagination } from "@eliasrrosa/vinmin";
import Book from "./Book";
import { useNavigate, useSearchParams } from "react-router";
import { useFeedback } from "@eliasrrosa/react-ui";
import { useEffect } from "react";
import PaginatedReadBooksError from "./PaginatedReadBooksError";
import { useGetBooksPaginated } from "../../hooks/useGetBooksPaginated";

function PaginatedReadBooks() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchParamsOffset = searchParams.get("offset");
  const offset = searchParamsOffset ? parseInt(searchParamsOffset) : 0;

  const readBooks = useGetBooksPaginated({
    take: 5,
    offset: 0,
  });

  const feedback = useFeedback();

  useEffect(() => {
    feedback.setLoading(readBooks.isFetching);
  }, [readBooks.isFetching]);

  return (
    <>
      <div className="flex flex-col gap-4">
        {readBooks.isFetching && <span>Fetching...</span>}
        {readBooks.isError && (
          <PaginatedReadBooksError
            message={readBooks.error.message}
            onRetryClick={() => {
              readBooks.refetch();
            }}
          />
        )}
        {readBooks.data?.books?.map((book, key) => {
          return <Book book={book} key={key} />;
        })}
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
      </div>
    </>
  );
}

export default PaginatedReadBooks;
