import { MenuItem, Select, Stack } from "@mui/material";
import React from "react";
import { Header } from "../Composition/Board/Header";
import { BoardsContainer } from "../Composition/Board/BoardsContainer";
import { useState } from "react";

const Board = () => {
  const [selectedBoardId, setSelectedBoardId] = useState("1ks_4mf");
  return (
    <Stack sx={{ width: "100%", height: "100%", padding: "8px" }}>
      {/* <Header /> */}
      <Select
        sx={{ width: "300px", height: "36px" }}
        value={selectedBoardId}
        onChange={(e) => {
          setSelectedBoardId(e.target.value);
        }}
      >
        <MenuItem value="1ks_4mf">{`0th floor (1KS & 4MF)`}</MenuItem>
        <MenuItem value="ofd">{`0th floor  (OFD)`}</MenuItem>
        <MenuItem value="5sr">{`clean room (5SR)`}</MenuItem>
        <MenuItem value="3cl">{`clean room (3CL)`}</MenuItem>
        <MenuItem value="ren">{`1st floor (Ren)`}</MenuItem>
        <MenuItem value="smt">{`smt  (SMT)`}</MenuItem>
      </Select>
      <Stack
        sx={{
          width: "100%",
          height: "100%",
          marginTop: "16px",

          flexDirection: "row",
          gap: "8px",
        }}
      >
        <BoardsContainer id={selectedBoardId} readonly={true} />
      </Stack>
    </Stack>
  );
};
export default Board;
