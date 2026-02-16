import { Book } from "../../components/readBooks/Book";
import { LocalStorage } from "../../storage/localStorage";
import { MockBody, MockFetch, MockResponse } from "@eliasrrosa/mock-fetch";
import { RepoConfig } from ".././config";

export async function fetchRandomQuote(): Promise<MockResponse> {
  return MockFetch.fetch(
    () => {
      const readBooksJSON = LocalStorage.getReadBooks();

      if (!readBooksJSON) {
        return new MockResponse({
          body: new MockBody(undefined),
          status: 404,
        });
      }

      const readBooks = JSON.parse(readBooksJSON) as Book[];
      const getRandomIndex = () => Math.floor(Math.random() * (readBooks.length - 1));
      let randomBookIndex = getRandomIndex();
      let targetBook = readBooks[randomBookIndex];
      let targetBookHasQuote = targetBook.quotes && targetBook.quotes.length > 0;

      /*Try to get a quote, at most 10 times*/
      let i = 0;
      while (!targetBookHasQuote && i < 10) {
        randomBookIndex = getRandomIndex();
        targetBook = readBooks[randomBookIndex];
        targetBookHasQuote = targetBook.quotes && targetBook.quotes.length > 0;
        i++;
      }

      if (!targetBook.quotes || targetBook.quotes.length <= 0) {
        return new MockResponse({
          body: new MockBody(undefined),
          status: 404,
        });
      }

      const randomQuoteIndex = Math.floor(
        Math.random() * (targetBook.quotes.length - 1)
      );
      const quote = targetBook.quotes[randomQuoteIndex];
      return new MockResponse({
        body: new MockBody({ quote: quote }),
        status: 200,
      });
    },
    {
      fetchTimeoutMs: RepoConfig.DEFAULT_FETCH_TIMEOUT_MS,
    }
  );
}
