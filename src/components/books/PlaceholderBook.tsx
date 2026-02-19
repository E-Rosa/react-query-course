import Book from "../books/Book";

export function PlaceholderBook() {
  return (
    <Book
      book={{
        author: "Loading...",
        id: "0",
        rating: 0,
        title: "Loading...",
        quotes: ["Loading..."],
      }}
      isPlaceholder={true} />
  );
}
