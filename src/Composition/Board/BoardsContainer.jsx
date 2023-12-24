import { useEffect, useState } from "react";
import { ManageBoard } from "./ManageBoard";
import { Button, CircularProgress, Stack, Typography } from "@mui/material";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import { LoadingDim } from "../Common/LoadingDim";
import { sample_board_data } from "../../Data/board";

export const BoardsContainer = ({ id, readonly = false, isExpand }) => {
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
      <LoadingDim isLoading={isLoading || isGetLoading} fullSize={isExpand} />
      {!isGetLoading && (
        <Stack sx={{ width: "100%", height: "100%" }}>
          <Stack
            sx={{
              gap: "4px",
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
                    flex: 1,
                  }}
                >
                  <ManageBoard
                    readonly={readonly}
                    data={board}
                    boards={boards}
                    updateBoardData={updateBoardData}
                    groupId={id}
                    isExpand={isExpand}
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
