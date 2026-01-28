import { readBooks } from "./data/books";

export class LocalStorage {
  static createReadBooksIfNotExists() {
    const existingBooks = window.localStorage.getItem("readBooks");
    if (!existingBooks) {
      this.createReadBooks();
    }
  }

  static createReadBooks(booksJSON?: string) {
    if (booksJSON) {
      return window.localStorage.setItem("readBooks", booksJSON);
    }
    return window.localStorage.setItem("readBooks", JSON.stringify(readBooks));
  }

  static getReadBooks() {
    return window.localStorage.getItem("readBooks");
  }
}
