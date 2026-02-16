import { Book } from "../../components/readBooks/Book";

export type GetBooksResponse = {
  books: Book[];
  totalBooksCount: number;
};
