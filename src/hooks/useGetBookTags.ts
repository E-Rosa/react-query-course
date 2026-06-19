import { useQuery } from "@tanstack/react-query";
import { fetchBookTags } from "../repo/requests/fetchBookTags";
import { GetBookTagsResponse } from "../repo/responses/getBookTagsResponse";

export function useGetBookTags(opts: { bookId: string; enabled: boolean }) {
  return useQuery({
    queryKey: [opts.bookId, "tags"],
    queryFn: async () => {
      const getTags = await fetchBookTags({
        bookId: opts.bookId,
      });

      if (getTags.status == 404) return;
      if (getTags.status != 200) throw new Error("Failed to get tags.");

      return (await getTags.json()) as GetBookTagsResponse;
    },
    enabled: opts.enabled,
  });
}
