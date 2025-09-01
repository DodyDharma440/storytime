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
    options?: {
      method?: HttpMethod;
      data?: B;
      options?: FetchOptions<"json">;
    }
  ) {
    const authToken = useState<string | null>("__auth_token");

    this.controller?.abort();
    this.controller = new AbortController();

    return this.$fetch<T>(url, {
      method: options?.method ?? "GET",
      body: options?.data,
      signal: this.controller.signal,
      ...options?.options,
      headers: {
        ...options?.options?.headers,
        ...(authToken.value
          ? { Authorization: `Bearer ${authToken.value}` }
          : {}),
        Accept: "application/json",
      },
    });
  }
}

export default HttpFactory;
