import {
  Button,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import uuid from "react-uuid";
import DeleteIcon from "@mui/icons-material/Delete";
import { DEFAULT_PROCESS_AREA } from "../../Constant/defaultSkill";

const AlphabetToNumber = (alphabet) => {
  switch (alphabet) {
    case "A":
      return 4;
    case "B":
      return 3;
    case "C":
      return 2;
    case "D":
      return 1;
    default:
    case "E":
      return 0;
  }
};

const NumberToAlphabet = (alphabet) => {
  switch (alphabet) {
    case 4:
      return "A";
    case 3:
      return "B";
    case 2:
      return "C";
    case 1:
      return "D";
    default:
    case 0:
      return "E";
  }
};
export const EmployeeSkillMatrix = ({ setValue, watch }) => {
  const [skillMatrix, setSkillMatrix] = useState([]);

  const getSum = (skillMatrix) => {
    return skillMatrix.reduce((accumulator, currentObject) => {
      return accumulator + AlphabetToNumber(currentObject.level);
    }, 0);
  };

  // useEffect(() => {
  //   const defaultProcess = DEFAULT_PROCESS_AREA[watch("area")] || [];
  //   const processNames = skillMatrix.map((i) => i.processName);

  //   defaultProcess?.forEach((processName) => {
  //     if (processNames.includes(processName)) {
  //       return;
  //     } else {
  //       const newId = uuid();
  //       const newSkill = {
  //         id: newId,
  //         processName: processName,
  //         level: "E",
  //       };
  //       setSkillMatrix((prev) => [...prev, newSkill]);
  //     }
  //   });
  // }, [watch("area")]);

  const addAreaProcess = () => {
    const defaultProcess = DEFAULT_PROCESS_AREA[watch("area")] || [];
    const processNames = skillMatrix.map((i) => i.processName);

    defaultProcess?.forEach((processName) => {
      if (processNames.includes(processName)) {
        return;
      } else {
        const newId = uuid();
        const newSkill = {
          id: newId,
          processName: processName,
          level: "E",
        };
        setSkillMatrix((prev) => [...prev, newSkill]);
      }
    });
  };

  useEffect(() => {
    if (
      watch("skillMatrixDetail") &&
      watch("skillMatrixDetail").length > 0 &&
      skillMatrix.length === 0
    ) {
      setSkillMatrix(watch("skillMatrixDetail"));
    }
  }, [watch("skillMatrixDetail")]);
  useEffect(() => {
    if (skillMatrix) {
      setValue("skillMatrixDetail", skillMatrix);
      setValue(
        "skillMatrix",
        NumberToAlphabet(Math.round(getSum(skillMatrix) / skillMatrix.length))
      );
    }
  }, [skillMatrix]);
  const handleAddSkill = () => {
    const newId = uuid();
    const newSkill = {
      id: newId,
      processName: "",
      level: "E",
    };
    setSkillMatrix((prev) => [...prev, newSkill]);
  };
  const onProcessNameChange = (e, id) => {
    const newValue = e.target.value;
    const newSkillMatrix = skillMatrix.map((i) => {
      if (i.id === id) {
        i.processName = newValue;
      }
      return i;
    });
    setSkillMatrix(newSkillMatrix);
  };
  const onLevelChange = (e, id) => {
    const newValue = e.target.value;
    const newSkillMatrix = skillMatrix.map((i) => {
      if (i.id === id) {
        i.level = newValue;
      }
      return i;
    });
    setSkillMatrix(newSkillMatrix);
  };
  const onDeleteSkill = (id) => {
    if (window.confirm("Do you want to delete?")) {
      const newSkillMatrix = skillMatrix.filter((i) => i.id !== id);
      setSkillMatrix(newSkillMatrix);
    }
  };
  return (
    <Stack
      sx={{
        width: "100%",
        height: "100%",
        border: "1px solid #E9ECF0",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Stack
        sx={{
          width: "100%",
          height: "100%",
        }}
      >
        <Stack
          sx={{
            width: "100%",
            height: "28px",
            background: "#cccccc",
            flexDirection: "row",
            alignItems: "center",
            color: "#0a0a8f",
          }}
        >
          <Typography
            sx={{ width: "60%", textAlign: "center", fontWeight: "600" }}
          >
            Process Name
          </Typography>
          <Typography
            sx={{ width: "10%", textAlign: "center", fontWeight: "600" }}
          >
            Skill
          </Typography>
          <Typography
            sx={{ width: "10%", textAlign: "center", fontWeight: "600" }}
          >
            point
          </Typography>
          <Typography
            sx={{ width: "200px", textAlign: "center", fontWeight: "600" }}
          >
            level
          </Typography>
        </Stack>
        <Stack
          sx={{
            width: "100%",
            maxHeight: "calc(100vh - 190px)",
            overflowY: "auto",
          }}
        >
          {skillMatrix.map((data) => {
            return (
              <Stack
                sx={{
                  width: "100%",
                  borderBottom: "1px solid #E9ECF0",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <DeleteIcon
                  onClick={() => onDeleteSkill(data.id)}
                  sx={{ cursor: "pointer" }}
                />
                <TextField
                  sx={{
                    width: "60%",
                    ".MuiInput-underline:before": {
                      borderBottom: "0",
                    },
                  }}
                  variant="standard"
                  value={data.processName}
                  hiddenLabel
                  size="small"
                  onChange={(e) => onProcessNameChange(e, data.id)}
                />
                <Stack
                  sx={{
                    width: "10%",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <Select
                    value={data.level}
                    onChange={(e) => onLevelChange(e, data.id)}
                    sx={{
                      ".MuiSelect-select": {
                        padding: "2px 28px 2px 2px",
                      },
                    }}
                  >
                    <MenuItem value="A">A</MenuItem>
                    <MenuItem value="B">B</MenuItem>
                    <MenuItem value="C">C</MenuItem>
                    <MenuItem value="D">D</MenuItem>
                    <MenuItem value="E">E</MenuItem>
                  </Select>
                </Stack>
                <Typography sx={{ width: "10%", textAlign: "center" }}>
                  {AlphabetToNumber(data.level)}
                </Typography>
                <LevelBar level={AlphabetToNumber(data.level)} />
              </Stack>
            );
          })}
        </Stack>
      </Stack>
      <Stack>
        <Button
          sx={{ marginBottom: "4px" }}
          size="small"
          variant="contained"
          color="error"
          onClick={() => {
            if (window.confirm("Do you want to clear all process?")) {
              setSkillMatrix([]);
            }
          }}
        >
          Clear All Process
        </Button>
        <Stack
          sx={{
            marginBottom: "4px",
            gap: "4px",
            flexDirection: "row",
            width: "100%",
          }}
        >
          <Button
            sx={{ width: "100%" }}
            size="small"
            variant="contained"
            color="info"
            onClick={addAreaProcess}
          >
            Add Current Area Process
          </Button>
          <Button
            sx={{ width: "100%" }}
            size="small"
            variant="contained"
            onClick={handleAddSkill}
          >
            Add Process
          </Button>
        </Stack>
        <Stack
          sx={{
            width: "100%",
            height: "28px",
            background: "#cccccc",
            flexDirection: "row",
            alignItems: "center",
            color: "#0a0a8f",
          }}
        >
          {skillMatrix.length > 0 && (
            <>
              <Typography
                sx={{ width: "60%", textAlign: "left", fontWeight: "600" }}
              >
                Total Skill
              </Typography>
              <Typography
                sx={{ width: "10%", textAlign: "center", fontWeight: "600" }}
              >
                {NumberToAlphabet(
                  Math.round(getSum(skillMatrix) / skillMatrix.length)
                )}
              </Typography>
              <Typography
                sx={{ width: "10%", textAlign: "center", fontWeight: "600" }}
              >
                {Math.round(getSum(skillMatrix) / skillMatrix.length)}
              </Typography>
              <Typography
                sx={{ width: "200px", textAlign: "center", fontWeight: "600" }}
              />
            </>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};
const LevelBar = ({ level }) => {
  const Fill = () => {
    return (
      <Stack
        sx={{
          backgroundColor: "#ef5de7",
          width: "100%",
          height: "100%",
          borderRight: "1px solid #E9ECF0",
        }}
      />
    );
  };
  const None = () => {
    return (
      <Stack
        sx={{
          backgroundColor: "#fff",
          width: "100%",
          height: "100%",
          borderRight: "1px solid #E9ECF0",
        }}
      ></Stack>
    );
  };

  return (
    <Stack sx={{ width: "200px", height: "100%", flexDirection: "row" }}>
      {level > 0 ? <Fill /> : <None />}
      {level > 1 ? <Fill /> : <None />}
      {level > 2 ? <Fill /> : <None />}
      {level > 3 ? <Fill /> : <None />}
    </Stack>
  );
};
