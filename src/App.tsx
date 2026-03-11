import { FeedbackProvider } from "@eliasrrosa/react-ui";
import MainPage from "./components/pages/MainPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

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
