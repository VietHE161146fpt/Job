import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/shared/Navbar";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./components/Home";
import Footer from "./components/shared/Footer";
import Jobs from "./components/Jobs";
import Browser from "./components/Browser";
import Profile from "./components/Profile";
import JobDetails from "./components/JobDetails";
import Companies from "./components/admin/Companies";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import CompanyCreate from "./components/admin/CompanyCreate";
import CompanySetup from "./components/admin/CompanySetup";
import AdminJobs from "./components/admin/AdminJobs";
import PostJob from "./components/admin/PostJob";
import Applicants from "./components/admin/Applicants";
import ManagerProtectedRoute from "./components/admin/ManagerRoute";
import Manager from "./components/admin/Manager";
import ManagerUser from "./components/admin/ManagerUser";
import RoleApplicationForm from "./components/RoleApplicationForm";
import RoleApplicationList from "./components/ApplicationList";
import UpdateRoleApplication from "./components/RoleApplicationUpdate";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/browse" element={<Browser />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/description/:id" element={<JobDetails />} />
        
        {/* admin */}
        <Route path="/admin/companies" element= {<ProtectedRoute><Companies /></ProtectedRoute>} />
        <Route path="/admin/companies/create" element={<ProtectedRoute><CompanyCreate /></ProtectedRoute>} />
        <Route path="admin/companies/:id" element= {<ProtectedRoute><CompanySetup /></ProtectedRoute>} />
        <Route path="admin/jobs" element= {<ProtectedRoute><AdminJobs /></ProtectedRoute>} />
        <Route path="admin/jobs/create" element= {<ProtectedRoute><PostJob /></ProtectedRoute>} />
        <Route path="admin/jobs/:id/applicants" element= {<ProtectedRoute><Applicants /></ProtectedRoute>} />
        <Route path="/apply" element={<RoleApplicationForm />} />
        <Route path="/apply/:id" element={<UpdateRoleApplication />} />
       
        {/* /////manager */}
        <Route path="admin/manager" element= {<ManagerProtectedRoute><Manager/></ManagerProtectedRoute>} />
        <Route path="admin/manager/user" element= {<ManagerProtectedRoute><ManagerUser/></ManagerProtectedRoute>} />
        <Route path="/admin/manager/applications" element={<ManagerProtectedRoute><RoleApplicationList /></ManagerProtectedRoute>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
