import "@testing-library/jest-dom/extend-expect";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SnackbarProvider } from "notistack";
import { BrowserRouter } from "react-router-dom";
import AllActors from "../components/allActors";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";

const AllTheProviders = ({ children }: any) => {
  return (
    <SnackbarProvider>
      <BrowserRouter>{children}</BrowserRouter>
    </SnackbarProvider>
  );
};

let actors = [
  {
    actorId: "1b590e9b-ac0a-4c85-34e0-08da97054f1d",
    firstName: "Jay",
    lastName: "Patel",
    wealth: 560,
    movieDTOs: null,
  },
  {
    actorId: "6190712d-d65d-4ae6-34e1-08da97054f1d",
    firstName: "Renis",
    lastName: "Dudhat",
    wealth: 5600,
    movieDTOs: null,
  },
  {
    actorId: "4c17ab8b-2445-48cb-21d1-08da97ce7024",
    firstName: "Shivangi",
    lastName: "Chavda",
    wealth: 50000,
    movieDTOs: null,
  },
  {
    actorId: "12345",
    firstName: "Darshan",
    lastName: "B",
    wealth: 565,
    movieDTOs: null,
  },
];

let loadingg = false;

let loadAllActorsMock = jest.fn(() => {});

describe("Register Page tests", () => {
  beforeEach(async () => {});

  afterEach(() => {
    cleanup();
  });

  it("have delete Icon", async () => {
    render(
      <AllActors
        actors={actors}
        loadAllActors={loadAllActorsMock}
        loading={loadingg}
      />,
      { wrapper: AllTheProviders }
    );
    const actors_container = screen.getByTestId("actors_container");
    expect(actors_container).toBeInTheDocument();
  });

  it("should show loading spinner when loading is true", () => {
    render(
      <AllActors
        actors={actors}
        loadAllActors={loadAllActorsMock}
        loading={true}
      />,
      { wrapper: AllTheProviders }
    );
    const loading_all_actors = screen.getByTestId("loading_all_actors");
    expect(loading_all_actors).toBeInTheDocument();
  });
  it("should show have Learn More buttons", () => {
    render(
      <AllActors
        actors={actors}
        loadAllActors={loadAllActorsMock}
        loading={false}
      />,
      { wrapper: AllTheProviders }
    );
    const learn_buttons = screen.getAllByRole("button", { name: "Learn More" });

    expect(learn_buttons).toHaveLength(actors.length);
  });
  it("should show have delete buttons", () => {
    render(
      <AllActors
        actors={actors}
        loadAllActors={loadAllActorsMock}
        loading={false}
      />,
      { wrapper: AllTheProviders }
    );
    const delete_buttons = screen.getAllByRole("button", { name: "" });
    expect(delete_buttons).toHaveLength(actors.length);
  });

  it("should click on last delete button", async () => {
    var mock = new MockAdapter(axios);
    mock.onDelete(`https://localhost:7114/actor/12345`).reply(200, "ok");

    render(
      <AllActors
        actors={actors}
        loadAllActors={loadAllActorsMock}
        loading={false}
      />,
      { wrapper: AllTheProviders }
    );

    const delete_buttons = screen.getAllByRole("button", { name: "" });

    userEvent.click(delete_buttons[delete_buttons.length - 1]);
    cleanup();

    render(
      <AllActors
        actors={actors.splice(0, 3)}
        loadAllActors={loadAllActorsMock}
        loading={false}
      />,
      { wrapper: AllTheProviders }
    );
    const delete_buttons_after_delete = screen.getAllByRole("button", {
      name: "",
    });
    expect(delete_buttons_after_delete.length).toBe(delete_buttons.length - 1);
  });
});
