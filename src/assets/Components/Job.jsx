function Job({ jobOffer }) {
  const timeNow = Date.now();
  const timePosted = Math.floor((timeNow - jobOffer?.time * 1000) / 86400000);
  // 86400
  const style = {
    background: `linear-gradient(to top, ${jobOffer?.background})`,
  };

  const company = jobOffer?.title.split("Is")[0].split("(")[0];
  let offerInfo = jobOffer?.title.split("Hiring")[1];
  offerInfo = offerInfo?.includes("a" || "an")
    ? offerInfo
        .split(" ")
        .filter((elem, index) => index !== 1)
        .join(" ")
    : offerInfo;
  return (
    <div className="job" style={style}>
      <a
        href={
          jobOffer?.url ||
          `https://news.ycombinator.com/item?id=${jobOffer?.id}`
        }
        className="jobcard"
        target="_blank"
      >
        <div className="company">{company}</div>
        <div className="jobTitle">{offerInfo || "A Position"}</div>
        <div className="salary">{jobOffer?.salary}</div>
        <div className="tags">
          {jobOffer?.tag.map((elem, index) => {
            return (
              <div className="tag" key={index}>
                {elem}
              </div>
            );
          })}
        </div>
      </a>
      <div className="time_posted">
        {timePosted === 0 ? "Posted Today" : `Posted ${timePosted} Days ago`}
      </div>
    </div>
  );
}

export default Job;
