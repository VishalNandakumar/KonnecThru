const API_URL = import.meta.env.VITE_API_URL;

export const submitJobApplication = async (formData) => {
  try {
    const response = await fetch(`${API_URL}/api/job-applications/apply`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(response.statusText);
    }
  } catch (error) {
    throw new Error("Error submitting job application: " + error.message);
  }
};
