import { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";
import "../assets/css/admin.css";

const AdminPage = () => {
  const [activeSection, setActiveSection] = useState("jobs");
  const [jobPostings, setJobPostings] = useState([]);
  const [referralPostings, setReferralPostings] = useState([]);
  const [jobApplications, setJobApplications] = useState([]); // New state for job applications
  const [users, setUsers] = useState([]);
  const [isLoadingJobs, setIsLoadingJobs] = useState(false);
  const [isLoadingReferrals, setIsLoadingReferrals] = useState(false);
  const [isLoadingApplications, setIsLoadingApplications] = useState(false); // New loading state for job applications
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [jobError, setJobError] = useState(null);
  const [referralError, setReferralError] = useState(null);
  const [applicationError, setApplicationError] = useState(null); // New error state for job applications
  const [userError, setUserError] = useState(null);

  useEffect(() => {
    const fetchJobPostings = async () => {
      setIsLoadingJobs(true);
      setJobError(null);
      try {
        const API_URL = import.meta.env.VITE_API_URL;
        const response = await fetch(`${API_URL}/api/jobs/jobpostings`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const pendingJobs = data.filter(
          (job) => job.approvalStatus === "pending"
        );
        setJobPostings(pendingJobs);
      } catch (error) {
        setJobError(`Failed to fetch jobs: ${error.message}`);
        console.error("Failed to fetch jobs:", error);
      } finally {
        setIsLoadingJobs(false);
      }
    };

    const fetchReferralPostings = async () => {
      setIsLoadingReferrals(true);
      setReferralError(null);
      try {
        const API_URL = import.meta.env.VITE_API_URL;
        const response = await fetch(
          `${API_URL}/api/referrals/referralpostings`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setReferralPostings(data);
      } catch (error) {
        setReferralError(`Failed to fetch referrals: ${error.message}`);
        console.error("Failed to fetch referrals:", error);
      } finally {
        setIsLoadingReferrals(false);
      }
    };

    const fetchJobApplications = async () => {
      // New function to fetch job applications
      setIsLoadingApplications(true);
      setApplicationError(null);
      try {
        const API_URL = import.meta.env.VITE_API_URL;
        const response = await fetch(
          `${API_URL}/api/job-applications/application-postings`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setJobApplications(data.applications); // Adjust based on your API response
      } catch (error) {
        setApplicationError(
          `Failed to fetch job applications: ${error.message}`
        );
        console.error("Failed to fetch job applications:", error);
      } finally {
        setIsLoadingApplications(false);
      }
    };

    const fetchUsers = async () => {
      setIsLoadingUsers(true);
      setUserError(null);
      try {
        const API_URL = import.meta.env.VITE_API_URL;
        const response = await fetch(`${API_URL}/api/users/allUsers`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        setUserError(`Failed to fetch users: ${error.message}`);
        console.error("Failed to fetch users:", error);
      } finally {
        setIsLoadingUsers(false);
      }
    };

    fetchJobPostings();
    fetchReferralPostings();
    fetchJobApplications(); // Fetch job applications
    fetchUsers();
  }, []);

  const renderContent = () => {
    switch (activeSection) {
      case "jobs":
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4">Job Postings</h2>
            {isLoadingJobs ? (
              <div>Loading...</div>
            ) : jobError ? (
              <div>{jobError}</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {jobPostings.map((job) => (
                  <div
                    key={job._id}
                    className="p-4 border rounded bg-white shadow"
                  >
                    <h3 className="font-semibold">{job.jobTitle}</h3>
                    <p>{job.companyName}</p>
                    <div className="mt-4">
                      <button className="bg-green-500 text-white px-4 py-2 rounded mr-2">
                        Approve
                      </button>
                      <button className="bg-red-500 text-white px-4 py-2 rounded">
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      case "referrals":
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4">Referral Postings</h2>
            {isLoadingReferrals ? (
              <div>Loading...</div>
            ) : referralError ? (
              <div>{referralError}</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {referralPostings.map((referral) => (
                  <div
                    key={referral._id}
                    className="p-4 border rounded bg-white shadow"
                  >
                    <h3 className="font-semibold">{referral.referralName}</h3>
                    <p>{referral.referralCompany}</p>
                    <div className="mt-4">
                      <button className="bg-green-500 text-white px-4 py-2 rounded mr-2">
                        Approve
                      </button>
                      <button className="bg-red-500 text-white px-4 py-2 rounded">
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      case "applications":
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4">Job Applications</h2>
            {isLoadingApplications ? (
              <div>Loading...</div>
            ) : applicationError ? (
              <div>{applicationError}</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {jobApplications.map((application) => (
                  <div
                    key={application._id}
                    className="p-4 border rounded bg-white shadow"
                  >
                    <h3 className="font-semibold">Application Details</h3>
                    <p>User ID: {application.userId}</p>
                    <p>Referral Email: {application.referralEmail || "N/A"}</p>
                    <p className="mt-2">
                      <strong>Why Hire Me:</strong> {application.whyHire}
                    </p>
                    <p className="mt-2">
                      <strong>Application Date:</strong>{" "}
                      {new Date(
                        application.applicationDate
                      ).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      case "users":
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4">Users</h2>
            {isLoadingUsers ? (
              <div>Loading...</div>
            ) : userError ? (
              <div>{userError}</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {users.map((user) => (
                  <div
                    key={user._id}
                    className="p-4 border rounded bg-white shadow"
                  >
                    <h3 className="font-semibold">{user.name}</h3>
                    <p>{user.email}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="top-container-admin flex h-screen">
      <div className="px-8 bg-firstColor text-white top-nav-container-admin">
        <nav className="flex flex-col h-full items-center justify-center text-center nav-admin">
          <div className="p-4 text-2xl font-bold admin-text">Admin</div>
          <ul className="ul-admin">
            <li
              className="p-4 hover:bg-gray-700 cursor-pointer"
              onClick={() => setActiveSection("jobs")}
            >
              Job Postings
            </li>
            <li
              className="p-4 hover
cursor-pointer"
              onClick={() => setActiveSection("referrals")}
            >
              Referrals
            </li>
            <li
              className="p-4 hover
cursor-pointer"
              onClick={() => setActiveSection("applications")} // New section for job applications
            >
              Applications
            </li>
            <li
              className="p-4 hover
cursor-pointer"
              onClick={() => setActiveSection("users")}
            >
              Users
            </li>
          </ul>
        </nav>
      </div>
      <div className="px-8 py-6 bg-secondColor flex-1 overflow-y-auto top-content-admin">
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminPage;
