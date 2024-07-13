import Job from "./Job";
function Jobs({ jobOffers, setBookmarkedJobs }) {
  return (
    <div className="jobs_area">
      {jobOffers?.map((job, index) => {
        return (
          <Job
            jobOffer={job}
            key={index}
            setBookmarkedJobs={setBookmarkedJobs}
          />
        );
      })}
    </div>
  );
}

export default Jobs;
