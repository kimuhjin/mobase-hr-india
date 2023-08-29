import { Backdrop, CircularProgress } from "@mui/material";

export const LoadingDim = ({ isLoading }) => {
  return (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
      open={isLoading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};
