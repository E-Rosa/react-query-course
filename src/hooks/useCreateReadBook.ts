import { useMutation } from "@tanstack/react-query";
import { postReadBook } from "../repo/requests/postReadBook";
import { PostReadBookRequestBody } from "../repo/requests/bodies/postReadBookRequestBody";

export function useCreateReadBook(opts: {
  onMutate?: () => void;
  onSuccess?: () => void;
  onError?: (msg: string) => void;
}) {
  return useMutation({
    mutationFn: async (opts: PostReadBookRequestBody) => {
      const res = await postReadBook(opts);
      if (res.status != 200) {
        const errMsg = res.json() as string
        throw new Error(errMsg);
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
