import React, { useState } from "react";
import { Stack } from "@mui/material";
import { ProfileModal } from "./ProfileModal";

export const ManageBoard = ({ data }) => {
  const [draggedUser, setDraggedUser] = useState(null);
  const [boardData, setBoardData] = useState(data);
  const [draggedCell, setDraggedCell] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const rows = Object.keys(boardData);
  const columns = Object.keys(boardData[rows[0]]);

  const handleDragStart = (rowKey, colKey, user) => {
    setDraggedUser(user);
    setDraggedCell({ row: rowKey, col: colKey });
  };

  const handleDrop = (rowKey, colKey) => {
    if (draggedUser) {
      let newData = { ...boardData };
      [newData[rowKey][colKey], newData[draggedCell.row][draggedCell.col]] = [
        newData[draggedCell.row][draggedCell.col],
        newData[rowKey][colKey],
      ];
      setBoardData(newData);
      setDraggedUser(null);
      setDraggedCell(null);
    }
  };

  return (
    <Stack sx={{ width: "100%", height: "100%" }}>
      <ProfileModal
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
      />
      <Stack sx={{ border: "1px solid black" }}>
        <Stack
          sx={{
            position: "relative",
            display: "grid",
            gridTemplateColumns: "1fr repeat(5, 1fr)",
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
              key={colKey}
              sx={{
                borderRight:
                  idx === columns.length - 1 ? "none" : "1px solid black",
                borderBottom: "1px solid black",
                padding: 1,
              }}
            >
              {colKey}
            </Stack>
          ))}
          {rows.map((rowKey, rowIndex) => (
            <React.Fragment key={rowKey}>
              <Stack
                sx={{
                  borderRight: "1px solid black",
                  borderBottom:
                    rowIndex === rows.length - 1 ? "none" : "1px solid black",
                  padding: 1,
                }}
              >
                {rowKey}
              </Stack>
              {columns.map((colKey, colIndex) => (
                <Stack
                  key={colKey}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => handleDrop(rowKey, colKey)}
                  onClick={() => setSelectedUser(boardData[rowKey][colKey])}
                  sx={{
                    width: "100%",
                    minHeight: "40px",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "transparent",
                    borderRight:
                      colIndex === columns.length - 1
                        ? "none"
                        : "1px solid black",
                    borderBottom:
                      rowIndex === rows.length - 1 ? "none" : "1px solid black",
                    padding: "2px",
                    position: "relative",
                  }}
                >
                  <Stack
                    sx={{
                      height: "100%",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "transparent",
                    }}
                    draggable
                    onDragStart={(e) => {
                      handleDragStart(
                        rowKey,
                        colKey,
                        boardData[rowKey][colKey]
                      );
                    }}
                  >
                    {boardData[rowKey][colKey] && (
                      <img
                        src={boardData[rowKey][colKey].profileImage}
                        alt={boardData[rowKey][colKey].name}
                        style={{
                          pointerEvents: "none",
                          width: "30px",
                          height: "30px",
                        }}
                      />
                    )}
                  </Stack>
                </Stack>
              ))}
            </React.Fragment>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};
