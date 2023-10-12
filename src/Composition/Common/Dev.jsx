import styled from "@emotion/styled";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Link,
  Stack,
  TextField,
} from "@mui/material";

export const Dev = ({ open, onClose }) => {
  const CoinContainer = styled("div")`
    width: 200px;
    height: 200px;
    perspective: 2000px;
    cursor: pointer;
  `;

  const Coin = styled("div")`
    width: 100%;
    height: 100%;
    position: relative;
    transform-style: preserve-3d;
    animation: spin 3s infinite linear;

    @keyframes spin {
      0% {
        transform: rotateY(0deg);
      }
      50% {
        transform: rotateY(180deg);
      }
      100% {
        transform: rotateY(360deg);
      }
    }
  `;

  const Face = styled("div")`
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    backface-visibility: hidden;
  `;

  const Front = styled(Face)`
    background: url("./images/profile.jpeg") no-repeat center;
    background-size: cover;
  `;

  const Back = styled(Face)`
    background-color: black;
    transform: rotateY(180deg);
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    font-weight: 700;
  `;
  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        ".MuiPaper-root": {
          width: "600px",
        },
      }}
    >
      <DialogTitle></DialogTitle>
      <DialogContent sx={{ margin: "0px", textAlign: "center" }}>
        <Stack
          sx={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <CoinContainer
            onClick={() => {
              window.open("https://dentbird.com/company/", "_blank");
            }}
          >
            <Coin>
              <Front></Front>
              <Back>Uhjin Kim</Back>
            </Coin>
          </CoinContainer>
        </Stack>
        If you experience any problems with using the service,
        <br /> please contact the e-mail below or your internal representative.
        <Stack
          onClick={() => (window.location = "mailto:ajin0714@imagoworks.ai")}
        >
          <Link sx={{ cursor: "pointer" }}>ajin0714@imagoworks.ai</Link>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};
