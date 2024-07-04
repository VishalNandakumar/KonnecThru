import { useEffect, useState } from "react";
import ReferralListingComponent from "../components/ReferralListingComponent";

const ReferralListingPage = () => {
  const [referralListings, setReferralListings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReferrals = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          "http://localhost:5000/api/referrals/referralpostings"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setReferralListings(data);
      } catch (error) {
        setError(`Failed to fetch referrals: ${error.message}`);
        console.error("Failed to fetch referrals:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReferrals();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (filter) => {
    setFilter(filter);
  };

  const filteredReferralListings = referralListings
    .filter((referral) =>
      referral.referralCompany.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((referral) =>
      filter === "All" ? true : referral.referralCompany === filter
    );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <main className="flex-1 bg-gray-100">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 flex flex-col md:flex-row">
          <aside className="md:w-1/4 bg-white p-4 rounded-lg shadow-lg mb-6 md:mb-0 md:mr-6">
            <h2 className="text-xl font-bold mb-4">Filters and Sort</h2>
            <div className="flex space-x-4">
              <button
                className={`px-3 py-1 rounded-full ${
                  filter === "All"
                    ? "bg-red-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
                onClick={() => handleFilterChange("All")}
              >
                All
              </button>
              <button
                className={`px-3 py-1 rounded-full ${
                  filter === "Gpay, India"
                    ? "bg-red-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
                onClick={() => handleFilterChange("Gpay, India")}
              >
                Gpay, India
              </button>
              <button
                className={`px-3 py-1 rounded-full ${
                  filter === "Phone Pe"
                    ? "bg-red-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
                onClick={() => handleFilterChange("Phone Pe")}
              >
                Phone Pe
              </button>
            </div>
          </aside>
          <section className="flex-1 bg-white p-4 rounded-lg shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex space-x-4">
                <h1 className="text-lg font-bold">Referral Listings</h1>
              </div>
              <input
                type="text"
                className="px-4 py-2 border rounded-full"
                placeholder="Search by Company"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            {isLoading ? (
              <div>Loading...</div>
            ) : error ? (
              <div>{error}</div>
            ) : (
              filteredReferralListings.map((referral) => (
                <ReferralListingComponent
                  key={referral._id}
                  referralName={referral.referralName}
                  referralEmail={referral.referralEmail}
                  referralCompany={referral.referralCompany}
                  description={referral.description}
                />
              ))
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default ReferralListingPage;
