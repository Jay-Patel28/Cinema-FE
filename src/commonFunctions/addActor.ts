import axios from "axios";
import { baseUrl } from "../constants/global";
import { actorDTO } from "../DTOs/actorDTO";
import { newActorDTO } from "../DTOs/newActorDTO";

export async function addActorRequest(data: newActorDTO) : Promise<actorDTO>{

const resp = await axios
.post(`${baseUrl}/actor`, data, {
  headers: { "Content-Type": "application/json" },
})
console.log('resp: ', resp);
    return resp.data
}
