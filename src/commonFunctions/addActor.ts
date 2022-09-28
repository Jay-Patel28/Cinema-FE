import axios from "axios";
import { actorDTO } from "../DTOs/actorDTO";
import { newActorDTO } from "../DTOs/newActorDTO";

interface Actor{
    status:string;
}

export async function addActorRequest(data: newActorDTO) : Promise<actorDTO>{

const resp = await axios
.post("https://localhost:7114/actor", data, {
  headers: { "Content-Type": "application/json" },
})
console.log('resp: ', resp);
    return resp.data
}
