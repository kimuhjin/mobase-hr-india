import { Suspense, lazy, useLayoutEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import {
  BOARD,
  BOARD_TEAMID,
  LOGIN,
  STATISTICS,
  TEAM,
  WORKER,
  WORKER_CRUD_ID,
} from "./Constant/route";
import WorkerCRUD from "./Page/WorkerCRUD";
import { Team } from "./Page/Team";
import { auth, isGuest } from "./Util/auth";
import { Button, Stack, Typography } from "@mui/material";
import { RiAlertLine } from "react-icons/ri";
const guestAccessibleRoutes = [LOGIN, BOARD, BOARD_TEAMID, STATISTICS];

const AuthWrapper = ({ children }) => {
  const navigate = useNavigate();
  useLayoutEffect(() => {
    if (auth.no_login) {
      navigate("/login");
      window.location.reload();
    }
  }, [navigate]);

  const isAccessDenined = () => {
    if (!auth.no_login && !auth.success) return true;
    else {
      if (isGuest) {
        if (!guestAccessibleRoutes.includes(window.location.pathname))
          return true;
        else return false;
      } else return false;
    }
  };

  if (isAccessDenined()) {
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
        <Route path="*" element={<Login />} />
        <Route path={LOGIN} element={<Login />} />
        <Route
          path={BOARD}
          element={
            <AuthWrapper>
              <Board />
            </AuthWrapper>
          }
        />
        <Route
          path={BOARD_TEAMID}
          element={
            <AuthWrapper>
              <Board />
            </AuthWrapper>
          }
        />

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
        <Route
          path={STATISTICS}
          element={
            <AuthWrapper>
              <TotalStatistics />
            </AuthWrapper>
          }
        />
      </Routes>
    </Suspense>
  );
};

export default Router;
const Board = lazy(() => import("./Page/Board"));
const Worker = lazy(() => import("./Page/Worker"));
const TotalStatistics = lazy(() => import("./Page/TotalStatistics"));
const Login = lazy(() => import("./Page/Login"));
