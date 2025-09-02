import type { $Fetch, FetchOptions } from "ofetch";

type HttpMethod =
  | "POST"
  | "GET"
  | "PUT"
  | "PATCH"
  | "DELETE"
  | "HEAD"
  | "OPTIONS";

export interface FactoryOptions<B = Record<string, any>> {
  method?: HttpMethod;
  data?: B;
  options?: FetchOptions<"json">;
  withSignal?: boolean;
}

class HttpFactory {
  $fetch: $Fetch;
  private controllers = new Map<string, AbortController>();

  constructor(fetcher: $Fetch) {
    this.$fetch = fetcher;
  }

  async call<T, B extends object = object>(
    url: string,
    options?: FactoryOptions<B>
  ) {
    const authToken = useState<string | null>("__auth_token");

    const controller = new AbortController();
    this.controllers.get(url)?.abort();
    this.controllers.set(url, controller);

    return this.$fetch<T>(url, {
      method: options?.method ?? "GET",
      body: options?.data,
      signal: options?.withSignal ?? true ? controller.signal : undefined,
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
