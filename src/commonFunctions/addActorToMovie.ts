import axios from "axios";
import { baseUrl } from "../constants/global";

export async function addActorToMovieService(actorId: string, movieId: any) {
  try {
    const res: any = await axios.post(
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