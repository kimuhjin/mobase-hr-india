import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { Stack } from "@mui/material";
import { BsClipboardData } from "react-icons/bs";
import { RiTeamFill } from "react-icons/ri";
import { AiOutlineDesktop } from "react-icons/ai";

import { FaUserFriends } from "react-icons/fa";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

import { AiFillRightCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { BOARD, STATISTICS, TEAM, WORKER } from "../../Constant/route";
export default function NewSideBar() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const NavigateButton = ({ children, route, text }) => {
    const navigate = useNavigate();
    const onButtonClick = () => {
      navigate(route);
    };
    return (
      <ListItem key={text} disablePadding onClick={onButtonClick}>
        <ListItemButton>
          <ListItemIcon>{children}</ListItemIcon>
          <ListItemText primary={text} />
        </ListItemButton>
      </ListItem>
    );
  };

  const list = (anchor) => (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
        height: "100%",
        backgroundColor: "#303030",
        fontWeight: "700",
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
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
              <BsClipboardData size={"24px"} color="#fff" />
            </NavigateButton>
            <NavigateButton route={STATISTICS} text={"Statistics"}>
              <AiOutlineDesktop size={"24px"} color="#fff" />
            </NavigateButton>
          </List>
          <Divider sx={{ backgroundColor: "#686868", margin: "0px 8px" }} />
          <List>
            <NavigateButton route={WORKER} text={"Worker"}>
              <FaUserFriends size={"24px"} color="#fff" />
            </NavigateButton>
            <NavigateButton route={TEAM} text={"Team"}>
              <RiTeamFill size={"24px"} color="#fff" />
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
            sx={{ width: "150px", marginBottom: "24px" }}
          />
        </Stack>
      </Stack>
    </Box>
  );

  return (
    <Stack>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Stack
            sx={{
              height: "100%",
              alignItems: "center",
              flexDirection: "row",
              paddingRight: "4px",
            }}
          >
            <Stack onClick={toggleDrawer(anchor, true)}>
              <AiFillRightCircle size="20px" color="#fff" />
            </Stack>
          </Stack>

          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            variant="temporary"
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </Stack>
  );
}
