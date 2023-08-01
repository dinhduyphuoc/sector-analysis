import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { Tabs } from "@mui/material";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";

export default function ItemTabs({ option, options, onChange }) {
  const selectedIndex = options.indexOf(option);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Tabs
      value={selectedIndex}
      onChange={onChange}
      aria-label="disabled tabs example"
      textColor={colors.blueAccent[100]}
      indicatorColor={colors.blueAccent[400]}
    >
      {options.map((option) => {
        return <Tab label={option} key={option} />;
      })}
    </Tabs>
  );
}
