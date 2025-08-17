import { Layout, Menu, PageHeader } from "@arco-design/web-react";
import Content from "@arco-design/web-react/es/Layout/content";
import Sider from "@arco-design/web-react/es/Layout/sider";
import { IconCaretRight, IconCaretLeft } from "@arco-design/web-react/icon";
import { Outlet, useLocation, useNavigate } from "react-router";
import "./App.css";
import { useEffect, useState } from "react";
import { routes, type RouteItem } from "./routes";
import { findRouteByPath } from "./core/utils";

const MenuItem = Menu.Item;

const AppLayout = () => {
  const [collapsed, setCollapsed] = useState<boolean>();
  const menuItem = routes.map((route, index) => {
    const MenuIcon = route.icon;
    return (
      <MenuItem key={String(index)}>
        <MenuIcon />
        {route.title}
      </MenuItem>
    );
  });

  const navigate = useNavigate();
  const handleClickMenuItem = (key: string) => {
    navigate(routes[Number(key)].path);
  };

  const location = useLocation();
  const [currentRoute, setCurrentRoute] = useState<RouteItem>();
  useEffect(() => {
    setCurrentRoute(findRouteByPath(location.pathname, routes));
  }, [location]);

  return (
    <Layout className="full-height">
      <Sider
        className="full-height"
        collapsed={collapsed}
        onCollapse={() => setCollapsed(!collapsed)}
        collapsible
        trigger={collapsed ? <IconCaretRight /> : <IconCaretLeft />}
        breakpoint="xl"
      >
        <Menu onClickMenuItem={handleClickMenuItem} style={{ width: "100%" }}>
          {menuItem}
        </Menu>
      </Sider>
      <Layout>
        <PageHeader
          style={{ background: "var(--color-bg-2)" }}
          title={currentRoute?.title}
        />
        <Content style={{ padding: "1.5rem" }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
