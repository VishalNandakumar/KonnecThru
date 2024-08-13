/* eslint-disable react/prop-types */
import { useState } from "react";
import { useAuth } from "../contexts/Authcontext";
import { submitJobApplication } from "../services/jobApplicationService"; // Ensure this import is correct

const JobApplicationForm = ({ jobId, posterEmail, posterId, onClose }) => {
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    whyHire: "",
    referralEmail: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    let valid = true;

    // Check if currentUser is defined
    if (!currentUser) {
      newErrors.user = "User is not logged in.";
      valid = false;
    }

    // Check if whyHire is filled
    if (!formData.whyHire.trim()) {
      newErrors.whyHire = "Please provide a reason for why we should hire you.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const applicationData = {
          ...formData,
          jobPostingId: jobId,
          posterEmail: posterEmail,
          posterId: posterId,
          userId: currentUser ? currentUser.uid : null,
          applicationDate: new Date().toISOString(),
          applicationStatus: "pending",
        };

        // Submit job application data
        const result = await submitJobApplication(applicationData);

        console.log("Job Application Data:", result);
        alert("Job application submitted successfully.");
        onClose(); // Close the form after successful submission
      } catch (error) {
        console.error("Error submitting job application:", error.message);
      }
    } else {
      console.log("Form has errors. Please fix them.");
    }
  };

  return (
    <div className="min-h-screen bg-fourthColor flex justify-center items-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="relative max-w-3xl w-full space-y-8 bg-white p-6 rounded-lg shadow-lg">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-2xl"
        >
          &times; {/* "X" close icon */}
        </button>

        <h2 className="mt-6 text-center text-3xl font-extrabold text-firstColor">
          Job Application
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6" method="post">
          {errors.user && (
            <p className="mt-1 text-red-500 text-sm">{errors.user}</p>
          )}
          <div>
            <label
              htmlFor="whyHire"
              className="block text-sm font-medium text-gray-700"
            >
              Why Hire?
            </label>
            <textarea
              id="whyHire"
              name="whyHire"
              rows="4"
              value={formData.whyHire}
              onChange={handleInputChange}
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.whyHire ? "border-red-500" : "border-thirdColor"
              } rounded-md shadow-sm focus:outline-none focus:ring-firstColor focus:border-firstColor sm:text-sm`}
              placeholder="Why should we hire you?"
            ></textarea>
            {errors.whyHire && (
              <p className="mt-1 text-red-500 text-sm">{errors.whyHire}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="referralEmail"
              className="block text-sm font-medium text-gray-700"
            >
              Referral Email
            </label>
            <input
              id="referralEmail"
              name="referralEmail"
              type="email"
              value={formData.referralEmail}
              onChange={handleInputChange}
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.referralEmail ? "border-red-500" : "border-thirdColor"
              } rounded-md shadow-sm focus:outline-none focus:ring-firstColor focus:border-firstColor sm:text-sm`}
              placeholder="Enter referral's email (optional)"
            />
            {errors.referralEmail && (
              <p className="mt-1 text-red-500 text-sm">
                {errors.referralEmail}
              </p>
            )}
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-thirdColor text-gray-700 rounded-md shadow-sm hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-firstColor text-white rounded-md shadow-sm hover:bg-secoundColor"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobApplicationForm;
