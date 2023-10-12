import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";

import CryptoJS from "crypto-js";
import { Controller, useForm } from "react-hook-form";
import { loginUserList } from "../../Constant/loginUserList";
import Cookies from "js-cookie";

const secretKey = "mobase_secret";
export const Login = ({ open, onClose }) => {
  const { handleSubmit, control } = useForm();
  const onSubmit = (data) => {
    const { id, password } = data;
    const isUserExist = loginUserList.find((i) => i.id === id);
    if (!isUserExist) {
      alert("Invalid User");
      return;
    }
    const isPasswordCorrect = isUserExist.password === password;
    if (!isPasswordCorrect) {
      alert("Invalid User");
      return;
    }
    const form = { ...data, role: isUserExist.role };
    const encrypted = CryptoJS.AES.encrypt(
      JSON.stringify(form),
      secretKey
    ).toString();

    Cookies.set("mobase_auth_token", encrypted, {
      expires: 31,
    });

    alert("Login Successfully");
    window.location.reload();
  };
  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        ".MuiPaper-root": {
          width: "500px",
        },
      }}
    >
      <DialogTitle>Login</DialogTitle>
      <DialogContent sx={{ margin: "0px" }}>
        <Stack
          component={"form"}
          sx={{ margin: "0px", alignItems: "center" }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Stack
            component={"img"}
            src="./images/logo_blue.png"
            sx={{ width: "200px", marginBottom: "48px" }}
          />
          <Controller
            name="id"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                label="ID"
                sx={{ marginBottom: "8px" }}
                fullWidth
                {...field}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                label="Password"
                sx={{ marginBottom: "24px" }}
                type="password"
                fullWidth
                {...field}
              />
            )}
          />

          <Button
            variant="contained"
            sx={{ height: "56px" }}
            fullWidth
            type="submit"
          >
            Login
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};
