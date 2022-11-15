import MovieSearch from "./movieSearch";

export default function Home() {
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
        <div
          className="text-on-image"
          style={{ color: "white", maxHeight: "200px", width: "100%" }}
        >
          <h2> Hot Release this week </h2>
          <h5> On HBO </h5>
        </div>
      </div>
      <MovieSearch />
      {/* Whatever you want to test and Play */}
      {/* <PlayGround /> */}
    </>
  );
}
