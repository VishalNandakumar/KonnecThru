/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import ReferralPostingForm from '../pages/ReferralPostingForm'; // Make sure this path is correct
import { getReferralDetails } from '../services/referralService'; // Import the function to fetch referral details

const ListingComponent = ({
  jobTitle,
  companyName,
  salaryType,
  workingSchedule,
  paymentFrequency,
  jobDescription,
  amount,
  _id,
  referrals // Pass the referrals as a prop
}) => {
  const [showReferralForm, setShowReferralForm] = useState(false);
  const [referralDetails, setReferralDetails] = useState([]);

  useEffect(() => {
    // Fetch referral details when the component mounts
    const fetchReferrals = async () => {
      try {
        const details = await Promise.all(referrals.map(id => getReferralDetails(id)));
        setReferralDetails(details);
      } catch (error) {
        console.error('Error fetching referral details:', error);
      }
    };

    fetchReferrals();
  }, [referrals]);

  const handlePostReferralClick = () => {
    setShowReferralForm(true);
  };

  const handleFormClose = () => {
    setShowReferralForm(false);
  };

  return (
    <>
      <div className="border-b border-gray-200 py-4 flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold">{jobTitle}</h3>
          <p className="text-gray-600">{companyName}</p>
          <div className="flex space-x-2 mt-1">
            <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full">
              {salaryType}
            </span>
            <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full">
              {workingSchedule}
            </span>
            <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full">
              {paymentFrequency}
            </span>
          </div>
          <p className="mt-2 text-lg">{jobDescription}</p>
          <p className="mt-2 text-lg font-bold">{amount}</p>
        </div>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-firstColor text-white rounded-full">
            Apply
          </button>
          <button
            onClick={handlePostReferralClick}
            className="px-4 py-2 bg-blue-500 text-white rounded-full"
          >
            Post a Referral
          </button>
        </div>
      </div>
      {showReferralForm && (
        <ReferralPostingForm jobId={_id} onClose={handleFormClose} />
      )}
      <div className="mt-4">
        <h4 className="text-lg font-bold">Referrals:</h4>
        {referralDetails.length === 0 ? (
          <p>No referrals available.</p>
        ) : (
          referralDetails.map((referral, index) => (
            <div key={index} className="border-t border-gray-200 py-2">
              <p><strong>Name:</strong> {referral.referralName}</p>
              <p><strong>Email:</strong> {referral.referralEmail}</p>
              <p><strong>Company:</strong> {referral.referralCompany}</p>
              <p><strong>Description:</strong> {referral.description}</p>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default ListingComponent;
