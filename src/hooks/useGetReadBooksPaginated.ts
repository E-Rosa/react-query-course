import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchReadBooks, GetBooksOptions } from "../repo/bookRepo";
import { GetBooksResponse } from "../repo/responses/GetBooksResponse";

export function useGetReadBooksPaginated(opts: GetBooksOptions) {
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