import type { SVGAttributes } from "vue";
import type {
  RouteLocationAsPathGeneric,
  RouteLocationAsRelativeGeneric,
} from "vue-router";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SvgIconProps extends /* @vue-ignore */ SVGAttributes {}

export interface BreadcrumbItem {
  label: string;
  href: string | RouteLocationAsRelativeGeneric | RouteLocationAsPathGeneric;
  isActive?: boolean;
}
