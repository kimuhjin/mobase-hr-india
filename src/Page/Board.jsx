import { Stack } from "@mui/material";
import React from "react";
import { Header } from "../Composition/Board/Header";
import { Team } from "../Composition/Board/Team";

const Board = () => {
  return (
    <Stack sx={{ width: "100%", height: "100%", padding: "8px" }}>
      <Header />
      <Stack
        sx={{
          width: "100%",
          height: "100%",
          marginTop: "16px",

          flexDirection: "row",
          gap: "8px",
        }}
      >
        <Team />
      </Stack>
    </Stack>
  );
};
export default Board;
