import axios from "axios";

export function deleteActorService(actorId: string) {
  const res = axios.delete(`https://localhost:7114/actor/${actorId}`);
  return res;
}
