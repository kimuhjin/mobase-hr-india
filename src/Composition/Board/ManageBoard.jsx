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
  Box,
  InputAdornment,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase-config";
import { WorkerCard } from "./WorkerCard";
import { LeaderCard } from "./LeaderCard";
import { AccountCircle } from "@mui/icons-material";
export const ManageBoard = ({
  data,
  updateBoardData,
  groupId,
  readonly,
  boards,
  isExpand,
}) => {
  const [draggedUser, setDraggedUser] = useState(null);
  const [boardData, setBoardData] = useState(data.item);
  const [columns, setColumns] = useState(data.column);
  const [rows, setRows] = useState(data.row);
  const [leader, setLeader] = useState(data.leader ?? null);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [openUserDialog, setOpenUserDialog] = useState(false);
  const [openAddUserDialog, setOpenAddUserDialog] = useState(false);
  const [openAddLeaderDialog, setOpenAddLeaderDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedCell, setSelectedCell] = useState(null);
  const [specialCell, setSpecialCell] = useState({
    sick: 0,
    vacation: 0,
    feederMaterial: 0,
    feederTrash: 0,
  });
  const countUsersInspecialCell = () => {
    const sickIndices = [];
    const vacationIndices = [];
    const feederMaterialIndices = [];
    const feederTrashIndices = [];
    columns.forEach((col, index) => {
      if (col.includes("Sick")) sickIndices.push(index);
      if (col.includes("Vacation")) vacationIndices.push(index);
      if (col.includes("Feeder material")) feederMaterialIndices.push(index);
      if (col.includes("Feeder Trash")) feederTrashIndices.push(index);
    });

    const sickUsers = boardData.filter((item) =>
      sickIndices.includes(item.column)
    ).length;
    const vacationUsers = boardData.filter((item) =>
      vacationIndices.includes(item.column)
    ).length;

    const feederMaterialUsers = boardData.filter((item) =>
      feederMaterialIndices.includes(item.column)
    ).length;
    const feederTrashUsers = boardData.filter((item) =>
      feederTrashIndices.includes(item.column)
    ).length;

    setSpecialCell({
      sick: sickUsers,
      vacation: vacationUsers,
      feederMaterial: feederMaterialUsers,
      feederTrash: feederTrashUsers,
    });
  };
  useEffect(() => {
    countUsersInspecialCell();
  }, [boards]);
  const handleAddLeader = (leader) => {
    setLeader(leader);

    setOpenAddLeaderDialog((prev) => !prev);
  };
  const handleAddUser = (newUser) => {
    const newBoardData = [
      ...boardData,
      {
        row: selectedCell.row,
        column: selectedCell.column,
        user: newUser,
      },
    ];
    setBoardData(newBoardData);
    handleAddUserDialogClose();
  };
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

  const handleDragStart = (index, user) => {
    setDraggedUser(user);
    setDraggedIndex(index);
  };
  useEffect(() => {
    updateBoardData(data.label, {
      column: columns,
      row: rows,
      item: boardData,
      leader: leader ?? null,
    });
  }, [columns, rows, boardData, leader, data.label]);
  const handleDrop = (targetRow, targetColumn) => {
    if (draggedUser) {
      let newData = [...boardData];
      const targetIndex = newData.findIndex(
        (item) => item.row === targetRow && item.column === targetColumn
      );
      const draggedItem = newData[draggedIndex];

      if (targetIndex !== -1) {
        newData[draggedIndex] = newData[targetIndex];
        newData[targetIndex] = draggedItem;
      } else {
        draggedItem.row = targetRow;
        draggedItem.column = targetColumn;
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
    if (window.confirm("Do you want to delete this column?")) {
      const newColumns = [...columns];
      const newBoardData = [...boardData];
      const hasUserInColumn = newBoardData.some(
        (item) => item.column === index
      );

      if (hasUserInColumn) {
        alert("Cannot delete a column with users.");
        return;
      }

      newColumns.splice(index, 1);
      setColumns(newColumns);
    }
  };

  const handleDeleteRow = (index) => {
    if (window.confirm("Do you want to delete this row?")) {
      const newRows = [...rows];
      const newBoardData = [...boardData];
      const hasUserInRow = newBoardData.some((item) => item.row === index);

      if (hasUserInRow) {
        alert("Cannot delete a row with users.");
        return;
      }

      newRows.splice(index, 1);
      setRows(newRows);
    }
  };
  const handleAddColumnAt = (index) => {
    const newColumns = [...columns];
    newColumns.splice(index, 0, "");

    // boardData에서 column이 index보다 큰 항목들의 column 값을 1 증가시켜야 합니다.
    const updatedBoardData = boardData.map((item) => {
      if (item.column >= index) {
        return { ...item, column: item.column + 1 };
      }
      return item;
    });

    setColumns(newColumns);
    setBoardData(updatedBoardData);
  };

  const handleAddRowAt = (index) => {
    const newRows = [...rows];
    newRows.splice(index, 0, "");

    // boardData에서 row가 index보다 큰 항목들의 row 값을 1 증가시켜야 합니다.
    const updatedBoardData = boardData.map((item) => {
      if (item.row >= index) {
        return { ...item, row: item.row + 1 };
      }
      return item;
    });

    setRows(newRows);
    setBoardData(updatedBoardData);
  };
  const handelClearBoard = () => {
    if (window.confirm("Do you want to clear this board?")) {
      setBoardData([]);
      setLeader(null);
    }
  };
  return (
    <Stack sx={{ width: "100%", height: "100%" }}>
      {!readonly && (
        <Stack
          sx={{ flexDirection: "row", marginBottom: "6px", width: "100%" }}
        >
          {leader ? (
            <Stack sx={{ gap: "8px", flexDirection: "row" }}>
              <Button
                variant="contained"
                sx={{
                  width: "120px",
                  height: "32px",
                  fontSize: "10px",
                  padding: "1px 2px",
                }}
                onClick={() => setOpenAddLeaderDialog(true)}
              >
                Change Leader
              </Button>
              <Button
                variant="contained"
                color="error"
                sx={{
                  width: "120px",
                  height: "32px",
                  fontSize: "10px",
                  padding: "1px 2px",
                }}
                onClick={() => setLeader(null)}
              >
                Remove Leader
              </Button>
            </Stack>
          ) : (
            <>
              <Button
                variant="contained"
                sx={{
                  width: "120px",
                  height: "32px",
                  fontSize: "10px",
                  padding: "1px 2px",
                }}
                onClick={() => setOpenAddLeaderDialog(true)}
              >
                Add Leader
              </Button>
            </>
          )}
          <Button
            variant="contained"
            sx={{
              marginLeft: "8px",
              width: "120px",
              height: "32px",
              fontSize: "10px",
              padding: "1px 2px",
            }}
            color="warning"
            onClick={handelClearBoard}
          >
            Clear Board
          </Button>
        </Stack>
      )}
      <Stack
        sx={{
          width: "100%",
          height: "100%",
          flexDirection: readonly ? "row" : "row",
        }}
      >
        <Stack
          sx={{
            width: "110px",
            minWidth: "110px",
            gap: "2px",
            flexDirection: readonly ? "column" : "column",
            marginRight: readonly ? "4px" : "0px",
            backgroundColor: "#c7c7c7",
            borderRadius: "10px",
          }}
        >
          <Typography
            sx={{
              fontWeight: "700",
              fontSize: "16px",
              textAlign: "left",
              color: "#0a0a8f",
              padding: "0px 6px",
            }}
          >
            {data.label}
          </Typography>
          {leader ? (
            <Stack sx={{ flexDirection: "row", justifyContent: "center" }}>
              <Stack
                sx={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography sx={{ fontWeight: 700, fontSize: "13px" }}>
                  Team Leader
                </Typography>
                <LeaderCard leaderId={leader?.id} />
              </Stack>
            </Stack>
          ) : (
            <Stack sx={{ flexDirection: "row", justifyContent: "center" }}>
              <Stack
                sx={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography sx={{ fontWeight: 700, fontSize: "13px" }}>
                  Team Leader
                </Typography>
                <Stack sx={{ width: "100%" }}>
                  <Stack
                    sx={{
                      width: "80px",
                      height: "80px",
                      backgroundColor: "#fff",
                    }}
                  />
                </Stack>
                <Stack
                  sx={{
                    width: "100%",
                    height: "36px",
                  }}
                />
              </Stack>
            </Stack>
          )}
          <Stack
            sx={{
              width: "100%",
              height: "100%",
              backgroundColor: "#ededed",
              justifyContent: "center",
              alignItems: "center",
              padding: "6px",
              "& :last-of-type": {
                borderBottom: "1px solid #d7d7d7",
              },
              borderBottomLeftRadius: "10px",
              borderBottomRightRadius: "10px",
            }}
          >
            <BoardCount label={"Team Leader"} value={leader ? 1 : 0} />
            <BoardCount
              label={"Worker"}
              value={
                boardData.length -
                specialCell.sick -
                specialCell.vacation -
                specialCell.feederMaterial -
                specialCell.feederTrash
              }
            />
            <BoardCount
              label={"Feeder Material"}
              value={specialCell.feederMaterial}
            />
            <BoardCount
              label={"Feeder Trash"}
              value={specialCell.feederTrash}
            />
            <BoardCount label={"Sick"} value={specialCell.sick} />
            <BoardCount label={"Vacation"} value={specialCell.vacation} />

            <BoardCount
              label={"Total"}
              value={boardData.length + (leader ? 1 : 0)}
            />
          </Stack>
        </Stack>

        <Stack
          sx={{
            border: "1px solid #a8a8a8",
            width: "100%",
            height: "100%",
            borderRadius: "10px",
            overflow: "hidden",
            // flex: 1, // Add this line
          }}
        >
          <Stack
            sx={{
              position: "relative",
              display: "grid",
              gridTemplateColumns: `50px repeat(${columns.length}, 1fr)`,
              gridTemplateRows: `40px repeat(${rows.length}, 1fr)`,
              height: "100%",
              width: "100%", // Make sure it takes up full width
              gap: 0,
              // flex: 1, // Add this line
            }}
          >
            <Stack
              sx={{
                borderRight: "1px solid #a8a8a8",
                borderBottom: "1px solid #a8a8a8",
                padding: "2px",
                fontSize: "14px",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#c7c7c7",
                fontWeight: "700",
                // width: "40px",
              }}
            >
              No
            </Stack>
            {columns.map((colKey, idx) => (
              <Stack
                key={idx}
                sx={{
                  borderRight:
                    idx === columns.length - 1 ? "none" : "1px solid #a8a8a8",
                  borderBottom: "1px solid #a8a8a8",
                  padding: "2px",
                  // minHeight: "48px",
                  // minWidth: "48px",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#c7c7c7",
                  width: "100%",
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
                  <Typography
                    textAlign={"center"}
                    sx={{
                      fontWeight: "700",
                      fontSize: `${adjustFontSize(colKey)}px`,
                      wordBreak: "break-word",
                    }}
                  >
                    {colKey}
                  </Typography>
                )}

                {!readonly && (
                  <Stack sx={{ flexDirection: "row", gap: "4px" }}>
                    <ArrowRightIcon
                      onClick={() => handleAddColumnAt(idx + 1)}
                      sx={{ cursor: "pointer" }}
                    />
                    <DeleteIcon
                      onClick={() => handleDeleteColumn(idx)}
                      sx={{ cursor: "pointer" }}
                    />
                  </Stack>
                )}
              </Stack>
            ))}
            {rows.map((rowKey, rowIndex) => (
              <Stack
                key={rowIndex}
                sx={{ display: "contents", width: "100%", flex: 1 }}
              >
                <Stack
                  sx={{
                    width: "100%",
                    height: "100%",
                    borderRight: "1px solid #a8a8a8",
                    borderBottom:
                      rowIndex === rows.length - 1
                        ? "none"
                        : "1px solid #a8a8a8",
                    padding: "2px",

                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#e6e6e6",
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
                    <Stack sx={{ flexDirection: "row", gap: "4px" }}>
                      <ArrowDropDownIcon
                        onClick={() => handleAddRowAt(rowIndex + 1)}
                        sx={{ cursor: "pointer" }}
                      />
                      <DeleteIcon
                        onClick={() => handleDeleteRow(rowIndex)}
                        sx={{ cursor: "pointer" }}
                      />
                    </Stack>
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
                      onDrop={() => handleDrop(rowIndex, colIndex)}
                      onDragOver={(event) => event.preventDefault()}
                      sx={{
                        width: "100%",
                        height: "100%",
                        overflow: "hidden",
                        borderRight:
                          colIndex === columns.length - 1
                            ? "none"
                            : "1px solid #a8a8a8",
                        borderBottom:
                          rowIndex === rows.length - 1
                            ? "none"
                            : "1px solid #a8a8a8",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        ":hover": {
                          backgroundColor: "skyblue",
                        },

                        backgroundColor: "#e6e6e6",
                      }}
                      onClick={() =>
                        user
                          ? handleUserClick(user)
                          : handleEmptyCellClick(rowIndex, colIndex)
                      }
                    >
                      {user && (
                        <WorkerCard
                          readonly={readonly}
                          handleDragStart={handleDragStart}
                          cellIndex={cellIndex}
                          user={user}
                        />
                      )}
                    </Stack>
                  );
                })}
              </Stack>
            ))}
          </Stack>
        </Stack>
      </Stack>
      {!readonly && (
        <Dialog open={openUserDialog} onClose={handleUserDialogClose}>
          <DialogTitle>User Info</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <Stack sx={{ width: "200px", height: "200px" }}>
                <WorkerCard readonly={true} user={selectedUser} />
              </Stack>
            </DialogContentText>
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
          title="Leader"
          groupId={groupId}
          openAddUserDialog={openAddLeaderDialog}
          handleAddUserDialogClose={() => setOpenAddLeaderDialog(false)}
          handleAddUser={handleAddLeader}
          boardData={boards}
          isLeader={true}
        />
      )}
      {!readonly && (
        <AddDialogue
          title="Add User"
          openAddUserDialog={openAddUserDialog}
          groupId={groupId}
          handleAddUser={handleAddUser}
          handleAddUserDialogClose={handleAddUserDialogClose}
          boardData={boards}
        />
      )}
    </Stack>
  );
};
export const AddDialogue = ({
  title,
  groupId,
  openAddUserDialog,
  handleAddUserDialogClose,
  handleAddUser,
  boardData,
  isLeader = false,
}) => {
  const [workerList, setWorkerList] = React.useState([]);
  const [existIds, setExistIds] = React.useState([]);
  const [existLeaderIds, setExistLeaderIds] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
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
    const existLeaderIds = [];
    boardData?.forEach((shift) => {
      existLeaderIds.push(shift?.leader?.id);
    });
    setExistLeaderIds(existLeaderIds);

    const existIds = [];
    boardData?.forEach((shift) => {
      shift?.item?.forEach((item) => {
        existIds.push(item?.user?.id);
      });
    });
    setExistIds(existIds);
  }, [boardData, isLeader]);

  const filteredList = workerList
    .filter((worker) => worker.group === groupId)
    .filter((worker) => !existIds.includes(worker.id))
    .filter((worker) => !existLeaderIds.includes(worker.id))
    .sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    })
    .filter((i) => i.name.toLowerCase().includes(searchValue.toLowerCase()));
  return (
    <Dialog open={openAddUserDialog} onClose={handleAddUserDialogClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Box
          sx={{ display: "flex", alignItems: "flex-end", marginBottom: "4px" }}
        >
          <TextField
            id="input-with-sx"
            label="Search name"
            variant="filled"
            sx={{ width: "100%" }}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
          />
        </Box>
        <Stack
          sx={{
            width: "500px",
            height: "600px",
            gap: "8px",
            overflowY: "auto",
          }}
        >
          {filteredList.length === 0 ? (
            <Stack
              sx={{
                width: "100%",
                height: "100%",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: "20px",
                  width: "100%",
                  fontWeight: 700,
                  textAlign: "center",
                }}
              >
                Empty
              </Typography>
            </Stack>
          ) : (
            filteredList.map((worker) => {
              return (
                <Stack
                  key={worker?.id}
                  sx={{
                    flexDirection: "row",
                    alignItems: "center",
                    border: "1px solid #a8a8a8",
                    borderRadius: "12px",
                    padding: "8px",
                    // height: "64px",
                    boxSizing: "border-box",
                    ":hover": {
                      cursor: "pointer",
                      backgroundColor: "#0083ca",
                    },
                  }}
                  onClick={() =>
                    handleAddUser({
                      id: worker?.id,
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
            })
          )}
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

const BoardCount = ({ label, value }) => {
  return (
    <Stack
      sx={{
        width: "100%",
        height: "100%",
        borderTop: "1px solid #d7d7d7",
        borderRight: "1px solid #d7d7d7",
        borderLeft: "1px solid #d7d7d7",
        flexDirection: "row",
      }}
    >
      <Stack
        sx={{
          width: "80%",
          fontSize: "6px",
          textAlign: "center",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {label}
      </Stack>
      <Stack
        sx={{
          width: "20%",
          fontSize: "6px",
          borderLeft: "1px solid #d7d7d7",
          borderBottom: "none !important",
          textAlign: "center",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {value}
      </Stack>
    </Stack>
  );
};
const adjustFontSize = (text) => {
  const baseSize = 10;
  if (text.length > 10) {
    return baseSize - 2; // 길이가 10 이상인 경우, 2px 감소
  }
  return baseSize;
};
