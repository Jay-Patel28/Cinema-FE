import "@testing-library/jest-dom/extend-expect";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SnackbarProvider } from "notistack";
import { BrowserRouter } from "react-router-dom";
import { addActorRequest } from "../commonFunctions/addActor";
import { hasValidToken } from "../commonFunctions/authorised";
import { deleteActorService } from "../commonFunctions/deleteActor";
import { fetchAllActors } from "../commonFunctions/fetchAllActors";
import Actor from "../components/actor";
import { actorDTO } from "../DTOs/actorDTO";

jest.mock("../commonFunctions/fetchAllActors", () => ({
  fetchAllActors: jest.fn(),
}));
jest.mock("../commonFunctions/addActor", () => ({
  addActorRequest: jest.fn(),
}));
jest.mock("../commonFunctions/deleteActor", () => ({
  deleteActorService: jest.fn(),
}));
jest.mock("../commonFunctions/authorised", () => ({
  hasValidToken: jest.fn(),
}));
jest.mock("../commonFunctions/authorised", () => ({
  handleAuth: jest.fn(),
}));

const SampleActorsData: Array<actorDTO> = [
  {
    actorId: "1b590e9b-ac0a-4c85-34e0-08da97054f1d",
    firstName: "Jay",
    lastName: "Patel",
    wealth: 560,
  },
  {
    actorId: "6190712d-d65d-4ae6-34e1-08da97054f1d",
    firstName: "Renis",
    lastName: "Dudhat",
    wealth: 5600,
  },
  {
    actorId: "4c17ab8b-2445-48cb-21d1-08da97ce7024",
    firstName: "Shivangi",
    lastName: "Chavda",
    wealth: 50000,
  },
];

describe("Actor Page tests", () => {
  beforeEach(async () => {
    jest.resetAllMocks;
    const AllTheProviders = ({ children }: any) => {
      return (
        <SnackbarProvider>
          <BrowserRouter>{children}</BrowserRouter>
        </SnackbarProvider>
      );
    };
    await act(async () => {
      render(<Actor />, { wrapper: AllTheProviders });
    });
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

  test("Load All actors button should load all actors on page ", async () => {
    const Load_all_Actors = screen.getByText(/LOAD ALL ACTORS/i);

    (fetchAllActors as jest.Mock).mockResolvedValue(SampleActorsData);

    await act(async () => {
      fireEvent.click(Load_all_Actors);
    });

    await waitFor(() => {
      SampleActorsData.forEach((actor) => {
        const actor_name = screen.getByText(`${actor.firstName}`);
        expect(actor_name).toBeInTheDocument();
      });
    });
  });

  test("Add actor test ", async () => {
    const actor: actorDTO = {
      actorId: "1b590e9b-ac0a-4c85-34e0-08da97054f1d",
      firstName: "Fastest",
      lastName: "Four",
      wealth: 50,
    };
    (addActorRequest as jest.Mock).mockResolvedValue(actor);

    const add_actor = screen.getByText(/Add a new Actor/i);
    expect(add_actor).toBeInTheDocument();

    const Fname_Input = screen.getByTestId("add_fname").querySelector("input");
    const Lname_input = screen.getByTestId("add_lname").querySelector("input");
    const Wealth_Input = screen
      .getByTestId("add_wealth")
      .querySelector("input");

    expect(Fname_Input).toBeInTheDocument();
    expect(Lname_input).toBeInTheDocument();
    expect(Wealth_Input).toBeInTheDocument();

    if (Fname_Input) userEvent.type(Fname_Input, "Fastest");
    if (Lname_input) userEvent.type(Lname_input, "Four");
    if (Wealth_Input) userEvent.type(Wealth_Input, "500");

    await act(async () => {
      fireEvent.click(screen.getByTestId("add_actor_button"));
    });

    await waitFor(() => {
      const add_actor_pass = screen.getByText(/Fastest Added successfully!/i);
      expect(add_actor_pass).toBeInTheDocument();
    });
  });

  test("Add actor failure test ", async () => {
    (addActorRequest as jest.Mock).mockResolvedValue(null);
    await act(async () => {
      fireEvent.click(screen.getByTestId("add_actor_button"));
    });
    await waitFor(() => {
      const add_actor_failed = screen.getByText(/Error! Please try Again./i);
      expect(add_actor_failed).toBeInTheDocument();
    });
  });

  test("Delete first actor successfull test ", async () => {
    //We need to load aal actors first
    const Load_all_Actors = screen.getByText(/LOAD ALL ACTORS/i);

    (fetchAllActors as jest.Mock).mockResolvedValue(SampleActorsData);
    (deleteActorService as jest.Mock).mockResolvedValue({ status: 200 });
    await act(async () => {
      fireEvent.click(Load_all_Actors);
    });

    let delete_actor: any;
    await waitFor(async () => {
      delete_actor = screen.getAllByTestId("delete_actor");
      expect(delete_actor.length).toBe(SampleActorsData.length);
    });
    await act(async () => {
      //Click on first of delete button
      //So that we can delete the first actor
      fireEvent.click(delete_actor[0]);
    });
    await waitFor(() => {
      const delete_success = screen.getByText(
        /has been deleted successfully!/i
      );
      expect(delete_success).toBeInTheDocument();
    });
  });

  test("Delete actor failure test ", async () => {
    //We need to load aal actors first
    const Load_all_Actors = screen.getByText(/LOAD ALL ACTORS/i);

    (fetchAllActors as jest.Mock).mockResolvedValue(SampleActorsData);
    (deleteActorService as jest.Mock).mockResolvedValue({ status: 401 });

    await act(async () => {
      fireEvent.click(Load_all_Actors);
    });

    let delete_actor: any;
    await waitFor(async () => {
      delete_actor = screen.getAllByTestId("delete_actor");
      expect(delete_actor.length).toBe(SampleActorsData.length);

      await act(() => {
        //Click on first of delete button
        //So that we can delete the first actor
        fireEvent.click(delete_actor[0]);
      });
    });
    await waitFor(() => {
      const delete_failed = screen.getByText(/Error deleting the actor!/i);
      expect(delete_failed).toBeInTheDocument();
    });
  });

  test("Case where no actors are found ", async () => {
    const Load_all_Actors = screen.getByText(/LOAD ALL ACTORS/i);

    (fetchAllActors as jest.Mock).mockResolvedValue({});
    await act(async () => {
      fireEvent.click(Load_all_Actors);
    });
    await waitFor(() => {
      const no_actors = screen.getByText(
        /Click the action above to load actors./i
      );
      expect(no_actors).toBeInTheDocument();
    });
  });
  
});
