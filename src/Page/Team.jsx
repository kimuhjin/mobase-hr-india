import { Button, MenuItem, Select, Stack, Typography } from "@mui/material";

import { BoardsContainer } from "../Composition/Board/BoardsContainer";
import { useState } from "react";
import { auth } from "../Util/auth";
import { useNavigate } from "react-router-dom";
import { BsClipboardData } from "react-icons/bs";
import { BOARD_TEAM } from "../Constant/route";

export const GROUP_LIST = [
  { label: "SMT(smt)", id: "smt" },
  { label: "SMT(eol)", id: "eol" },
  { label: "ASS'Y(switch)", id: "switch" },
  { label: "ASS'Y(keyset)", id: "keyset" },
];
export const Team = () => {
  const [selectedBoardId, setSelectedBoardId] = useState("smt");
  const isAdmin = auth.role === "admin";
  const navigate = useNavigate();
  console.log(auth.role);
  return (
    <Stack sx={{ width: "100%", padding: "20px", overflowY: "auto" }}>
      <Stack
        sx={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Typography
          sx={{ fontSize: "28px", fontWeight: "700", marginBottom: "20px" }}
        >
          Team
        </Typography>
        <Stack sx={{ flexDirection: "row", alignItems: "center" }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#000",
              ":hover": {
                backgroundColor: "#2f2f2f",
              },
            }}
            onClick={() => {
              navigate(
                `${BOARD_TEAM}/${isAdmin ? selectedBoardId : auth.role}`
              );
            }}
          >
            <BsClipboardData size={"16px"} color="#fff" />
            <Stack sx={{ marginLeft: "4px" }}>Board</Stack>
          </Button>
          {isAdmin && (
            <Select
              sx={{ width: "300px", height: "36px", marginLeft: "8px" }}
              value={selectedBoardId}
              onChange={(e) => {
                setSelectedBoardId(e.target.value);
              }}
            >
              <MenuItem value="smt">{`SMT(smt)`}</MenuItem>
              <MenuItem value="eol">{`SMT(eol)`}</MenuItem>
              <MenuItem value="switch">{`ASS'Y(switch)`}</MenuItem>
              <MenuItem value="keyset">{`ASS'Y(keyset)`}</MenuItem>
            </Select>
          )}
        </Stack>
      </Stack>
      <Stack
        sx={{
          width: "100%",
          height: "calc(100% - 0px)",
          overflowY: "auto",
        }}
      >
        {isAdmin ? (
          <Stack sx={{ width: "100%" }}>
            <BoardsContainer id={selectedBoardId} />
          </Stack>
        ) : (
          <Stack sx={{ width: "100%" }}>
            <BoardsContainer id={auth.role} />
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};
