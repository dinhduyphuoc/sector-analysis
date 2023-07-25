import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { Tabs } from "@mui/material";

export default function ItemTabs({ option, options, onChange }) {
  const selectedIndex = options.indexOf(option);

  return (
    <Tabs
      value={selectedIndex}
      onChange={onChange}
      aria-label="disabled tabs example"
    >
      {options.map((option) => {
        return <Tab label={option} key={option} />;
      })}
    </Tabs>
  );
}
