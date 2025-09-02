import { sortByOptions } from "~/constants/stories";

export const generateParams = (query: Record<string, string>) => {
  const { page, sort_by, category, search } = query;

  const queryParams: Record<string, string> = {
    page: `${page || "1"}`,
    sort_by: `${sort_by || sortByOptions[0].value}`,
  };

  if (category && category !== "All") {
    queryParams.category = category;
  }

  if (search) {
    queryParams.search = search;
  }

  return queryParams;
};
