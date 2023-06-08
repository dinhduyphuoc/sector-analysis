import { Autocomplete, TextField } from "@mui/material";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";

const SearchBar = ({ options, label, onKeyDown, onChange, onInput }) => {
  return (
    <Autocomplete
      id="search_bar"
      sx={{ width: 300 }}
      options={options}
      getOptionLabel={(option) => option.name}
      onInput={onInput}
      onChange={onChange}
      autoSelect
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          margin="normal"
          onKeyDown={onKeyDown}
        />
      )}
      renderOption={(props, option, { inputValue }) => {
        const matches = match(option.name, inputValue, { insideWords: true });
        const parts = parse(option.name, matches);

        return (
          <li {...props}>
            <div>
              {parts.map((part, index) => (
                <span
                  key={index}
                  style={{
                    fontWeight: part.highlight ? 700 : 400,
                  }}
                >
                  {part.text}
                </span>
              ))}
            </div>
          </li>
        );
      }}
    />
  );
};

export default SearchBar;