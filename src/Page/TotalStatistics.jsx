import { Stack, Typography } from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase-config";
import { GROUP_LIST } from "./Team";
import { LoadingDim } from "../Composition/Common/LoadingDim";
import { Details } from "../Composition/Statistics/Details";
import { DetailQuality } from "../Composition/Statistics/DetailQuality";
import { DetailMaterial } from "../Composition/Statistics/DetailMaterial";
import { DetailSales } from "../Composition/Statistics/DetailSales";

const TotalStatistics = () => {
  const [boards, setBoards] = useState([]);

  const [isGetLoading, setIsGetLoading] = useState(true);
  const date = new Date();
  const today = `${date.getFullYear()}.${
    date.getMonth() + 1
  }.${date.getDate()}`;

  const getStatus = (boards, workers) => {
    const mobaseBoards = boards?.map((board) => {
      const newItem = board?.item?.filter((i) => {
        const worker = workers?.find((worker) => worker?.id === i?.user?.id);
        return worker?.company === "mobase";
      });
      return { ...board, item: newItem };
    });
    const outsourcingBoards = boards?.map((board) => {
      const newItem = board?.item.filter((i) => {
        const worker = workers?.find((worker) => worker?.id === i?.user?.id);
        return worker?.company === "outsourcing";
      });
      return { ...board, item: newItem };
    });

    const getBoards = boards?.map((board) => {
      const newItem = board?.item.filter((i) => {
        const worker = workers?.find((worker) => worker?.id === i?.user?.id);
        return worker?.company === "get";
      });
      return { ...board, item: newItem };
    });
    const clBoards = boards?.map((board) => {
      const newItem = board?.item.filter((i) => {
        const worker = workers?.find((worker) => worker?.id === i?.user?.id);
        return worker?.company === "cl";
      });
      return { ...board, item: newItem };
    });

    const totalParsed = boards.map(({ item, column, leader }) => {
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

    const mobaseParsed = mobaseBoards.map(({ item, column, leader }) => {
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

      const leaderUser =
        workers?.find((worker) => worker?.id === leader?.id)?.company ===
        "mobase";
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
        leader: leaderUser ? 1 : 0,
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
    const outsourcingParsed = outsourcingBoards.map(
      ({ item, column, leader }) => {
        const sickIndices = [];
        const vacationIndices = [];
        const feederMaterialIndices = [];
        const feederTrashIndices = [];
        column.forEach((col, index) => {
          if (col.includes("Sick")) sickIndices.push(index);
          if (col.includes("Vacation")) vacationIndices.push(index);
          if (col.includes("Feeder material"))
            feederMaterialIndices.push(index);
          if (col.includes("Feeder Trash")) feederTrashIndices.push(index);
        });

        const leaderUser = workers?.find((worker) => worker?.id === leader?.id)
          ? workers?.find((worker) => worker?.id === leader?.id)?.company ===
            "outsourcing"
          : false;
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
          leader: leaderUser ? 1 : 0,
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
      }
    );
    const getParsed = getBoards.map(({ item, column, leader }) => {
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

      const leaderUser = workers?.find((worker) => worker?.id === leader?.id)
        ? workers?.find((worker) => worker?.id === leader?.id)?.company ===
          "get"
        : false;
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
        leader: leaderUser ? 1 : 0,
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

    const clParsed = clBoards.map(({ item, column, leader }) => {
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

      const leaderUser = workers?.find((worker) => worker?.id === leader?.id)
        ? workers?.find((worker) => worker?.id === leader?.id)?.company === "cl"
        : false;
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
        leader: leaderUser ? 1 : 0,
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
    return {
      totalParsed,
      mobaseParsed,
      outsourcingParsed,
      getParsed,
      clParsed,
    };
  };

  const getBoard = async () => {
    const temp = [];
    try {
      const querySnapshot = await getDocs(collection(db, "boards"));
      const querySnapshot_worker = await getDocs(collection(db, "worker"));
      const workers = querySnapshot_worker.docs.map((doc) => doc.data());

      querySnapshot.docs.forEach((doc) => {
        temp.push({
          process: doc.id,
          label: GROUP_LIST.find((i) => i.id === doc.id).label,
          status: getStatus(doc.data().boards, workers),
        });
      });
      const order = ["smt"]; // 원하는 순서
      const sortedBoard = temp.sort((a, b) => {
        return order.indexOf(a.process) - order.indexOf(b.process);
      });
      setBoards(sortedBoard);
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

  const sumBoard = (boards) => {
    const data = boards.map(({ label, status }) => {
      let accumulatedStatus = {};

      // 각 status 객체를 순회하며
      status?.["totalParsed"].forEach((stat) => {
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
        data: [accumulatedStatus, ...status?.["totalParsed"]],
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
      sx={{
        width: "100%",
        height: "100%",
        padding: "8px",
        color: "#0a0a8f",
      }}
    >
      <LoadingDim isLoading={isGetLoading} />
      {!isGetLoading && (
        <Stack
          sx={{
            width: "100%",
            height: "100%",
            overflowY: "auto",
          }}
        >
          <Stack
            sx={{
              marginTop: "6px",
              minHeight: "30px",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "20px",
                width: "100%",
                lineHeight: "20px",
              }}
            >
              {today}&nbsp;&nbsp;&nbsp; Attendance Status
            </Typography>
          </Stack>
          <Stack
            sx={{
              width: "100%",
              minHeight: "auto",

              fontSize: "12px",
              borderRadius: "6px",
            }}
          >
            <Stack
              sx={{
                width: "100%",
                height: "100%",
                borderRadius: "6px",
                borderTop: "1px solid black",
                borderLeft: "1px solid black",
                borderRight: "1px solid black",
                overflow: "hidden",
              }}
            >
              {/* HEADER */}
              <Stack
                sx={{
                  width: "100%",
                  minHeight: "80px",
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
                    width: "3%",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "12px",
                    fontWeight: "700",
                  }}
                >
                  Area
                </Stack>
                <Stack
                  sx={{
                    width: "16%",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "12px",
                    fontWeight: "700",
                  }}
                >
                  Process
                </Stack>
                <Stack
                  sx={{
                    width: "81%",
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
                boards={boards.filter(
                  (i) =>
                    ![
                      "smt",
                      "eol",
                      "sol",
                      "quality_team",
                      "quality_assy_team",
                      "material_team",
                      "sales_team",
                    ].includes(i.process)
                )}
                sum={sumBoard(
                  boards.filter(
                    (i) =>
                      ![
                        "smt",
                        "eol",
                        "sol",
                        "quality_team",
                        "quality_assy_team",
                        "material_team",
                        "sales_team",
                      ].includes(i.process)
                  )
                )}
              />
              <Area
                area="SMT"
                boards={boards.filter((i) =>
                  ["smt", "eol", "sol"].includes(i.process)
                )}
                sum={sumBoard(
                  boards.filter((i) =>
                    ["smt", "eol", "sol"].includes(i.process)
                  )
                )}
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
                    minHeight: "25px",
                    flexDirection: "row",
                  }}
                >
                  <Stack
                    sx={{
                      width: "19.96%",
                      height: "100%",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRight: "1px solid black",
                      fontSize: "12px",
                      fontWeight: "700",
                      minHeight: "25px",
                    }}
                  >
                    Total
                  </Stack>
                  <Stack sx={{ width: "85%", flexDirection: "row" }}>
                    {sumBoard(
                      boards.filter(
                        (i) =>
                          ![
                            "quality_team",
                            "quality_assy_team",
                            "material_team",
                            "sales_team",
                          ].includes(i.process)
                      )
                    ).map((i, index) => {
                      const isLast =
                        index ===
                        sumBoard(
                          boards.filter(
                            (i) =>
                              ![
                                "quality_team",
                                "quality_assy_team",
                                "material_team",
                                "sales_team",
                              ].includes(i.process)
                          )
                        ).length -
                          1;
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
                            fontSize: "12px",
                            fontWeight: "400",
                          }}
                        >
                          <Stack sx={{ width: "20%" }}>{i.leader}</Stack>
                          <Stack sx={{ width: "20%" }}>{i.worker}</Stack>
                          <Stack sx={{ width: "20%" }}>
                            {i.feederMaterial}
                          </Stack>
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
                    minHeight: "30px",
                    flexDirection: "row",
                  }}
                >
                  <Stack
                    sx={{
                      width: "19.96%",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRight: "1px solid black",
                      fontSize: "12px",
                      fontWeight: "700",
                      minHeight: "30px",
                    }}
                  >
                    Total Sum
                  </Stack>
                  <Stack sx={{ width: "85%", flexDirection: "row" }}>
                    {sumBoard(
                      boards.filter(
                        (i) =>
                          ![
                            "quality_team",
                            "quality_assy_team",
                            "material_team",
                            "sales_team",
                          ].includes(i.process)
                      )
                    ).map((i, index) => {
                      const isLast =
                        index ===
                        sumBoard(
                          boards.filter(
                            (i) =>
                              ![
                                "quality_team",
                                "quality_assy_team",
                                "material_team",
                                "sales_team",
                              ].includes(i.process)
                          )
                        ).length -
                          1;
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
                            fontSize: "12px",
                            fontWeight: "400",
                          }}
                        >
                          <Stack
                            sx={{
                              width: "100%",
                              justifyContent: "center",
                              alignItems: "center",
                              borderRight: isLast
                                ? "none !important"
                                : "1px solid black",
                            }}
                          >
                            {i.leader +
                              i.worker +
                              i.feederMaterial +
                              i.feederTrash +
                              i.sick +
                              i.vacation}
                          </Stack>
                        </Stack>
                      );
                    })}
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
          {/* QUALITY TEAM */}
          <Stack
            sx={{
              width: "100%",
              minHeight: "auto",
              fontSize: "12px",
              borderRadius: "6px",
              marginTop: "12px",
            }}
          >
            <Stack
              sx={{
                width: "100%",
                height: "100%",
                border: "1px solid black",
                borderRadius: "6px",
                overflow: "hidden",
              }}
            >
              {/* HEADER */}
              <Stack
                sx={{
                  width: "100%",
                  minHeight: "80px",
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
                    width: "3%",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "12px",
                    fontWeight: "700",
                    minHeight: "25px",
                  }}
                >
                  Area
                </Stack>
                <Stack
                  sx={{
                    width: "16%",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "12px",
                    fontWeight: "700",
                    minHeight: "25px",
                  }}
                >
                  Process
                </Stack>
                <Stack
                  sx={{
                    width: "81%",
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
                area="Quality"
                boards={boards.filter((i) =>
                  ["quality_team", "quality_assy_team"].includes(i.process)
                )}
                sum={sumBoard(
                  boards.filter((i) =>
                    ["quality_team", "quality_assy_team"].includes(i.process)
                  )
                )}
              />

              <Stack
                sx={{
                  width: "100%",
                  flexDirection: "row",
                  // borderBottom: "1px solid black",
                  backgroundColor: "#b5a991",
                }}
              >
                <Stack
                  sx={{
                    width: "100%",
                    minHeight: "30px",
                    flexDirection: "row",
                  }}
                >
                  <Stack
                    sx={{
                      width: "19.96%",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRight: "1px solid black",
                      fontSize: "12px",
                      fontWeight: "700",
                    }}
                  >
                    Total Sum
                  </Stack>
                  <Stack sx={{ width: "85%", flexDirection: "row" }}>
                    {sumBoard(
                      boards.filter((i) =>
                        ["quality_team", "quality_assy_team"].includes(
                          i.process
                        )
                      )
                    ).map((i, index) => {
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
                            fontSize: "12px",
                            fontWeight: "400",
                          }}
                        >
                          <Stack
                            sx={{
                              width: "100%",
                              justifyContent: "center",
                              alignItems: "center",
                              borderRight: isLast
                                ? "none !important"
                                : "1px solid black",
                            }}
                          >
                            {i.leader +
                              i.worker +
                              i.feederMaterial +
                              i.feederTrash +
                              i.sick +
                              i.vacation}
                          </Stack>
                        </Stack>
                      );
                    })}
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
          {/* MATERIAL TEAM */}
          <Stack
            sx={{
              width: "100%",
              minHeight: "auto",
              fontSize: "12px",
              borderRadius: "6px",
              marginTop: "12px",
            }}
          >
            <Stack
              sx={{
                width: "100%",
                height: "100%",
                border: "1px solid black",
                borderRadius: "6px",
                overflow: "hidden",
              }}
            >
              {/* HEADER */}
              <Stack
                sx={{
                  width: "100%",
                  minHeight: "80px",
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
                    width: "3%",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "12px",
                    fontWeight: "700",
                    minHeight: "25px",
                  }}
                >
                  Area
                </Stack>
                <Stack
                  sx={{
                    width: "16%",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "12px",
                    fontWeight: "700",
                    minHeight: "25px",
                  }}
                >
                  Process
                </Stack>
                <Stack
                  sx={{
                    width: "81%",
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
                area="Material"
                boards={boards.filter((i) =>
                  ["material_team"].includes(i.process)
                )}
                sum={sumBoard(
                  boards.filter((i) => ["material_team"].includes(i.process))
                )}
              />

              <Stack
                sx={{
                  width: "100%",
                  flexDirection: "row",
                  // borderBottom: "1px solid black",
                  backgroundColor: "#b5a991",
                }}
              >
                <Stack
                  sx={{
                    width: "100%",
                    minHeight: "30px",
                    flexDirection: "row",
                  }}
                >
                  <Stack
                    sx={{
                      width: "19.96%",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRight: "1px solid black",
                      fontSize: "12px",
                      fontWeight: "700",
                    }}
                  >
                    Total Sum
                  </Stack>
                  <Stack sx={{ width: "85%", flexDirection: "row" }}>
                    {sumBoard(
                      boards.filter((i) =>
                        ["material_team"].includes(i.process)
                      )
                    ).map((i, index) => {
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
                            fontSize: "12px",
                            fontWeight: "400",
                          }}
                        >
                          <Stack
                            sx={{
                              width: "100%",
                              justifyContent: "center",
                              alignItems: "center",
                              borderRight: isLast
                                ? "none !important"
                                : "1px solid black",
                            }}
                          >
                            {i.leader +
                              i.worker +
                              i.feederMaterial +
                              i.feederTrash +
                              i.sick +
                              i.vacation}
                          </Stack>
                        </Stack>
                      );
                    })}
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
          {/* SALES TEAM */}
          <Stack
            sx={{
              width: "100%",
              minHeight: "auto",
              fontSize: "12px",
              borderRadius: "6px",
              marginTop: "12px",
            }}
          >
            <Stack
              sx={{
                width: "100%",
                height: "100%",
                border: "1px solid black",
                borderRadius: "6px",
                overflow: "hidden",
              }}
            >
              {/* HEADER */}
              <Stack
                sx={{
                  width: "100%",
                  minHeight: "80px",
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
                    width: "3%",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "12px",
                    fontWeight: "700",
                    minHeight: "25px",
                  }}
                >
                  Area
                </Stack>
                <Stack
                  sx={{
                    width: "16%",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "12px",
                    fontWeight: "700",
                    minHeight: "25px",
                  }}
                >
                  Process
                </Stack>
                <Stack
                  sx={{
                    width: "81%",
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
                area="Sales"
                boards={boards.filter((i) =>
                  ["sales_team"].includes(i.process)
                )}
                sum={sumBoard(
                  boards.filter((i) => ["sales_team"].includes(i.process))
                )}
              />

              <Stack
                sx={{
                  width: "100%",
                  flexDirection: "row",
                  // borderBottom: "1px solid black",
                  backgroundColor: "#b5a991",
                }}
              >
                <Stack
                  sx={{
                    width: "100%",
                    minHeight: "30px",
                    flexDirection: "row",
                  }}
                >
                  <Stack
                    sx={{
                      width: "19.96%",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRight: "1px solid black",
                      fontSize: "12px",
                      fontWeight: "700",
                    }}
                  >
                    Total Sum
                  </Stack>
                  <Stack sx={{ width: "85%", flexDirection: "row" }}>
                    {sumBoard(
                      boards.filter((i) => ["sales_team"].includes(i.process))
                    ).map((i, index) => {
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
                            fontSize: "12px",
                            fontWeight: "400",
                          }}
                        >
                          <Stack
                            sx={{
                              width: "100%",
                              justifyContent: "center",
                              alignItems: "center",
                              borderRight: isLast
                                ? "none !important"
                                : "1px solid black",
                            }}
                          >
                            {i.leader +
                              i.worker +
                              i.feederMaterial +
                              i.feederTrash +
                              i.sick +
                              i.vacation}
                          </Stack>
                        </Stack>
                      );
                    })}
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
          <Details boards={boards} />
          <DetailQuality boards={boards} />
          <DetailMaterial boards={boards} />
          <DetailSales boards={boards} />
        </Stack>
      )}
    </Stack>
  );
};
export default TotalStatistics;
export const HeaderShift = ({ title, isLast }) => {
  return (
    <Stack sx={{ width: "100%" }}>
      <Stack
        sx={{
          width: "100%",
          minHeight: "50%",
          justifyContent: "center",
          alignItems: "center",
          borderBottom: "1px solid black",
          borderRight: isLast ? "none" : "1px solid black",
          fontSize: "12px",
          fontWeight: "700",
        }}
      >
        {title}
      </Stack>
      <Stack
        sx={{
          width: "100%",
          minHeight: "50%",
          flexDirection: "row",
          "> *": {
            justifyContent: "center",
            alignItems: "center",
            borderRight: "1px solid black",
            textAlign: "center",
            "&:last-child": {
              borderRight: isLast ? "none" : "1px solid black",
            },
            fontSize: "10px",
            fontWeight: "700",
          },
        }}
      >
        <Stack sx={{ width: "16.66%" }}>Supervisor</Stack>
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
          width: "3.07%",
          justifyContent: "center",
          alignItems: "center",
          borderRight: "1px solid black",
          fontSize: "12px",
          fontWeight: "700",
        }}
      >
        {area}
      </Stack>

      <Stack
        sx={{
          width: "100%",
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
          status?.["totalParsed"].forEach((stat) => {
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
                minHeight: "25px",
                flexDirection: "row",
              }}
            >
              <Stack
                sx={{
                  width: "17.7%",
                  height: "100%",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRight: "1px solid black",
                  fontSize: "12px",
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
                {[accumulatedStatus, ...status?.["totalParsed"]].map(
                  (i, index) => {
                    const isLast =
                      index ===
                      [accumulatedStatus, ...status?.["totalParsed"]].length -
                        1;
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
                          fontSize: "12px",
                          fontWeight: "400",
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
                  }
                )}
              </Stack>
            </Stack>
          );
        })}
        <Stack
          sx={{
            minHeight: "25px",
            width: "100%",
            flexDirection: "row",
          }}
        >
          <Stack
            sx={{
              width: "17.7%",
              height: "100%",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              borderRight: "1px solid black",
              backgroundColor: "#d9cdb3",
              fontSize: "12px",
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
                    fontSize: "12px",
                    fontWeight: "400",
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
