import { Book } from "../../components/books/Book";

export type GetBooksResponse = {
  books: Book[];
  totalBooksCount: number;
};
