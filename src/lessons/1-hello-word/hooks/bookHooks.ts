import {
  InfiniteData,
  useInfiniteQuery,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import {
  fetchReadBooks,
  GetBooksOptions,
  CreateBookRequestBody,
  fetchPostReadBook,
  fetchRandomQuote,
  GetRandomQuoteResponseBody,
} from "../../../shared-assets/repo/bookRepo";
import { Book } from "../components/readBooks/Book";

export type GetBooksResponse = {
  books: Book[] | undefined;
  totalBooksCount: number;
};

export function useGetReadBooksPaginated(opts: GetBooksOptions) {
  return useQuery({
    queryKey: ["getBooksPaginated"],
    queryFn: async () => {
      const res = await fetchReadBooks(opts);
      if (res.status != 200) throw new Error("Failed to get books.");
      return res.json() as GetBooksResponse;
    },
    placeholderData: {
      books: Array(opts.take)
        .fill(undefined)
        .map(() => {
          return {
            author: "Loading...",
            title: "Loading...",
            rating: 0,
          };
        }),
      totalBooksCount: 100,
    },
  });
}

export type PageParams = { offset: number; take: number };

export function useGetReadBooksStacked(opts: GetBooksOptions) {
  return useInfiniteQuery<
    GetBooksResponse,
    Error,
    InfiniteData<GetBooksResponse, PageParams>,
    readonly unknown[],
    PageParams
  >({
    getNextPageParam: (lastPage, _, lastPageParam) => {
      const newOffset = lastPageParam.offset + opts.take;
      if (lastPage.totalBooksCount <= newOffset) return undefined;
      return { offset: newOffset, take: opts.take };
    },
    getPreviousPageParam: (firstPage, _, firstPageParam) => {
      const newOffset = firstPageParam.offset - opts.take;
      const newOffsetIsValid =
        newOffset >= 0 && newOffset <= firstPage.totalBooksCount;
      if (!newOffsetIsValid) return undefined;
      return { offset: newOffset, take: opts.take };
    },
    initialPageParam: opts,
    placeholderData: {
      pages: [
        {
          books: Array(opts.take)
            .fill(undefined)
            .map(() => {
              return {
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
    queryKey: ["getBooksStacked"],
    queryFn: async (opts) => {
      const res = await fetchReadBooks(opts.pageParam);
      if (res.status == 404) throw new Error("Books not found.");
      if (res.status != 200) throw new Error("Failed to get books.");
      return res.json() as GetBooksResponse;
    },
  });
}

export function useCreateReadBook(opts: {
  onMutate?: () => void;
  onSuccess?: () => void;
  onError?: (msg: string) => void;
}) {
  return useMutation({
    mutationFn: async (opts: CreateBookRequestBody) => {
      const res = await fetchPostReadBook(opts);
      if (res.status != 200) {
        throw new Error("Failed to create read book.");
      }
    },
    mutationKey: ["createReadBook"],
    onMutate: opts.onMutate,
    onSuccess: opts.onSuccess,
    onError: (err) => {
      err instanceof Error
        ? opts.onError?.(err.message)
        : opts.onError?.("Failed to create read book.");
    },
  });
}

export function useGetRandomQuote(){
  return useQuery({
    queryKey: ["getRandomQuote"],
    queryFn: async () => {
      const res = await fetchRandomQuote();
      if(res.status == 404){
        throw new Error("Quote not found.")
      }
      if(res.status != 200){
        throw new Error("Failed to find quote")
      }
      return res.json() as GetRandomQuoteResponseBody;
    },
    refetchInterval: 1000 * 10
  })
}