import { Chip, Stack, Typography } from "@mui/material";

export const Header = () => {
  const floor_ = 0;
  const employmentStatus_ = {
    Sick: 2,
    Vacation: 3,
    Attendance: 4,
  };

  return (
    <Stack
      sx={{
        width: "100%",
        padding: "8px",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <FloorDisplay floor={floor_} />
      <EmploymentStatusPanel employmentStatus={employmentStatus_} />
      <DateDisplay />
    </Stack>
  );
};

const FloorDisplay = ({ floor }) => {
  const FLOOR_INDEX = {
    0: "0th",
    1: "1st",
    2: "2nd",
    3: "3th",
    4: "4th",
  };

  return (
    <Stack
      sx={{
        padding: "10px 20px",
        borderRadius: "18px",
        backgroundColor: "#FFC912",
      }}
    >
      <Typography>{`${FLOOR_INDEX[floor]} Floor`}</Typography>
    </Stack>
  );
};

const EmploymentStatusPanel = ({ employmentStatus }) => {
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
    <Stack
      sx={{
        width: "fit-content",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#E9ECF0",
        padding: "10px 20px",
        borderRadius: "18px",
        gap: "12px",
      }}
    >
      {employmentStatusToArry(employmentStatus).map((status, index) => {
        const { label, amount } = status;

        return (
          <Stack key={index}>
            <Stack sx={{ flexDirection: "row" }}>
              <Typography>
                {label}: {amount}
              </Typography>
            </Stack>
          </Stack>
        );
      })}
    </Stack>
  );
};

const DateDisplay = () => {
  const date = new Date();
  const today = `${date.getFullYear()}.${
    date.getMonth() + 1
  }.${date.getDate()}`;
  return (
    <Stack
      sx={{
        backgroundColor: "#E9ECF0",
        padding: "10px 20px",
        borderRadius: "18px",
      }}
    >
      <Typography>{today}</Typography>
    </Stack>
  );
};
