import React, { useState } from "react";

const AddJobForm = ({ addJob }) => {
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    status: "Applied",
    date: "",
    link: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      console.log("Token:", token); // Debugging: Log the token
  
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/jobs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
      console.log("Response Data:", data); // Debugging: Log the response data
      if (response.ok) {
        addJob(data); // Update the job list in the frontend
        setFormData({ company: "", role: "", status: "Applied", date: "", link: "" }); // Reset the form
      } else {
        console.error(data.message || "Failed to add job");
      }
    } catch (err) {
      console.error("An error occurred while adding the job:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="company"
          placeholder="Company"
          value={formData.company}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="role"
          placeholder="Role"
          value={formData.role}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="url"
          name="link"
          placeholder="Job Link"
          value={formData.link}
          onChange={handleChange}
          className="border p-2 rounded"
        />
      </div>
      <button
        type="submit"
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Job
      </button>
    </form>
  );
};

export default AddJobForm;