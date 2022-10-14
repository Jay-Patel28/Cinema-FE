import axios from "axios";
import { baseUrl } from "../constants/global";

export async function removeActorFromMovieService(actorId: string, movieId: any) {
  try {
    const res: any = await axios.delete(
      `${baseUrl}/movie/${movieId}/actor/${actorId}`
    );
    return {
      status: res.status,
    };
  } catch (err: any) {
    return {
      status: err.status,
    };
  }
}
