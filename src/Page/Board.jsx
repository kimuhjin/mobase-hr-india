import { IconButton, MenuItem, Select, Stack, Typography } from "@mui/material";
import React from "react";
import { BoardsContainer } from "../Composition/Board/BoardsContainer";
import { useState } from "react";
import { BiExpand, BiCollapse } from "react-icons/bi";
import { GROUP_LIST } from "./Team";
const Board = () => {
  const [selectedBoardId, setSelectedBoardId] = useState("1ks_4mf");
  const [isExpand, setIsExpand] = useState(false);
  const onExpandButtonClick = () => {
    setIsExpand((prev) => !prev);
  };
  const date = new Date();
  const today = `${date.getFullYear()}.${
    date.getMonth() + 1
  }.${date.getDate()}`;
  return (
    <Stack
      id={"manageBoardGrid"}
      sx={{
        width: "100%",
        height: "100%",
        padding: "8px",
        backgroundColor: "#fff",

        overflow: "auto",
        ...(isExpand
          ? { position: "fixed", zIndex: 2, left: 0, top: 0, padding: "2px" }
          : { borderRadius: "12px" }),
      }}
    >
      {/* <Header /> */}
      <Stack
        sx={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "8px",
        }}
      >
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: "24px",
            color: "#0a0a8f",
            width: "100%",
            lineHeight: "24px",
          }}
        >
          {today}&nbsp;&nbsp;&nbsp;
          {GROUP_LIST?.find((i) => i.id === selectedBoardId)?.label}
        </Typography>
        <Stack
          sx={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "flex-end",
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
            <MenuItem value="5sr">{`clean room (5RC)`}</MenuItem>
            <MenuItem value="3cl">{`clean room (3CL)`}</MenuItem>
            <MenuItem value="ren">{`1st floor (Ren)`}</MenuItem>
            <MenuItem value="smt">{`smt  (SMT)`}</MenuItem>
          </Select>
          {/* <IconButton
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
          </IconButton> */}
        </Stack>
      </Stack>

      <Stack
        sx={{
          width: "100%",
          height: "100%",
          flexDirection: "row",
          gap: "8px",
        }}
      >
        <BoardsContainer
          id={selectedBoardId}
          readonly={true}
          isExpand={isExpand}
        />
      </Stack>
    </Stack>
  );
};
export default Board;
