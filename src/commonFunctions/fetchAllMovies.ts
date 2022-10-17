import { baseUrl } from './../constants/global';
import axios from "axios";

export async function fetchAllMovies() {
  const response = await axios.get(`${baseUrl}/movies`);
  if (response.status === 200) {
    return { status: 200, data: response.data };
  }

  return { status: 400, data: response };
}
