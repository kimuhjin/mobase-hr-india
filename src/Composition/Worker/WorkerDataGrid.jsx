import { Button, Stack, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { useNavigate } from "react-router-dom";
import { WORKER_CRUD } from "../../Constant/route";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase-config";
import { LoadingDim } from "../Common/LoadingDim";
import { auth } from "../../Util/auth";
import { groupObj } from "../../Constant/convert";
const columns = [
  {
    field: "profileImage",
    headerName: "Photo",
    renderCell: (params) => (
      <img
        src={params.value}
        alt=""
        style={{ width: "48px", height: "48px" }}
      />
    ),
  },
  {
    field: "group",
    headerName: "Group",
    flex: 1,
    renderCell: (params) => {
      return groupObj[params.value];
    },
  },
  { field: "name", headerName: "Name", flex: 1 },
  { field: "employeeNumber", headerName: "employeeNumber", flex: 1 },
  { field: "company", headerName: "Company", flex: 1 },
  { field: "skillMatrix", headerName: "Skill Matrix", flex: 1 },
  { field: "employmentDate", headerName: "Date of employment", flex: 1 },
  {
    field: "employmentDate_Mobase",
    headerName: "Date of employment (Mobase)",
    flex: 1,
  },
  { field: "position", headerName: "Position", flex: 1 },
  { field: "area", headerName: "Area", flex: 1 },
  {
    field: "inspectorCertificate",
    headerName: "Inspector Certificate",
    flex: 1,
  },
  {
    field: "solderingCertificate",
    headerName: "Soldering Certificate",
    flex: 1,
  },
  { field: "deputyTeamLeader", headerName: "Deputy Team Leader", flex: 1 },
];

export const WorkerDataGrid = () => {
  const navigate = useNavigate();
  const [workerList, setWorkerList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const isAdmin = auth.role === "admin";
  const onUserItemClick = (id) => {
    navigate(`${WORKER_CRUD}/edit/${id}/`);
  };
  const onNewButtonClick = () => {
    navigate(`${WORKER_CRUD}/new`);
  };
  const getWorkerList = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "worker"));
      const workers = querySnapshot.docs.map((doc) => doc.data());
      const filteredWorkers = isAdmin
        ? workers
        : workers.filter((i) => i.group === auth.role);
      setWorkerList(filteredWorkers);
    } catch (err) {
      alert("error! datagrid");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  React.useEffect(() => {
    getWorkerList();
  }, []);

  return (
    <Stack sx={{ width: "100%", height: "100%", padding: "20px" }}>
      <LoadingDim isLoading={isLoading} />
      {!isLoading && (
        <>
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
              Worker
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
          <Stack
            sx={{
              width: "100%",
              height: "calc(100% - 60px)",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <Stack
              sx={{
                maxWidth: "calc(100vw - 210px)",
                width: "calc(100vw - 210px)",
                height: "100%",
                ".MuiDataGrid-virtualScroller": {
                  overflowY: "auto !important",
                },
              }}
            >
              <DataGrid
                sx={{
                  maxWidth: "calc(100vw - 190px)",
                  width: "calc(100vw - 190px)",
                  "& .MuiDataGrid-cell:focus": {
                    outline: " none",
                  },
                }}
                rows={workerList}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 20,
                    },
                  },
                }}
                autoHeight
                pageSizeOptions={[5]}
                disableRowSelectionOnClick
                disableColumnSelector
                onRowClick={(params) => onUserItemClick(params.id)}
                isRowSelectable={false}
              />
            </Stack>
          </Stack>
        </>
      )}
    </Stack>
  );
};
