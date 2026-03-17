import { FeedbackProvider } from "@eliasrrosa/react-ui";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import MainPage from "./components/pages/MainPage";
import { getQueryClient } from "./queryClient/queryClient";

const queryClient = getQueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="w-full grid grid-cols-1 justify-items-center">
        <FeedbackProvider>
          <MainPage />
        </FeedbackProvider>
      </div>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
