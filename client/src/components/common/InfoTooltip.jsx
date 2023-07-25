import * as React from "react";
import InfoIcon from "@mui/icons-material/Info";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { Typography } from "@mui/material";

export default function InfoTooltip({ title }) {
  return (
    <Tooltip title={title} placement="top">
      <sup>
        <Typography style={{ display: "inline-block" }}>
          <InfoIcon fontSize="1px" />
        </Typography>
      </sup>
    </Tooltip>
  );
}
