import { useQuery } from "@tanstack/react-query";
import { fetchBookTags } from "../repo/requests/fetchBookTags";
import { GetBookTagsResponse } from "../repo/responses/getBookTagsResponse";

export function useGetBookTags(opts: { bookId: string; enabled?: boolean }) {
  return useQuery({
    queryKey: ["getBooksTags", opts.bookId],
    queryFn: async () => {
      const res = await fetchBookTags({ bookId: opts.bookId });
      if (res.status == 404) {
        throw new Error("Book tags not found.");
      }
      if (res.status != 200) {
        throw new Error("Failed to get book tags.");
      }
      return res.json() as GetBookTagsResponse;
    },
    enabled: opts.enabled,
  });
}
