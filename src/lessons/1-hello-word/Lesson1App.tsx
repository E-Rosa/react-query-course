import { FeedbackProvider } from "@eliasrrosa/react-ui";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MainPage from "./components/pages/MainPage";

const queryClient = new QueryClient();

function Lesson1App() {
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

export default Lesson1App;
