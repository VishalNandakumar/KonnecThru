import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/Authcontext';

const JobPostingForm = () => {
  const { currentUser, loading } = useAuth();
  const [formData, setFormData] = useState({
    jobTitle: "",
    jobDescription: "",
    companyName: "",
    amount: "",
    employmentType: [],
    workingSchedule: "",
    salaryType: "",
    paymentFrequency: "",
    salaryNegotiable: false,
    multipleCandidates: false,
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  if (loading) {
    return <div>Loading user data...</div>; // or a spinner, etc.
  }

  const isSubmitDisabled = !currentUser || isLoading;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    if (type === "checkbox" && name === "employmentType") {
      const employmentTypes = formData.employmentType;
      if (checked) {
        employmentTypes.push(value);
      } else {
        const index = employmentTypes.indexOf(value);
        if (index > -1) {
          employmentTypes.splice(index, 1);
        }
      }
      setFormData({
        ...formData,
        employmentType: employmentTypes,
      });
    } else {
      setFormData({
        ...formData,
        [name]: newValue,
      });
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!formData.jobTitle.trim()) {
      newErrors.jobTitle = "Job title is required";
      valid = false;
    }

    if (!formData.jobDescription.trim()) {
      newErrors.jobDescription = "Job description is required";
      valid = false;
    }

    if (!formData.companyName.trim()) {
      newErrors.companyName = "Company name is required";
      valid = false;
    }

    if (!formData.amount.trim() || isNaN(formData.amount)) {
      newErrors.amount = "Amount must be a valid number";
      valid = false;
    }

    if (formData.employmentType.length === 0) {
      newErrors.employmentType = "Select at least one employment type";
      valid = false;
    }

    if (!formData.workingSchedule.trim()) {
      newErrors.workingSchedule = "Working schedule is required";
      valid = false;
    }

    if (!formData.salaryType) {
      newErrors.salaryType = "Select a salary type";
      valid = false;
    }

    if (!formData.paymentFrequency.trim()) {
      newErrors.paymentFrequency = "Select a payment frequency";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      console.error("No user data available");
      return;
    }

    if (!validateForm()) {
      console.log("Form has errors. Please fix them.");
      return;
    }
    setLoading(true);

    console.log("current user", currentUser);
    console.log("current user.uid", currentUser.uid);
    console.log("current user.email", currentUser.email);

    try {
      const postData = {
        ...formData,
        userId: currentUser.uid, // Include user ID
        userEmail: currentUser.email // Include user email
      };

      const response = await fetch('https://konnecthru.onrender.com/api/jobs/jobposting', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData)
      });

      if (!response.ok) {
        throw new Error('HTTP error, status = ' + response.status);
      }

      const result = await response.json();
      console.log("Form submitted successfully:", result);
      alert('Form submitted successfully');
      navigate('/'); // Navigate to a success page
    } catch (error) {
      console.error("Failed to submit the form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-fourthColor flex justify-center items-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full space-y-8">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-firstColor">
          Post a Job
        </h2>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-lg space-y-6"
        >
          <div>
            <label
              htmlFor="job-title"
              className="block text-sm font-medium text-gray-700"
            >
              Job title
            </label>
            <input
              id="job-title"
              name="jobTitle"
              type="text"
              value={formData.jobTitle}
              onChange={handleInputChange}
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.jobTitle ? "border-red-500" : "border-thirdColor"
              } rounded-md shadow-sm focus:outline-none focus:ring-firstColor focus:border-firstColor sm:text-sm`}
              placeholder="e.g. Kitchen staff"
            />
            {errors.jobTitle && (
              <p className="mt-1 text-red-500 text-sm">{errors.jobTitle}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="job-description"
              className="block text-sm font-medium text-gray-700"
            >
              Job description
            </label>
            <textarea
              id="job-description"
              name="jobDescription"
              rows="4"
              value={formData.jobDescription}
              onChange={handleInputChange}
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.jobDescription ? "border-red-500" : "border-thirdColor"
              } rounded-md shadow-sm focus:outline-none focus:ring-firstColor focus:border-firstColor sm:text-sm`}
              placeholder="Provide a short description about the job. Keep it short and to the point."
            ></textarea>
            {errors.jobDescription && (
              <p className="mt-1 text-red-500 text-sm">
                {errors.jobDescription}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="company-name"
              className="block text-sm font-medium text-gray-700"
            >
              Company Name
            </label>
            <input
              id="company-name"
              name="companyName"
              type="text"
              value={formData.companyName}
              onChange={handleInputChange}
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.companyName ? "border-red-500" : "border-thirdColor"
              } rounded-md shadow-sm focus:outline-none focus:ring-firstColor focus:border-firstColor sm:text-sm`}
              placeholder="Enter company name"
            />
            {errors.companyName && (
              <p className="mt-1 text-red-500 text-sm">{errors.companyName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Employment type
            </label>
            <div className="mt-2 space-y-2">
              <div className="flex items-center">
                <input
                  id="full-time"
                  name="employmentType"
                  type="checkbox"
                  value="Full-time"
                  checked={formData.employmentType.includes("Full-time")}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-firstColor border-gray-300 rounded"
                />
                <label
                  htmlFor="full-time"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Full-time
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="part-time"
                  name="employmentType"
                  type="checkbox"
                  value="Part-time"
                  checked={formData.employmentType.includes("Part-time")}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-firstColor border-gray-300 rounded"
                />
                <label
                  htmlFor="part-time"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Part-time
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="on-demand"
                  name="employmentType"
                  type="checkbox"
                  value="On demand"
                  checked={formData.employmentType.includes("On demand")}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-firstColor border-gray-300 rounded"
                />
                <label
                  htmlFor="on-demand"
                  className="ml-2 block text-sm text-gray-900"
                >
                  On demand
                </label>
              </div>
              {errors.employmentType && (
                <p className="mt-1 text-red-500 text-sm">
                  {errors.employmentType}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="working-schedule"
              className="block text-sm font-medium text-gray-700"
            >
              Working Schedule
            </label>
            <input
              id="working-schedule"
              name="workingSchedule"
              type="text"
              value={formData.workingSchedule}
              onChange={handleInputChange}
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.workingSchedule ? "border-red-500" : "border-thirdColor"
              } rounded-md shadow-sm focus:outline-none focus:ring-firstColor focus:border-firstColor sm:text-sm`}
              placeholder="e.g. 9 AM to 5 PM, Monday to Friday"
            />
            {errors.workingSchedule && (
              <p className="mt-1 text-red-500 text-sm">
                {errors.workingSchedule}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-700"
            >
              Amount
            </label>
            <input
              id="amount"
              name="amount"
              type="text"
              value={formData.amount}
              onChange={handleInputChange}
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.amount ? "border-red-500" : "border-thirdColor"
              } rounded-md shadow-sm focus:outline-none focus:ring-firstColor focus:border-firstColor sm:text-sm`}
              placeholder="Enter amount"
            />
            {errors.amount && (
              <p className="mt-1 text-red-500 text-sm">{errors.amount}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="salary-type"
              className="block text-sm font-medium text-gray-700"
            >
              Salary Type
            </label>
            <select
              id="salary-type"
              name="salaryType"
              value={formData.salaryType}
              onChange={handleInputChange}
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.salaryType ? "border-red-500" : "border-thirdColor"
              } rounded-md shadow-sm focus:outline-none focus:ring-firstColor focus:border-firstColor sm:text-sm`}
            >
              <option value="">Select salary type</option>
              <option value="Hourly">Hourly</option>
              <option value="Weekly">Weekly</option>
              <option value="Bi-Weekly">Bi-Weekly</option>
              <option value="Monthly">Monthly</option>
            </select>
            {errors.salaryType && (
              <p className="mt-1 text-red-500 text-sm">{errors.salaryType}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="payment-frequency"
              className="block text-sm font-medium text-gray-700"
            >
              Payment Frequency
            </label>
            <select
              id="payment-frequency"
              name="paymentFrequency"
              value={formData.paymentFrequency}
              onChange={handleInputChange}
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.paymentFrequency ? "border-red-500" : "border-thirdColor"
              } rounded-md shadow-sm focus:outline-none focus:ring-firstColor focus:border-firstColor sm:text-sm`}
            >
              <option value="">Select payment frequency</option>
              <option value="Weekly">Weekly</option>
              <option value="Bi-Weekly">Bi-Weekly</option>
              <option value="Monthly">Monthly</option>
            </select>
            {errors.paymentFrequency && (
              <p className="mt-1 text-red-500 text-sm">
                {errors.paymentFrequency}
              </p>
            )}
          </div>

          <div className="flex items-center">
            <input
              id="salary-negotiable"
              name="salaryNegotiable"
              type="checkbox"
              checked={formData.salaryNegotiable}
              onChange={handleInputChange}
              className="h-4 w-4 text-firstColor border-gray-300 rounded"
            />
            <label
              htmlFor="salary-negotiable"
              className="ml-2 block text-sm text-gray-900"
            >
              Salary Negotiable
            </label>
          </div>

          <div className="flex items-center">
            <input
              id="multiple-candidates"
              name="multipleCandidates"
              type="checkbox"
              checked={formData.multipleCandidates}
              onChange={handleInputChange}
              className="h-4 w-4 text-firstColor border-gray-300 rounded"
            />
            <label
              htmlFor="multiple-candidates"
              className="ml-2 block text-sm text-gray-900"
            >
              Multiple Candidates
            </label>
          </div>

          <div>
            <button
              type="submit"
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-firstColor focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondColor ${
                isSubmitDisabled ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isSubmitDisabled}
            >
              Post Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobPostingForm;
