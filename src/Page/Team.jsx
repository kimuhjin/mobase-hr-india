import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
  Typography,
} from "@mui/material";
import { GridExpandMoreIcon } from "@mui/x-data-grid";
import { BoardsContainer } from "../Composition/Board/BoardsContainer";
import { useState } from "react";

export const GROUP_LIST = [
  { label: "0th floor (1KS & 4MT)", id: "1ks_4mt" },
  { label: "0th floor  (OFD)", id: "ofd" },
  { label: "clean room (5SR)", id: "5sr" },
  { label: "clean room (3CL)", id: "3cl" },
  { label: "1st floor (Ren)", id: "ren" },
  { label: "smt  (SMT)", id: "smt" },
];
export const Team = () => {
  const [focused, setFocused] = useState([]);

  return (
    <Stack sx={{ width: "100%", padding: "20px", overflowY: "scroll" }}>
      <Typography
        sx={{ fontSize: "28px", fontWeight: "700", marginBottom: "20px" }}
      >
        Worker List
      </Typography>
      {GROUP_LIST.map(({ label, id }, index) => {
        return (
          <Accordion
            key={index}
            onChange={(e, expanded) => {
              if (expanded) {
                setFocused((prev) => [...prev, id]);
              } else {
                const newFocused = focused.filter((i) => i !== id);
                setFocused(newFocused);
              }
            }}
          >
            <AccordionSummary
              expandIcon={<GridExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>{label}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ width: "100%", height: "100%" }}>
              {focused.includes(id) && <BoardsContainer id={id} />}
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Stack>
  );
};
