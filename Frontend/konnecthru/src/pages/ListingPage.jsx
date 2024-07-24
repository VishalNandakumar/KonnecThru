import { useEffect, useState } from "react";
import ListingComponent from "../components/ListingComponent";
import "../index.css"; // Make sure to import your CSS file

const ListingPage = () => {
  const [jobListings, setJobListings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          "https://konnecthru.onrender.com/api/jobs/jobpostings"
        );
        if (!response.ok) {
          // This will capture HTTP errors such as 500, 404 etc.
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const approvedJobs = data.filter(
          (job) => job.approvalStatus === "approved"
        );
        setJobListings(approvedJobs);
      } catch (error) {
        // Here we capture any network error or one thrown from response status check
        setError(`Failed to fetch jobs: ${error.message}`);
        console.error("Failed to fetch jobs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredJobListings = jobListings.filter((job) =>
    job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <main className="flex-1 bg-gray-100">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 flex flex-col md:flex-row">
          <aside className="md:w-1/4 bg-white p-4 rounded-lg shadow-lg mb-6 md:mb-0 md:mr-6">
            <h2 className="text-xl font-bold mb-4">Filters and Sort</h2>
            <div className="flex space-x-4">
              <button className="px-3 py-1 bg-red-500 text-white rounded-full">
                Jobs
              </button>
              <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full">
                Interns
              </button>
              <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full">
                Alerts
              </button>
            </div>
          </aside>
          <section className="flex-1 bg-white p-4 rounded-lg shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <input
                type="text"
                className="px-4 py-2 border rounded-full"
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            {isLoading ? (
              <div>Loading...</div>
            ) : error ? (
              <div>{error}</div>
            ) : (
              filteredJobListings.map((job, index) => (
                <ListingComponent key={index} {...job} />
              ))
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default ListingPage;
