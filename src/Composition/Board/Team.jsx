import { Stack, Typography } from "@mui/material";
import React from "react";
import { ManageBoard } from "./ManageBoard";

export const Team = () => {
  const teamInfomation = {
    name: "Keyset & Multi 1",
  };
  const employmentStatus_ = {
    Sick: 1,
    Vacation: 1,
    Attendance: 1,
  };
  const { name } = teamInfomation;

  return (
    <Stack
      sx={{
        width: "100%",
        height: "100%",
        padding: "8px",
        boxShadow:
          "0px 8px 24px -4px rgba(145, 153, 163, 0.24), 0px 0px 1px 0px rgba(145, 153, 163, 0.64)",
        backgroundColor: "#fff",
        border: "0.5px solid",
        borderColor: "#CDD1D5",
        borderRadius: "12px",
      }}
    >
      <TeamName name={name} />
      <Stack
        sx={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: "8px",
        }}
      >
        <TeamLeader />
        <TeamStatus employmentStatus={employmentStatus_} />
      </Stack>

      <ManageBoard id={"smt"} />
    </Stack>
  );
};

const TeamStatus = ({ employmentStatus }) => {
  const employmentStatusToArry = (obj) => {
    let sum = Object.values(obj).reduce((a, b) => a + b, 0);
    let transformedArray = Object.entries(obj).map(([label, amount]) => ({
      label,
      amount,
    }));
    transformedArray.unshift({ label: "Sum", amount: sum });
    return transformedArray;
  };
  return (
    <Stack sx={{ gap: "4px", marginTop: "16px" }}>
      {employmentStatusToArry(employmentStatus).map((status) => {
        const { label, amount } = status;
        return (
          <Stack
            key={label}
            sx={{
              width: "150px",
              height: "24px",
              padding: "4px 8px",
              borderRadius: "4px",
              backgroundColor: "#E9ECF0",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{ fontWeight: 700, fontSize: "14px", lineHeight: "16px" }}
            >
              {label}
            </Typography>
            <Typography sx={{ fontSize: "14px", lineHeight: "16px" }}>
              {amount}
            </Typography>
          </Stack>
        );
      })}
    </Stack>
  );
};
const TeamLeader = () => {
  return (
    <Stack
      sx={{
        alignItems: "center",
        width: "150px",
        height: "150px",
        borderRadius: "8px",
        padding: "0px 16px",
      }}
    >
      <Typography
        sx={{
          textAlign: "center",
          fontWeight: "700",
          marginBottom: "4px",
          fontSize: "14px",
        }}
      >
        Supervisor
      </Typography>
      <Stack
        component="img"
        src="https://plus.unsplash.com/premium_photo-1679236716620-03dacbde895e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80"
        sx={{
          width: "100px",
          height: "100px",
          borderRadius: "50%",
        }}
      />
    </Stack>
  );
};
const TeamName = ({ name }) => {
  return (
    <Stack
      sx={{
        width: "fit-content",
        padding: "8px 20px",
        borderRadius: "8px",
        backgroundColor: "#E9ECF0",
      }}
    >
      <Typography sx={{ fontWeight: 700 }}>{name}</Typography>
    </Stack>
  );
};
