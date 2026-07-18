import {
  Button,
  Card,
  Grid,
  Layout,
  Menu,
  PageHeader,
} from "@arco-design/web-react";
import { IconMenu, IconRight, IconLeft } from "@arco-design/web-react/icon";
import { Outlet, useLocation, useNavigate } from "react-router";
import "./App.css";
import { useEffect, useState } from "react";
import { routes, type RouteItem } from "./routes";
import { findRouteByPath } from "./core/utils";

const MenuItem = Menu.Item;

const AppLayout = () => {
  const [collapsed, setCollapsed] = useState<boolean>(true);
  const menuItem = routes.map((route) => {
    if (route.sidebarMenu) {
      const MenuIcon = route.icon ?? IconMenu;
      return (
        <MenuItem key={route.path}>
          <MenuIcon />
          &nbsp;
          {route.title}
        </MenuItem>
      );
    }
  });

  const navigate = useNavigate();
  const handleClickMenuItem = (key: string) => {
    navigate(findRouteByPath(key, routes)?.path ?? "/");
  };

  const location = useLocation();
  const [currentRoute, setCurrentRoute] = useState<RouteItem>();
  useEffect(() => {
    setCurrentRoute(findRouteByPath(location.pathname, routes));
  }, [location]);

  return (
    <Layout className="full-height">
      <Layout.Sider
        className="full-height"
        collapsed={collapsed}
        defaultCollapsed={true}
        collapsible
        trigger={null}
        breakpoint="xl"
      >
        <Menu
          selectedKeys={[currentRoute?.path ?? "/"]}
          onClickMenuItem={handleClickMenuItem}
          style={{ width: "100%" }}
        >
          {menuItem}
        </Menu>
      </Layout.Sider>
      <Layout>
        <Layout.Header>
          <Card size="small">
            <Grid.Row>
              <Button type="text" onClick={() => setCollapsed(!collapsed)}>
                {collapsed ? <IconRight /> : <IconLeft />}
              </Button>
              <PageHeader
                title={currentRoute?.title}
                subTitle={currentRoute?.path}
                style={{ padding: "0px 0px" }}
              />
            </Grid.Row>
          </Card>
        </Layout.Header>
        <Layout.Content
          style={{ padding: "1rem", background: "var(--color-neutral-1)" }}
        >
          <Card>
            <Outlet />
          </Card>
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
