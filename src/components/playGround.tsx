import { Button } from "@mui/material";
import { useState, useMemo } from "react";

export default function Play() {
  const [val, setVal] = useState<number>(5);
  const [pow, setPow] = useState<number>(25);

  const powerCalc = (num: number) => {
    console.log("Something");
    setPow(num * num);
    return num * num;
  };

//   useMemo(() => powerCalc(val), [val]);
  //   const power = powerCalc(val);

  //   console.log('power: ', power);

  console.log("Re-renderd");

  return (
    <>
      <div style={{ justifyContent: "center", display: "flex" }}>
        <Button variant="contained" onClick={() => setVal(val - 1)}>
          Minus
        </Button>
        <h2>{val}</h2>
        <Button variant="contained" onClick={() => setVal(val + 1)}>
          Plus
        </Button>
      </div>
      <Button variant="contained" onClick={() => powerCalc(5)}>
        Calculate Power
      </Button>
      <h4>Power : {pow}</h4>
    </>
  );
}
