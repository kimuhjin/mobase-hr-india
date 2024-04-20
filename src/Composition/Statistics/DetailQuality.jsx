import { Stack } from "@mui/material";
import { HeaderShift } from "../../Page/TotalStatistics";

export const DetailQuality = ({ boards }) => {
  const sumBoard = (boards) => {
    const data_mobase = boards.map(({ label, status }) => {
      let accumulatedStatus = {};

      // 각 status 객체를 순회하며
      status?.["mobaseParsed"].forEach((stat) => {
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
        data: [accumulatedStatus, ...status?.["mobaseParsed"]],
      };
    });
    const data_get = boards.map(({ label, status }) => {
      let accumulatedStatus = {};

      // 각 status 객체를 순회하며
      status?.["getParsed"].forEach((stat) => {
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
        data: [accumulatedStatus, ...status?.["getParsed"]],
      };
    });
    const data_cl = boards.map(({ label, status }) => {
      let accumulatedStatus = {};

      // 각 status 객체를 순회하며
      status?.["clParsed"].forEach((stat) => {
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
        data: [accumulatedStatus, ...status?.["clParsed"]],
      };
    });

    const result_mobase = [];
    const result_get = [];
    const result_cl = [];

    // Initialize result with zeros
    for (let i = 0; i < data_mobase[0]?.data?.length; i++) {
      const initialData = {};
      for (let key in data_mobase[0]?.data[i]) {
        initialData[key] = 0;
      }
      result_mobase.push(initialData);
    }

    // Accumulate data
    for (let i = 0; i < data_mobase.length; i++) {
      for (let j = 0; j < data_mobase[i].data.length; j++) {
        for (let key in data_mobase[i].data[j]) {
          result_mobase[j][key] += data_mobase[i].data[j][key];
        }
      }
    }

    // Initialize result with zeros
    for (let i = 0; i < data_get[0]?.data?.length; i++) {
      const initialData = {};
      for (let key in data_get[0]?.data[i]) {
        initialData[key] = 0;
      }
      result_get.push(initialData);
    }

    // Accumulate data
    for (let i = 0; i < data_get.length; i++) {
      for (let j = 0; j < data_get[i].data.length; j++) {
        for (let key in data_get[i].data[j]) {
          result_get[j][key] += data_get[i].data[j][key];
        }
      }
    }
    // Initialize result with zeros
    for (let i = 0; i < data_cl[0]?.data?.length; i++) {
      const initialData = {};
      for (let key in data_cl[0]?.data[i]) {
        initialData[key] = 0;
      }
      result_cl.push(initialData);
    }

    // Accumulate data
    for (let i = 0; i < data_cl.length; i++) {
      for (let j = 0; j < data_cl[i].data.length; j++) {
        for (let key in data_cl[i].data[j]) {
          result_cl[j][key] += data_cl[i].data[j][key];
        }
      }
    }

    return {
      result_mobase,
      result_get,
      result_cl,
    };
  };
  return (
    <Stack sx={{ width: "100%", marginTop: "12px" }}>
      <Stack
        sx={{
          width: "100%",
          borderTop: "1px solid black",
          borderLeft: "1px solid black",
          borderRight: "1px solid black",
          fontSize: "10px",
          borderRadius: "6px",
          overflow: "hidden",
          boxSizing: "border-box",
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
              width: "10%",
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
              width: "6%",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "12px",
              fontWeight: "700",
            }}
          >
            Division
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
          boards={boards.filter((i) => ["quality_team"].includes(i.process))}
          sum={sumBoard(
            boards.filter((i) => ["quality_team"].includes(i.process))
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

              flexDirection: "row",
            }}
          >
            <Stack sx={{ width: "19.6%", flexDirection: "row" }}>
              <Stack
                sx={{
                  width: "68.5%",
                  height: "100%",
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
              <Stack
                sx={{
                  width: "31.5%",
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRight: "1px solid black",
                  fontSize: "10px",
                  fontWeight: "700",
                }}
              >
                <Stack
                  sx={{
                    width: "100%",
                    height: "100%",
                    borderBottom: "1px solid black",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Mobase
                </Stack>
                <Stack
                  sx={{
                    width: "100%",
                    height: "100%",
                    borderBottom: "1px solid black",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Get
                </Stack>
                <Stack
                  sx={{
                    width: "100%",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Cl
                </Stack>
              </Stack>
            </Stack>
            <Stack sx={{ width: "83.5%" }}>
              <Stack
                sx={{
                  flexDirection: "row",
                  borderBottom: "1px solid black",
                  minHeight: "20px",
                }}
              >
                {sumBoard(
                  boards.filter((i) => ["quality_team"].includes(i.process))
                )?.result_mobase.map((i, index) => {
                  const isLast =
                    index ===
                    sumBoard(
                      boards.filter((i) => ["quality_team"].includes(i.process))
                    )?.result_mobase.length -
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
              <Stack
                sx={{
                  flexDirection: "row",
                  height: "20px",
                  borderBottom: "1px solid black",
                }}
              >
                {sumBoard(
                  boards.filter((i) => ["quality_team"].includes(i.process))
                )?.result_get.map((i, index) => {
                  const isLast =
                    index ===
                    sumBoard(
                      boards.filter((i) => ["quality_team"].includes(i.process))
                    )?.result_get?.length -
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
              <Stack sx={{ flexDirection: "row", height: "20px" }}>
                {sumBoard(
                  boards.filter((i) => ["quality_team"].includes(i.process))
                )?.result_cl.map((i, index) => {
                  const isLast =
                    index ===
                    sumBoard(
                      boards.filter((i) => ["quality_team"].includes(i.process))
                    )?.result_cl?.length -
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
          width: "3%",
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
          width: "97%",
          "> *": {
            borderBottom: "1px solid black",
            "&:last-child": {
              borderBottom: "none",
            },
          },
        }}
      >
        {boards.map(({ label, status }) => {
          let accumulatedStatus_mobase = {};
          status?.["mobaseParsed"].forEach((stat) => {
            for (let key in stat) {
              if (!accumulatedStatus_mobase[key]) {
                accumulatedStatus_mobase[key] = 0;
              }
              accumulatedStatus_mobase[key] += stat[key];
            }
          });
          let accumulatedStatus_get = {};
          status?.["getParsed"].forEach((stat) => {
            for (let key in stat) {
              if (!accumulatedStatus_get[key]) {
                accumulatedStatus_get[key] = 0;
              }
              accumulatedStatus_get[key] += stat[key];
            }
          });
          let accumulatedStatus_cl = {};
          status?.["clParsed"].forEach((stat) => {
            for (let key in stat) {
              if (!accumulatedStatus_cl[key]) {
                accumulatedStatus_cl[key] = 0;
              }
              accumulatedStatus_cl[key] += stat[key];
            }
          });
          return (
            <Stack
              sx={{
                width: "100%",
                height: "100%",
                flexDirection: "row",
              }}
            >
              <Stack
                sx={{
                  width: "10.32%",
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
                  width: "6.18%",
                  height: "100%",

                  justifyContent: "center",
                  alignItems: "center",
                  borderRight: "1px solid black",
                  fontSize: "10px",
                  fontWeight: "700",
                }}
              >
                <Stack
                  sx={{
                    width: "100%",
                    height: "100%",
                    borderBottom: "1px solid black",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Mobase
                </Stack>
                <Stack
                  sx={{
                    width: "100%",
                    height: "100%",
                    justifyContent: "center",
                    borderBottom: "1px solid black",
                    alignItems: "center",
                  }}
                >
                  Get
                </Stack>
                <Stack
                  sx={{
                    width: "100%",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Cl
                </Stack>
              </Stack>
              <Stack
                sx={{
                  width: "83.5%",
                }}
              >
                <Stack
                  sx={{
                    flexDirection: "row",
                    borderBottom: "1px solid black",
                    minHeight: "20px",
                  }}
                >
                  {[accumulatedStatus_mobase, ...status?.["mobaseParsed"]].map(
                    (i, index) => {
                      const isLast =
                        index ===
                        [accumulatedStatus_mobase, ...status?.["mobaseParsed"]]
                          .length -
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
                    }
                  )}
                </Stack>
                <Stack
                  sx={{
                    flexDirection: "row",
                    borderBottom: "1px solid black",
                    minHeight: "20px",
                  }}
                >
                  {[accumulatedStatus_get, ...status?.["getParsed"]].map(
                    (i, index) => {
                      const isLast =
                        index ===
                        [accumulatedStatus_get, ...status?.["getParsed"]]
                          .length -
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
                    }
                  )}
                </Stack>
                <Stack
                  sx={{
                    flexDirection: "row",
                    minHeight: "20px",
                  }}
                >
                  {[accumulatedStatus_cl, ...status?.["clParsed"]].map(
                    (i, index) => {
                      const isLast =
                        index ===
                        [accumulatedStatus_cl, ...status?.["clParsed"]].length -
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
                    }
                  )}
                </Stack>
              </Stack>
            </Stack>
          );
        })}
        <Stack
          sx={{
            width: "100%",
            flexDirection: "row",
          }}
        >
          <Stack
            sx={{
              width: "10.32%",
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
              width: "6.18%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
              borderRight: "1px solid black",
              backgroundColor: "#d9cdb3",
              fontSize: "10px",
              fontWeight: "700",
            }}
          >
            <Stack
              sx={{
                width: "100%",
                height: "100%",
                borderBottom: "1px solid black",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Mobase
            </Stack>
            <Stack
              sx={{
                width: "100%",
                height: "100%",
                borderBottom: "1px solid black",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Get
            </Stack>
            <Stack
              sx={{
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Cl
            </Stack>
          </Stack>
          <Stack
            sx={{
              width: "83.5%",
              height: "100%",
            }}
          >
            <Stack
              sx={{
                flexDirection: "row",
                borderBottom: "1px solid black",
                minHeight: "20px",
              }}
            >
              {sum?.result_mobase.map((i, index) => {
                const isLast = index === sum?.result_mobase?.length - 1;
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
            <Stack
              sx={{
                flexDirection: "row",
                height: "20px",
                borderBottom: "1px solid black",
              }}
            >
              {sum?.result_get.map((i, index) => {
                const isLast = index === sum?.result_get.length - 1;
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
            <Stack sx={{ flexDirection: "row", height: "20px" }}>
              {sum?.result_cl.map((i, index) => {
                const isLast = index === sum?.result_cl.length - 1;
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
    </Stack>
  );
};
