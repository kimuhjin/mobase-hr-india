import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Stack,
} from "@mui/material";
import { db } from "../../firebase-config";
import { doc, setDoc } from "firebase/firestore";
import uuid from "react-uuid";

export const EmployeeForm = ({ isNew, workerInfo }) => {
  const { setValue, handleSubmit, control } = useForm();

  useEffect(() => {
    if (workerInfo) {
      for (const [key, value] of Object.entries(workerInfo)) {
        setValue(key, value);
      }
    }
  }, [workerInfo, setValue]);
  const onSubmit = async (data) => {
    const { name } = data;
    const id = uuid();
    console.log(name);
    try {
      const commentRef = doc(db, "worker", id);
      const res = await setDoc(commentRef, { ...data, id }, { merge: true });

      console.log(res);
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result;
      setValue("profileImage", base64String);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };
  return (
    <Stack
      onSubmit={handleSubmit(onSubmit)}
      component={"form"}
      sx={{
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        border: "1px solid black",
      }}
    >
      <Stack
        sx={{ width: "300px", borderRight: "1px solid black", padding: "20px" }}
      >
        <Controller
          name="profileImage"
          control={control}
          render={({ field: { value } }) =>
            value && (
              <img
                src={value}
                alt="Profile Preview"
                style={{ width: "100%", marginBottom: "20px" }}
              />
            )
          }
        />

        <FormControl
          sx={{
            width: "100%",
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          <input
            accept="image/jpeg, image/png"
            style={{ display: "none" }}
            id="profile-image-upload"
            type="file"
            onChange={handleImageChange}
          />
          <Stack
            htmlFor="profile-image-upload"
            component={"label"}
            sx={{ width: "fit-content" }}
          >
            <Button variant="contained" component="span">
              Upload Image
            </Button>
          </Stack>
        </FormControl>
      </Stack>
      <Stack sx={{ width: "100%", gap: "12px", padding: "20px" }}>
        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField label="Imię i Nazwisko" fullWidth {...field} />
          )}
        />

        <Controller
          name="companyNumber"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField label="Nr. Firmowy" fullWidth {...field} />
          )}
        />

        <FormControl fullWidth>
          <InputLabel>Firma</InputLabel>
          <Controller
            name="firma"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Select fullWidth {...field}>
                <MenuItem value="mobase">Mobase</MenuItem>
                <MenuItem value="outsourcing">Outsourcing</MenuItem>
              </Select>
            )}
          />
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Skill Matrix</InputLabel>
          <Controller
            name="skillMatrix"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Select fullWidth {...field}>
                <MenuItem value="A">A</MenuItem>
                <MenuItem value="B">B</MenuItem>
                <MenuItem value="C">C</MenuItem>
                <MenuItem value="D">D</MenuItem>
                <MenuItem value="E">E</MenuItem>
              </Select>
            )}
          />
        </FormControl>

        <Controller
          name="employmentDate"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              label="Data zatrudnienia"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              {...field}
            />
          )}
        />

        <Controller
          name="mobaseEmploymentDate"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              label="Data zatrudnienia (Mobase)"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              {...field}
            />
          )}
        />

        <Controller
          name="position"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField label="Stanowisko" fullWidth {...field} />
          )}
        />

        <Controller
          name="area"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField label="Obszar" fullWidth {...field} />
          )}
        />

        <Controller
          name="inspectorCertificate"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField label="Certyfikat inspektora" fullWidth {...field} />
          )}
        />

        <Controller
          name="solderingCertificate"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField label="Certyfikat lutowania" fullWidth {...field} />
          )}
        />

        <Controller
          name="deputyTL"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField label="Zastępca TL" fullWidth {...field} />
          )}
        />

        <Stack
          sx={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <Button
            sx={{ width: "120px", height: "42px" }}
            type="submit"
            variant="contained"
            color="primary"
          >
            {isNew ? "Sumbit" : "Edit"}
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};
