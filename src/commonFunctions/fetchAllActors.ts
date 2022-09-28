import axios from "axios";
import { actorDTO } from "../DTOs/actorDTO";

// export function fetchAllActors(): Array<actorDTO> {
//   let actors: Array<actorDTO> = [];
//   axios.get("https://localhost:7114/actors")
//   .then((res) => {
//     actors = res.data;
//   });
//   console.log('actors: ', actors);
//   return actors;
// }

export async function fetchAllActors(): Promise<Array<actorDTO>> {
  const response = await axios.get("https://localhost:7114/actors");
  return response.data;
}
