import "./App.css";
import { Routes,Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/common/Navbar"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import OpenRoute from "./components/core/Auth/OpenRoute"
import ForgotPassword from "./pages/ForgotPassword";
import VerifyEmail from "./pages/VerifyEmail";
import Contact from "./pages/Contact";
import UpdatePassword from "./pages/UpdatePassword";
import MyProfile from "./components/core/Dashboard/MyProfile"
import Error from "./pages/Error";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Introduction from "./components/core/VoterPage/Introduction";
import AddCandidate from "./components/core/AdminPage/AddCandidate";
import Settings from "./components/core/Dashboard/Settings";
import Registration from "./components/core/VoterPage/Registration";
import Vote from "./components/core/VoterPage/Vote"
import Result from "./components/common/Result"
import ChangePhase from "./components/core/AdminPage/ChangePhase"
import VerifyVoter from "./components/core/AdminPage/VerifyVoter";
import About from "./pages/About";

function App() {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
        <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
        <Route
          path="update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />  
        <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail/>
            </OpenRoute>
          }
        />

        <Route
          path="contact"
          element={
              <Contact />
          }
        />

      <Route 
        path="forgot-password" 
        element={
          <OpenRoute>
            <ForgotPassword/>
          </OpenRoute>
        }
      />

      <Route
      path="about"
        element={
          <About/>
        }
      />

      <Route 
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      >
        <Route path="dashboard/my-profile" element={<MyProfile />} />
        <Route path="dashboard/settings" element={<Settings />} />
        <Route path="/voter/introduction" element={<Introduction/>} />
        <Route path="/voter/registration" element={<Registration/>}/>
        <Route path="/voter/vote" element={<Vote/>}/>
        <Route path="/election/result" element={<Result/>}/>
        <Route path="/admin/add-candidate" element={<AddCandidate/>}/>
        <Route path="/admin/change-phase" element={<ChangePhase/>}/>
        <Route path="/admin/verify-voter" element={<VerifyVoter/>}/>

      </Route>

      <Route path="*" element={<Error/>}/>
      </Routes> 
    </div>
  );
}

export default App;
