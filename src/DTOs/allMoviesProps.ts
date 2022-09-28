import { movieDTO } from "./movieDTO";

export interface allMoviesProps {
  movies?: Array<movieDTO>;
  loading:boolean,
  loadAllMovies :Function
}
