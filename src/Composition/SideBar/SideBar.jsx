import { Button, Stack } from "@mui/material";
import { BsClipboardData } from "react-icons/bs";
import { RiTeamFill } from "react-icons/ri";
import { AiOutlineDesktop } from "react-icons/ai";

import { FaUserFriends } from "react-icons/fa";
import { BOARD, STATISTICS, TEAM, WORKER } from "../../Constant/route";
import { useNavigate } from "react-router-dom";

export const SideBar = () => {
  return (
    <Stack
      sx={{
        width: "150px",
        height: "100%",
        borderRadius: "12px",
        backgroundColor: "#303030",
        marginRight: "8px",
        padding: "4px",

        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Stack
        sx={{
          width: "100%",
          svg: {
            minWidth: "18px",
            minHeight: "18px",
          },
        }}
      >
        <Stack
          sx={{
            padding: "6px 0px",
            width: "100%",
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        ></Stack>

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
        <NavigateButton route={STATISTICS}>
          <AiOutlineDesktop size={"18px"} />
          Statistics
        </NavigateButton>
      </Stack>

      <Stack
        component={"img"}
        src="./images/logo.png"
        sx={{ width: "100px", marginBottom: "24px" }}
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
