import { Stack } from "@mui/material";

export const Layout = ({ children }) => {
  return (
    <Stack
      sx={{
        position: "relative",
        flexDirection: "row",
        width: "100vw",
        height: "100vh",
        padding: "4px",
        backgroundColor: "#303030",
      }}
    >
      {children}
    </Stack>
  );
};
