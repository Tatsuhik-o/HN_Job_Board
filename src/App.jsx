import { useEffect, useState } from "react";
import "./App.css";
import Jobs from "./assets/Components/Jobs";

function App() {
  const [jobOffers, setJobOffers] = useState([]);
  const [allOffers, setAllOffers] = useState([]);
  const [numOffers, setNumOffers] = useState(9);
  const backgroundColor = [
    "#FFB6C1, #B0E0E6", // Light Pink to Powder Blue
    "#E6E6FA, #98FB98", // Lavender to Pale Green
    "#FFDAB9, #FFFFE0", // Peach Puff to Light Yellow
    "#F08080, #AFEEEE", // Light Coral to Pale Turquoise
    "#FFC0CB, #D3D3D3", // Pink to Light Gray
    "#FAFAD2, #E0FFFF", // Light Goldenrod Yellow to Light Cyan
    "#FFFACD, #E6E6FA", // Lemon Chiffon to Lavender
    "#FFDEAD, #F0FFF0", // Navajo White to Honeydew
    "#FFE4E1, #F5F5DC", // Misty Rose to Beige
    "#E0FFFF, #F5FFFA", // Light Cyan to Mint Cream
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
    const randomNum = Math.floor(Math.random() * 2) + 2;
    return Array.from(
      { length: Math.floor(Math.random() * 2) + 2 },
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
    const randomRange1 = Math.ceil(Math.random() * 5);
    let randomRange2 = Math.ceil(Math.random() * 10);
    while (randomRange1 > randomRange2) {
      randomRange2 = Math.ceil(Math.random() * 10);
    }
    return `$${randomRange1 * 1000} - $${randomRange2 * 1000}`;
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
                background: backgroundColor[randomNumber],
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
                background: backgroundColor[randomNumber],
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
      <h2>HN Job Board : </h2>
      <Jobs jobOffers={jobOffers} />
      <button
        className="load_more"
        onClick={() => setNumOffers(Math.min(numOffers + 6, 60))}
      >
        Load More
      </button>
    </div>
  );
}

export default App;
