import { Button, Stack, Typography } from "@mui/material";
import React from "react";
import { List } from "../Composition/Worker/List";
import { useNavigate } from "react-router-dom";
import { WORKER_CRUD } from "../Constant/route";
import { WorkerDataGrid } from "../Composition/Worker/WorkerDataGrid";

const Worker = () => {
  const navigate = useNavigate();
  const onNewButtonClick = () => {
    navigate(`${WORKER_CRUD}/new`);
  };
  return (
    <Stack sx={{ width: "100%", height: "100%", padding: "20px" }}>
      <Stack
        sx={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <Typography sx={{ fontSize: "28px", fontWeight: "700" }}>
          Worker List
        </Typography>
        <Button
          variant="contained"
          sx={{ width: "100px", height: "48px" }}
          onClick={onNewButtonClick}
        >
          <Typography variant="button" sx={{ fontSize: "16px" }}>
            New
          </Typography>
        </Button>
      </Stack>
      <WorkerDataGrid />
    </Stack>
  );
};
export default Worker;
