import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchReadBooks } from "../repo/requests/fetchReadBooks";
import { FetchReadBooksParams } from "../repo/requests/queryParams/fetchReadBooksQueryParams";
import { GetBooksResponse } from "../repo/responses/getBooksResponse";

export function useGetReadBooksPaginated(opts: FetchReadBooksParams) {
  return useQuery({
    queryKey: ["getPaginatedBooks", opts.offset, opts.take],
    queryFn: async () => {
      const res = await fetchReadBooks(opts);
      if (res.status != 200) throw new Error("Failed to get books.");
      return res.json() as GetBooksResponse;
    },
    placeholderData: keepPreviousData,
  });
}