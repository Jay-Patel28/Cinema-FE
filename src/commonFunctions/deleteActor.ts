import axios from "axios";
import { baseUrl } from "../constants/global";

export function deleteActorService(actorId: string) {
  const res = axios.delete(`${baseUrl}/actor/${actorId}`);
  return res;
}
