import axios from "axios";
import { movieDTO } from "./../DTOs/movieDTO";

export async function searchMovieByName(search: string) {
  const response = await axios.get(
    `https://localhost:7114/movie/q/${search}`
  );
  const movies: Array<movieDTO> = response.data;
  return movies;
}
