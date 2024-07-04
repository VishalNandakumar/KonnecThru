/* eslint-disable react/prop-types */
const ReferralListingComponent = ({
  referralName,
  referralEmail,
  referralCompany,
  description,
}) => {
  return (
    <div className="border-b border-gray-200 py-4 flex justify-between items-center">
      <div>
        <h3 className="text-xl font-bold">{referralName}</h3>
        <p className="text-gray-600">{referralCompany}</p>
        <p className="text-gray-600">{referralEmail}</p>
        <p className="mt-2 text-lg">{description}</p>
      </div>
      <div className="flex space-x-2">
        <button className="px-4 py-2 bg-firstColor text-white rounded-full">
          Contact
        </button>
      </div>
    </div>
  );
};

export default ReferralListingComponent;
