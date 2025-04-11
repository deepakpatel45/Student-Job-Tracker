import React from "react";

const JobCard = ({ job, deleteJob, updateJobStatus }) => {
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token"); // Get the JWT token
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/jobs/${job._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });

      if (response.ok) {
        deleteJob(job._id); // Update the frontend state to remove the job
      } else {
        const errorData = await response.json();
        console.error("Failed to delete the job:", errorData.message);
      }
    } catch (err) {
      console.error("An error occurred while deleting the job:", err);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-bold">{job.company}</h2>
      <p>{job.role}</p>
      <p>Status: {job.status}</p>
      <p>Date: {new Date(job.date).toLocaleDateString()}</p>
      <a
        href={job.link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500"
      >
        Job Link
      </a>
      <div className="mt-4 flex justify-between">
        <button
          onClick={() => updateJobStatus(job._id, "Interview")}
          className="bg-yellow-500 text-white px-2 py-1 rounded"
        >
          Mark as Interview
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-2 py-1 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default JobCard;