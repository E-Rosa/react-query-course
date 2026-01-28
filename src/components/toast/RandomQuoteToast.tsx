import { useGetRandomQuote } from "../../hooks/bookHooks";
import { VinminSpan } from "@eliasrrosa/vinmin";

interface RandomQuoteToastProps {
  className?: string;
}

function RandomQuote(props: RandomQuoteToastProps) {
  const getRandomQuote = useGetRandomQuote();
  return (
    <>
      {getRandomQuote.data && (
        <VinminSpan vinminStyle="tertiary" className={props.className}>
          {`"${getRandomQuote.data.quote}"`}
        </VinminSpan>
      )}
    </>
  );
}

export default RandomQuote;
