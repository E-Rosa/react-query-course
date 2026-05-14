import { VinminButton, VinminSpan } from "@eliasrrosa/vinmin";

interface PaginatedReadBooksErrorProps {
  message: string;
  onRetryClick?: () => void;
}

function PaginatedReadBooksError(props: PaginatedReadBooksErrorProps) {
  return (
    <>
      <div className="border border-b flex flex-row justify-between items-center p-2 pl-4 w-full">
        <VinminSpan className="text-red-700">{props.message}</VinminSpan>
        {props.onRetryClick && (
          <VinminButton
            attributes={{
              onClick: () => {
                props.onRetryClick?.();
              },
            }}
          >
            retry
          </VinminButton>
        )}
      </div>
    </>
  );
}

export default PaginatedReadBooksError;
