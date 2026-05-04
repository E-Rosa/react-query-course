import { Book } from "../../components/books/Book";
import { LocalStorage } from "../../storage/localStorage";
import { MockBody, MockFetch, MockResponse } from "@eliasrrosa/mock-fetch";
import { BookTags } from "../../storage/data/tags";
import { v4 } from "uuid";
import { RepoConfig } from ".././config";
import { PostReadBookRequestBody } from ".././requests/bodies/postReadBookRequestBody";

export async function postReadBook(
  opts: PostReadBookRequestBody,
): Promise<MockResponse> {
  return MockFetch.fetch(
    () => {
      const storedBooksJSON = LocalStorage.getReadBooks();

      const newBookId = v4();

      const newBook: Book = {
        ...opts.book,
        id: newBookId,
      };

      if (!storedBooksJSON) {
        LocalStorage.createReadBooks(JSON.stringify(newBook));
      }

      if (storedBooksJSON) {
        const storedBooks = JSON.parse(storedBooksJSON) as Book[];
        
        const bookAlreadyAdded = storedBooks.find(
          (book) => book.title == newBook.title,
        );

        if (bookAlreadyAdded) {
          return new MockResponse({
            status: 400,
            body: new MockBody("Book already added to list."),
          });
        }

        const updatedBooks = [newBook].concat(storedBooks);

        LocalStorage.createReadBooks(JSON.stringify(updatedBooks));
      }

      const tag = { tags: opts.tags, bookId: newBookId };

      const storedTagsJSON = LocalStorage.getTags();

      if (!storedTagsJSON) {
        LocalStorage.createTags(JSON.stringify(tag));
      }

      if (storedTagsJSON) {
        const storedTags = JSON.parse(storedTagsJSON) as BookTags[];

        const updatedTags = [tag].concat(storedTags);

        LocalStorage.createTags(JSON.stringify(updatedTags));
      }

      return new MockResponse({
        body: new MockBody(undefined),
        status: 200,
      });
    },
    {
      fetchTimeoutMs: RepoConfig.DEFAULT_FETCH_TIMEOUT_MS,
    },
  );
}
