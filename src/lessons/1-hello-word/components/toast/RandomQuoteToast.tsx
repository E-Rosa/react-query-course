import { VinminSpan } from "@eliasrrosa/vinmin";

interface RandomQuoteToastProps {
  className?: string;
}

function RandomQuote(props: RandomQuoteToastProps) {
  return (
    <>
        <VinminSpan vinminStyle="tertiary" className={props.className}>
          random quote
        </VinminSpan>
    </>
  );
}

export default RandomQuote;
