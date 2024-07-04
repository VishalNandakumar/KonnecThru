import ListingComponent from "../components/ListingComponent";
import { useState } from "react";

const jobListings = [
  {
    title: "Junior data analysts",
    company: "Gpay, India",
    location: "Mumbai",
    type: "Internship",
    experience: "6 months exp",
    description: "job description goes here",
    salary: "₹12L - ₹15L /month",
  },
  {
    title: "Data science intern",
    company: "Phone Pe",
    location: "Mumbai",
    type: "Internship",
    experience: "6 months exp",
    description: "job description goes here",
    salary: "₹20k - ₹30k /month",
  },
  {
    title: "Data base architect",
    company: "Phone Pe",
    location: "Mumbai",
    type: "Internship",
    experience: "6 months exp",
    description: "job description goes here",
    salary: "₹20k - ₹30k /month",
  },

  {
    title: "Data base architect",
    company: "Phone Pe",
    location: "Mumbai",
    type: "Internship",
    experience: "6 months exp",
    description: "job description goes here",
    salary: "₹20k - ₹30k /month",
  },
];

const ListingPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredJobListings = jobListings.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase())
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
              <div className="flex space-x-4">
                <h1 className="text-lg font-bold">Job Postings</h1>
              </div>
              <input
                type="text"
                className="px-4 py-2 border rounded-full"
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            {filteredJobListings.map((job, index) => (
              <ListingComponent key={index} {...job} />
            ))}
          </section>
        </div>
      </main>
    </div>
  );
};

export default ListingPage;
