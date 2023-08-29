import { useEffect, useState } from "react";
import { AddDialogue, ManageBoard } from "./ManageBoard";
import { Button, CircularProgress, Stack, Typography } from "@mui/material";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import { LoadingDim } from "../Common/LoadingDim";

export const BoardsContainer = ({ id, readonly = false }) => {
  const [boards, setBoards] = useState([]);
  const [leader, setLeader] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isGetLoading, setIsGetLoading] = useState(true);
  const [openAddUserDialog, setOpenAddUserDialog] = useState(false);
  console.log(leader);
  const getBoard = async (id) => {
    if (id) {
      try {
        const docRef = doc(db, "boards", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const { boards, leader } = docSnap.data();
          console.log(boards);
          setBoards(boards);
          if (leader) {
            setLeader(leader);
          }
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
    console.log(id);
    return () => {
      setLeader(null);
    };
  }, [id]);

  console.log(boards);
  const handleSave = async () => {
    try {
      const commentRef = doc(db, "boards", id);
      setIsLoading(true);
      console.log(boards);
      const res = await setDoc(commentRef, { boards, leader }, { merge: true });
      alert("save successfully");
      console.log(res);
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
  const handleAddLeader = (newUser) => {
    setLeader(newUser);
    setOpenAddUserDialog(false);
  };
  return (
    <Stack sx={{ width: "100%" }}>
      <AddDialogue
        openAddUserDialog={openAddUserDialog}
        groupId={id}
        handleAddUser={handleAddLeader}
        handleAddUserDialogClose={() => setOpenAddUserDialog(false)}
      />
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
        <>
          {leader ? (
            <Stack sx={{ flexDirection: "row" }}>
              <Stack
                sx={{
                  width: "100px",
                  height: "100px",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography sx={{ fontWeight: 700 }}>Leader</Typography>
                <Stack
                  id={leader?.id}
                  sx={{ alignItems: "center", justifyContent: "center" }}
                >
                  <img
                    src={leader?.profileImage}
                    alt={leader?.name}
                    style={{ width: "50px", height: "50px" }}
                  />
                  <Typography>{leader?.name}</Typography>
                </Stack>
              </Stack>
              {!readonly && (
                <Button
                  variant="contained"
                  sx={{ width: "200px", height: "48px", marginLeft: "16px" }}
                  onClick={() => setOpenAddUserDialog(true)}
                >
                  Change Leader
                </Button>
              )}
            </Stack>
          ) : (
            <>
              {!readonly && (
                <Button
                  variant="contained"
                  sx={{ width: "200px" }}
                  onClick={() => setOpenAddUserDialog(true)}
                >
                  Add Leader
                </Button>
              )}
            </>
          )}

          <Stack sx={{ gap: "16px" }}>
            {boards?.map((board) => {
              return (
                <Stack key={board.label}>
                  <Typography sx={{ fontWeight: "700", fontSize: "17px" }}>
                    {board.label}
                  </Typography>
                  <ManageBoard
                    readonly={readonly}
                    data={board}
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
        </>
      )}
    </Stack>
  );
};
