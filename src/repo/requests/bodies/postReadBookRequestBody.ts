import { Book } from "../../../components/readBooks/Book";

export type PostReadBookRequestBody = {
  book: Omit<Book, "id">;
  tags: string[];
};
