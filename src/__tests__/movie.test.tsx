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
import { handleAuth } from "../commonFunctions/authorised";
import { fetchAllMovies } from "../commonFunctions/fetchAllMovies";
import { searchMovieByName } from "../commonFunctions/searchMovie";
import Movie from "../components/movie";

jest.mock("../commonFunctions/searchMovie", () => ({
  searchMovieByName: jest.fn(),
}));

jest.mock("../commonFunctions/fetchAllMovies", () => ({
  fetchAllMovies: jest.fn(),
}));

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
    (fetchAllMovies as jest.Mock).mockResolvedValue([
      {
        id: "51ac3ff4-41c1-420d-9542-08da970566cb",
        movieName: "Bad Boys",
        totalViews: 4000,
        releaseDate: "0001-01-01T00:00:00",
        actorDTOs: null,
      },
      {
        id: "48bb7681-f10f-4c29-b3f3-08da9707b7ed",
        movieName: "Doramon",
        totalViews: 40000,
        releaseDate: "0001-01-01T00:00:00",
        actorDTOs: null,
      },
      {
        id: "6f5fe3b5-db98-4737-b3f4-08da9707b7ed",
        movieName: "Pokemon",
        totalViews: 40000,
        releaseDate: "2022-09-15T16:22:45.7512504",
        actorDTOs: null,
      },
      {
        id: "45d47b3d-85fd-4abb-b3f5-08da9707b7ed",
        movieName: "Surat",
        totalViews: 40000,
        releaseDate: "2022-09-15T16:24:14.4370582",
        actorDTOs: null,
      },
      {
        id: "37147833-170e-48da-4ec5-08da970f9c37",
        movieName: "Hola amogis",
        totalViews: 50,
        releaseDate: "0001-01-01T00:00:00",
        actorDTOs: null,
      },
    ]);

    const load_movies_button = screen.getByText(/Or load All Movies/i);
      userEvent.click(load_movies_button);


  });

  test("All Movies test", async () => {
    (fetchAllMovies as jest.Mock).mockResolvedValue([
      {
        id: "51ac3ff4-41c1-420d-9542-08da970566cb",
        movieName: "Bad Boys",
        totalViews: 4000,
        releaseDate: "0001-01-01T00:00:00",
        actorDTOs: null,
      },
      {
        id: "48bb7681-f10f-4c29-b3f3-08da9707b7ed",
        movieName: "Doramon",
        totalViews: 40000,
        releaseDate: "0001-01-01T00:00:00",
        actorDTOs: null,
      },
      {
        id: "6f5fe3b5-db98-4737-b3f4-08da9707b7ed",
        movieName: "Pokemon",
        totalViews: 40000,
        releaseDate: "2022-09-15T16:22:45.7512504",
        actorDTOs: null,
      },
      {
        id: "45d47b3d-85fd-4abb-b3f5-08da9707b7ed",
        movieName: "Surat",
        totalViews: 40000,
        releaseDate: "2022-09-15T16:24:14.4370582",
        actorDTOs: null,
      },
      {
        id: "37147833-170e-48da-4ec5-08da970f9c37",
        movieName: "Hola amogis",
        totalViews: 50,
        releaseDate: "0001-01-01T00:00:00",
        actorDTOs: null,
      },
    ]);

    
    const load_movies_button = screen.getByText(/Or load All Movies/i);
      fireEvent.click(load_movies_button);
    
    // await waitFor(() => {
      //   SampleMovies.data.forEach((movie) => {
      //     expect(screen.getByText(`${movie.movieName}`)).toBeInTheDocument();
      //   });
      const delete_movie = screen.getAllByText(/Delete/i);
      console.log("HIHIHIIHIHIH");
    // });

    // expect(delete_movie.length).toBe(SampleMovies.length);
  });
});
