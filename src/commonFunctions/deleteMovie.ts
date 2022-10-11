import axios from "axios";
import { baseUrl } from "../constants/global";

export async function deleteMovieService(movieId: string) {
  try {
    const res: any = await axios.delete(
      `${baseUrl}/movie/${movieId}`
    );
    return {
      status: res.status,
      movie: res.data,
    };
  } catch (err: any) {
    return {
      status: err.status,
      errorMessage: err.response.data.errorMessage,
    };
  }
}
