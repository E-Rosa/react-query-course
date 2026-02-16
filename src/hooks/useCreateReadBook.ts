import { useMutation } from "@tanstack/react-query";
import { CreateBookRequestBody, postReadBook } from "../repo/bookRepo";

export function useCreateReadBook(opts: {
  onMutate?: () => void;
  onSuccess?: () => void;
  onError?: (msg: string) => void;
}) {
  return useMutation({
    mutationFn: async (opts: CreateBookRequestBody) => {
      const res = await postReadBook(opts);
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
