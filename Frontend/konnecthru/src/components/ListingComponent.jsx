/* eslint-disable react/prop-types */
const ListingComponent = ({
  jobTitle,
  companyName,
  salaryType,
  workingSchedule,
  paymentFrequency,
  jobDescription,
  amount,
}) => {
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
        </div>
      </div>
    </>
  );
};

export default ListingComponent;
