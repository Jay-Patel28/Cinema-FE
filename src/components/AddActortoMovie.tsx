import { actorDTO } from "../DTOs/actorDTO";
import { useEffect, useState } from "react";
import { fetchAllActors } from "../commonFunctions/fetchAllActors";
import { Chip, Typography } from "@mui/material";
import { addActorToMovieService } from "../commonFunctions/addActorToMovie";

export default function AddActorsTOMOvie({
  loadMovieActors,
  movieId,
  actorDTOs,
}: any) {
  const [availableActors, setAvailableActors] = useState<Array<actorDTO>>([]);

  async function fetchAllActorsReq() {
    let actors = await fetchAllActors();

    if (actorDTOs?.length) {
      actorDTOs.forEach((actorOfMovie: actorDTO) => {
        actors = actors.filter(
          (actor) => actor.actorId !== actorOfMovie.actorId
        );
      });
    }
    setAvailableActors(actors);
  }

  async function addActorToMovie(actorId: string) {
    const response = await addActorToMovieService(actorId, movieId);
    if (response.status === 200) {
      loadMovieActors();
    }
  }

  useEffect(() => {
    fetchAllActorsReq();
  }, [actorDTOs]);

  return (
    <>
      <Typography variant="subtitle1" fontFamily="helvetica">
        Is Cast missing an Actor? You can add from right here!
        {availableActors.map((actor: actorDTO) => {
          return (
            <Chip
              sx={{ margin: "5px" }}
              label={`${actor.firstName} ${actor.lastName}`}
              color="success"
              size="medium"
              onClick={() => addActorToMovie(actor.actorId)}
            />
          );
        })}
      </Typography>
    </>
  );
}
