import axios from "axios";
import { movieDTO } from './../DTOs/movieDTO';

export async function fetchAllMovies(): Promise<Array<movieDTO>> {
  const response = await axios.get("https://localhost:7114/movies");
  console.log('response.data: ', response.data);
  return response.data;
}
