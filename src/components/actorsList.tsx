import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Checkbox, FormControlLabel, Grid, Typography } from "@mui/material";
import ProgressBar from "./Progressbar";
import movie from "./movie";
export default function ActorsList(props: any) {
  const [allActors, setAllActors] = useState([]);
  const [inputList, setInputList] = useState([{}]);

  useEffect(() => {
    axios.get("https://localhost:7114/actors").then((res) => {
      setTimeout(() => {
        setAllActors(res.data);
        console.log("res.data: ", res.data);
      }, 20);
    });
  }, []);

  useEffect(() => {
    console.log("inputList: l ", inputList);
  });

  const handleChecked = (e: any, index: number) => {
    console.log(e);
    const { value }: any = e.target;
    const list = [...inputList];
    if (e.target.checked) {
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
      <Box sx={{display:"flex"}}>
        <Grid item xs={16} sx={{width:"80%"}}>
          {allActors &&
            allActors.map((actor: any, index) => {
              return (
                  <FormControlLabel
                  sx={{margin:"10px"}}
                    key={actor.actorId}
                    control={<Checkbox />}
                    label={actor.firstName}
                    value={actor.actorId}
                    onChange={(e) => handleChecked(e, index)}
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
