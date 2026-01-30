import { VinminButton, VinminPagination, VinminSpan } from "@eliasrrosa/vinmin";
import Book from "../readBooks/Book";
import { useGetReadBooksPaginated } from "../../hooks/bookHooks";
import { useNavigate, useSearchParams } from "react-router";
import { PlaceholderBook } from "../readBooks/PlaceholderBook";

function PaginatedReadBooks() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchParamsOffset = searchParams.get("offset");
  const offset = searchParamsOffset ? parseInt(searchParamsOffset) : 0;
  const take = 5;

  const getPaginatedBooks = useGetReadBooksPaginated({
    offset: offset,
    take: take,
  });

  return (
    <div className="flex flex-col gap-4">
      {getPaginatedBooks.isLoading && (
        <div className="flex flex-col gap-4">
          {Array.from({ length: take }).map((_, key) => (
            <PlaceholderBook key={key} />
          ))}
        </div>
      )}

      {getPaginatedBooks.data &&
        getPaginatedBooks.data.books &&
        getPaginatedBooks.data.books.length > 0 && (
          <div className="flex flex-col gap-4">
            {getPaginatedBooks.data.books.map((book, key) => {
              return <Book book={book} key={book.id} />;
            })}
          </div>
        )}

      {getPaginatedBooks.error && (
        <div className="flex items-center justify-between border p-4 text-center w-full border-gray-600 mt-2">
          <VinminSpan vinminStyle="primary" className="text-gray-600">
            {getPaginatedBooks.error.message}
          </VinminSpan>
          <VinminButton
            attributes={{
              onClick: () => {
                getPaginatedBooks.refetch();
              },
            }}
            className="p-2 ml-4 w-fit place-self-center self-center"
          >
            Try again
          </VinminButton>
        </div>
      )}

      {getPaginatedBooks.isLoading ||
        (getPaginatedBooks.isRefetching && (
          <VinminSpan vinminStyle="tertiary" className="self-center mt-2">
            Loading...
          </VinminSpan>
        ))}

      {!getPaginatedBooks.isLoading &&
        !getPaginatedBooks.isRefetching &&
        !getPaginatedBooks.error &&
        getPaginatedBooks.isSuccess && (
          <VinminPagination
            className="self-center mt-2"
            itemsPerPage={5}
            offset={offset}
            totalItemsCount={getPaginatedBooks.data?.totalBooksCount}
            onPageClick={(opts) => {
              searchParams.set("offset", `${opts.offset}`);
              navigate(`?${searchParams.toString()}`);
            }}
          />
        )}
    </div>
  );
}

export default PaginatedReadBooks;
