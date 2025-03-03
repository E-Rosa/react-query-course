import { FeedbackProvider } from "@eliasrrosa/react-ui";
import MainPage from "./components/pages/MainPage";

function BareApp() {
  return (
    <>
        <FeedbackProvider>
          <MainPage />
        </FeedbackProvider>
    </>
  );
}

export default BareApp;
