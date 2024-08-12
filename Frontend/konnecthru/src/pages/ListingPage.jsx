import { useEffect, useState } from "react";
import ListingComponent from "../components/ListingComponent";
import "../index.css"; // Make sure to import your CSS file

const ListingPage = () => {
  const [jobListings, setJobListings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Filter states
  const [salaryTypeFilter, setSalaryTypeFilter] = useState("");
  const [paymentFrequencyFilter, setPaymentFrequencyFilter] = useState("");
  const [referralFilter, setReferralFilter] = useState("");
  const [hiringMultipleFilter, setHiringMultipleFilter] = useState("");
  const [salaryNegotiableFilter, setSalaryNegotiableFilter] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          "https://konnecthru.onrender.com/api/jobs/jobpostings"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const approvedJobs = data.filter(
          (job) => job.approvalStatus === "approved"
        );
        setJobListings(approvedJobs);
      } catch (error) {
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

  // Apply filters to job listings
  const filteredJobListings = jobListings
    .filter((job) =>
      job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((job) => !salaryTypeFilter || job.salaryType === salaryTypeFilter)
    .filter(
      (job) =>
        !paymentFrequencyFilter ||
        job.paymentFrequency === paymentFrequencyFilter
    )
    .filter((job) =>
      referralFilter === "withReferrals"
        ? job.referrals.length > 0
        : referralFilter === "withoutReferrals"
        ? job.referrals.length === 0
        : true
    )
    .filter(
      (job) =>
        hiringMultipleFilter === "" ||
        job.hiringMultipleCandidates === (hiringMultipleFilter === "true")
    )
    .filter(
      (job) =>
        salaryNegotiableFilter === "" ||
        job.salaryNegotiable === (salaryNegotiableFilter === "true")
    );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <main className="flex-1 bg-gray-100">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 flex flex-col md:flex-row">
          <aside className="w-full md:w-1/3 bg-white p-4 rounded-lg shadow-lg mb-6 md:mb-0 md:mr-6">
            <h2 className="text-xl font-bold mb-4">Filters and Sort</h2>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Salary Type
              </label>
              <select
                value={salaryTypeFilter}
                onChange={(e) => setSalaryTypeFilter(e.target.value)}
                className="w-full px-3 py-2 bg-gray-100 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              >
                <option value="">Any</option>
                <option value="Hourly">Hourly</option>
                <option value="Salaried">Salaried</option>
                <option value="Contract">Contract</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Payment Frequency
              </label>
              <select
                value={paymentFrequencyFilter}
                onChange={(e) => setPaymentFrequencyFilter(e.target.value)}
                className="w-full px-3 py-2 bg-gray-100 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              >
                <option value="">Any</option>
                <option value="Weekly">Weekly</option>
                <option value="Bi-Weekly">Bi-weekly</option>
                <option value="Monthly">Monthly</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Referrals
              </label>
              <select
                value={referralFilter}
                onChange={(e) => setReferralFilter(e.target.value)}
                className="w-full px-3 py-2 bg-gray-100 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              >
                <option value="">Any</option>
                <option value="withReferrals">With Referrals</option>
                <option value="withoutReferrals">Without Referrals</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Hiring Multiple Candidates
              </label>
              <select
                value={hiringMultipleFilter}
                onChange={(e) => setHiringMultipleFilter(e.target.value)}
                className="w-full px-3 py-2 bg-gray-100 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              >
                <option value="">Any</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Salary Negotiable
              </label>
              <select
                value={salaryNegotiableFilter}
                onChange={(e) => setSalaryNegotiableFilter(e.target.value)}
                className="w-full px-3 py-2 bg-gray-100 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              >
                <option value="">Any</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
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
