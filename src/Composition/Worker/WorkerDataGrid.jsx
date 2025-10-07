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
import * as XLSX from "xlsx";
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
  { field: "deputyTeamLeader", headerName: "Deputy Supervisor", flex: 1 },
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

  const onExportButtonClick = () => {
    // 엑셀 데이터 준비
    const exportData = workerList.map((worker) => {
      // Skill Matrix Detail을 문자열로 변환
      const skillMatrixDetail = worker.skillMatrixDetail
        ? worker.skillMatrixDetail
            .map((skill) => `${skill.processName}: ${skill.level}`)
            .join(", ")
        : "";

      return {
        "Employee Number": worker.employeeNumber || "",
        "Name": worker.name || "",
        "Group": groupObj[worker.group] || worker.group || "",
        "Company": worker.company || "",
        "Position": worker.position || "",
        "Area": worker.area || "",
        "Skill Matrix": worker.skillMatrix || "",
        "Skill Matrix Detail": skillMatrixDetail,
        "Date of Employment": worker.employmentDate || "",
        "Date of Employment (Mobase)": worker.employmentDate_Mobase || "",
        "Inspector Certificate": worker.inspectorCertificate || "",
        "Inspector Certificate Date": worker.inspectorCertificateDate || "",
        "Soldering Certificate": worker.solderingCertificate || "",
        "Soldering Certificate Date": worker.solderingCertificateDate || "",
        "Deputy Supervisor": worker.deputyTeamLeader || "",
        "Disabled": worker.disabled ? "YES" : "NO",
      };
    });

    // 워크북 생성
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Workers");

    // 파일 다운로드
    const fileName = `workers_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(workbook, fileName);
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
            <Stack sx={{ flexDirection: "row", gap: "12px" }}>
              <Button
                variant="outlined"
                sx={{ width: "100px", height: "48px" }}
                onClick={onExportButtonClick}
              >
                <Typography variant="button" sx={{ fontSize: "16px" }}>
                  Export
                </Typography>
              </Button>
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
