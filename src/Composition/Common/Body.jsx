import { Stack } from "@mui/material";

export const Body = ({ children }) => {
  return (
    <Stack
      sx={{
        width: "100%",
        height: "100%",
        backgroundColor: "#fff",
        borderRadius: "12px",
      }}
    >
      {children}
    </Stack>
  );
};
