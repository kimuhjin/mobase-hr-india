import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { BOARD, TEAM, WORKER, WORKER_CRUD_ID } from "./Constant/route";
import WorkerCRUD from "./Page/WorkerCRUD";
import { Team } from "./Page/Team";

const Router = () => {
  return (
    <Suspense fallback={<div></div>}>
      <Routes>
        <Route path={BOARD} element={<Board />} />
        <Route path={WORKER} element={<Worker />} />
        <Route path={WORKER_CRUD_ID} element={<WorkerCRUD />} />
        <Route path={TEAM} element={<Team />} />
      </Routes>
    </Suspense>
  );
};

export default Router;
const Board = lazy(() => import("./Page/Board"));
const Worker = lazy(() => import("./Page/Worker"));
