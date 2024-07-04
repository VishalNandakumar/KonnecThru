import { useState } from "react";
import { submitJobPosting } from "../services/referralService";
import { useAuth } from "../contexts/Authcontext";

const ReferralPostingForm = () => {
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    referralName: "",
    referralEmail: "",
    referralCompany: "",
    description: "",
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
    let valid = true;
    const newErrors = {};

    if (!formData.referralName.trim()) {
      newErrors.referralName = "Referral name is required";
      valid = false;
    }

    if (!formData.referralEmail.trim()) {
      newErrors.referralEmail = "Referral email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.referralEmail)) {
      newErrors.referralEmail = "Invalid email format";
      valid = false;
    }

    if (!formData.referralCompany.trim()) {
      newErrors.referralCompany = "Referral company is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const result = await submitJobPosting({
          ...formData,
          userEmail: currentUser.email,
          userID: currentUser.uid,
        });
        console.log("Form submitted successfully:", result);
        alert('Form submitted successfully');
        // Replace with actual form submission logic
      } catch (error) {
        console.error("Error submitting form:", error.message);
      }
    } else {
      console.log("Form has errors. Please fix them.");
    }
  };

  return (
    <div className="min-h-screen bg-fourthColor flex justify-center items-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full space-y-8">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-firstColor">
          Referral Posting
        </h2>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-lg space-y-6"
          method="post"
        >
          <div>
            <label
              htmlFor="referral-name"
              className="block text-sm font-medium text-gray-700"
            >
              Referral Name
            </label>
            <input
              id="referral-name"
              name="referralName"
              type="text"
              value={formData.referralName}
              onChange={handleInputChange}
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.referralName ? "border-red-500" : "border-thirdColor"
              } rounded-md shadow-sm focus:outline-none focus:ring-firstColor focus:border-firstColor sm:text-sm`}
              placeholder="Enter referral's name"
            />
            {errors.referralName && (
              <p className="mt-1 text-red-500 text-sm">{errors.referralName}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="referral-email"
              className="block text-sm font-medium text-gray-700"
            >
              Referral Email
            </label>
            <input
              id="referral-email"
              name="referralEmail"
              type="email"
              value={formData.referralEmail}
              onChange={handleInputChange}
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.referralEmail ? "border-red-500" : "border-thirdColor"
              } rounded-md shadow-sm focus:outline-none focus:ring-firstColor focus:border-firstColor sm:text-sm`}
              placeholder="Enter referral's email"
            />
            {errors.referralEmail && (
              <p className="mt-1 text-red-500 text-sm">
                {errors.referralEmail}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="referral-company"
              className="block text-sm font-medium text-gray-700"
            >
              Referral Company
            </label>
            <input
              id="referral-company"
              name="referralCompany"
              type="text"
              value={formData.referralCompany}
              onChange={handleInputChange}
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.referralCompany ? "border-red-500" : "border-thirdColor"
              } rounded-md shadow-sm focus:outline-none focus:ring-firstColor focus:border-firstColor sm:text-sm`}
              placeholder="Enter referral's company name"
            />
            {errors.referralCompany && (
              <p className="mt-1 text-red-500 text-sm">
                {errors.referralCompany}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleInputChange}
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.description ? "border-red-500" : "border-thirdColor"
              } rounded-md shadow-sm focus:outline-none focus:ring-firstColor focus:border-firstColor sm:text-sm`}
              placeholder="Provide a short description. Keep it short and to the point."
            ></textarea>
            {errors.description && (
              <p className="mt-1 text-red-500 text-sm">{errors.description}</p>
            )}
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="px-4 py-2 bg-thirdColor text-gray-700 rounded-md shadow-sm hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-firstColor text-white rounded-md shadow-sm hover:bg-secoundColor"
            >
              Post Referral
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReferralPostingForm;
