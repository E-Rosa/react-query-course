import { useQuery } from "@tanstack/react-query";
import { fetchReadBooks } from "../repo/requests/fetchReadBooks";
import { GetBooksResponse } from "../repo/responses/getBooksResponse";

export function useGetBooksPaginated(opts: { take: number; offset: number }) {
  return useQuery({
    queryFn: async () => {
      const res = await fetchReadBooks({
        take: opts.take,
        offset: opts.offset,
      });

      return (await res.json()) as GetBooksResponse;
    },
    queryKey: ["getPaginatedBooks"],
  });
}
