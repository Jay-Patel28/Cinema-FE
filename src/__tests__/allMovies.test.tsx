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
import { deleteMovieService } from "../commonFunctions/deleteMovie";
import { fetchAllMovies } from "../commonFunctions/fetchAllMovies";
import Movie from "../components/movie";
import { movieDTO } from "../DTOs/movieDTO";

jest.mock("../commonFunctions/fetchAllMovies", () => ({
  fetchAllMovies: jest.fn(),
}));

jest.mock("../commonFunctions/deleteMovie", () => ({
  deleteMovieService: jest.fn(),
}));

const SampleMovies: Array<movieDTO> = [
  {
    id: "51ac3ff4-41c1-420d-9542-08da970566cb",
    movieName: "Bad Boys",
    totalViews: 4000,
    releaseDate: "0001-01-01T00:00:00",
    actorDTOs: [
      {
        actorId: "12345",
      },
    ],
  },
  {
    id: "48bb7681-f10f-4c29-b3f3-08da9707b7ed",
    movieName: "Doramon",
    totalViews: 40000,
    releaseDate: "0001-01-01T00:00:00",
    actorDTOs: [
      {
        actorId: "12345",
      },
    ],
  },
  {
    id: "6f5fe3b5-db98-4737-b3f4-08da9707b7ed",
    movieName: "Pokemon",
    totalViews: 40000,
    releaseDate: "2022-09-15T16:22:45.7512504",
    actorDTOs: [
      {
        actorId: "12345",
      },
    ],
  },
];

describe("Movie Page tests", () => {
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
      render(<Movie />, { wrapper: AllTheProviders });
    });
  });

  test("Delete a Movie ", async () => {
    (fetchAllMovies as jest.Mock).mockResolvedValue(SampleMovies);

    (deleteMovieService as jest.Mock).mockResolvedValue({
      status: 200,
    });

    const load_movies_button = screen.getByText(/Or load All Movies/i);
    expect(load_movies_button).toBeInTheDocument();

    await act(() => {
      fireEvent.click(load_movies_button);
    });

    await waitFor(() => {
      const deleteForeverIcon = screen.getAllByText("Delete");
      expect(deleteForeverIcon[0]).toBeInTheDocument();
    });
    const deleteForeverIcon = screen.getAllByText("Delete");
    expect(deleteForeverIcon[0]).toBeInTheDocument();
    await act(() => {
      userEvent.click(deleteForeverIcon[0]);
    });
  });
});
