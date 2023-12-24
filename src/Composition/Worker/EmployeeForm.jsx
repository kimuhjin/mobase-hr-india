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
  FormControlLabel,
  Switch,
  Chip,
} from "@mui/material";
import { db } from "../../firebase-config";
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import uuid from "react-uuid";
import { LoadingDim } from "../Common/LoadingDim";
import { useNavigate } from "react-router-dom";
import { WORKER } from "../../Constant/route";
import { EmployeeSkillMatrix } from "./EmployeeSkillMatrix";
import { auth } from "../../Util/auth";
import { skillMatrixWithDate } from "../../Constant/convert";
import { AiOutlinePrinter } from "react-icons/ai";
import { documentOpenToWindow } from "../../Util/pdf";
import Pdfworker from "./PdfWorker";
import PdfCetificate from "./PdfCetificate";

export const EmployeeForm = ({ isNew, workerInfo }) => {
  const { setValue, watch, handleSubmit, control } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  console.log(workerInfo);
  const isAdmin = auth.role === "admin";
  const isDisabled = !isAdmin;
  useEffect(() => {
    if (!watch("group")) {
      setValue("group", auth.role);
    }
  }, [auth.role]);

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
    if (window.confirm("Do you want to delete worker?")) {
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

  const onPrint = async () => {
    function base64ToBlob(base64, mimeType) {
      const base64WithoutPrefix = base64.split(",")[1];
      const binary_string = window.atob(base64WithoutPrefix);
      let len = binary_string.length;
      let bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
      }
      return new Blob([bytes.buffer], { type: mimeType });
    }
    const base64Image = watch("profileImage");
    const mimeType = "image/png";
    const imageBlob = base64ToBlob(base64Image, mimeType);
    const imageUrl = URL.createObjectURL(imageBlob);
    const skillMatrix = watch("skillMatrixDetail").map(
      ({ processName, level }) => {
        return `${processName}: ${level}`;
      }
    );

    await documentOpenToWindow(
      <Pdfworker watch={watch} skillMatrix={skillMatrix} img={imageUrl} />
    );
  };

  const onPrintCertificate = async () => {
    function base64ToBlob(base64, mimeType) {
      const base64WithoutPrefix = base64.split(",")[1];
      const binary_string = window.atob(base64WithoutPrefix);
      let len = binary_string.length;
      let bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
      }
      return new Blob([bytes.buffer], { type: mimeType });
    }
    const base64Image = watch("profileImage");
    const mimeType = "image/png";
    const imageBlob = base64ToBlob(base64Image, mimeType);
    const imageUrl = URL.createObjectURL(imageBlob);

    console.log(watch("inspectorCertificateDate"));
    console.log(watch("solderingCertificateDate"));

    await documentOpenToWindow(<PdfCetificate watch={watch} img={imageUrl} />);
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
              alignItems: "space-between",
              border: "1px solid #E9ECF0",
              margin: "0px",
            }}
          >
            <Stack
              sx={{
                width: "300px",
                height: "100%",
                borderRight: "1px solid #E9ECF0",
                justifyContent: "space-between",
              }}
            >
              <Stack
                sx={{
                  width: "100%",
                  minHeight: "28px",
                  background: "#cccccc",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#0a0a8f",
                }}
              >
                <Typography sx={{ textAlign: "center", fontWeight: "600" }}>
                  Photo
                </Typography>
              </Stack>
              <Stack
                sx={{
                  width: "100%",
                  height: "100%",
                  marginTop: "6px",
                  padding: "0px 8px 8px 8px",
                }}
              >
                <Stack sx={{ width: "100%", height: "100%" }}>
                  {watch("profileImage") && (
                    //  IMAGE SECTION
                    <Stack
                      sx={{
                        width: "100%",
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
                              watch("company") === "mobase"
                                ? "blue"
                                : "skyblue",
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
                          {skillMatrixWithDate(
                            watch("employmentDate"),
                            watch("skillMatrix")
                          )}
                          {}
                        </Stack>
                      </Stack>
                      {/* BOTTOM */}

                      <Stack
                        sx={{
                          width: "100%",
                          height: "20px",
                          justifyContent: "center",
                          alignItems: "center",
                          backgroundColor: "#f9c3c3",
                        }}
                      >
                        {watch("name")}
                      </Stack>
                    </Stack>
                  )}
                  <Stack
                    sx={{
                      width: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
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
                        sx={{ width: "140px", marginTop: "12px" }}
                      >
                        <Button variant="contained" component="span">
                          Upload Image
                        </Button>
                      </Stack>
                    </FormControl>
                    <Button
                      variant="contained"
                      component="span"
                      sx={{
                        marginTop: "18px",
                        width: "140px",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        textAlign: "center",
                        fontSize: "10px",
                      }}
                      onClick={onPrint}
                    >
                      <Stack sx={{ marginRight: "10px" }}>
                        <AiOutlinePrinter size={"18px"} color="#fff" />
                      </Stack>
                      <Stack sx={{ width: "100%" }}>Print Information</Stack>
                    </Button>

                    <Button
                      variant="contained"
                      component="span"
                      sx={{
                        marginTop: "18px",
                        width: "140px",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        textAlign: "center",
                        fontSize: "10px",
                      }}
                      onClick={onPrintCertificate}
                    >
                      <Stack sx={{ marginRight: "10px" }}>
                        <AiOutlinePrinter size={"18px"} color="#fff" />
                      </Stack>
                      Print Certificate
                    </Button>
                  </Stack>
                </Stack>
                <Stack
                  sx={{
                    width: "100%",
                  }}
                >
                  <FormControl fullWidth>
                    <Chip
                      sx={{ height: "42px" }}
                      label={
                        <Stack
                          sx={{ flexDirection: "row", alignItems: "center" }}
                        >
                          Disabled
                          <Controller
                            name="disabled"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                              <FormControlLabel
                                {...field}
                                checked={watch("disabled")}
                                control={<Switch />}
                                labelPlacement="top"
                              />
                            )}
                          />
                        </Stack>
                      }
                    />
                  </FormControl>
                </Stack>
              </Stack>
            </Stack>
            <Stack sx={{ width: "100%", height: "100%" }}>
              <Stack
                sx={{
                  width: "100%",
                  minHeight: "28px",
                  background: "#cccccc",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#0a0a8f",
                }}
              >
                <Typography sx={{ textAlign: "center", fontWeight: "600" }}>
                  Details
                </Typography>
              </Stack>
              <Stack
                sx={{
                  width: "100%",
                  gap: "12px",
                  padding: "12px 8px 8px 8px",

                  overflowY: "auto",
                }}
              >
                <FormControl fullWidth disabled={isDisabled}>
                  <InputLabel>Group</InputLabel>
                  <Controller
                    name="group"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Select fullWidth {...field} label={"Group"}>
                        <MenuItem value="smt">{`SMD(smt)`}</MenuItem>
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
                        <MenuItem value="smt">SMT</MenuItem>
                      </Select>
                    )}
                  />
                </FormControl>
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
                        <MenuItem value="team_leader">Supervisor</MenuItem>
                        <MenuItem value="feeder">feeder</MenuItem>
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
                  <InputLabel>Deputy Supervisor</InputLabel>
                  <Controller
                    name="deputyTeamLeader"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Select fullWidth {...field} label={"Deputy Supervisor"}>
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
