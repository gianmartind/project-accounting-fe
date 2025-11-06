import {
  IconBook,
  IconHome,
  type IconProps,
} from "@arco-design/web-react/icon";
import ProjectPage from "./modules/Project/view/ProjectPage";
import PurchasePage from "./modules/Purchase/view/PurchasePage";
import ProjectDetailPage from "./modules/Project/view/ProjectDetailPage";
import ProjectNewPage from "./modules/Project/view/ProjectNewPage";
import PurchaseNewPage from "./modules/Purchase/view/PurchaseNewPage";
import PurchaseDetailPage from "./modules/Purchase/view/PuchaseDetailPage";

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
    path: "/project/new",
    title: "Proyek",
    component: ProjectNewPage,
  },
  {
    path: "/purchase",
    title: "Pembelian",
    icon: IconBook,
    component: PurchasePage,
    sidebarMenu: true,
  },
  {
    path: "/purchase/detail/:uuid",
    title: "Pembelian",
    component: PurchaseDetailPage,
  },
  {
    path: "/purchase/new/:projectUuid?",
    title: "Pembelian",
    component: PurchaseNewPage,
  },
];
