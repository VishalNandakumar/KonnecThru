import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/Authcontext";
import NavBar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import JobPostingForm from "./pages/JobPostingForm";
import ListingPage from "./pages/ListingPage";
import ReferralListingPage from "./pages/ReferralListingPage";
import ReferralPostingForm from "./pages/ReferralPostingForm";
import ProfilePage from "./pages/ProfilePage";
import AdminPage from "./pages/AdminPage";
import NotificationsPage from "./pages/NotificationsPage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<RegisterPage />} />
          <Route path="/post-a-job" element={<JobPostingForm />} />
          <Route path="/job-listings" element={<ListingPage />} />
          <Route path="/referral-listings" element={<ReferralListingPage />} />
          <Route path="/post-a-referral" element={<ReferralPostingForm />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
