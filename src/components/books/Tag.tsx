export function Tag(props: { tag: string }) {
  return (
    <span className="px-2 py-1 border border-gray-500 text-gray-500 rounded">
      {props.tag}
    </span>
  );
}
