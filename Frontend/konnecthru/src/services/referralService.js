const API_URL = import.meta.env.VITE_API_URL;

export const submitJobPosting = async (formData) => {
  try {
    const response = await fetch(
      // "https://konnecthru.onrender.com/api/referrals/referral-post",
      `${API_URL}/api/referrals/referral-post`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );
    console.log("formDataformDataformDataformData", formData);
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(response.statusText);
    }
  } catch (error) {
    throw new Error("Error submitting form: " + error.message);
  }
};

export const getReferralDetails = async (id) => {
  const response = await fetch(`${API_URL}/api/referrals/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};
