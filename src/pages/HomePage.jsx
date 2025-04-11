import React, { useState, useEffect } from "react";
import AddJobForm from "../components/AddJobForm";
import JobList from "../components/JobList";

const HomePage = ({ onLogout }) => {
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("Token:", token);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/jobs`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setJobs(data);
      } else {
        console.error(data.message || "Failed to fetch jobs");
      }
    } catch (err) {
      console.error("An error occurred while fetching jobs:", err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const addJob = (job) => {
    setJobs((prevJobs) => [...prevJobs, job]);
  };

  const deleteJob = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/jobs/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        // Update the state locally by filtering out the deleted job
        setJobs((prevJobs) => prevJobs.filter((job) => job._id !== id)); // Use `_id` if that's the unique identifier
      } else {
        const errorData = await response.json();
        console.error("Failed to delete the job:", errorData.message);
      }
    } catch (err) {
      console.error("An error occurred while deleting the job:", err);
    }
  };

  const updateJobStatus = (id, status) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job._id === id ? { ...job, status } : job
      )
    );
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Student Job Tracker</h1>
        <button
          onClick={onLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
      <AddJobForm addJob={addJob} />
      <JobList
        jobs={jobs}
        deleteJob={deleteJob}
        updateJobStatus={updateJobStatus}
      />
    </div>
  );
};

export default HomePage;