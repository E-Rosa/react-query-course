import { Book } from "../../components/books/Book";
import { LocalStorage } from "../../storage/localStorage";
import { GetBooksResponse } from "../responses/getBooksResponse";
import { MockBody, MockFetch, MockResponse } from "@eliasrrosa/mock-fetch";
import { RepoConfig } from "../config";
import { FetchReadBooksParams } from "./queryParams/fetchReadBooksQueryParams";

export async function fetchReadBooks(
  opts: FetchReadBooksParams
): Promise<MockResponse> {
  return MockFetch.fetch(
    () => {
      const offset = opts.offset;
      const end = opts.take + offset;

      const offsetIsValid = offset >= 0;
      const endIsValid = end > 0;
      if (!offsetIsValid || !endIsValid) {
        return new MockResponse({
          body: new MockBody(undefined),
          status: 400,
        });
      }

      const allBooksJSON = LocalStorage.getReadBooks();
      if (!allBooksJSON) {
        return new MockResponse({
          body: new MockBody(undefined),
          status: 404,
        });
      }

      const allBooks = JSON.parse(allBooksJSON) as Book[];
      const slicedBooks = allBooks.slice(offset, end);

      const status = 200;
      const body: GetBooksResponse = {
        books: slicedBooks,
        totalBooksCount: allBooks.length,
      };

      const res = new MockResponse({
        body: new MockBody(body),
        status: status,
      });

      return res;
    },
    {
      fetchTimeoutMs: RepoConfig.DEFAULT_FETCH_TIMEOUT_MS,
    }
  );
}
