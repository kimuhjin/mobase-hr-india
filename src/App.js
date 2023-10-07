/* eslint-disable react-hooks/exhaustive-deps */
import { ThemeProvider, createTheme } from "@mui/material";
import { Layout } from "./Composition/Common/Layout";
import { Body } from "./Composition/Common/Body";
import { SideBar } from "./Composition/SideBar/SideBar";
import Router from "./Router";
import { BrowserRouter } from "react-router-dom";
import NewSideBar from "./Composition/SideBar/NewSideBar";

const theme = createTheme({
  typography: {
    fontFamily: ["Inter", "Noto Sans", "sans-serif"].join(","),
  },
});

// Initialize Firebase

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Layout>
          {/* <SideBar /> */}
          <NewSideBar />
          <Body>
            <Router />
          </Body>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
