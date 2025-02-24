import { Route, Routes } from "react-router";
import App from "../App";

interface RouterProps {}

function Router(_: RouterProps) {
  return (
    <>
      <Routes>
        <Route path="/" element={<App />}></Route>
      </Routes>
    </>
  );
}

export default Router;
