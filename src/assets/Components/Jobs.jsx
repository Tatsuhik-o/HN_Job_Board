import Job from "./Job";
function Jobs({ jobOffers }) {
  return (
    <div className="jobs_area">
      {jobOffers?.map((job, index) => {
        return <Job jobOffer={job} key={index} />;
      })}
    </div>
  );
}

export default Jobs;
