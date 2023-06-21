import React from "react";
import { Box } from "@mui/material";

const PieScore = ({ value }) => {
  return (
    <Box
      sx={{
        color: value >= 7 ? "#66bb6a" : value >= 5 ? "#ffc107" : "#eb1d24",
        width: "220px",
        height: "220px",
        // draw background based on value
        backgroundImage: `conic-gradient(
    ${value >= 7 ? "#66bb6a" : value >= 5 ? "#ffc107" : "#eb1d24"} 0% ${value *
          10}%,
    #20232e ${value * 10}% 
  )`,
        boxShadow: `0 0 15px ${
          value >= 7 ? "#66bb6a" : value >= 5 ? "#ffc107" : "#eb1d24"
        }`,
        userSelect: "none",
        borderRadius: "50%",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        margin: "45px auto 30px",
        fontSize: "50px",
        fontWeight: "700",
      }}
    >
      <Box zIndex="1">{value}&nbsp;/&nbsp;10</Box>
    </Box>
  );
};

export default PieScore;
