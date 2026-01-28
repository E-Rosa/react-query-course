import { readBooks } from "./data/books";
import { tags } from "./data/tags";

export class LocalStorage {
  static createReadBooksIfNotExists() {
    const existingBooks = window.localStorage.getItem("readBooks");
    if (!existingBooks) {
      this.createReadBooks();
    }
  }

  static createTagsIfNotExists() {
    const existingTags = window.localStorage.getItem("tags");
    if (!existingTags) {
      this.createTags();
    }
  }

  static createTags(tagsJSON?: string) {
    if (tagsJSON) {
      return window.localStorage.setItem("tags", tagsJSON);
    }
    return window.localStorage.setItem("tags", JSON.stringify(tags));
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

  static getTags() {
    return window.localStorage.getItem("tags");
  }
}
