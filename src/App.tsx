import { FeedbackProvider } from "@eliasrrosa/react-ui";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import MainPage from "./components/pages/MainPage";
import { getQueryClient } from "./queryClient/queryClient";

const queryClient = getQueryClient();

function App() {
  return (
    <div className="grid grid-cols-1 justify-items-center">
      <QueryClientProvider client={queryClient}>
        <FeedbackProvider>
          <MainPage />
        </FeedbackProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </div>
  );
}

export default App;
