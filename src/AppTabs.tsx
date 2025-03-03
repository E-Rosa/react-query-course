import { VinminTabs } from "@eliasrrosa/vinmin";
import CompleteApp from "./complete-app/App";
import BareApp from "./bare-app/App";
import { Route, Routes, useLocation, useNavigate, useParams } from "react-router";

interface AppTabsProps {}

function AppTabs(props: AppTabsProps) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <div className="bg-white w-full p-4">
        <VinminTabs
          tabs={[
            {
              text: "complete app",
              isActive: location.pathname == "/",
              attributes: {
                onClick: () => {
                  navigate("/");
                },
              },
            },
            {
              text: "bare app",
              isActive: location.pathname == "/bare-app",
              attributes: {
                onClick: () => {
                  navigate("/bare-app");
                },
              },
            },
          ]}
        />
        <div className="w-full border border-black mt-4" />
      </div>
      <div className="w-full bg-white flex items-center justify-center">
        <Routes>
          <Route path="/" element={<CompleteApp />} />
          <Route path="/bare-app" element={<BareApp />} />
        </Routes>
      </div>
    </>
  );
}

export default AppTabs;
