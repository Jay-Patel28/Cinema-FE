import { actorDTO } from "./actorDTO";

export interface actorwithId {
  actorId: string;
}

export interface movieDTO {
  id: string;
  movieName: string;
  totalViews: number;
  releaseDate?: string;
  actorDTOs?: Array<actorDTO | actorwithId> | null;
}

export interface moviebyIdDTO {
  id: string;
  movieName: string;
  totalViews: number;
  releaseDate?: string;
  actorDTOs?: Array<actorDTO>;
}

export interface addMovieDTO{
  movieName: string;
  totalViews: number;
  releaseDate?: string;
  actorDTOs: Array<actorwithId>;
}