import { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";
import "../assets/css/admin.css";

const AdminPage = () => {
  const [activeSection, setActiveSection] = useState("jobs");
  const [jobPostings, setJobPostings] = useState([]);
  const [referralPostings, setReferralPostings] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoadingJobs, setIsLoadingJobs] = useState(false);
  const [isLoadingReferrals, setIsLoadingReferrals] = useState(false);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [jobError, setJobError] = useState(null);
  const [referralError, setReferralError] = useState(null);
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
    fetchUsers();
  }, []);

  const handleApprove = async (id) => {
    try {
      const API_URL = import.meta.env.VITE_API_URL;
      const response = await fetch(`${API_URL}/api/jobs/${id}/approve`, {
        method: "PUT",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const updatedJob = await response.json();
      setJobPostings((prevJobs) =>
        prevJobs.filter((job) => job._id !== updatedJob._id)
      );
    } catch (error) {
      console.error("Failed to approve job:", error);
    }
  };

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
                      <button
                        className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                        onClick={() => handleApprove(job._id)} // Corrected
                      >
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
              className="p-4 hover:bg-gray-700 cursor-pointer"
              onClick={() => setActiveSection("referrals")}
            >
              Referral Postings
            </li>
          </ul>
        </nav>
      </div>
      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-auto p-4">{renderContent()}</div>
      </div>
    </div>
  );
};

export default AdminPage;
