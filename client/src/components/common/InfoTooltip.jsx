import * as React from "react";
import InfoIcon from "@mui/icons-material/Info";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";

export default function InfoTooltip({ title }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Tooltip title={title} placement="top">
      <sup>
        <Typography style={{ display: "inline-block" }}>
          <InfoIcon fontSize="1px" style={{ fill: colors.text }} />
        </Typography>
      </sup>
    </Tooltip>
  );
}
