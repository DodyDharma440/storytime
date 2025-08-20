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
  private controller: AbortController | null = null;

  constructor(fetcher: $Fetch) {
    this.$fetch = fetcher;
  }

  abort() {
    this.controller?.abort();
    this.controller = null;
  }

  async call<T, B extends object = object>(
    url: string,
    method: HttpMethod = "GET",
    data?: B,
    options?: FetchOptions<"json">
  ) {
    this.controller?.abort();
    this.controller = new AbortController();

    return this.$fetch<T>(url, {
      method,
      body: data,
      signal: this.controller.signal,
      ...options,
    });
  }
}

export default HttpFactory;
