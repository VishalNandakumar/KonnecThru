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
import ProfilePage from './pages/ProfilePage';

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
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
