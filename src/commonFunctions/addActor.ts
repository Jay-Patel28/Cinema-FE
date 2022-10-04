import axios from "axios";
import { actorDTO } from "../DTOs/actorDTO";
import { newActorDTO } from "../DTOs/newActorDTO";

export async function addActorRequest(data: newActorDTO) : Promise<actorDTO>{

const resp = await axios
.post("https://localhost:7114/actor", data, {
  headers: { "Content-Type": "application/json" },
})
    return resp.data
}
