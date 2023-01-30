import ReactModal from "react-modal";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Header from "./components/Header/Header";
import Main from "./pages/Main/Main";
import Look from "./pages/Look/Look";
import Record from "./pages/Record/Record";
import Create from "./pages/Create/Create";
import ApplicationManagement from "./pages/Application/ApplicationManagement/ApplicationManagement";
import Footer from "./components/Footer/Footer";
import ApplicationDetail from "./pages/Application/ApplicationDetail/ApplicationDetail";
import { useEffect } from "react";
import { Login } from "./pages/Auth/Login";
import { Signup } from "./pages/Signup/Signup";
import { UpdatePassword } from "./pages//UpdatePassword/UpdatePassword";

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
          <Route
            path="/user/update/password"
            element={<WithLogin children={<UpdatePassword />} />}
          />
          <Route
            path="/create"
            element={
              <WithLogin authority="ROLE_TEACHER" children={<Create />} />
            }
          />
          <Route path="/application/:id" element={<ApplicationDetail />} />
          <Route
            path="/application/:id/manage"
            element={
              <WithLogin
                authority="ROLE_TEACHER"
                children={<ApplicationManagement />}
              />
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
