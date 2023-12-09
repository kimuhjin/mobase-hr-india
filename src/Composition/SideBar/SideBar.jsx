import {
  Chip,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
import { BsClipboardData } from "react-icons/bs";
import { RiTeamFill, RiLoginBoxLine } from "react-icons/ri";
import { AiOutlineDesktop } from "react-icons/ai";

import { FaUserFriends } from "react-icons/fa";
import { BOARD, STATISTICS, TEAM, WORKER } from "../../Constant/route";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Logout, auth, groupListObj, isGuest } from "../../Util/auth";

import { Dev } from "../Common/Dev";

const groupTitle = (value) => {
  if (value === "admin") return "Admin";
  else return groupListObj[value];
};

export const SideBar = () => {
  const [devOpen, setDevOpen] = useState(false);
  if (auth.no_login) return null;
  return (
    <Stack>
      <Dev open={devOpen} onClose={() => setDevOpen(false)} />
      <Stack
        sx={{
          width: "140px",
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
            {auth.success && !isGuest && (
              <>
                <Divider
                  sx={{ backgroundColor: "#686868", margin: "0px 8px" }}
                />
                <List>
                  <NavigateButton route={WORKER} text={"Worker"}>
                    <FaUserFriends size={"18px"} color="#fff" />
                  </NavigateButton>
                  <NavigateButton route={TEAM} text={"Team"}>
                    <RiTeamFill size={"18px"} color="#fff" />
                  </NavigateButton>
                </List>
              </>
            )}
          </Stack>
          <Stack>
            {auth.success ? (
              <Stack>
                <Chip
                  label={groupTitle(auth.role)}
                  sx={{ backgroundColor: "#fff", fontWeight: "700" }}
                />
                <NavigateButton text={"Logout"} onClick={Logout}>
                  <RiLoginBoxLine size={"18px"} color="#fff" />
                </NavigateButton>
              </Stack>
            ) : (
              <></>
            )}

            <Stack
              sx={{
                width: "100%",
                padding: "8px 8px",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "20px",
              }}
            >
              <Stack
                sx={{ cursor: "pointer" }}
                onClick={() => {
                  setDevOpen(true);
                }}
              >
                <Stack
                  component={"img"}
                  src="./images/logo.png"
                  sx={{
                    width: "100px",
                    marginBottom: "12px",
                    pointerEvents: "none",
                  }}
                />
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
const NavigateButton = ({ children, route, text, onClick }) => {
  const navigate = useNavigate();
  const onButtonClick = () => {
    route && navigate(route);
    onClick && onClick();
  };
  return (
    <ListItem
      key={text}
      disablePadding
      onClick={onButtonClick}
      sx={{
        ".MuiListItemIcon-root": {
          minWidth: "0px",
          marginRight: "14px",
        },
        ".MuiButtonBase-root": {
          justifyContent: "space-between",
        },
      }}
    >
      <ListItemButton>
        <ListItemIcon>{children}</ListItemIcon>
        <ListItemText
          primary={text}
          sx={{
            ".MuiTypography-root": {
              fontSize: "14px",
            },
          }}
        />
      </ListItemButton>
    </ListItem>
  );
};
