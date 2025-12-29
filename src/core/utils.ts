import { type RouteItem } from "../routes";

export const findRouteByPath = (path: string, routes: RouteItem[]) => {
  return routes.find((route) => path.startsWith(route.path));
};

export const displayDate = (date: Date): string => {
  return date.toISOString().split("T")[0]; // Format date as YYYY-MM-DD
};

export const rupiahFormat = (value: string | number, locale = "id-ID") => {
  if (typeof value !== "number" || isNaN(value)) {
    throw new Error("Input must be a valid number.");
  }

  return value.toLocaleString(locale);
};
