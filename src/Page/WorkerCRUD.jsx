import { Stack, CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import { EmployeeForm } from "../Composition/Worker/EmployeeForm";
import React from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase-config";

const WorkerCRUD = () => {
  const { type, id } = useParams();
  const [workerInfo, setWorkerInfo] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const getWorker = async () => {
    try {
      const docRef = doc(db, "worker", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const worker = docSnap.data();
        setWorkerInfo(worker);
      } else {
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  React.useEffect(() => {
    getWorker();
  }, []);

  return (
    <Stack sx={{ width: "100%", height: "100%", padding: "20px" }}>
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
        <EmployeeForm
          isNew={type.toLowerCase() === "new"}
          workerInfo={workerInfo}
        />
      )}
    </Stack>
  );
};
export default WorkerCRUD;
