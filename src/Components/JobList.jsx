import React from "react";
import JobCard from "./JobCard";

const JobList = ({ jobs, deleteJob, updateJobStatus }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          deleteJob={deleteJob}
          updateJobStatus={updateJobStatus}
        />
      ))}
    </div>
  );
};

export default JobList;