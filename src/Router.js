import { Suspense, lazy } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import {
  BOARD,
  STATISTICS,
  TEAM,
  WORKER,
  WORKER_CRUD_ID,
} from "./Constant/route";
import WorkerCRUD from "./Page/WorkerCRUD";
import { Team } from "./Page/Team";
import { auth } from "./Util/auth";
import { Button, Stack, Typography } from "@mui/material";
import { RiAlertLine } from "react-icons/ri";
const AuthWrapper = ({ children }) => {
  const navigate = useNavigate();

  if (!auth.success) {
    return (
      <Stack
        sx={{
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <RiAlertLine size={"70px"} color="red" />
        <Typography sx={{ fontSize: "36px", fontWeight: 700 }}>
          Access Denied
        </Typography>
        <Button
          variant="contained"
          sx={{ marginTop: "60px" }}
          onClick={() => {
            navigate(BOARD);
          }}
        >
          Back to Board
        </Button>
      </Stack>
    );
  } else {
    return children;
  }
};

const Router = () => {
  return (
    <Suspense fallback={<div></div>}>
      <Routes>
        <Route path={BOARD} element={<Board />} />
        <Route
          path={WORKER}
          element={
            <AuthWrapper>
              <Worker />
            </AuthWrapper>
          }
        />
        <Route
          path={WORKER_CRUD_ID}
          element={
            <AuthWrapper>
              <WorkerCRUD />
            </AuthWrapper>
          }
        />
        <Route
          path={TEAM}
          element={
            <AuthWrapper>
              <Team />
            </AuthWrapper>
          }
        />
        <Route path={STATISTICS} element={<TotalStatistics />} />
      </Routes>
    </Suspense>
  );
};

export default Router;
const Board = lazy(() => import("./Page/Board"));
const Worker = lazy(() => import("./Page/Worker"));
const TotalStatistics = lazy(() => import("./Page/TotalStatistics"));
