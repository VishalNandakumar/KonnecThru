/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import ReferralPostingForm from "../pages/ReferralPostingForm"; // Ensure this path is correct
import JobApplicationForm from "../pages/JobApplicationForm"; // Import the JobApplicationForm component
import { getReferralDetails } from "../services/referralService"; // Import the function to fetch referral details

const ListingComponent = ({
  jobTitle,
  companyName,
  salaryType,
  workingSchedule,
  paymentFrequency,
  jobDescription,
  amount,
  _id,
  referrals,
  userId,
  userEmail,
}) => {
  const [showReferralForm, setShowReferralForm] = useState(false);
  const [showJobApplicationForm, setShowJobApplicationForm] = useState(false); // State to toggle Job Application Form
  const [referralDetails, setReferralDetails] = useState([]);

  useEffect(() => {
    // Fetch referral details when the component mounts
    const fetchReferrals = async () => {
      try {
        const details = await Promise.all(
          referrals.map((id) => getReferralDetails(id))
        );
        setReferralDetails(details);
      } catch (error) {
        console.error("Error fetching referral details:", error);
      }
    };

    fetchReferrals();
  }, [referrals]);

  const handlePostReferralClick = () => {
    setShowReferralForm(true);
  };

  const handleApplyClick = () => {
    setShowJobApplicationForm(true); // Show Job Application Form
  };

  const handleFormClose = () => {
    setShowReferralForm(false);
    setShowJobApplicationForm(false); // Close Job Application Form
  };

  return (
    <>
      <div className="border-b border-gray-400 py-4 flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold">{jobTitle}</h3>
          <p className="text-gray-600">{companyName}</p>
          <div className="info-button-group space-x-2 mt-1 flex flex-wrap gap-2">
            <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded inline-block">
              {salaryType}
            </span>
            <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded inline-block">
              {workingSchedule}
            </span>
            <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded inline-block">
              Payment {paymentFrequency}
            </span>
          </div>

          <p className="mt-2 text-lg">{jobDescription}</p>
          <p className="mt-2 text-lg" hidden>
            {userEmail}
          </p>
          <p className="mt-2 text-lg" hidden>
            {userId}
          </p>
          <p className="mt-2 text-lg font-bold">Salary: ${amount}</p>
        </div>
        <div className="custom-button-group flex flex-wrap gap-2">
          <button
            onClick={handleApplyClick}
            className="px-3 py-1 text-xs sm:text-sm md:text-base bg-firstColor text-white rounded-full"
          >
            Apply
          </button>
          <button
            onClick={handlePostReferralClick}
            className="px-3 py-1 text-xs sm:text-sm md:text-base bg-blue-500 text-white rounded-full"
          >
            Post a Referral
          </button>
        </div>
      </div>
      {showReferralForm && (
        <ReferralPostingForm jobId={_id} onClose={handleFormClose} />
      )}
      {showJobApplicationForm && (
        <JobApplicationForm
          jobId={_id}
          posterEmail={userEmail}
          posterId={userId}
          onClose={handleFormClose}
        />
      )}
      <div className="mt-4">
        <h4 className="text-lg font-bold">Referrals:</h4>
        {referralDetails.length === 0 ? (
          <p>No referrals available.</p>
        ) : (
          referralDetails.map((referral, index) => (
            <div key={index} className="border-b border-gray-200 py-2">
              <p>
                <strong>Name:</strong> {referral.referralName}
              </p>
              <p>
                <strong>Email:</strong> {referral.referralEmail}
              </p>
              <p>
                <strong>Company:</strong> {referral.referralCompany}
              </p>
              <p>
                <strong>Description:</strong> {referral.description}
              </p>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default ListingComponent;
