import { Backdrop, CircularProgress } from "@mui/material";

export const LoadingDim = ({ isLoading, fullSize }) => {
  if (fullSize) {
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
  } else {
    return (
      <Backdrop
        sx={{
          width: "calc(100% - 152px)",
          height: "calc(100% - 8px)",
          borderRadius: "12px",
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          right: 0,
          left: "auto",
          top: "4px",
        }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }
};
