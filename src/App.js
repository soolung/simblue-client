import ReactModal from "react-modal";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Header from "./components/Header/Header";
import Main from "./pages/Main/Main";
import Look from "./pages/Look/Look";
import Record from "./pages/Record/Record";
import Form from "./pages/Form/Form";
import ApplicationManagement from "./pages/Application/ApplicationManagement/ApplicationManagement";
import Footer from "./components/Footer/Footer";
import ApplicationDetail from "./pages/Application/ApplicationDetail/ApplicationDetail";
import GroupManagement from "./pages/GroupManagement/GroupManagement";
import { useEffect } from "react";
import { Login } from "./pages/Auth/Login";
import { Signup } from "./pages/Signup/Signup";
import { UpdatePassword } from "./pages/UpdatePassword/UpdatePassword";
import BannerManagement from "./pages/BannerManagement/BannerManagement";
import { useUser } from "./hooks/useUser";
import Callback from "./pages/Callback/Callback";
import AppLayout from "./components/Layout";
import Disabled from './pages/Utility/Disabled/Disabled';

const WithLogin = ({ authority = null, children }) => {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      !user.authority ||
      (authority != null && authority !== user.authority)
    ) {
      navigate("/");
    }
  }, []);

  return <>{children}</>;
};

function App() {
  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }

  useEffect(() => {
    setScreenSize();
  });


  if (process.env.REACT_APP_STATE === "DISABLED") {
    return (
      <div className="App-disabled">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Disabled />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/look" element={<Look />} />
            <Route
              path="/record"
              element={<WithLogin children={<Record />} />}
            />
            <Route path="/banner/manage" element={<BannerManagement />} />
            <Route
              path="/user/update/password"
              element={<WithLogin children={<UpdatePassword />} />}
            />
            <Route
              path="/application/create"
              element={
                <WithLogin
                  authority="ROLE_TEACHER"
                  children={<Form mode="create" />}
                />
              }
            />
            <Route
              path="/application/:id/update"
              element={
                <WithLogin
                  authority="ROLE_TEACHER"
                  children={<Form mode="update" />}
                />
              }
            />
            <Route
              path="/application/:id"
              element={<ApplicationDetail mode="reply" />}
            />
            <Route
              path="/application/:id/manage"
              element={
                <WithLogin
                  authority="ROLE_TEACHER"
                  children={<ApplicationManagement />}
                />
              }
            />
            <Route
              path="/reply/:id/update"
              element={
                <WithLogin children={<ApplicationDetail mode="update" />} />
              }
            />
          </Route>
          <Route path="/callback/google" element={<Callback />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

ReactModal.setAppElement("#root");
