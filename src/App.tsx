import { FeedbackProvider } from "@eliasrrosa/react-ui";
import MainPage from "./components/pages/MainPage";

function App() {
  return (
    <div className="w-full grid grid-cols-1 justify-items-center">
        <FeedbackProvider>
          <MainPage />
        </FeedbackProvider>
    </div>
  );
}

export default App;
