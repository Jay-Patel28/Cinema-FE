import axios from "axios";
import { movieDTO } from "./../DTOs/movieDTO";

export async function fetchAllMovies() {
  const response = await axios.get("https://localhost:7114/movies");
  if (response.status === 200) {
    return { status: 200, data: response.data };
  }

  return { status: 400, data: response };
}
