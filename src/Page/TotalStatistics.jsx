import { Stack, Typography } from "@mui/material";
import {
  Firestore,
  collection,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase-config";
import { GROUP_LIST } from "./Team";
import { LoadingDim } from "../Composition/Common/LoadingDim";
const orderObjectByArray = (obj, order) => {
  const orderedObj = {};

  order.forEach((key) => {
    if (obj[key] !== undefined) {
      orderedObj[key] = obj[key];
    }
  });

  return orderedObj;
};
const TotalStatistics = () => {
  const [boards, setBoards] = useState([]);

  const [isGetLoading, setIsGetLoading] = useState(true);
  const date = new Date();
  const today = `${date.getFullYear()}.${
    date.getMonth() + 1
  }.${date.getDate()}`;

  const getStatus = (boards) => {
    const parsed = boards.map(({ item, column, row, leader }) => {
      const sickIndices = [];
      const vacationIndices = [];
      const feederMaterialIndices = [];
      const feederTrashIndices = [];
      column.forEach((col, index) => {
        if (col.includes("Sick")) sickIndices.push(index);
        if (col.includes("Vacation")) vacationIndices.push(index);
        if (col.includes("Feeder material")) feederMaterialIndices.push(index);
        if (col.includes("Feeder Trash")) feederTrashIndices.push(index);
      });

      const sickUsers = item.filter((item) =>
        sickIndices.includes(item.column)
      ).length;
      const vacationUsers = item.filter((item) =>
        vacationIndices.includes(item.column)
      ).length;

      const feederMaterialUsers = item.filter((item) =>
        feederMaterialIndices.includes(item.column)
      ).length;
      const feederTrashUsers = item.filter((item) =>
        feederTrashIndices.includes(item.column)
      ).length;
      return {
        leader: leader ? 1 : 0,
        worker:
          item.length -
          sickUsers -
          vacationUsers -
          feederMaterialUsers -
          feederTrashUsers,
        sick: sickUsers,
        vacation: vacationUsers,
        feederMaterial: feederMaterialUsers,
        feederTrash: feederTrashUsers,
      };
    });

    return parsed;
  };

  const getBoard = async () => {
    const temp = [];
    try {
      const querySnapshot = await getDocs(collection(db, "boards"));
      querySnapshot.docs.forEach((doc) => {
        temp.push({
          process: doc.id,
          label: GROUP_LIST.find((i) => i.id === doc.id).label,
          status: getStatus(doc.data().boards),
        });
      });

      ///
      setBoards(temp);
    } catch (err) {
      alert("error! board con");
      console.error(err);
    } finally {
      setIsGetLoading(false);
    }
  };
  useEffect(() => {
    setIsGetLoading(true);
    getBoard();
  }, []);
  const order = [
    "leader",
    "worker",
    "feederMaterial",
    "feederTrash",
    "sick",
    "vacation",
  ];
  const sumBoard = (boards) => {
    const data = boards.map(({ label, status }) => {
      let accumulatedStatus = {};

      // 각 status 객체를 순회하며
      status.forEach((stat) => {
        for (let key in stat) {
          // 해당 키가 누적 상태 객체에 없으면 추가하고, 있으면 값 누적
          if (!accumulatedStatus[key]) {
            accumulatedStatus[key] = 0;
          }
          accumulatedStatus[key] += stat[key];
        }
      });
      return {
        label,
        data: [accumulatedStatus, ...status],
      };
    });
    const result = [];

    // Initialize result with zeros
    for (let i = 0; i < data[0]?.data?.length; i++) {
      const initialData = {};
      for (let key in data[0]?.data[i]) {
        initialData[key] = 0;
      }
      result.push(initialData);
    }

    // Accumulate data
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].data.length; j++) {
        for (let key in data[i].data[j]) {
          result[j][key] += data[i].data[j][key];
        }
      }
    }
    return result;
  };

  return (
    <Stack
      sx={{ width: "100%", height: "100%", padding: "8px", color: "#0a0a8f" }}
    >
      <LoadingDim isLoading={isGetLoading} />
      {!isGetLoading && (
        <>
          <Stack sx={{ marginBottom: "20px" }}>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "24px",
                width: "100%",
                lineHeight: "24px",
              }}
            >
              {today}&nbsp;&nbsp;&nbsp; Attendance Status
            </Typography>
          </Stack>

          <Stack
            sx={{
              width: "100%",
              height: "100%",
              border: "1px solid black",
              fontSize: "10px",
            }}
          >
            {/* HEADER */}
            <Stack
              sx={{
                width: "100%",
                height: "80px",
                flexDirection: "row",
                borderBottom: "1px solid black",
                backgroundColor: "#d9cdb3",
                fontWeight: "bold",
                color: "#0a0a8f",

                "> *": {
                  borderRight: "1px solid black",
                  "&:last-child": {
                    borderRight: "none",
                  },
                },
              }}
            >
              <Stack
                sx={{
                  width: "5%",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "20px",
                  fontWeight: "700",
                }}
              >
                Area
              </Stack>
              <Stack
                sx={{
                  width: "10%",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "20px",
                  fontWeight: "700",
                }}
              >
                Process
              </Stack>
              <Stack
                sx={{
                  width: "85%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <HeaderShift title="Total" />
                <HeaderShift title="1st Shift" />
                <HeaderShift title="2nd Shift" />
                <HeaderShift title="3rd Shift" isLast={true} />
              </Stack>
            </Stack>
            <Area
              area="ASS'Y"
              boards={boards.filter((i) => i.process !== "smt")}
              sum={sumBoard(boards.filter((i) => i.process !== "smt"))}
            />
            <Area
              area="SMT"
              boards={boards.filter((i) => i.process === "smt")}
              sum={sumBoard(boards.filter((i) => i.process === "smt"))}
            />
            <Stack
              sx={{
                width: "100%",
                flexDirection: "row",
                borderBottom: "1px solid black",
                backgroundColor: "#b5a991",
              }}
            >
              <Stack
                sx={{
                  width: "100%",
                  height: "40px",
                  flexDirection: "row",
                }}
              >
                <Stack
                  sx={{
                    width: "15%",
                    height: "100%",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRight: "1px solid black",
                    fontSize: "20px",
                    fontWeight: "700",
                  }}
                >
                  Total
                </Stack>
                <Stack sx={{ width: "85%", flexDirection: "row" }}>
                  {sumBoard(boards).map((i, index) => {
                    const isLast = index === sumBoard(boards).length - 1;
                    return (
                      <Stack
                        sx={{
                          width: "25%",
                          flexDirection: "row",
                          "> *": {
                            justifyContent: "center",
                            alignItems: "center",
                            borderRight: "1px solid black",
                            textAlign: "center",
                          },
                          fontSize: "20px",
                          fontWeight: "700",
                        }}
                      >
                        <Stack sx={{ width: "20%" }}>{i.leader}</Stack>
                        <Stack sx={{ width: "20%" }}>{i.worker}</Stack>
                        <Stack sx={{ width: "20%" }}>{i.feederMaterial}</Stack>
                        <Stack sx={{ width: "20%" }}>{i.feederTrash}</Stack>
                        <Stack sx={{ width: "20%" }}>{i.sick}</Stack>
                        <Stack
                          sx={{
                            width: "20%",
                            borderRight: isLast
                              ? "none !important"
                              : "1px solid black",
                          }}
                        >
                          {i.vacation}
                        </Stack>
                      </Stack>
                    );
                  })}
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </>
      )}
    </Stack>
  );
};
export default TotalStatistics;
const HeaderShift = ({ title, isLast }) => {
  return (
    <Stack sx={{ width: "100%" }}>
      <Stack
        sx={{
          width: "100%",
          height: "50%",
          justifyContent: "center",
          alignItems: "center",
          borderBottom: "1px solid black",
          borderRight: isLast ? "none" : "1px solid black",
          fontSize: "20px",
          fontWeight: "700",
        }}
      >
        {title}
      </Stack>
      <Stack
        sx={{
          width: "100%",
          height: "50%",
          flexDirection: "row",
          "> *": {
            justifyContent: "center",
            alignItems: "center",
            borderRight: "1px solid black",
            textAlign: "center",
            "&:last-child": {
              borderRight: isLast ? "none" : "1px solid black",
            },
            fontSize: "12px",
            fontWeight: "700",
          },
        }}
      >
        <Stack sx={{ width: "16.66%" }}>Team Leader</Stack>
        <Stack sx={{ width: "16.66%" }}>Worker</Stack>
        <Stack sx={{ width: "16.66%" }}>Feeder Material</Stack>
        <Stack sx={{ width: "16.66%" }}>Feeder Trash</Stack>
        <Stack sx={{ width: "16.66%" }}>Sick</Stack>
        <Stack sx={{ width: "16.66%" }}>Vacation</Stack>
      </Stack>
    </Stack>
  );
};
const Area = ({ area, boards, sum }) => {
  return (
    <Stack
      sx={{
        width: "100%",
        flexDirection: "row",
        borderBottom: "1px solid black",
      }}
    >
      <Stack
        sx={{
          width: "5%",
          justifyContent: "center",
          alignItems: "center",
          borderRight: "1px solid black",
          fontSize: "20px",
          fontWeight: "700",
        }}
      >
        {area}
      </Stack>

      <Stack
        sx={{
          width: "95%",
          "> *": {
            borderBottom: "1px solid black",
            "&:last-child": {
              borderBottom: "none",
            },
          },
        }}
      >
        {boards.map(({ label, status }) => {
          let accumulatedStatus = {};

          // 각 status 객체를 순회하며
          status.forEach((stat) => {
            for (let key in stat) {
              // 해당 키가 누적 상태 객체에 없으면 추가하고, 있으면 값 누적
              if (!accumulatedStatus[key]) {
                accumulatedStatus[key] = 0;
              }
              accumulatedStatus[key] += stat[key];
            }
          });

          return (
            <Stack
              sx={{
                width: "100%",
                height: "40px",
                flexDirection: "row",
              }}
            >
              <Stack
                sx={{
                  width: "10.527%",
                  height: "100%",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRight: "1px solid black",
                  fontSize: "14px",
                  fontWeight: "700",
                }}
              >
                {label}
              </Stack>
              <Stack
                sx={{
                  width: "89.473%",
                  flexDirection: "row",
                }}
              >
                {[accumulatedStatus, ...status].map((i, index) => {
                  const isLast =
                    index === [accumulatedStatus, ...status].length - 1;
                  return (
                    <Stack
                      sx={{
                        width: "25%",
                        flexDirection: "row",
                        "> *": {
                          justifyContent: "center",
                          alignItems: "center",
                          borderRight: "1px solid black",
                          textAlign: "center",
                        },
                        fontSize: "20px",
                        fontWeight: "700",
                      }}
                    >
                      <Stack sx={{ width: "20%" }}>{i.leader}</Stack>
                      <Stack sx={{ width: "20%" }}>{i.worker}</Stack>
                      <Stack sx={{ width: "20%" }}>{i.feederMaterial}</Stack>
                      <Stack sx={{ width: "20%" }}>{i.feederTrash}</Stack>
                      <Stack sx={{ width: "20%" }}>{i.sick}</Stack>
                      <Stack
                        sx={{
                          width: "20%",
                          borderRight: isLast
                            ? "none !important"
                            : "1px solid black",
                        }}
                      >
                        {i.vacation}
                      </Stack>
                    </Stack>
                  );
                })}
              </Stack>
            </Stack>
          );
        })}
        <Stack
          sx={{
            height: "40px",
            width: "100%",
            flexDirection: "row",
          }}
        >
          <Stack
            sx={{
              width: "10.527%",
              height: "100%",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              borderRight: "1px solid black",
              backgroundColor: "#d9cdb3",
              fontSize: "20px",
              fontWeight: "700",
            }}
          >
            Sum
          </Stack>
          <Stack
            sx={{
              width: "89.473%",
              flexDirection: "row",
            }}
          >
            {sum.map((i, index) => {
              const isLast = index === sum.length - 1;
              return (
                <Stack
                  sx={{
                    width: "25%",
                    flexDirection: "row",
                    "> *": {
                      justifyContent: "center",
                      alignItems: "center",
                      borderRight: "1px solid black",
                      textAlign: "center",
                      backgroundColor: "#d9cdb3",
                    },
                    fontSize: "20px",
                    fontWeight: "700",
                  }}
                >
                  <Stack sx={{ width: "20%" }}>{i.leader}</Stack>
                  <Stack sx={{ width: "20%" }}>{i.worker}</Stack>
                  <Stack sx={{ width: "20%" }}>{i.feederMaterial}</Stack>
                  <Stack sx={{ width: "20%" }}>{i.feederTrash}</Stack>
                  <Stack sx={{ width: "20%" }}>{i.sick}</Stack>
                  <Stack
                    sx={{
                      width: "20%",
                      borderRight: isLast
                        ? "none !important"
                        : "1px solid black",
                    }}
                  >
                    {i.vacation}
                  </Stack>
                </Stack>
              );
            })}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
