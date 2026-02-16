import { useQuery } from "@tanstack/react-query";
import { fetchBooktags, GetBookTagsResponseBody } from "../repo/bookRepo";

export function useGetBookTags(opts: { bookId: string; enabled?: boolean }) {
  return useQuery({
    queryKey: ["getBooksTags", opts.bookId],
    queryFn: async () => {
      const res = await fetchBooktags({ bookId: opts.bookId });
      if (res.status == 404) {
        throw new Error("Book tags not found.");
      }
      if (res.status != 200) {
        throw new Error("Failed to get book tags.");
      }
      return res.json() as GetBookTagsResponseBody;
    },
    enabled: opts.enabled,
  });
}
