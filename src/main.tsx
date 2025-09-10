import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ConfigProvider } from "@arco-design/web-react";
import enUS from "@arco-design/web-react/es/locale/en-US";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <ConfigProvider locale={enUS}>
    <StrictMode>
      <App />
    </StrictMode>
  </ConfigProvider>
);
