import type { SVGAttributes } from "vue";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SvgIconProps extends /* @vue-ignore */ SVGAttributes {}

export interface BreadcrumbItem {
  label: string;
  href: string;
  isActive?: boolean;
}
