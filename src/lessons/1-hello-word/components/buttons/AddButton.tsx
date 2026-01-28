import { vinminAddIcon } from "@eliasrrosa/vinmin";

interface AddButtonProps {
    onClick?: () => void;
    className?: string;
}

function AddButton(props: AddButtonProps) {
  return (
    <button
      type="button"
      className={`cursor-pointer ${props.className}`}
      onClick={props.onClick}
    >
      {vinminAddIcon}
    </button>
  );
}

export default AddButton;
