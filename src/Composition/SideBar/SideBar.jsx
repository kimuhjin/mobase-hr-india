import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
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
          height: "100%",
          color: "#fff",
          justifyContent: "space-between",
        }}
      >
        <Stack>
          <List>
            <NavigateButton route={BOARD} text={"Board"}>
              <BsClipboardData size={"18px"} color="#fff" />
            </NavigateButton>
            <NavigateButton route={STATISTICS} text={"Statistics"}>
              <AiOutlineDesktop size={"18px"} color="#fff" />
            </NavigateButton>
          </List>
          <Divider sx={{ backgroundColor: "#686868", margin: "0px 8px" }} />
          <List>
            <NavigateButton route={WORKER} text={"Worker"}>
              <FaUserFriends size={"18px"} color="#fff" />
            </NavigateButton>
            <NavigateButton route={TEAM} text={"Team"}>
              <RiTeamFill size={"18px"} color="#fff" />
            </NavigateButton>
          </List>
        </Stack>
        <Stack
          sx={{
            width: "100%",
            padding: "8px 8px",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Stack
            component={"img"}
            src="./images/logo.png"
            sx={{ width: "100px", marginBottom: "24px" }}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};
const NavigateButton = ({ children, route, text }) => {
  const navigate = useNavigate();
  const onButtonClick = () => {
    navigate(route);
  };
  return (
    <ListItem
      key={text}
      disablePadding
      onClick={onButtonClick}
      sx={{
        ".MuiListItemIcon-root": {
          minWidth: "0px",
          marginRight: "10px",
        },
        ".MuiButtonBase-root": {
          justifyContent: "space-between",
        },
      }}
    >
      <ListItemButton>
        <ListItemIcon>{children}</ListItemIcon>
        <ListItemText primary={text} />
      </ListItemButton>
    </ListItem>
  );
};
