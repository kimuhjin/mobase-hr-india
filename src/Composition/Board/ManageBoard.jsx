import React, { useState } from "react";
import { Stack, TextField, Button, CircularProgress } from "@mui/material";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase-config";

export const ManageBoard = ({ data }) => {
  const [draggedUser, setDraggedUser] = useState(null);
  const [boardData, setBoardData] = useState(data.item);
  const [columns, setColumns] = useState(data.column);
  const [rows, setRows] = useState(data.row);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleDragStart = (index, user) => {
    setDraggedUser(user);
    setDraggedIndex(index);
  };

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

  const handleSubmit = async () => {
    const data = { column: columns, row: rows, item: boardData };
    try {
      const commentRef = doc(db, "board", "1ks_4mt");
      setIsLoading(true);
      const res = await setDoc(commentRef, data, { merge: true });
      alert("save successfully");
      console.log(res);
    } catch (error) {
      console.error("Error registering user:", error);
    } finally {
      setIsLoading(false);
    }
    console.log(data);
  };

  return (
    <Stack sx={{ width: "100%", height: "100%" }}>
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
              padding: 1,
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
                padding: 1,
              }}
            >
              <TextField
                value={colKey}
                onChange={(event) => handleColumnLabelChange(idx, event)}
              />
            </Stack>
          ))}
          {rows.map((rowKey, rowIndex) => (
            <React.Fragment key={rowIndex}>
              <Stack
                sx={{
                  borderRight: "1px solid black",
                  borderBottom: "1px solid black",
                  padding: 1,
                }}
              >
                <TextField
                  value={rowKey}
                  onChange={(event) => handleRowLabelChange(rowIndex, event)}
                />
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
                      padding: 1,
                    }}
                  >
                    {user ? (
                      <Stack
                        sx={{
                          height: "100%",
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                          backgroundColor: "transparent",
                        }}
                        draggable
                        onDragStart={() => handleDragStart(cellIndex, user)}
                      >
                        <img
                          src={user.profileImage}
                          alt={user.name}
                          style={{
                            pointerEvents: "none",
                            width: "30px",
                            height: "30px",
                          }}
                        />
                      </Stack>
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
      <Button
        onClick={handleSubmit}
        sx={{ marginTop: "8px" }}
        variant="contained"
      >
        {isLoading ? "Submitting..." : "Submit"}
      </Button>
    </Stack>
  );
};
