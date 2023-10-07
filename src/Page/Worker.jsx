import { Stack } from "@mui/material";
import React from "react";

import { WorkerDataGrid } from "../Composition/Worker/WorkerDataGrid";

const Worker = () => {
  return (
    <Stack sx={{ width: "100%", height: "100%", padding: "20px" }}>
      <WorkerDataGrid />
    </Stack>
  );
};
export default Worker;
