import {
  IconBook,
  IconHome,
  type IconProps,
} from "@arco-design/web-react/icon";
import ProjectPage from "./modules/Project/view/ProjectPage";
import PurchasePage from "./modules/PurchasePage";
import ProjectDetailPage from "./modules/Project/view/ProjectDetailPage";

export type RouteItem = {
  path: string;
  title: string;
  icon?: React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<unknown>
  >;
  component: React.ComponentType;
  sidebarMenu?: boolean;
};

export const routes: RouteItem[] = [
  {
    path: "/project",
    title: "Proyek",
    icon: IconHome,
    component: ProjectPage,
    sidebarMenu: true,
  },
  {
    path: "/project/detail/:uuid",
    title: "Proyek",
    component: ProjectDetailPage,
  },
  {
    path: "/purchase",
    title: "Pembelian",
    icon: IconBook,
    component: PurchasePage,
    sidebarMenu: true,
  },
];
