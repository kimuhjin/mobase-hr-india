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

export const EmployeeForm = ({ employeeData }) => {
  const { register, setValue, handleSubmit, control } = useForm({
    defaultValues: employeeData || {},
  });

  useEffect(() => {
    if (employeeData) {
      for (const [key, value] of Object.entries(employeeData)) {
        setValue(key, value);
      }
    }
  }, [employeeData, setValue]);
  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:8000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log("User registered:", result);
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
          value=""
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
        <TextField label="Imię i Nazwisko" {...register("name")} fullWidth />
        <TextField
          label="Nr. Firmowy"
          {...register("companyNumber")}
          fullWidth
        />

        <FormControl fullWidth>
          <InputLabel>Firma</InputLabel>
          <Select {...register("firma")} control={control} defaultValue="">
            <MenuItem value="mobase">Mobase</MenuItem>
            <MenuItem value="outsourcing">Outsourcing</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Skill Matrix</InputLabel>
          <Select
            {...register("skillMatrix")}
            control={control}
            defaultValue=""
          >
            <MenuItem value="A">A</MenuItem>
            <MenuItem value="B">B</MenuItem>
            <MenuItem value="C">C</MenuItem>
            <MenuItem value="D">D</MenuItem>
            <MenuItem value="E">E</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Data zatrudnienia"
          type="date"
          {...register("employmentDate")}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Data zatrudnienia (Mobase)"
          type="date"
          {...register("mobaseEmploymentDate")}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
        <TextField label="Stanowisko" {...register("position")} fullWidth />
        <TextField label="Obszar" {...register("area")} fullWidth />
        <TextField
          label="Certyfikat inspektora"
          {...register("inspectorCertificate")}
          fullWidth
        />
        <TextField
          label="Certyfikat lutowania"
          {...register("solderingCertificate")}
          fullWidth
        />
        <TextField label="Zastępca TL" {...register("deputyTL")} fullWidth />
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
            Submit
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};
