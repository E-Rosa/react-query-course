import { useQuery } from "@tanstack/react-query";
import { fetchRandomQuote, GetRandomQuoteResponseBody } from "../repo/bookRepo";

export function useGetRandomQuote() {
  return useQuery({
    queryKey: ["getRandomQuote"],
    queryFn: async () => {
      const res = await fetchRandomQuote();
      if (res.status == 404) {
        throw new Error("Quote not found.");
      }
      if (res.status != 200) {
        throw new Error("Failed to find quote");
      }
      return res.json() as GetRandomQuoteResponseBody;
    },
    refetchInterval: 1000 * 10,
  });
}

