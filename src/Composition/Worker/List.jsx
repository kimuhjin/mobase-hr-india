import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Stack } from "@mui/material";
import { WORKER_DATA } from "../../Data/worker";
import { useNavigate } from "react-router-dom";
import { DETAIL } from "../../Constant/route";

export const List = () => {
  const navigate = useNavigate();
  const onUserItemClick = (id) => {
    navigate(`${DETAIL}/${id}`);
  };
  return (
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
        {WORKER_DATA.map((i, index) => {
          const { name, id } = i;
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
              onClick={() => onUserItemClick(id)}
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
                  width: "100px",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "cemter",
                }}
              >
                {name}
              </Stack>
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );
};
