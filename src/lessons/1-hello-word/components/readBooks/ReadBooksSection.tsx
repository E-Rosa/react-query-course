import ReadBooksSectionHeader, {
} from "./ReadBooksSectionHeader";
import { useState } from "react";
import PaginatedReadBooksWithUseQuery from "../books/PaginatedReadBooksWithUseQuery";
import StackedBooks from "../books/StackedReadBooks";
import { Modal } from "@eliasrrosa/react-ui";
import CreateBookForm from "../books/createBook/CreateBookForm";
import { useNavigate, useSearchParams } from "react-router";
import PaginatedReadBooksWithoutUseQuery from "../books/PaginatedReadBooksWithoutUseQuery";

interface ReadBooksSectionProps {
  children?: JSX.Element;
  className?: string;
}

function ReadBooksSection(props: ReadBooksSectionProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const activeTabParam = searchParams.get("activeTab");
  const activeTab =
    activeTabParam == "stack"
      ? activeTabParam
      : activeTabParam == "pagination"
      ? activeTabParam
      : "pagination";

  const [createBookModalIsActive, setCreateBookModalIsActive] = useState(false);

  return (
    <>
      <div>
        <ReadBooksSectionHeader
          className={props.className}
          onTabChange={(tabName) => {
           navigate(`?activeTab=${tabName}`)
          }}
          onAddButtonClick={() => {
            setCreateBookModalIsActive(true);
          }}
          activeTab={activeTab}
        />
        {activeTab == "pagination" && <PaginatedReadBooksWithUseQuery />}
        {activeTab == "stack" && <StackedBooks />}
      </div>
      {createBookModalIsActive && (
        <Modal
          onOutsideClick={() => {
            setCreateBookModalIsActive(false);
          }}
          containerClassName="flex flex-col items-center justify-center gap-4 h-fit my-5"
        >
          <CreateBookForm
            onCreateSuccess={() => {
              setCreateBookModalIsActive(false);
            }}
          />
        </Modal>
      )}
    </>
  );
}

export default ReadBooksSection;
