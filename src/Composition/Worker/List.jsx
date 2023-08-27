import * as React from "react";
import { CircularProgress, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { WORKER_CRUD } from "../../Constant/route";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase-config";

export const List = () => {
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
  console.log(workerList);
  return (
    <>
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
        <Stack
          sx={{
            width: "100%",
            height: "calc(100% - 52px)",
            overflow: "hidden",
            border: "1px solid black",
            borderBottomLeftRadius: "12px",
            borderBottomRightRadius: "12px",
          }}
        >
          {/* HEADER */}
          <Stack
            sx={{
              width: "100%",
              borderBottom: "1px solid black",
              height: "52px",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              padding: "0px 8px",
            }}
          >
            <Stack
              sx={{
                width: "50px",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "cemter",
              }}
            >
              Index
            </Stack>
            <Stack
              sx={{
                width: "50px",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "cemter",
              }}
            />
            <Stack
              sx={{
                width: "100px",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "cemter",
              }}
            >
              Name
            </Stack>
          </Stack>
          {/* Body */}
          <Stack
            sx={{
              width: "100%",
              height: "100%",
              overflowY: "scroll",
            }}
          >
            {workerList.map((worker, index) => {
              return (
                <Stack
                  key={index}
                  sx={{
                    flexDirection: "row",
                    width: "100%",
                    minHeight: "48px",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    padding: "0px 8px",
                    ":hover": {
                      backgroundColor: "#E9ECF0",
                    },
                  }}
                  onClick={() => onUserItemClick(worker?.id)}
                >
                  <Stack
                    sx={{
                      width: "50px",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "cemter",
                    }}
                  >
                    {index + 1}
                  </Stack>
                  <Stack
                    sx={{
                      width: "50px",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "cemter",
                    }}
                  >
                    <img
                      src={worker?.profileImage}
                      alt={worker?.name}
                      style={{ width: "40px", height: "40px" }}
                    />
                  </Stack>
                  <Stack
                    sx={{
                      width: "100px",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "cemter",
                    }}
                  >
                    {worker?.name}
                  </Stack>
                </Stack>
              );
            })}
          </Stack>
        </Stack>
      )}
    </>
  );
};
