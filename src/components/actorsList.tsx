import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { actorDTO } from "../DTOs/actorDTO";
import { newActorDTO } from "../DTOs/newActorDTO";
import { addActorRequest } from "../commonFunctions/addActor";
import ProgressBar from "./Progressbar";
import QuickAddActor from "./quickAddActor";
import { baseUrl } from "../constants/global";
interface propsInterface {
  setActorsInputFromChild: Function;
}

export default function ActorsList(props: propsInterface) {
  const [allActors, setAllActors] = useState<Array<actorDTO>>([]);
  const [inputList, setInputList] = useState<Array<string>>([]);

  useEffect(() => {
    axios.get(`${baseUrl}/actors`).then((res) => {
      setTimeout(() => {
        setAllActors(res.data);
      }, 300);
    });
  }, []);

  const addNewActorToList = async (actor: actorDTO) => {
    setAllActors([...allActors, actor]);
  };

  const handleChecked = (index: number, e: any) => {
    const value = e.target.value;
    const target = e.target as HTMLInputElement;
    const isChecked: boolean = target.checked;
    const list = [...inputList];
    if (isChecked) {
      if (index === 0) {
        list.splice(0, 1);
      }
      list[index] = value;
      setInputList(list);
    } else {
      list.filter((item) => item !== value);
      list.splice(index, 1);
      setInputList(list);
    }
    props.setActorsInputFromChild(list);
  };

  return (
    <>
      {" "}
      <Box sx={{ display: "flex" }}>
        <Grid item xs={16} sx={{ width: "80%" }}>
          {allActors &&
            allActors.map((actor: actorDTO, index) => {
              return (
                <FormControlLabel
                  sx={{ margin: "10px" }}
                  key={actor.actorId}
                  control={<Checkbox />}
                  label={actor.firstName}
                  value={actor.actorId}
                  onChange={(e) => {
                    handleChecked(index, e);
                  }}
                />
              );
            })}
          {allActors.length === 0 && (
            <>
              {" "}
              <Typography variant="subtitle1" component="div">
                Please Wait while we load all actors.
              </Typography>
              <ProgressBar />
            </>
          )}
        </Grid>
      </Box>
      <QuickAddActor addNewActorToList={addNewActorToList} />
    </>
  );
}
