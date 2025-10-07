import { MenuItem, Select, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { BoardsContainer } from "../Composition/Board/BoardsContainer";
import { useState } from "react";
import { GROUP_LIST } from "./Team";
import { useParams } from "react-router-dom";
const Board = () => {
  const [selectedBoardId, setSelectedBoardId] = useState("");
  const [isExpand, setIsExpand] = useState(false);

  const date = new Date();
  const today = `${date.getFullYear()}.${
    date.getMonth() + 1
  }.${date.getDate()}`;

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setSelectedBoardId(id);
    } else {
      if (!selectedBoardId) {
        setSelectedBoardId("smt");
      }
    }
  }, [id, selectedBoardId]);

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
            <MenuItem value="smt">{`SMT(smt)`}</MenuItem>
            <MenuItem value="eol">{`SMT(eol)`}</MenuItem>
            <MenuItem value="switch">{`ASS'Y(switch)`}</MenuItem>
            <MenuItem value="keyset">{`ASS'Y(keyset)`}</MenuItem>
            <MenuItem value="quality_team">{`Quality (SMT/IQC)`}</MenuItem>
            <MenuItem value="quality_assy_team">{`Quality (Assy)`}</MenuItem>
            <MenuItem value="material_team">{`Material team`}</MenuItem>
            <MenuItem value="sales_team">{`Sales team`}</MenuItem>
          </Select>
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
