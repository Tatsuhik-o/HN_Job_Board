import { useEffect, useState } from "react";
import "./App.css";
import Jobs from "./assets/Components/Jobs";

function App() {
  const [jobOffers, setJobOffers] = useState([]);
  const [allOffers, setAllOffers] = useState([]);
  const [numOffers, setNumOffers] = useState(9);
  const [bookmarkArea, setBookmarkArea] = useState(false);
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);

  const colors = [
    "#FFDDC1",
    "#CCF2E3",
    "#DDD8FC",
    "#CDEFFB",
    "#F7DFF1",
    "#E4E7ED",
    "#FFD7B5",
    "#C7EBDD",
    "#D9D2F7",
    "#CAEAF9",
    "#F4DBED",
    "#E0E3E9",
    "#FFCEAC",
    "#BBE2D3",
    "#CDC6F4",
    "#C4E3F6",
    "#EED4E8",
    "#DADDE4",
    "#FFC4A1",
    "#B0DBCB",
    "#C7BFEE",
    "#B9DDF1",
    "#E3CCE3",
    "#D3D7DF",
    "#FFB68C",
    "#A3D4C3",
    "#BEB5EB",
    "#AFD6EC",
    "#DDBAD9",
    "#CACED6",
  ];

  const tags = [
    "full-time",
    "part-time",
    "remote",
    "on-site",
    "contract",
    "internship",
    "freelance",
    "entry-level",
    "mid-level",
    "senior-level",
    "engineering",
    "consulting",
  ];
  function generateRandomTags() {
    const randomNum = Math.floor(Math.random() * 2) + 1;
    return Array.from(
      { length: randomNum },
      () => tags[Math.floor(Math.random() * tags.length)]
    );
  }
  useEffect(() => {
    async function FetchJobID() {
      try {
        const response = await fetch(
          "https://hacker-news.firebaseio.com/v0/jobstories.json"
        );
        if (response.ok) {
          const data = await response.json();
          setAllOffers(data);
        } else {
          console.log("Error Fetching Data from Entrypoint");
        }
      } catch (e) {
        console.log(e);
      }
    }
    FetchJobID();
  }, []);

  function generateSalary() {
    return Math.floor((Math.random() * 30 + 30) * 0.52);
  }

  useEffect(() => {
    async function FetchJobOffers() {
      const allRequests = allOffers
        ?.filter((id, index) => index < numOffers)
        .map(async (id) => {
          return fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
            .then((response) => response.json())
            .then((data) => {
              const randomNumber = Math.floor(Math.random() * 10);
              return {
                ...data,
                background: colors[randomNumber],
                salary: generateSalary(),
                tag: generateRandomTags(),
              };
            });
        });
      const OfferDetails = await Promise.all(allRequests);
      setJobOffers(OfferDetails);
    }
    FetchJobOffers();
  }, [allOffers]);

  useEffect(() => {
    async function FetchNewOffers() {
      const newRequests = allOffers
        .filter((elem, index) => numOffers - 6 <= index && index < numOffers)
        .map(async (elem) => {
          return fetch(
            `https://hacker-news.firebaseio.com/v0/item/${elem}.json`
          )
            .then((response) => response.json())
            .then((data) => {
              const randomNumber = Math.floor(Math.random() * 10);
              return {
                ...data,
                background: colors[randomNumber],
                salary: generateSalary(),
                tag: generateRandomTags(),
              };
            });
        });
      const newOffersDetails = await Promise.all(newRequests);
      setJobOffers([...jobOffers, ...newOffersDetails]);
    }
    FetchNewOffers();
  }, [numOffers]);

  return (
    <div className="app">
      <div className="header">
        <h2 className="headerTitle">HN Job Board : </h2>
        <i
          className="fa-duotone fa-bookmark"
          onClick={() => setBookmarkArea(!bookmarkArea)}
        ></i>
      </div>
      {bookmarkArea && (
        <Jobs
          jobOffers={bookmarkedJobs}
          setBookmarkedJobs={setBookmarkedJobs}
        />
      )}
      {!bookmarkArea && (
        <Jobs jobOffers={jobOffers} setBookmarkedJobs={setBookmarkedJobs} />
      )}
      {numOffers !== 60 && !bookmarkArea && (
        <button
          className="load_more"
          onClick={() => setNumOffers(Math.min(numOffers + 6, 60))}
        >
          Load More
        </button>
      )}
    </div>
  );
}

export default App;
