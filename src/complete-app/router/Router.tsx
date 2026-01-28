import { Route, Routes } from "react-router";
import MainPage from "../components/pages/MainPage";

interface RouterProps {}

function Router(_: RouterProps) {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />}></Route>
      </Routes>
    </>
  );
}

export default Router;
