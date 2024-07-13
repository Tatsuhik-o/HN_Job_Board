import { useEffect, useState } from "react";

function Job({ jobOffer, setBookmarkedJobs }) {
  const [bookmark, setBookmark] = useState(false);
  const dateNow = new Date(jobOffer?.time * 1000)
    .toGMTString()
    .split(" ")
    .slice(0, 4)
    .join(" ");
  const style = {
    background: jobOffer?.background,
  };

  function handlBookMark() {
    setBookmark(!bookmark);
  }

  useEffect(() => {
    if (bookmark)
      setBookmarkedJobs((currElements) => [...currElements, jobOffer]);
    if (!bookmark)
      setBookmarkedJobs((currElements) =>
        currElements.filter((element) => element !== jobOffer)
      );
  }, [bookmark]);

  const company = jobOffer?.title.split("Is")[0].split("(")[0];
  let offerInfo = jobOffer?.title.split("Hiring")[1];
  offerInfo = offerInfo?.includes("a" || "an")
    ? offerInfo
        .split(" ")
        .filter((elem, index) => index !== 1)
        .join(" ")
    : offerInfo;
  return (
    <div className="job">
      <div className="jobcard" target="_blank" style={style}>
        <div className="saveTheDate">
          <div className="time_posted">{dateNow}</div>
          <div className="bookmark" onClick={handlBookMark}>
            {bookmark && <i className="fa-solid fa-bookmark"></i>}
            {!bookmark && <i className="fa-regular fa-bookmark"></i>}
          </div>
        </div>
        <div className="offer">
          <div className="company">
            {company?.split(" ").slice(0, 3).join(" ")}
          </div>
          <div className="jobTitle">
            {offerInfo?.split(" ").slice(0, 4).join(" ") || "A Position"}
          </div>
          <div className="tags">
            {jobOffer?.tag.map((elem, index) => {
              return (
                <div className="tag" key={index}>
                  {elem}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="salaryDiv">
        <div className="salary">{`$${jobOffer?.salary}/hr`}</div>
        <a
          href={
            jobOffer?.url ||
            `https://news.ycombinator.com/item?id=${jobOffer?.id}`
          }
          target="_blank"
          className="job_link"
        >
          Details
        </a>
      </div>
    </div>
  );
}

export default Job;
