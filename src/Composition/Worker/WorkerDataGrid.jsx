import { Box, CircularProgress, Stack } from "@mui/material";
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
  { field: "name", headerName: "Imię i Nazwisko" },
  { field: "companyNumber", headerName: "Nr. Firmowy" },
  { field: "area", headerName: "area" },
  { field: "firma", headerName: "firma" },
  { field: "position", headerName: "position" },
  { field: "skillMatrix", headerName: "skillMatrix" },
  { field: "solderingCertificate", headerName: "solderingCertificate" },
  { field: "mobaseEmploymentDate", headerName: "mobaseEmploymentDate" },
  { field: "inspectorCertificate", headerName: "inspectorCertificate" },
  { field: "employmentDate", headerName: "employmentDate" },
  { field: "deputyTL", headerName: "deputyTL" },
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
