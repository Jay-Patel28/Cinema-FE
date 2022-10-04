import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import "../../src/App.css";
import MovieSearch from "./movieSearch";

export default function Home() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);


  // const handleMovieSearch = (e: any) => {
  //   setLoading(true);
  //   const search = e.target.value;
  //   if (search === null) {
  //     setSearchResults([]);
  //   }
  //   axios.get(`https://localhost:7114/movie/q/${search}`).then((res: any) => {
  //     if (res === null) {
  //       return null;
  //     }
  //     setTimeout(() => {
  //       setLoading(false);
  //       setSearchResults(res.data);
  //     }, 700);
  //   });
  // };

  return (
    <>
      <div className="head-text">
        <div className="head-image">
          <img
            src="https://images2.alphacoders.com/125/1253915.jpg"
            alt="HoD"
            width="100%"
            style={{ maxHeight: "600px" }}
          />
        </div>
        <div className="text-on-image" style={{color:'white',maxHeight: "200px" ,width:"100%"}}>
          <h2> Hot Release this week </h2>
          <h5> On HBO </h5>
        </div>
      </div>
      
<MovieSearch/>

    </>
  );
}
