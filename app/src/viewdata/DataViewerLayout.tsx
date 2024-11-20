import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Tab from "@mui/material/Tab";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { setToken } from "./ViewData.tsx";

type DataViewerLayoutProps = {
  setLoggedIn: (value: boolean) => void;
};
export default function DataViewerLayout({
  setLoggedIn,
}: DataViewerLayoutProps) {
  const [tab, setTab] = useState<"data" | "accounts">("data");
  return (
    <Box
      sx={{
        width: 1,
        height: 1,
      }}>
      <AppBar position="static">
        <Toolbar>
          <TrendingUpIcon
            fontSize="large"
            sx={{
              mr: 2,
            }}
          />
          <Typography
            variant="h1"
            fontSize="large"
            sx={{
              flex: 1,
            }}>
            Indiana Scouting Alliance
          </Typography>
          <Button
            sx={{
              color: "primary.contrastText",
            }}
            onClick={() => {
              setToken("", 0);
              setLoggedIn(false);
            }}>
            Log Out
          </Button>
        </Toolbar>
      </AppBar>
      <TabContext value={tab}>
        <Box>
          <TabList
            onChange={(_event, value) => {
              setTab(value);
            }}>
            <Tab
              label="Data"
              value="data"
            />
            <Tab
              label="Manage Accounts"
              value="accounts"
            />
          </TabList>
        </Box>
        <TabPanel value="data">Data</TabPanel>
        <TabPanel value="accounts">Accounts</TabPanel>
      </TabContext>
    </Box>
  );
}
