import { Tag } from "./Tag";

interface TagsListProps {
  tags: string[];
}

function TagsList(props: TagsListProps) {
  return (
    <div className="flex flex-row gap-1 mt-4 text-sm">
      {props.tags.map((tag, key) => (
        <Tag tag={tag}></Tag>
      ))}
    </div>
  );
}

export default TagsList;
