import { CircularProgress, Stack, Typography } from "@mui/material";
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
      }
    } catch (err) {
      console.error("error! worker crud get");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getWorker();
  }, [user?.id]);

  return (
    <Stack
      sx={{
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        borderRadius: "4px",
        overflow: "hidden",
      }}
    >
      {isLoading ? (
        <Stack
          sx={{
            width: "100%",
            height: "100%",
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
            height: "100%",
            justifyContent: "center",
          }}
          draggable={!readonly}
          onDragStart={() => handleDragStart(cellIndex, user)}
        >
          <Stack
            sx={{
              width: "100%",
              height: "100%",
              flexDirection: "row",
              overflow: "hidden",
              img: {
                overflow: "hidden",
                width: "100%",
                maxHeight: "40px",
                objectFit: "cover",
              },
            }}
          >
            {/* LEFT */}
            <Stack
              sx={{
                minWidth: "6px",
                maxWidth: "6px",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor:
                  workerInfo?.company === "mobase" ? "blue" : "skyblue",

                writingMode: "vertical-lr",
                textOrientation: "upright",
                letterSpacing: "-5px",
              }}
            />

            <Stack
              sx={{
                width: "100%",
                height: "100%",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#e6e6e6",
              }}
            >
              <img
                src={workerInfo?.profileImage}
                alt={workerInfo?.name}
                style={{
                  width: "100%",
                  pointerEvents: "none",
                }}
              />
            </Stack>
            {/* RIGHT */}

            <Stack
              sx={{
                minWidth: "6px",
                maxWidth: "6px",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "yellow",
                writingMode: "vertical-lr",
                textOrientation: "upright",
                fontSize: "3px",
              }}
            >
              {workerInfo?.skillMatrix}
            </Stack>
          </Stack>
          {/* BOTTOM */}

          <Stack
            sx={{
              width: "100%",
              minHeight: "14px",
              height: "14px",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "green",
            }}
          >
            <Typography
              sx={{
                width: "100%",
                maxWidth: "40px",
                fontSize: "4px !important",
                textAlign: "center",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                wordBreak: "break-all",
              }}
            >
              {workerInfo?.name}
            </Typography>
          </Stack>
        </Stack>
      )}
    </Stack>
  );
};
