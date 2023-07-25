import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SelectSmall({ onChange, option, options, label }) {
  return (
    <FormControl sx={{ margin: "0 5px", minWidth: 120 }} size="medium">
      <InputLabel id="demo-select-small-label">Chỉ số</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={option}
        label={label}
        onChange={onChange}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
