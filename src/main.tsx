import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppTabs from "./AppTabs";
import { BrowserRouter } from "react-router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AppTabs />
    </BrowserRouter>
  </StrictMode>
);
