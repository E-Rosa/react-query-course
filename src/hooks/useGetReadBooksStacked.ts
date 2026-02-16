import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { GetBooksOptions, fetchReadBooks } from "../repo/bookRepo";
import { GetBooksResponse } from "../repo/responses/GetBooksResponse";
import { PaginationParams } from "../repo/requestParams/PaginationParams";

export function useGetReadBooksStacked(opts: GetBooksOptions) {
  return useInfiniteQuery<
    GetBooksResponse,
    Error,
    InfiniteData<GetBooksResponse, PaginationParams>,
    readonly unknown[],
    PaginationParams
  >({
    getNextPageParam: (lastPage, _, lastPageParam) => {
      const newOffset = lastPageParam.offset + opts.take;
      if (lastPage.totalBooksCount <= newOffset) return undefined;
      return { offset: newOffset, take: opts.take };
    },
    getPreviousPageParam: (firstPage, _, firstPageParam) => {
      const newOffset = firstPageParam.offset - opts.take;
      const newOffsetIsValid = newOffset >= 0 && newOffset <= firstPage.totalBooksCount;
      if (!newOffsetIsValid) return undefined;
      return { offset: newOffset, take: opts.take };
    },
    initialPageParam: opts,
    placeholderData: {
      pages: [
        {
          books: Array(opts.take)
            .fill(undefined)
            .map((_, i) => {
              return {
                id: `${i}`,
                author: "Loading...",
                title: "Loading...",
                rating: 0,
              };
            }),
          totalBooksCount: 100,
        },
      ],
      pageParams: [
        {
          offset: opts.offset,
          take: opts.take,
        },
      ],
    },
    queryKey: ["getStackedBooks", opts.offset, opts.take],
    queryFn: async (opts) => {
      const res = await fetchReadBooks(opts.pageParam);
      if (res.status == 404) throw new Error("Books not found.");
      if (res.status != 200) throw new Error("Failed to get books.");
      return res.json() as GetBooksResponse;
    },
  });
}

