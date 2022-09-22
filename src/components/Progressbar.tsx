import { CircularProgress } from "@mui/material";

export default function ProgressBar(){
    return (
        <div style={{width:"100%", height:"300px", alignItems:"center" , justifyContent:"center", display: "flex" }}>
          <CircularProgress color="success" />
        </div>
      );
}