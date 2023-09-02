import { Button, IconButton, MenuItem, Select, Stack } from "@mui/material";
import React from "react";
import { Header } from "../Composition/Board/Header";
import { BoardsContainer } from "../Composition/Board/BoardsContainer";
import { useState } from "react";
import { BiExpand, BiCollapse } from "react-icons/bi";
const Board = () => {
  const [selectedBoardId, setSelectedBoardId] = useState("1ks_4mf");
  const [isExpand, setIsExpand] = useState(false);
  const onExpandButtonClick = () => {
    setIsExpand((prev) => !prev);
  };
  return (
    <Stack
      sx={{
        width: "100%",
        height: "100%",
        padding: "8px",
        backgroundColor: "#fff",
        overflow: "scroll",
        ...(isExpand
          ? { position: "fixed", zIndex: 2, left: 0, top: 0, padding: "2px" }
          : {}),
      }}
    >
      {/* <Header /> */}
      <Stack
        sx={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
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
        <IconButton
          sx={{
            marginLeft: "16px",
            width: "30px",
            height: "30px",
          }}
          onClick={onExpandButtonClick}
        >
          {isExpand ? (
            <BiCollapse size={"24px"} color="#333333" />
          ) : (
            <BiExpand size={"24px"} color="#333333" />
          )}
        </IconButton>
      </Stack>

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
