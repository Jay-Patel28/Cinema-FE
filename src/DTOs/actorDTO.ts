import { movieDTO } from "./movieDTO";

export interface actorDTO {
  actorId: string;
  firstName: string;
  lastName: string;
  wealth: number;
  movieDTOs?: Array<movieDTO>;
}
