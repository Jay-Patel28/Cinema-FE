import React from "react";
import "./App.css";
import Navbar from "./components/navbar";
import { SnackbarProvider } from "notistack";

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import PermanentDrawerLeft from "./components/sidemenu";
import { BrowserRouter, RouterProvider, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Register from "./components/register";
import Actor from "./components/actor";
import Movie from "./components/movie";
import Home from "./components/home";

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
          {/* <Route path='/' element={<PermanentDrawerLeft/>}/> */}
          {/* <PermanentDrawerLeft /> */}
        </Routes>
      </BrowserRouter>
      </SnackbarProvider>
    </>
  );
}

export default App;
