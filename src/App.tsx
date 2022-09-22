import { SnackbarProvider } from "notistack";
import "./App.css";
import Navbar from "./components/navbar";

import {
  QueryClient
} from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Actor from "./components/actor";
import Home from "./components/home";
import Login from "./components/login";
import Movie from "./components/movie";
import MoviePage from "./components/moviePage";
import Register from "./components/register";

function App() {
  const queryClient = new QueryClient();
  return (
    <>
    <SnackbarProvider>
      <BrowserRouter>
        <Navbar />

        <Routes>
          {/* <Route path='/' element={<PermanentDrawerLeft/>}/> */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/actor" element={<Actor />} />
          <Route path="/movie" element={<Movie />} />
          <Route path="/movie/:id" element={<MoviePage/> }/>
          {/* <Route path='/' element={<PermanentDrawerLeft/>}/> */}
          {/* <PermanentDrawerLeft /> */}
        </Routes>
      </BrowserRouter>
      </SnackbarProvider>
    </>
  );
}

export default App;
