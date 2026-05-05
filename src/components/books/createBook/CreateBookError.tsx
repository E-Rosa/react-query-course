import { VinminButton, VinminH2, VinminSpan } from "@eliasrrosa/vinmin";

interface CreateBookErrorProps {
  onTryAgainClick: () => void;
  message: string;
}

function CreateBookError(props: CreateBookErrorProps) {
  return (
    <div className="p-10 bg-white flex flex-col">
      <VinminH2>Error</VinminH2>
      <VinminSpan className="mb-4">{props.message}</VinminSpan>
      <VinminButton
        vinminStyle="black"
        attributes={{
          onClick: () => {
            props.onTryAgainClick();
          },
        }}
      >
        try again
      </VinminButton>
    </div>
  );
}

export default CreateBookError;
