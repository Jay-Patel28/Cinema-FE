import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
} from "@mui/material";
import axios from "axios";
import { SyntheticEvent, useEffect, useState } from "react";
import { SyntheticEventData } from "react-dom/test-utils";
import { actorDTO } from "../DTOs/actorDTO";
import ProgressBar from "./Progressbar";
interface propsInterface {
  setActorsInputFromChild: Function;
}

export default function ActorsList(props: propsInterface) {
  const [allActors, setAllActors] = useState([]);
  const [inputList, setInputList] = useState<Array<string>>([]);

  useEffect(() => {
    axios.get("https://localhost:7114/actors").then((res) => {
      setTimeout(() => {
        setAllActors(res.data);
        console.log("res.data: ", res.data);
      }, 300);
    });
  }, []);

  useEffect(() => {
    console.log("inputList: l ", inputList);
  });

  const handleChecked = (index: number,e: any) => {
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
      console.log("list: in if ", inputList);
    } else {
      list.filter((item) => item !== value);
      list.splice(index, 1);
      setInputList(list);
    }
    console.log("inputList: inChild ", inputList);
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
                    console.log("e: ", e);
                    handleChecked(index,e);
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
    </>
  );
}
