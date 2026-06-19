import { useMutation } from "@tanstack/react-query";
import { PostReadBookRequestBody } from "../repo/requests/bodies/postReadBookRequestBody";
import { postReadBook } from "../repo/requests/postReadBook";

export function useCreateReadBook(opts: {
  onSuccess?: () => void;
  onError?: () => void;
  onMutate?: () => void;
}) {
  return useMutation({
    mutationFn: async (opts: PostReadBookRequestBody) => {
      const res = await postReadBook(opts);
      if (res.status != 200) {
        const errorMessage = await res.json();
        throw new Error(errorMessage);
      }
    },
    onSuccess: () => {
      opts.onSuccess?.();
    },
    onMutate: () => {
      opts.onMutate?.();
    },
    onError: () => {
      opts.onError?.();
    },
    mutationKey: ["createReadBook"],
  });
}
