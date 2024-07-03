import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/Authcontext"; // Import AuthProvider
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import JobPostingForm from "./pages/JobPostingForm";

function App() {
  return (
    <AuthProvider>
      {" "}
      {/* Wrap components in AuthProvider */}
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      <JobPostingForm />
      </Router>
    </AuthProvider>
  );
}

export default App;
