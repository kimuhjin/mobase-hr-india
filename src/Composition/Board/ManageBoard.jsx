import React, { useEffect, useState } from "react";
import {
  Stack,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase-config";
import { WorkerCard } from "./WorkerCard";
export const ManageBoard = ({
  data,
  updateBoardData,
  groupId,
  readonly,
  boards,
}) => {
  const [draggedUser, setDraggedUser] = useState(null);
  const [boardData, setBoardData] = useState(data.item);
  const [columns, setColumns] = useState(data.column);
  const [rows, setRows] = useState(data.row);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [openUserDialog, setOpenUserDialog] = useState(false);
  const [openAddUserDialog, setOpenAddUserDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedCell, setSelectedCell] = useState(null);

  const handleUserClick = (user) => {
    if (!readonly) {
      setSelectedUser(user);
      setOpenUserDialog(true);
    }
  };

  const handleEmptyCellClick = (rowKey, colKey) => {
    if (!readonly) {
      setSelectedCell({ row: rowKey, column: colKey });
      setOpenAddUserDialog(true);
    }
  };

  const handleUserDialogClose = () => {
    setOpenUserDialog(false);
    setSelectedUser(null);
  };

  const handleAddUserDialogClose = () => {
    setOpenAddUserDialog(false);
    setSelectedCell(null);
  };

  const handleDeleteUser = () => {
    const newBoardData = boardData.filter(
      (item) =>
        item?.user !== selectedUser &&
        item?.row !== selectedCell?.row &&
        item?.column !== selectedCell?.column
    );
    setBoardData(newBoardData);
    handleUserDialogClose();
  };

  const handleAddUser = (newUser) => {
    const newBoardData = [
      ...boardData,
      {
        row: rows.indexOf(selectedCell.row),
        column: columns.indexOf(selectedCell.column),
        user: newUser,
      },
    ];
    setBoardData(newBoardData);
    handleAddUserDialogClose();
  };
  const handleDragStart = (index, user) => {
    setDraggedUser(user);
    setDraggedIndex(index);
  };
  useEffect(() => {
    updateBoardData(data.label, {
      column: columns,
      row: rows,
      item: boardData,
    });
  }, [columns, rows, boardData, data.label]);
  const handleDrop = (targetRow, targetColumn) => {
    if (draggedUser) {
      let newData = [...boardData];
      const targetIndex = newData.findIndex(
        (item) =>
          item.row === rows.indexOf(targetRow) &&
          item.column === columns.indexOf(targetColumn)
      );
      const draggedItem = newData[draggedIndex];

      if (targetIndex !== -1) {
        newData[draggedIndex] = newData[targetIndex];
        newData[targetIndex] = draggedItem;
      } else {
        draggedItem.row = rows.indexOf(targetRow);
        draggedItem.column = columns.indexOf(targetColumn);
        newData.push(draggedItem);
        newData.splice(draggedIndex, 1);
      }

      setBoardData(newData);
      setDraggedUser(null);
      setDraggedIndex(null);
    }
  };

  const handleColumnLabelChange = (idx, event) => {
    const newColumns = [...columns];
    newColumns[idx] = event.target.value;
    setColumns(newColumns);
  };

  const handleRowLabelChange = (idx, event) => {
    const newRows = [...rows];
    newRows[idx] = event.target.value;
    setRows(newRows);
  };

  const handleAddColumn = () => {
    const newColumns = [...columns, ""];
    setColumns(newColumns);
  };

  const handleAddRow = () => {
    const newRows = [...rows, ""];
    setRows(newRows);
  };
  const handleDeleteColumn = (index) => {
    const newColumns = [...columns];
    const newBoardData = [...boardData];
    const hasUserInColumn = newBoardData.some((item) => item.column === index);

    if (hasUserInColumn) {
      alert("Cannot delete a column with users.");
      return;
    }

    newColumns.splice(index, 1);
    setColumns(newColumns);
  };

  const handleDeleteRow = (index) => {
    const newRows = [...rows];
    const newBoardData = [...boardData];
    const hasUserInRow = newBoardData.some((item) => item.row === index);

    if (hasUserInRow) {
      alert("Cannot delete a row with users.");
      return;
    }

    newRows.splice(index, 1);
    setRows(newRows);
  };

  return (
    <>
      <Stack sx={{ width: "100%", height: "100%" }}>
        {!readonly && (
          <Stack sx={{ marginBottom: "8px", flexDirection: "row" }}>
            <Button
              onClick={handleAddColumn}
              sx={{ marginRight: "8px" }}
              variant="contained"
            >
              Add Column
            </Button>
            <Button onClick={handleAddRow} variant="contained">
              Add Row
            </Button>
          </Stack>
        )}
        <Stack sx={{ border: "1px solid black" }}>
          <Stack
            sx={{
              position: "relative",
              display: "grid",
              gridTemplateColumns: `1fr repeat(${columns.length}, 1fr)`,
              gap: 0,
            }}
          >
            <Stack
              sx={{
                borderRight: "1px solid black",
                borderBottom: "1px solid black",
                padding: "2px",
                fontSize: "14px",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              line
            </Stack>
            {columns.map((colKey, idx) => (
              <Stack
                key={idx}
                sx={{
                  borderRight:
                    idx === columns.length - 1 ? "none" : "1px solid black",
                  borderBottom: "1px solid black",
                  padding: "2px",
                  minHeight: "48px",
                  minWidth: "48px",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {!readonly ? (
                  <TextField
                    sx={{
                      ".MuiInputBase-input": {
                        fontSize: "14px",
                        padding: "2px",
                      },
                    }}
                    value={colKey}
                    onChange={(event) => handleColumnLabelChange(idx, event)}
                  />
                ) : (
                  <Typography textAlign={"center"}>{colKey}</Typography>
                )}

                {!readonly && (
                  <DeleteIcon
                    onClick={() => handleDeleteColumn(idx)}
                    sx={{ cursor: "pointer" }}
                  />
                )}
              </Stack>
            ))}
            {rows.map((rowKey, rowIndex) => (
              <React.Fragment key={rowIndex}>
                <Stack
                  sx={{
                    borderRight: "1px solid black",
                    borderBottom:
                      rowIndex === rows.length - 1 ? "none" : "1px solid black",
                    padding: "2px",
                    minHeight: "48px",
                    minWidth: "48px",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {!readonly ? (
                    <TextField
                      sx={{
                        ".MuiInputBase-input": {
                          fontSize: "14px",
                          padding: "2px",
                        },
                      }}
                      value={rowKey}
                      onChange={(event) =>
                        handleRowLabelChange(rowIndex, event)
                      }
                    />
                  ) : (
                    <Typography textAlign={"center"}>{rowKey}</Typography>
                  )}

                  {!readonly && (
                    <DeleteIcon
                      onClick={() => handleDeleteRow(rowIndex)}
                      sx={{ cursor: "pointer" }}
                    />
                  )}
                </Stack>
                {columns.map((colKey, colIndex) => {
                  const cellIndex = boardData.findIndex(
                    (item) => item.row === rowIndex && item.column === colIndex
                  );
                  const user =
                    cellIndex !== -1 ? boardData[cellIndex].user : null;
                  return (
                    <Stack
                      key={colIndex}
                      onDrop={() => handleDrop(rowKey, colKey)}
                      onDragOver={(event) => event.preventDefault()}
                      sx={{
                        borderRight:
                          colIndex === columns.length - 1
                            ? "none"
                            : "1px solid black",
                        borderBottom:
                          rowIndex === rows.length - 1
                            ? "none"
                            : "1px solid black",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      onClick={() =>
                        user
                          ? handleUserClick(user)
                          : handleEmptyCellClick(rowKey, colKey)
                      }
                    >
                      {user ? (
                        <WorkerCard
                          readonly={readonly}
                          handleDragStart={handleDragStart}
                          cellIndex={cellIndex}
                          user={user}
                        />
                      ) : (
                        <Stack sx={{ height: "100%" }} />
                      )}
                    </Stack>
                  );
                })}
              </React.Fragment>
            ))}
          </Stack>
        </Stack>
      </Stack>
      {!readonly && (
        <Dialog open={openUserDialog} onClose={handleUserDialogClose}>
          <DialogTitle>User Info</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Name: {selectedUser && selectedUser.name}
            </DialogContentText>
            {/* Add other user info here */}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleUserDialogClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDeleteUser} color="primary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      )}
      {!readonly && (
        <AddDialogue
          groupId={groupId}
          openAddUserDialog={openAddUserDialog}
          handleAddUserDialogClose={handleAddUserDialogClose}
          handleAddUser={handleAddUser}
          boardData={boards}
        />
      )}
    </>
  );
};
export const AddDialogue = ({
  groupId,
  openAddUserDialog,
  handleAddUserDialogClose,
  handleAddUser,
  boardData,
}) => {
  const [workerList, setWorkerList] = React.useState([]);
  const [existIds, setExistIds] = React.useState([]);
  const getWorkerList = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "worker"));
      const workers = querySnapshot.docs.map((doc) => doc.data());
      setWorkerList(workers);
    } catch (err) {
      alert("error! get worker list");
      console.error(err);
    } finally {
    }
  };
  React.useEffect(() => {
    getWorkerList();
  }, []);
  React.useEffect(() => {
    const existIds = [];
    boardData?.forEach((shift) => {
      shift?.item?.forEach((item) => {
        console.log(item.user.id);
        console.log(item);
        existIds.push(item.user.id);
      });
    });
    setExistIds(existIds);
  }, [boardData]);

  return (
    <Dialog open={openAddUserDialog} onClose={handleAddUserDialogClose}>
      <DialogTitle>Add User</DialogTitle>
      <DialogContent>
        <Stack
          sx={{
            width: "500px",
            height: "600px",
            gap: "8px",
            overflowY: "scroll",
          }}
        >
          {workerList

            .filter((worker) => worker.group === groupId)
            .filter((worker) => !existIds.includes(worker.id))
            .map((worker) => {
              return (
                <Stack
                  key={worker.id}
                  sx={{
                    flexDirection: "row",
                    alignItems: "center",
                    border: "1px solid black",
                    borderRadius: "12px",
                    padding: "8px",
                    height: "64px",
                    boxSizing: "border-box",
                    ":hover": {
                      cursor: "pointer",
                      backgroundColor: "#0083ca",
                    },
                  }}
                  onClick={() =>
                    handleAddUser({
                      id: worker.id,
                    })
                  }
                >
                  <img
                    src={worker.profileImage}
                    alt=""
                    style={{ width: "48px", height: "48px" }}
                  />
                  <Typography sx={{ marginLeft: "24px" }}>
                    {worker.name}
                  </Typography>
                </Stack>
              );
            })}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAddUserDialogClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};
