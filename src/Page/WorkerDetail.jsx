import { Stack, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { WORKER_DATA } from "../Data/worker";

const WorkerDetail = () => {
  const { id } = useParams();
  const isNew = id.toLowerCase() === "new";
  const workerData = WORKER_DATA.filter((person) => person.id === id)[0];
  const {
    profileImage,
    name,
    firma,
    skill_matrix,
    info1,
    info2,
    info3,
    info4,
  } = workerData;
  console.log(workerData);
  return (
    <Stack sx={{ width: "100%", height: "100%", padding: "20px" }}>
      <Stack
        sx={{
          width: "100%",
          height: "100%",
          border: "1px solid black",
          flexDirection: "row",
        }}
      >
        {/* IMAGE SECTION */}
        <Stack
          sx={{
            width: "220px",
            height: "100%",
            borderRight: "1px solid black",
            justifyContent: "center",
            padding: "0px 10px",
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
                backgroundColor: "blue",
                maxHeight: "180px",
                writingMode: "vertical-lr",
                textOrientation: "upright",
              }}
            >
              {firma}
            </Stack>
            <img src={profileImage} alt={name} />
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
              {skill_matrix}
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
            {name}
          </Stack>
        </Stack>
        {/* INFO SECTION */}
        <Stack>
          <InfoSection label="name" value={name} />
          <InfoSection label="Firma" value={firma} />
          <InfoSection label="Skill Matrix" value={skill_matrix} />
          <InfoSection label="Info1" value={info1} />
          <InfoSection label="Info2" value={info2} />
          <InfoSection label="Info3" value={info3} />
          <InfoSection label="Info4" value={info4} />
        </Stack>
        <Stack
          sx={{ width: "100%", height: "100%", borderLeft: "1px solid black" }}
        ></Stack>
      </Stack>
    </Stack>
  );
};
export default WorkerDetail;
const InfoSection = ({ label, value }) => {
  return (
    <Stack sx={{ width: "100%", height: "48px", flexDirection: "row" }}>
      <Stack
        sx={{
          width: "200px",
          height: "100%",
          borderRight: "1px solid black",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          borderBottom: "1px solid black",
        }}
      >
        {label}
      </Stack>
      <Stack
        sx={{
          width: "200px",
          height: "100%",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          borderBottom: "1px solid black",
        }}
      >
        {value}
      </Stack>
    </Stack>
  );
};
