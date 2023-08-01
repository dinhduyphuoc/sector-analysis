import React, { useState } from "react";
import { TextField, Autocomplete } from "@mui/material";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";

export default function MultiSelect({
  options,
  onChange,
  selected,
  onInput,
  label,
  sx,
}) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Autocomplete
      sx={sx}
      multiple
      options={options}
      value={selected}
      onInput={onInput}
      onChange={onChange}
      getOptionLabel={(option) => option}
      disableCloseOnSelect
      renderOption={(props, option) => {
        return (
          <li {...props}>
            <span style={{ color: colors.text }}>{option}</span>
          </li>
        );
      }}
      renderInput={(params) => (
        <TextField {...params} variant="outlined" label={label} />
      )}
    />
  );
}
