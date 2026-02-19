import { Book } from "../../../components/books/Book";

export type PostReadBookRequestBody = {
  book: Omit<Book, "id">;
  tags: string[];
};
