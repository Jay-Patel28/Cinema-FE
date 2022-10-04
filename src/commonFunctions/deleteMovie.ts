import axios from "axios";

export async function deleteMovieService(movieId: string) {
  try {
    const res: any = await axios.delete(
      `https://localhost:7114/movie/${movieId}`
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
