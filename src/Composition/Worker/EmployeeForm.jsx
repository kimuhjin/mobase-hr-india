import React, { useEffect, useState } from "react";
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
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import uuid from "react-uuid";
import { LoadingDim } from "../Common/LoadingDim";
import { useNavigate } from "react-router-dom";
import { WORKER } from "../../Constant/route";

export const EmployeeForm = ({ isNew, workerInfo }) => {
  const { setValue, watch, handleSubmit, control } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (workerInfo) {
      for (const [key, value] of Object.entries(workerInfo)) {
        setValue(key, value);
      }
    }
  }, [workerInfo, setValue]);
  const onSubmit = async (data) => {
    const { name } = data;
    const id = workerInfo.id || uuid();
    console.log(name);
    try {
      setIsLoading(true);
      const commentRef = doc(db, "worker", id);
      const res = await setDoc(commentRef, { ...data, id }, { merge: true });
      alert("save successfully");
      navigate(WORKER);
      console.log(res);
    } catch (error) {
      alert("error! employee form");
      console.error("Error registering user:", error);
    } finally {
      setIsLoading(false);
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
  const deleteUser = async () => {
    try {
      setIsLoading(true);
      const commentRef = doc(db, "worker", workerInfo.id);
      const res = await deleteDoc(commentRef);
      console.log(res);
      alert("delete successfully");
      navigate(WORKER);
    } catch (err) {
      alert("error! delete user");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <LoadingDim isLoading={isLoading} />{" "}
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
          sx={{
            width: "300px",
            borderRight: "1px solid black",
            padding: "8px",
          }}
        >
          {watch("profileImage") && (
            //  IMAGE SECTION
            <Stack
              sx={{
                width: "100%",
                height: "100%",
                justifyContent: "center",
                marginBottom: "20px",
              }}
            >
              <Stack
                sx={{
                  flexDirection: "row",
                  img: {
                    width: "180px",
                    height: "180px",
                  },
                }}
              >
                {/* LEFT */}
                <Stack
                  sx={{
                    width: "20px",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor:
                      watch("company") === "mobase" ? "blue" : "skyblue",
                    maxHeight: "180px",
                    writingMode: "vertical-lr",
                    textOrientation: "upright",
                    letterSpacing: "-5px",
                  }}
                >
                  {watch("company")}
                </Stack>

                <Stack sx={{ width: "100%" }}>
                  <Controller
                    name="profileImage"
                    control={control}
                    render={({ field: { value } }) =>
                      value && (
                        <img
                          src={value}
                          alt="Profile Preview"
                          style={{ width: "100%" }}
                        />
                      )
                    }
                  />
                </Stack>
                {/* RIGHT */}

                <Stack
                  sx={{
                    width: "20px",
                    height: "100%",
                    maxHeight: "180px",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "yellow",
                    writingMode: "vertical-lr",
                    textOrientation: "upright",
                  }}
                >
                  {watch("skillMatrix")}
                </Stack>
              </Stack>
              {/* BOTTOM */}

              <Stack
                sx={{
                  width: "100%",
                  height: "20px",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "green",
                }}
              >
                {watch("name")}
              </Stack>
            </Stack>
          )}

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
              sx={{ width: "fit-content", marginTop: "12px" }}
            >
              <Button variant="contained" component="span">
                Upload Image
              </Button>
            </Stack>
          </FormControl>
        </Stack>
        <Stack sx={{ width: "100%", gap: "12px", padding: "20px" }}>
          <FormControl fullWidth>
            <InputLabel>Group</InputLabel>
            <Controller
              name="group"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select fullWidth {...field}>
                  <MenuItem value="1ks_4mf">{`0th floor (1KS & 4MF)`}</MenuItem>
                  <MenuItem value="ofd">{`0th floor  (OFD)`}</MenuItem>
                  <MenuItem value="5sr">{`clean room (5SR)`}</MenuItem>
                  <MenuItem value="3cl">{`clean room (3CL)`}</MenuItem>
                  <MenuItem value="ren">{`1st floor (Ren)`}</MenuItem>
                  <MenuItem value="smt">{`smt  (SMT)`}</MenuItem>
                </Select>
              )}
            />
          </FormControl>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField label="Name" fullWidth {...field} />
            )}
          />

          <Controller
            name="employeeNumber"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField label="Employee Number" fullWidth {...field} />
            )}
          />

          <FormControl fullWidth>
            <InputLabel>Company</InputLabel>
            <Controller
              name="company"
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
                label="Date of employment"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                {...field}
              />
            )}
          />

          <Controller
            name="employmentDate_Mobase"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                label="Date of employment (Mobase)"
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
              <TextField label="Position" fullWidth {...field} />
            )}
          />

          <Controller
            name="area"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField label="Area" fullWidth {...field} />
            )}
          />

          <Controller
            name="inspectorCertificate"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField label="Inspector Certificate" fullWidth {...field} />
            )}
          />

          <Controller
            name="solderingCertificate"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField label="Soldering Certificate" fullWidth {...field} />
            )}
          />

          <Controller
            name="deputyTeamLeader"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField label="Deputy Team Leader" fullWidth {...field} />
            )}
          />

          <Stack
            sx={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            {!isNew && (
              <Button
                sx={{ width: "120px", height: "42px", marginRight: "20px" }}
                onClick={deleteUser}
                variant="contained"
                color="error"
              >
                delete
              </Button>
            )}
            <Button
              sx={{ width: "120px", height: "42px" }}
              type="submit"
              variant="contained"
              color="primary"
            >
              {isNew ? "Submit" : "Edit"}
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};
