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
  console.log("actorDTOs:ssssssssss ", actorDTOs);
  const [availableActors, setAvailableActors] = useState<Array<actorDTO>>([]);

  async function fetchAllActorsReq() {
    let actors = await fetchAllActors();
    console.log("actors:pppppp ", actors);

    console.log("actorDTOs: ", actorDTOs);
    if (actorDTOs?.length) {
      actorDTOs.forEach((actorOfMovie: actorDTO) => {
        console.log("actorOfMovie.actorId: ", actorOfMovie.actorId);
        actors = actors.filter(
          (actor) => actor.actorId !== actorOfMovie.actorId
        );
      });
    }
    console.log("actors: ", actors);
    setAvailableActors(actors);

    console.log("actors: ", actors);
    // setAvailableActors(actors);
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
      <Typography>
        Is Cast missing an Actor? You can add from right here!
      </Typography>
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
    </>
  );
}
