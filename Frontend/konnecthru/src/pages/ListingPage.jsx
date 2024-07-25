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
          <aside className="w-full md:w-1/3 bg-white p-4 rounded-lg shadow-lg mb-6 md:mb-0 md:mr-6">
            <h2 className="text-xl font-bold mb-4">Filters and Sort</h2>
            <div className="flex flex-wrap space-x-2 md:space-x-4 mb-4">
              <button className="px-3 py-1 bg-firstColor text-white rounded-full mb-2 md:mb-0">
                Part-time
              </button>
              <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full mb-2 md:mb-0">
                Full-time
              </button>
              <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full mb-2 md:mb-0">
                Weekly
              </button>
              <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full mb-2 md:mb-0 mt-2">
                Monthly
              </button>
              <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full mb-2 md:mb-0 mt-2">
                Internship
              </button>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-semibold mb-2"
                htmlFor="location"
              >
                Location
              </label>
              <select
                id="location"
                className="w-full px-3 py-2 bg-gray-100 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              >
                <option>Any</option>
                <option>Remote</option>
                <option>New York</option>
                <option>San Francisco</option>
                <option>Los Angeles</option>
                <option>Chicago</option>
              </select>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-semibold mb-2"
                htmlFor="industry"
              >
                Industry
              </label>
              <select
                id="industry"
                className="w-full px-3 py-2 bg-gray-100 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              >
                <option>Any</option>
                <option>Technology</option>
                <option>Healthcare</option>
                <option>Finance</option>
                <option>Education</option>
                <option>Retail</option>
              </select>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-semibold mb-2"
                htmlFor="experience"
              >
                Experience Level
              </label>
              <select
                id="experience"
                className="w-full px-3 py-2 bg-gray-100 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              >
                <option>Any</option>
                <option>Entry Level</option>
                <option>Mid Level</option>
                <option>Senior Level</option>
                <option>Executive</option>
              </select>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-semibold mb-2"
                htmlFor="salary"
              >
                Salary Range
              </label>
              <input
                type="range"
                id="salary"
                name="salary"
                min="0"
                max="200000"
                step="5000"
                className="w-full"
              />
              <div className="flex justify-between text-gray-600 text-sm">
                <span>$0</span>
                <span>$200k+</span>
              </div>
            </div>
            <button className="w-full px-4 py-2 bg-firstColor text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300">
              Apply Filters
            </button>
          </aside>

          <section className="flex-1 bg-white p-4 rounded-lg shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <input
                type="text"
                className="px-4 py-2 border rounded-full w-full md:w-1/2"
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
              <div className="space-y-4">
                {filteredJobListings.map((job, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 p-4 rounded-lg shadow-md"
                  >
                    <ListingComponent {...job} />
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default ListingPage;
