import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { BOARD, DETAIL_ID, WORKER, WORKER_CRUD_ID } from "./Constant/route";
import WorkerCRUD from "./Page/WorkerCRUD";

const Router = () => {
  return (
    <Suspense fallback={<div></div>}>
      <Routes>
        <Route path={BOARD} element={<Board />} />
        <Route path={WORKER} element={<Worker />} />
        <Route path={DETAIL_ID} element={<WorkerDetail />} />
        <Route path={WORKER_CRUD_ID} element={<WorkerCRUD />} />
      </Routes>
    </Suspense>
  );
};

export default Router;
const Board = lazy(() => import("./Page/Board"));
const Worker = lazy(() => import("./Page/Worker"));
const WorkerDetail = lazy(() => import("./Page/WorkerDetail"));
