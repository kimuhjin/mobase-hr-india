import { Button, Stack } from "@mui/material";
import { BsClipboardData } from "react-icons/bs";
import { RiTeamFill } from "react-icons/ri";
import { FaUserFriends } from "react-icons/fa";
import { BOARD, TEAM, WORKER } from "../../Constant/route";
import { useNavigate } from "react-router-dom";

export const SideBar = () => {
  return (
    <Stack
      sx={{
        width: "250px",
        height: "100%",
        borderRadius: "12px",
        backgroundColor: "#303030",
        marginRight: "16px",
        padding: "32px 16px",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Stack sx={{ width: "100%" }}>
        <NavigateButton route={BOARD}>
          <BsClipboardData size={"18px"} />
          Board
        </NavigateButton>
        <NavigateButton route={WORKER}>
          <FaUserFriends size={"18px"} />
          Worker
        </NavigateButton>
        <NavigateButton route={TEAM}>
          <RiTeamFill size={"18px"} />
          Team
        </NavigateButton>
      </Stack>
      <Stack
        component={"img"}
        src="./images/logo.png"
        sx={{ width: "150px" }}
      />
    </Stack>
  );
};
const NavigateButton = ({ children, route }) => {
  const navigate = useNavigate();
  const onButtonClick = () => {
    navigate(route);
  };
  return (
    <Button
      variant="contained"
      sx={{
        width: "100%",
        backgroundColor: "transparent",
        boxShadow: "none",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        ":hover": {
          backgroundColor: "#303030",
        },
        gap: "16px",
        marginBottom: "16px",
      }}
      onClick={onButtonClick}
    >
      {children}
    </Button>
  );
};
