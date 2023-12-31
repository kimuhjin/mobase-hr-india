import { Stack } from "@mui/material";
import React from "react";

import { WorkerDataGrid } from "../Composition/Worker/WorkerDataGrid";

const Worker = () => {
  return (
    <Stack sx={{ width: "100%", height: "100%", overflow: "hidden" }}>
      <WorkerDataGrid />
    </Stack>
  );
};
export default Worker;
