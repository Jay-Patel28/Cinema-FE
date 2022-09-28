import { actorDTO } from './actorDTO';

export interface allActorsProps {
  actors: Array<actorDTO>;
  loading:boolean,
  loadAllActors :Function
}