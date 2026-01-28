import {
  VinminButton,
  VinminH2,
  VinminInput,
  VinminSpan,
  VinminStarRating,
} from "@eliasrrosa/vinmin";
import { useState } from "react";
import { useFeedback } from "@eliasrrosa/react-ui";
interface CreateBookFormProps {
  onCreateSuccess?: () => void;
}

function CreateBookForm(props: CreateBookFormProps) {
  const [title, setTitle] = useState<string>();
  const [author, setAuthor] = useState<string>();
  const [quotes, setQuotes] = useState<string>();
  const [rating, setRating] = useState<number>(0);
  const quotesArray = quotes ? quotes.split(",") : undefined;
  const feedback = useFeedback();
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
        label="Book title"
        placeholder="eg: The Metamorphosis"
        inputClassName="w-full"
        attributes={{
          onChange: (ev) => {
            setTitle(ev.currentTarget.value);
          },
        }}
      />
      <VinminInput
        label="Book author"
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
          },
        }}
      >
        Submit
      </VinminButton>
    </form>
  );
}

export default CreateBookForm;
