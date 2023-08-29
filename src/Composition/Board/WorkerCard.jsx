import { CircularProgress, Stack } from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase-config";

export const WorkerCard = ({ readonly, handleDragStart, cellIndex, user }) => {
  const [workerInfo, setWorkerInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const getWorker = async () => {
    try {
      setIsLoading(true);
      const docRef = doc(db, "worker", user?.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const worker = docSnap.data();
        setWorkerInfo(worker);
      } else {
      }
    } catch (err) {
      alert("error! worker crud get");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getWorker();
  }, []);

  return (
    <>
      {isLoading ? (
        <Stack
          sx={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress sx={{ width: "16px", height: "16px" }} />
        </Stack>
      ) : (
        <Stack
          sx={{
            width: "100%",
            justifyContent: "center",
          }}
          draggable={!readonly}
          onDragStart={() => handleDragStart(cellIndex, user)}
        >
          <Stack
            sx={{
              flexDirection: "row",
              img: {
                width: "48px",
                height: "48px",
              },
            }}
          >
            {/* LEFT */}
            <Stack
              sx={{
                width: "20px",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor:
                  workerInfo?.company === "mobase" ? "blue" : "skyblue",
                maxHeight: "28px",
                writingMode: "vertical-lr",
                textOrientation: "upright",
                letterSpacing: "-5px",
              }}
            ></Stack>

            <Stack
              sx={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={workerInfo?.profileImage}
                alt={workerInfo?.name}
                style={{
                  pointerEvents: "none",
                  width: "28px",
                  height: "28px",
                }}
              />
            </Stack>
            {/* RIGHT */}

            <Stack
              sx={{
                width: "20px",
                height: "100%",
                maxHeight: "28px",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "yellow",
                writingMode: "vertical-lr",
                textOrientation: "upright",
                fontSize: "14px",
              }}
            >
              {workerInfo?.skillMatrix}
            </Stack>
          </Stack>
          {/* BOTTOM */}

          <Stack
            sx={{
              width: "100%",
              height: "20px",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "green",
              fontSize: "14px",
            }}
          >
            {workerInfo?.name}
          </Stack>
        </Stack>
      )}
    </>
  );
};
