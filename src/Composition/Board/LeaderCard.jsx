import { CircularProgress, Stack, Typography } from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase-config";
export const LeaderCard = ({ leaderId }) => {
  const [workerInfo, setWorkerInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const getWorker = async () => {
    try {
      setIsLoading(true);
      const docRef = doc(db, "worker", leaderId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const worker = docSnap.data();
        setWorkerInfo(worker);
      } else {
      }
    } catch (err) {
      alert("error! leader get");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (leaderId) {
      getWorker();
    }
  }, [leaderId]);
  return (
    <Stack
      id={leaderId}
      sx={{ width: "100%", alignItems: "center", justifyContent: "center" }}
    >
      {isLoading ? (
        <CircularProgress />
      ) : (
        <img
          src={workerInfo?.profileImage}
          alt={workerInfo?.name}
          style={{ width: "80px", height: "80px" }}
        />
      )}
      <Stack
        sx={{
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "80px",
          minHeight: "36px",
          maxHeight: "36px",
        }}
      >
        <Typography
          sx={{
            wordBreak: "break-word",
            textAlign: "center",
            fontWeight: 700,
            fontSize: "9px",
          }}
        >
          {workerInfo?.name}
        </Typography>
      </Stack>
    </Stack>
  );
};
