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
import { useEffect } from "react";
import { Login } from "./pages/Auth/Login";
import { Signup } from "./pages/Signup/Signup";
import { UpdatePassword } from "./pages/UpdatePassword/UpdatePassword";
import BannerManage from "./pages/BannerManagement/BannerManagement";
const WithLogin = ({ authority = null, children }) => {
  const navigate = useNavigate();
  const actualAuthority = localStorage.getItem("authority");
  useEffect(() => {
    if (
      !actualAuthority ||
      (authority != null && authority !== actualAuthority)
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

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/look" element={<Look />} />
          <Route path="/record" element={<WithLogin children={<Record />} />} />
          <Route path="/banner/manage" element={<BannerManage/>}/>
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

        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

ReactModal.setAppElement("#root");
