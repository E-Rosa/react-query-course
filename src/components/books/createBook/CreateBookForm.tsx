import {
  VinminButton,
  VinminH2,
  VinminInput,
  VinminSpan,
  VinminStarRating,
} from "@eliasrrosa/vinmin";
import { useState } from "react";
import { useFeedback } from "@eliasrrosa/react-ui";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PostReadBookRequestBody } from "../../../repo/requests/bodies/postReadBookRequestBody";
import { postReadBook } from "../../../repo/requests/postReadBook";

interface CreateBookFormProps {
  onCreateSuccess?: () => void;
}

function CreateBookForm(props: CreateBookFormProps) {
  const [title, setTitle] = useState<string>();
  const [author, setAuthor] = useState<string>();
  const [quotes, setQuotes] = useState<string>();
  const [rating, setRating] = useState<number>(0);
  const [tags, setTags] = useState<string>();
  const feedback = useFeedback();
  const queryClient = useQueryClient();
  const createReadBook = useMutation({
    mutationFn: async (opts: PostReadBookRequestBody) => {
      const res = await postReadBook(opts);
      if (res.status != 200) {
        throw new Error("Failed to create read book.");
      }
    },
    onSuccess: () => {
      props.onCreateSuccess?.();
      feedback.setSuccess("Book was added to the shelf!");
      feedback.setLoading(false);
      queryClient.invalidateQueries({
        queryKey: ["getPaginatedBooks"],
      });
    },
    onMutate: () => {
      feedback.setLoading(true);
    },
    onError: () => {
      feedback.setLoading(false);
      feedback.setError("Server failed.");
    },
    mutationKey: ["createReadBook"],
  });

  return (
    <form className="p-10 bg-white flex flex-col gap-6">
      <VinminH2
        attributes={{
          className: "text-4xl",
        }}
      >
        Add a book to the shelf.
      </VinminH2>
      <VinminInput
        label="Title"
        placeholder="eg: The Metamorphosis"
        inputClassName="w-full"
        attributes={{
          onChange: (ev) => {
            setTitle(ev.currentTarget.value);
          },
          defaultValue: title,
        }}
      />
      <VinminInput
        label="Author"
        placeholder="eg: Franz Kafka"
        inputClassName="w-full"
        attributes={{
          onChange: (ev) => {
            setAuthor(ev.currentTarget.value);
          },
          defaultValue: author,
        }}
      />
      <VinminInput
        label="Quotes"
        placeholder="Your favorite quotes, separated by commas"
        inputClassName="w-full"
        attributes={{
          onChange: (ev) => {
            setQuotes(ev.currentTarget.value);
          },
          defaultValue: quotes,
        }}
      />
      <VinminInput
        inputClassName="w-full"
        label="Tags"
        attributes={{
          onChange: (ev) => {
            setTags(ev.currentTarget.value);
          },
          defaultValue: tags,
        }}
        placeholder="Book tags, separated by commas"
      />
      <div className="flex items-center gap-4 p-4 border border-black">
        <VinminSpan>Rating</VinminSpan>
        <VinminStarRating
          filledStarsCount={rating}
          onStarClick={(rating) => {
            setRating(rating);
          }}
        />
      </div>
      <VinminButton
        vinminStyle="black"
        className="mt-0"
        attributes={{
          onClick: (ev) => {
            ev.preventDefault();
            if (!title) {
              return feedback.setError("Please, insert a title.");
            }
            if (!author) {
              return feedback.setError("Please, insert an author.");
            }
            if (!tags) {
              return feedback.setError("Please, insert at least one tag.");
            }
            if (!quotes || quotes.length == 0) {
              return feedback.setError("Please, insert at least one quote.");
            }
            const book = {
              quotes: quotes.split(","),
              tags: tags.split(","),
              author: author,
              title: title,
              rating: rating,
            };
            createReadBook.mutate({
              book: book,
              tags: book.tags,
            });
          },
        }}
      >
        Submit
      </VinminButton>
    </form>
  );
}

export default CreateBookForm;
