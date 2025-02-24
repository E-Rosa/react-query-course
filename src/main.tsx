import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { FeedbackProvider } from "@eliasrrosa/react-ui";
import {
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter } from "react-router";
import Router from "./router/Router.tsx";
import { getQueryClient } from "./storage/queryClient.ts";

const queryClient = getQueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
        <FeedbackProvider>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </FeedbackProvider>
        <ReactQueryDevtools />
    </QueryClientProvider>
  </StrictMode>
);
