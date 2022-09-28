import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import App from "../components/App";


describe("Home Page test", () => {
  beforeEach(() => {
    render(<App />);
  });

  test("Get Cinema text at navbar", () => {
    const CinemaHeading = screen.getByTestId("CinemaLogo");
    expect(CinemaHeading).toHaveTextContent("Cinema");
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

  test("Login and Register Button", () => {
    const LoginElement = screen.getByText(/SignIn/i);
    const RegisterElement = screen.getByText(/Register/i);
    expect(LoginElement).toBeInTheDocument();
    expect(RegisterElement).toBeInTheDocument();
  });
});
