import { type RouteItem } from "../routes";

const findRouteByPath = (path: string, routes: RouteItem[]) => {
  return routes.find((route) => route.path === path);
};

const displayDate = (date: Date): string => {
  return date.toISOString().split("T")[0]; // Format date as YYYY-MM-DD
};
export { findRouteByPath, displayDate };
