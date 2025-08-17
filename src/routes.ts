import {
  IconBook,
  IconHome,
  type IconProps,
} from "@arco-design/web-react/icon";
import ProjectPage from "./modules/Project/ProjectPage";
import PurchasePage from "./modules/PurchasePage";

export type RouteItem = {
  path: string;
  title: string;
  icon: React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<unknown>
  >;
  component: React.ComponentType;
}

export const routes: RouteItem[] = [
  {
    path: "/project",
    title: "Proyek",
    icon: IconHome,
    component: ProjectPage,
  },
  {
    path: "/purchase",
    title: "Pembelian",
    icon: IconBook,
    component: PurchasePage,
  },
];
