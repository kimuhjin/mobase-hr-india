import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
  Typography,
} from "@mui/material";
import { GridExpandMoreIcon } from "@mui/x-data-grid";

const GROUP_LIST = [
  { label: "0th floor (1KS & 4MT)", id: "1ks_4mt" },
  { label: "0th floor  (OFD)", id: "ofd" },
  { label: "clean room (5SR)", id: "5sr" },
  { label: "clean room (3CL)", id: "3cl" },
  { label: "1st floor (Ren)", id: "ren" },
  { label: "smt  (SMT)", id: "smt" },
];
export const Team = () => {
  return (
    <Stack sx={{ width: "100%", padding: "20px" }}>
      <Typography
        sx={{ fontSize: "28px", fontWeight: "700", marginBottom: "20px" }}
      >
        Worker List
      </Typography>
      {GROUP_LIST.map(({ label }, index) => {
        return (
          <Accordion key={index}>
            <AccordionSummary
              expandIcon={<GridExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>{label}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Stack>
  );
};
