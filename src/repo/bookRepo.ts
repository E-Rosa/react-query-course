import { Book } from "../components/readBooks/Book";
import { LocalStorage } from "../storage/localStorage";
import { GetBooksResponse } from "../hooks/bookHooks";
import { MockBody, MockFetch, MockResponse } from "@eliasrrosa/mock-fetch";

export type GetBooksOptions = {
  offset: number;
  take: number;
};

export async function fetchReadBooks(
  opts: GetBooksOptions
): Promise<MockResponse> {
  return MockFetch.fetch(() => {
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
    console.log("fetched books.");
    return res;
  });
}

export type CreateBookRequestBody = {
  book: Book;
};

export async function fetchPostReadBook(
  opts: CreateBookRequestBody
): Promise<MockResponse> {
  return MockFetch.fetch(() => {
    const storedBooksJSON = LocalStorage.getReadBooks();

    if (storedBooksJSON) {
      const storedBooks = JSON.parse(storedBooksJSON) as Book[];

      const updatedBooks = [opts.book].concat(storedBooks);

      LocalStorage.createReadBooks(JSON.stringify(updatedBooks));

      return new MockResponse({
        body: new MockBody(undefined),
        status: 200,
      });
    }

    LocalStorage.createReadBooks(JSON.stringify(opts.book));
    return new MockResponse({
      body: new MockBody(undefined),
      status: 200,
    });
  });
}

export type GetRandomQuoteResponseBody = {
  quote: string;
};
export async function fetchRandomQuote(): Promise<MockResponse> {
  return MockFetch.fetch(() => {
    const readBooksJSON = LocalStorage.getReadBooks();

    if (!readBooksJSON) {
      return new MockResponse({
        body: new MockBody(undefined),
        status: 404,
      });
    }

    const readBooks = JSON.parse(readBooksJSON) as Book[];
    const getRandomIndex = () =>
      Math.floor(Math.random() * (readBooks.length - 1));
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

    /* Have to use this condition rather than !targetBookHasQuote
     because typescript can't figure out that targetBook.quotes exists. */
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
  });
}
