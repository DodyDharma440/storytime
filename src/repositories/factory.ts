import type { $Fetch, FetchOptions } from "ofetch";

type HttpMethod =
  | "POST"
  | "GET"
  | "PUT"
  | "PATCH"
  | "DELETE"
  | "HEAD"
  | "OPTIONS";

class HttpFactory {
  $fetch: $Fetch;

  constructor(fetcher: $Fetch) {
    this.$fetch = fetcher;
  }

  async call<T, B extends object = object>(
    url: string,
    method: HttpMethod = "GET",
    data?: B,
    options?: FetchOptions<"json">
  ) {
    return this.$fetch<T>(url, {
      method,
      body: data,
      ...options,
    });
  }
}

export default HttpFactory;
