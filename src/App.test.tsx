import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
describe("Home Page test", () => {
  beforeEach(()=>{
    render(<App />);
  })

  test("Get Cinema text at navbar", () => {
    const CinemaHeading = screen.getByText(/Cinema/i);
    expect(CinemaHeading).toBeInTheDocument();
    CinemaHeading.click();
  });
  test("Get Actors text at navbar", () => {
    const MovieHeading = screen.getByText(/Movies/i);
    expect(MovieHeading).toBeInTheDocument();
  });
  test("Get Movies text at navbar", () => {
    const ActorElement = screen.getByText(/Actors/i);
    expect(ActorElement).toBeInTheDocument();
  });
  test("Get Title", () => {
    const ActorElement = screen.getByText(/Hot Release this week/i);
    expect(ActorElement).toBeInTheDocument();
  });
});
