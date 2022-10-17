import axios from "axios";
import { baseUrl } from "../constants/global";
import { movieDTO } from "./../DTOs/movieDTO";

export async function searchMovieByName(search: string) {
  const response = await axios.get(
    `${baseUrl}/movie/q/${search}`
  );
  const movies: Array<movieDTO> = response.data;
  return movies;
}
