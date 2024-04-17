import { CircularProgress, Stack, Typography } from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase-config";
import { skillMatrixWithDate } from "../../Constant/convert";
import { getColor } from "../../Util/getColor";

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
        maxHeight: "100%",
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
            overflow: "hidden",
          }}
          draggable={!readonly}
          onDragStart={() => handleDragStart(cellIndex, user)}
        >
          <Stack
            sx={{
              width: "100%",
              height: "100%",
              flexDirection: "row",
            }}
          >
            {/* LEFT */}
            <Stack
              sx={{
                minWidth: "6px",
                maxWidth: "6px",
                justifyContent: "center",
                alignItems: "center",
                writingMode: "vertical-lr",
                textOrientation: "upright",
                letterSpacing: "-5px",
                ...getColor(workerInfo?.company),
              }}
            />

            <Stack
              sx={{
                width: "100%",
                height: "100%",
                maxWidth: "100%",
                maxHeight: "100%",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#e6e6e6",
                overflow: "hidden",
              }}
            >
              <Stack
                sx={{
                  width: "100%",
                  height: "100%",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundImage: `url(${workerInfo?.profileImage})`,
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
                fontSize: "8px",
              }}
            >
              {skillMatrixWithDate(
                workerInfo?.employmentDate,
                workerInfo?.skillMatrix
              )}
            </Stack>
          </Stack>
          {/* BOTTOM */}

          <Stack
            sx={{
              width: "100%",
              minHeight: "12px",
              height: "12px",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#f9c3c3",
              padding: "0px 2px",
            }}
          >
            <Typography
              sx={{
                width: "100%",
                fontSize: "10px",
                lineHeight: "10px",
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
