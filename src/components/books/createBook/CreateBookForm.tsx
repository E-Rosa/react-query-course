import {
  VinminButton,
  VinminH2,
  VinminInput,
  VinminSpan,
  VinminStarRating,
} from "@eliasrrosa/vinmin";
import { useState } from "react";
import { useCreateReadBook } from "../../../hooks/bookHooks";
import { useFeedback } from "@eliasrrosa/react-ui";
import { useQueryClient } from "@tanstack/react-query";

interface CreateBookFormProps {
  onCreateSuccess?: () => void;
}

function CreateBookForm(props: CreateBookFormProps) {
  const [title, setTitle] = useState<string>();
  const [author, setAuthor] = useState<string>();
  const [quotes, setQuotes] = useState<string>();
  const [rating, setRating] = useState<number>(0);
  const [tags, setTags] = useState<string>();
  const quotesArray = quotes ? quotes.split(",") : undefined;
  const feedback = useFeedback();
  const queryClient = useQueryClient();
  const createBook = useCreateReadBook({
    onSuccess: () => {
      props.onCreateSuccess?.();
      feedback.setSuccess("Book was added to the shelf!");
      queryClient.invalidateQueries({
        exact: true,
        queryKey: ["getBooksPaginated"],
      });
      queryClient.invalidateQueries({
        exact: true,
        queryKey: ["getBooksStacked"],
      });
    },
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
        }}
      />
      <VinminInput
        inputClassName="w-full"
        label="Tags"
        attributes={{
          onChange: (ev) => {
            setTags(ev.currentTarget.value);
          },
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
      {!createBook.isPending && (
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
              if(!tags){
                return feedback.setError("Please, insert at least one tag.")
              }
              if(!quotesArray || quotesArray.length == 0) {
                return feedback.setError("Please, insert at least one quote.")
              }
              createBook.mutate({
                book: {
                  title: title,
                  author: author,
                  rating: rating,
                  quotes: quotesArray,
                },
                tags: tags ? tags.split(",") : [],
              });
            },
          }}
        >
          Submit
        </VinminButton>
      )}
    </form>
  );
}

export default CreateBookForm;
