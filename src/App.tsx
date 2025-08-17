import "./App.css";
import "@arco-design/web-react/dist/css/arco.css";
import { routes } from "./routes";
import { createBrowserRouter, RouterProvider } from "react-router";
import AppLayout from "./AppLayout";

function App() {
  const browserRouter = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: routes.map((item) => {
        return {
          path: item.path,
          element: <item.component />,
        };
      }),
    },
  ]);

  return <RouterProvider router={browserRouter} />;
}

export default App;
