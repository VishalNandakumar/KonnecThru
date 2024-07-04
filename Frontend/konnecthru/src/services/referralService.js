export const submitJobPosting = async (formData) => {
  try {
    const response = await fetch(
      "https://konnecthru.onrender.com/api/referrals/referral-post",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(response.statusText);
    }
  } catch (error) {
    throw new Error("Error submitting form: " + error.message);
  }
};
