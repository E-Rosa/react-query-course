import { useQuery } from "@tanstack/react-query";
import { fetchRandomQuote } from "../repo/requests/fetchRandomQuote";
import { GetRandomQuoteResponse } from "../repo/responses/getRandomQuoteResponse";

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
      return res.json() as GetRandomQuoteResponse;
    },
    refetchInterval: 1000 * 10,
  });
}

