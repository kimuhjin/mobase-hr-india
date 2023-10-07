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
  Typography,
} from "@mui/material";
import { db } from "../../firebase-config";
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import uuid from "react-uuid";
import { LoadingDim } from "../Common/LoadingDim";
import { useNavigate } from "react-router-dom";
import { WORKER } from "../../Constant/route";
import { EmployeeSkillMatrix } from "./EmployeeSkillMatrix";

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

    try {
      setIsLoading(true);
      const commentRef = doc(db, "worker", id);
      const res = await setDoc(commentRef, { ...data, id }, { merge: true });
      alert("save successfully");
      navigate(WORKER);
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
      try {
        await deleteUserFromBoard(workerInfo.group, workerInfo.id);
        console.log("deleteUserFromBoard success!");
      } catch (err) {
        console.log(err);
        throw err;
      }
      try {
        const commentRef = doc(db, "worker", workerInfo.id);
        const res = await deleteDoc(commentRef);

        console.log(res);
        alert("delete successfully");
        navigate(WORKER);
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      alert("error! delete user");
    } finally {
      setIsLoading(false);
    }
  };

  // 주어진 id와 동일한 leader 혹은 user를 boards 배열에서 제거하는 함수
  function removeUserOrLeaderById(boards, idToRemove) {
    return boards?.map((board) => {
      const items = board?.item?.filter(
        (item) => item?.user?.id !== idToRemove
      );
      const leader =
        board?.leader?.id === idToRemove
          ? null
          : board?.leader
          ? board?.leader
          : null;
      return { ...board, item: items, leader: leader };
    });
  }

  const deleteUserFromBoard = async (group, id) => {
    const collectionName = "boards";

    const docGetRef = doc(db, collectionName, group);
    const docSnapshot = await getDoc(docGetRef);
    const originalBoard = docSnapshot.data()?.boards;

    // 업데이트된 board 생성
    const updatedBoard = removeUserOrLeaderById(originalBoard, id);
    const docRef = doc(db, collectionName, group);
    try {
      await setDoc(docRef, { boards: updatedBoard });
    } catch (err) {
      console.log("특정 문서를 업데이트하는 함수");
      console.error(err);
    }
  };

  return (
    <>
      <LoadingDim isLoading={isLoading} />
      <Stack
        sx={{ width: "100%", flexDirection: "row", height: "100%" }}
        onSubmit={handleSubmit(onSubmit)}
        component={"form"}
      >
        <Stack sx={{ width: "50%", height: "100%" }}>
          <Typography
            sx={{ fontSize: "20px", color: "#0a0a8f", fontWeight: "bold" }}
          >
            Basic Information
          </Typography>
          <Stack
            sx={{
              width: "100%",
              height: "calc(100% - 30px)",
              flexDirection: "row",
              justifyContent: "space-between",
              border: "1px solid #E9ECF0",
              margin: "0px",
            }}
          >
            <Stack
              sx={{
                width: "300px",
                height: "100%",
                borderRight: "1px solid #E9ECF0",
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
                  height: "100%",
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
                {/* <Stack
                  htmlFor="profile-image-upload"
                  component={"label"}
                  sx={{ width: "fit-content", marginTop: "12px" }}
                >
                  <Button variant="contained" component="span">
                    Upload Image
                  </Button>
                </Stack> */}
              </FormControl>
            </Stack>
            <Stack sx={{ width: "100%", height: "100%" }}>
              <Stack
                sx={{
                  width: "100%",
                  gap: "12px",
                  padding: "20px",

                  overflowY: "scroll",
                }}
              >
                <FormControl fullWidth>
                  <InputLabel>Group</InputLabel>
                  <Controller
                    name="group"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Select fullWidth {...field} label={"Group"}>
                        <MenuItem value="1ks_4mf">{`0th floor (1KS & 4MF)`}</MenuItem>
                        <MenuItem value="ofd">{`0th floor  (OFD)`}</MenuItem>
                        <MenuItem value="5sr">{`clean room (5RC)`}</MenuItem>
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
                      <Select fullWidth {...field} label={"Company"}>
                        <MenuItem value="mobase">Mobase</MenuItem>
                        <MenuItem value="outsourcing">Outsourcing</MenuItem>
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

                <FormControl fullWidth>
                  <InputLabel>Position</InputLabel>
                  <Controller
                    name="position"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Select fullWidth {...field} label={"Position"}>
                        <MenuItem value="machine operator">
                          machine operator
                        </MenuItem>
                        <MenuItem value="team_leader">team leader</MenuItem>
                        <MenuItem value="feeder">feeder</MenuItem>
                      </Select>
                    )}
                  />
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel>Area</InputLabel>
                  <Controller
                    name="area"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Select fullWidth {...field} label={"Area"}>
                        <MenuItem value="key_set">KEY SET</MenuItem>
                        <MenuItem value="c_pad/0fd">C-PAD / 0FD</MenuItem>
                        <MenuItem value="multifunction">MULTIFUNCTION</MenuItem>
                        <MenuItem value="remocon">REMOCON</MenuItem>
                        <MenuItem value="pw/console">PW / CONSOLE</MenuItem>
                        <MenuItem value="renault">RENAULT</MenuItem>
                      </Select>
                    )}
                  />
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel>Inspector Certificate</InputLabel>
                  <Controller
                    name="inspectorCertificate"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Select
                        fullWidth
                        {...field}
                        label={"Inspector Certificate"}
                      >
                        <MenuItem value="YES">YES</MenuItem>
                        <MenuItem value="NO">NO</MenuItem>
                      </Select>
                    )}
                  />
                </FormControl>
                <Controller
                  name="inspectorCertificateDate"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      label="Inspector Certificate Date"
                      type="date"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      {...field}
                    />
                  )}
                />
                <FormControl fullWidth>
                  <InputLabel>Soldering Certificate</InputLabel>
                  <Controller
                    name="solderingCertificate"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Select
                        fullWidth
                        {...field}
                        label={"Soldering Certificate"}
                      >
                        <MenuItem value="YES">YES</MenuItem>
                        <MenuItem value="NO">NO</MenuItem>
                      </Select>
                    )}
                  />
                </FormControl>
                <Controller
                  name="solderingCertificateDate"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      label="Soldering Certificate"
                      type="date"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      {...field}
                    />
                  )}
                />
                <FormControl fullWidth>
                  <InputLabel>Deputy Team Leader</InputLabel>
                  <Controller
                    name="deputyTeamLeader"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Select fullWidth {...field} label={"Deputy Team Leader"}>
                        <MenuItem value="YES">YES</MenuItem>
                        <MenuItem value="NO">NO</MenuItem>
                      </Select>
                    )}
                  />
                </FormControl>
              </Stack>
              <Stack
                sx={{
                  margin: "12px 0px 6px",
                  paddingRight: "20px",
                  width: "100%",
                  minHeight: "42px",
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
        </Stack>
        <Stack sx={{ width: "50%", marginLeft: "4px" }}>
          <Typography
            sx={{ fontSize: "20px", color: "#0a0a8f", fontWeight: "bold" }}
          >
            Skill Matrix
          </Typography>
          <EmployeeSkillMatrix setValue={setValue} watch={watch} />
        </Stack>
      </Stack>
    </>
  );
};
