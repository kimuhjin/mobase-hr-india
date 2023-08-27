import { Stack } from "@mui/material";
import { useParams } from "react-router-dom";
import { EmployeeForm } from "../Composition/Worker/EmployeeForm";

const WorkerCRUD = () => {
  const { id } = useParams();

  return (
    <Stack sx={{ width: "100%", height: "100%", padding: "20px" }}>
      <EmployeeForm />
    </Stack>
  );
};
export default WorkerCRUD;
