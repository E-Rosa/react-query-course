export class MockFetch {
  static fetch(callback: () => MockResponse): Promise<MockResponse> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(callback());
      }, 1000);
    });
  }
}

export class MockResponse {
  body: MockBody;
  status: number;

  constructor(opts: { body: MockBody; status: number }) {
    this.body = opts.body;
    this.status = opts.status;
  }
}

export class MockBody {
  data: string;

  constructor(data: unknown) {
    this.data = JSON.stringify(data);
  }

  json() {
    if (typeof this.data != "string") {
      throw new Error(`Expected string, received ${typeof this.data} instead.`);
    }
    return JSON.parse(this.data as string);
  }
}

export type FetchResponse = {
  body: {
    data: unknown;
    json: () => Promise<unknown>;
  };
  status: number;
};
