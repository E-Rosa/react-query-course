import { emitError, FeedbackProvider } from "@eliasrrosa/react-ui";
import MainPage from "./components/pages/MainPage";
import { QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (err) => {
      emitError(err);
    }
  })
});

function BareApp() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <FeedbackProvider>
          <MainPage />
        </FeedbackProvider>
      </QueryClientProvider>
    </>
  );
}

export default BareApp;
