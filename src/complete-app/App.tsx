import { FeedbackProvider } from "@eliasrrosa/react-ui";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter } from "react-router";
import { getQueryClient } from "./queryClient/queryClient";
import Router from "./router/Router";
import MainPage from "./components/pages/MainPage";

const queryClient = getQueryClient();
function CompleteApp() {
  return (
    <QueryClientProvider client={queryClient}>
      <FeedbackProvider>
        <MainPage />
      </FeedbackProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default CompleteApp;
