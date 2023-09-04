import { useEffect, useState } from "react";
import { ManageBoard } from "./ManageBoard";
import { Button, CircularProgress, Stack, Typography } from "@mui/material";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import { LoadingDim } from "../Common/LoadingDim";

export const BoardsContainer = ({ id, readonly = false }) => {
  const [boards, setBoards] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isGetLoading, setIsGetLoading] = useState(true);

  const getBoard = async (id) => {
    if (id) {
      try {
        const docRef = doc(db, "boards", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const { boards } = docSnap.data();

          setBoards(boards);
        }
      } catch (err) {
        alert("error! board con");
        console.error(err);
      } finally {
        setIsGetLoading(false);
      }
    }
  };
  useEffect(() => {
    setIsGetLoading(true);
    getBoard(id);
  }, [id]);

  const handleSave = async () => {
    try {
      const commentRef = doc(db, "boards", id);
      setIsLoading(true);

      const res = await setDoc(commentRef, { boards }, { merge: true });
      alert("save successfully");
    } catch (error) {
      console.error("Error saving data:", error);
      alert("error! board save");
    } finally {
      setIsLoading(false);
    }
  };

  const updateBoardData = (label, data) => {
    const newBoards = boards.map((board) =>
      board.label === label ? { ...board, ...data } : board
    );
    setBoards(newBoards);
  };

  return (
    <Stack
      sx={{
        width: "100%",
        height: "100%",
      }}
    >
      <LoadingDim isLoading={isLoading} />
      {isGetLoading ? (
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
        <Stack sx={{ width: "100%", height: "100%" }}>
          <Stack
            sx={{
              gap: "16px",
              width: "100%",
              height: "100%",
              alignItems: "space-between",
            }}
          >
            {boards?.map((board) => {
              return (
                <Stack
                  key={board.label}
                  sx={{
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <Typography sx={{ fontWeight: "700", fontSize: "17px" }}>
                    {board.label}
                  </Typography>
                  <ManageBoard
                    readonly={readonly}
                    data={board}
                    boards={boards}
                    updateBoardData={updateBoardData}
                    groupId={id}
                  />
                </Stack>
              );
            })}
          </Stack>
          {!readonly && (
            <Button
              onClick={handleSave}
              variant="contained"
              sx={{ marginTop: "16px" }}
            >
              Save
            </Button>
          )}
        </Stack>
      )}
    </Stack>
  );
};
