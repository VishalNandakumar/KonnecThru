import { useEffect, useState } from "react";
import { useAuth } from "../contexts/Authcontext";
const API_URL = import.meta.env.VITE_API_URL;

const NotificationsPage = () => {
  const { currentUser } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        if (currentUser) {
          const response = await fetch(
            `${API_URL}/api/job-applications/application-postings/poster/${currentUser.uid}`
          );

          if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
          }

          const data = await response.json();
          setApplications(data.applications);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [currentUser]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#3d52a0] text-white">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#3d52a0] text-white">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#3d52a0] p-4">
      <h1 className="text-3xl font-bold text-center text-white mb-8">
        Job Applications
      </h1>
      {applications.length > 0 ? (
        <ul className="max-w-3xl mx-auto space-y-4">
          {applications.map((application) => (
            <li
              key={application._id}
              className="bg-white text-[#3d52a0] p-6 rounded-lg shadow-md"
            >
              <div className="mb-4">
                <p className="font-bold">Job Posting ID:</p>
                <p>{application.userId}</p>
              </div>
              <div className="mb-4">
                <p className="font-bold">Applicant ID:</p>
                <p>{application.userId}</p>
              </div>
              <div className="mb-4">
                <p className="font-bold">Why Hire:</p>
                <p>{application.whyHire}</p>
              </div>
              <div className="mb-4">
                <p className="font-bold">Application Date:</p>
                <p>
                  {new Date(application.applicationDate).toLocaleDateString()}
                </p>
              </div>
              <div className="mb-4">
                <p className="font-bold">Referral Details:</p>
                <p>
                  Referral Email:{" "}
                  {application.referralEmail
                    ? application.referralEmail
                    : "No Referral Used"}
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-white text-lg">
          Seems like you did not post any jobs.
        </p>
      )}
    </div>
  );
};

export default NotificationsPage;
