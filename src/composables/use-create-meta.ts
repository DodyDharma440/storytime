type UseSeoMetaInput = Parameters<typeof useSeoMeta>[0];

interface UseCreateMetaOptions extends UseSeoMetaInput {
  path?: string;
}

export const useCreateMeta = ({ path, ...options }: UseCreateMetaOptions) => {
  if (import.meta.server) {
    const config = useRuntimeConfig();
    useSeoMeta({
      title: "Storytime",
      description: options.description,
      ogDescription: options.description,
      ogUrl: `${config.public.BASE_URL}${path ?? ""}`,
      ogType: "website",
      twitterCard: "summary_large_image",
      ogSiteName: "Storytime",
      robots: "index, follow",
      ...options,
    });
  }
};
