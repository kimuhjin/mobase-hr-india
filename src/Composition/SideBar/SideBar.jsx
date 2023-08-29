import { Button, Stack } from "@mui/material";
import {
  BsClipboardData,
  BsBoxArrowInLeft,
  BsBoxArrowInRight,
} from "react-icons/bs";
import { RiTeamFill } from "react-icons/ri";
import { FaUserFriends } from "react-icons/fa";
import { BOARD, TEAM, WORKER } from "../../Constant/route";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const SideBar = () => {
  const [isSideBarNarrow, setIsSideBarNarrow] = useState(false);
  const onSidebarSizeButtonClick = () => {
    setIsSideBarNarrow((prev) => !prev);
  };
  return (
    <Stack
      sx={{
        width: isSideBarNarrow ? "30px" : "250px",
        height: "100%",
        borderRadius: "12px",
        backgroundColor: "#303030",
        marginRight: "16px",
        padding: isSideBarNarrow ? "0px" : "16px 16px 32px 16px",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Stack sx={{ width: "100%" }}>
        <Stack
          sx={{
            padding: "6px 0px",
            width: "100%",
            flexDirection: "row",
            justifyContent: isSideBarNarrow ? "center" : "flex-end",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            sx={{
              width: "22px",
              minWidth: "22px",
              height: "22px",
              padding: "0px",
              backgroundColor: "transparent",
              boxShadow: "none",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              ":hover": {
                backgroundColor: "#303030",
              },
            }}
            onClick={onSidebarSizeButtonClick}
          >
            {isSideBarNarrow ? (
              <BsBoxArrowInRight color="#fff" size={"18px"} />
            ) : (
              <BsBoxArrowInLeft color="#fff" size={"18px"} />
            )}
          </Button>
        </Stack>
        {!isSideBarNarrow && (
          <>
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
          </>
        )}
      </Stack>

      {!isSideBarNarrow && (
        <Stack
          component={"img"}
          src="./images/logo.png"
          sx={{ width: "150px" }}
        />
      )}
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
