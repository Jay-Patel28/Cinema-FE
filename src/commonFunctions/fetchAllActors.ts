import axios from "axios";
import { baseUrl } from "../constants/global";
import { actorDTO } from "../DTOs/actorDTO";

export async function fetchAllActors(): Promise<Array<actorDTO>> {
  const response = await axios.get(`${baseUrl}/actors`);
  return response.data;
}
