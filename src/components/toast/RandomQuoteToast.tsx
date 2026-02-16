import { useGetRandomQuote } from "../../hooks/useGetRandomQuote";
import { VinminSpan } from "@eliasrrosa/vinmin";

interface RandomQuoteToastProps {
  className?: string;
}

function RandomQuote(props: RandomQuoteToastProps) {
  const getRandomQuote = useGetRandomQuote();
  return (
    <>
      {getRandomQuote.data &&
        !getRandomQuote.isLoading &&
        !getRandomQuote.isRefetching && (
          <VinminSpan vinminStyle="tertiary" className={props.className}>
            {`"${getRandomQuote.data.quote}"`}
          </VinminSpan>
        )}

      {(getRandomQuote.isLoading || getRandomQuote.isRefetching) && (
        <VinminSpan vinminStyle="tertiary" className={props.className}>
          Loading...
        </VinminSpan>
      )}

      {getRandomQuote.isError && (
        <VinminSpan vinminStyle="tertiary" className={props.className}>
          "Big Brother is watching you."
        </VinminSpan>
      )}
    </>
  );
}

export default RandomQuote;
