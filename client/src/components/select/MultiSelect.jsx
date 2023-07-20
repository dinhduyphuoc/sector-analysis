import React, { useState } from "react";
import { TextField, Autocomplete } from "@mui/material";

export default function MultiSelect({
  options,
  onChange,
  selected,
  onInput,
  label,
  sx,
}) {
  const [selectedOptions, setSelectedOptions] = useState([]);
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
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label={label}
          placeholder={label}
        />
      )}
    />
  );
}
