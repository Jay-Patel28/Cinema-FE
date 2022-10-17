import axios from "axios";
import { baseUrl } from "../constants/global";
import { addMovieDTO, movieDTO } from "../DTOs/movieDTO";

interface outputDTO {
  status: 200;
  movie: movieDTO;
}
export async function addMovieRequest(movieToAdd: addMovieDTO) {
  try {
    const newMovie = await axios.post(
      `${baseUrl}/movie`,
      movieToAdd,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    const movie: movieDTO = newMovie.data;
    return { status: newMovie.status, movie: movie };
  } catch (err) {
    return { status: 400, movie: null };
  }
}
