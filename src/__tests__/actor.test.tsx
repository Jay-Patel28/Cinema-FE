import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { SnackbarProvider } from "notistack";
import { BrowserRouter } from "react-router-dom";
import Actor from "../components/actor";

const AllTheProviders = ({ children }: any) => {
  return (
    <SnackbarProvider>
      <BrowserRouter>{children}</BrowserRouter>
    </SnackbarProvider>
  );
};

describe("Register Page tests", () => {
  beforeEach(() => {
    render(<Actor />, { wrapper: AllTheProviders });
  });

  test("should show load all actors button", () => {
    const Load_all_Actors = screen.getByText(/LOAD ALL ACTORS/i);
    expect(Load_all_Actors).toBeInTheDocument();
    Load_all_Actors.click();
  });
  test("should show AddActor component", () => {
    const Add_Actor = screen.getByText(/Add a new Actor/i);
    expect(Add_Actor).toBeInTheDocument();
  });
  test("should have data add fields", () => {
    const add_actor_button = screen.getByTestId("add_actor_button");
    const add_wealth = screen.getByTestId("add_wealth");
    const add_lname = screen.getByTestId("add_lname");
    const add_fname = screen.getByTestId("add_fname");

    expect(add_actor_button).toBeInTheDocument();
    expect(add_wealth).toBeInTheDocument();
    expect(add_lname).toBeInTheDocument();
    expect(add_fname).toBeInTheDocument();
  });
});
