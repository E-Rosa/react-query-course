import { LocalStorage } from "../../storage/localStorage";
import { MockBody, MockFetch, MockResponse } from "@eliasrrosa/mock-fetch";
import { BookTags } from "../../storage/data/tags";
import { RepoConfig } from ".././config";
import { GetBookTagsResponse } from "../responses/getBookTagsResponse";

export function fetchBookTags(opts: { bookId: string; }) {
  return MockFetch.fetch(
    () => {
      const JSONbookTagsArray = LocalStorage.getTags();

      if (!JSONbookTagsArray) {
        return new MockResponse({
          body: new MockBody(undefined),
          status: 404,
        });
      }

      const bookTagsArray = JSON.parse(JSONbookTagsArray) as BookTags[];
      const targetBookTags = bookTagsArray.find(
        (bookTagsData) => bookTagsData.bookId == opts.bookId
      );

      if (!targetBookTags) {
        return new MockResponse({
          body: new MockBody(undefined),
          status: 404,
        });
      }

      const body: GetBookTagsResponse = targetBookTags;
      return new MockResponse({
        body: new MockBody(body),
        status: 200,
      });
    },
    {
      fetchTimeoutMs: RepoConfig.DEFAULT_FETCH_TIMEOUT_MS,
    }
  );
}
