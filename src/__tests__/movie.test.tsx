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
import { addMovieRequest } from "../commonFunctions/addMovie";
import { deleteMovieService } from "../commonFunctions/deleteMovie";
import { fetchAllMovies } from "../commonFunctions/fetchAllMovies";
import { searchMovieByName } from "../commonFunctions/searchMovie";
import Movie from "../components/movie";
import { movieDTO } from "../DTOs/movieDTO";

jest.mock("../commonFunctions/fetchAllMovies", () => ({
  fetchAllMovies: jest.fn(),
}));

jest.mock("../commonFunctions/searchMovie", () => ({
  searchMovieByName: jest.fn(),
}));

jest.mock("../commonFunctions/deleteMovie", () => ({
  deleteMovieService: jest.fn(),
}));

jest.mock("../commonFunctions/addMovie", () => ({
  addMovieRequest: jest.fn(),
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

describe("Movie Page tests",  () => {
  beforeEach(async () => {
    jest.resetAllMocks;
    const AllTheProviders = ({ children }: any) => {
      return (
        <SnackbarProvider>
          <BrowserRouter>{children}</BrowserRouter>
        </SnackbarProvider>
      );
    };
    localStorage.setItem("jwt", "123456789");
    await act(async () => {
      render(<Movie />, { wrapper: AllTheProviders });
    });
  });

  test("should show Search movie box and get results from search ", async () => {
    (searchMovieByName as jest.Mock).mockResolvedValue([
      {
        id: "82b9cb3e-82af-4d7b-e9d5-08da9ba59767",
        movieName: "jay movie",
        totalViews: 26000,
        releaseDate: "0001-01-01T00:00:00",
      },
    ]);

    const search_movie = screen.getByText(
      /Start Searching for your favourite Shows/i
    );
    expect(search_movie).toBeInTheDocument();

    const movieSearchField = screen
      .getByTestId("MovieSearchField")
      .querySelector("input");
    expect(movieSearchField).toBeInTheDocument();

    if (movieSearchField) userEvent.type(movieSearchField, "jay");

    await waitFor(() => {
      //jay movie should be in document
      const searched_movie = screen.getByText(/jay movie/i);
      expect(searched_movie).toBeInTheDocument();
      const Learn_More = screen.getByText(/Learn More/i);
      userEvent.click(Learn_More);
      expect(window.location.pathname).toBe(
        "/movie/82b9cb3e-82af-4d7b-e9d5-08da9ba59767"
      );
    });
  });

  test("Load all Movies", async () => {
    const load_movies_button = screen.getByText(/Or load All Movies/i);
    (fetchAllMovies as jest.Mock).mockReturnValue(SampleMovies);

    await act(async () => {
      fireEvent.click(load_movies_button);
    });
    
  });


  test("Delete a Movie ", async () => {
    (fetchAllMovies as jest.Mock).mockResolvedValue(SampleMovies);

    (deleteMovieService as jest.Mock).mockResolvedValue({
      status: 200,
      data: {
        id: "51ac3ff4-41c1-420d-9542-08da970566cb",
        movieName: "Bad Boys",
        totalViews: 4000,
        releaseDate: "0001-01-01T00:00:00",
      },
    });

    const load_movies_button = screen.getByText(/Or load All Movies/i);
    expect(load_movies_button).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(load_movies_button);
    });

    await waitFor(async () => {
      const deleteForeverIcon = screen.getAllByText("Delete");
      expect(deleteForeverIcon[0]).toBeInTheDocument();
    });
    const deleteForeverIcon = screen.getAllByText("Delete");
    expect(deleteForeverIcon[0]).toBeInTheDocument();
    await act(() => {
      userEvent.click(deleteForeverIcon[0]);
    });
  });
  test("Add movie  ", async () => {
    const movie: movieDTO = {
      id: "1234",
      movieName: "jacky",
      totalViews: 50,
      releaseDate: "2022-10-04T06:27:21.757Z",
    };
    (addMovieRequest as jest.Mock).mockResolvedValue({
      status: 200,
      movie: movie,
    });

    const movieNameInput = screen
      .getByTestId("movieNameInput")
      .querySelector("input");
    const movieViewsInput = screen
      .getByTestId("movieViewsInput")
      .querySelector("input");

    const Add_Actors = screen.getByText(/Add Actors for new Movie/i);
    const Add_Movie = screen.getByText(/Add Movie/i);

    expect(movieNameInput).toBeInTheDocument();
    expect(movieViewsInput).toBeInTheDocument();

    if (movieNameInput) userEvent.type(movieNameInput, "Fastest");
    if (movieViewsInput) userEvent.type(movieViewsInput, "Four");

    await act(async () => {
      fireEvent.click(Add_Movie);
    });

    await waitFor(async () => {
      const added_success = screen.getByText(/Movie is Added successfully!/i);
      const dismiss = screen.getByText(/Dismiss/i);
      const view = screen.getAllByText(/View/i);
      expect(added_success).toBeInTheDocument();
      expect(view[0]).toBeInTheDocument();
      expect(dismiss).toBeInTheDocument();
    });

    (addMovieRequest as jest.Mock).mockResolvedValue({
      status: 400,
      movie: movie,
    });
    await act(async () => {
      fireEvent.click(Add_Movie);
    });

    await waitFor(() => {
      const added_success = screen.getByText(/Error adding the movie!/i);
      expect(added_success).toBeInTheDocument();
    });
  });
});
