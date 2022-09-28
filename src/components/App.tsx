import { SnackbarProvider } from "notistack";
// import "./App.css";
import Navbar from "./navbar";

import { QueryClient } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Actor from "./actor";
import Home from "./home";
import Login from "./login";
import Movie from "./movie";
import MoviePage from "./moviePage";
import Register from "./register";

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <SnackbarProvider anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
        <BrowserRouter>
          <Navbar />

          <Routes>
            {/* <Route path='/' element={<PermanentDrawerLeft/>}/> */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/actor" element={<Actor />} />
            <Route path="/movie" element={<Movie />} />
            <Route path="/movie/:id" element={<MoviePage />} />
            {/* <Route path='/' element={<PermanentDrawerLeft/>}/> */}
            {/* <PermanentDrawerLeft /> */}
          </Routes>
        </BrowserRouter>
      </SnackbarProvider>
    </>
  );
}

export default App;
