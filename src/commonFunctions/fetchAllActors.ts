import axios from "axios";
import { actorDTO } from "../DTOs/actorDTO";

export async function fetchAllActors(): Promise<Array<actorDTO>> {
  const response = await axios.get("https://localhost:7114/actors");
  return response.data;
}
