import { CircularProgress, Stack } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { useNavigate } from "react-router-dom";
import { WORKER_CRUD } from "../../Constant/route";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase-config";
const columns = [
  {
    field: "profileImage",
    headerName: "",
    renderCell: (params) => (
      <img
        src={params.value}
        alt=""
        style={{ width: "48px", height: "48px" }}
      />
    ),
  },
  { field: "group", headerName: "Group", flex: 1 },
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
  const onUserItemClick = (id) => {
    navigate(`${WORKER_CRUD}/edit/${id}/`);
  };

  const getWorkerList = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "worker"));
      const workers = querySnapshot.docs.map((doc) => doc.data());
      setWorkerList(workers);
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
    <Stack
      sx={{
        height: "100%",
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {isLoading ? (
        <Stack
          sx={{
            width: "100%",
            height: "100%",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Stack>
      ) : (
        <DataGrid
          sx={{
            "& .MuiDataGrid-cell:focus": {
              outline: " none",
            },
          }}
          rows={workerList}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
          disableColumnSelector
          onRowClick={(params) => onUserItemClick(params.id)}
          isRowSelectable={false}
        />
      )}
    </Stack>
  );
};
