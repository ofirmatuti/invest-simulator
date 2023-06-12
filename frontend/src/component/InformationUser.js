import React from "react";

import "./InformationUser.css";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

function InformationUser(props) {
  function handleInputChange(event) {
    props.setStartMonth(event.target.value);
  }

  function handleIntervalChange(event) {
    props.setInterval(event.target.value);
  }

  function handleInvestmentChange(event) {
    props.setInvestment(event.target.value);
  }

  return (
    <div className="container">
      <div className="input">
        <TextField
          type="text"
          id="startMonth"
          label="From date"
          variant="outlined"
          value={props.start_month}
          onChange={handleInputChange}
        />
      </div>
      <div className="input">
        <TextField
          type="number"
          id="investment"
          placeholder="Enter a investment"
          label="investment"
          variant="outlined"
          value={props.investment}
          onChange={handleInvestmentChange}
        />
      </div>
      <div className="input">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">interval</InputLabel>
          <Select
            labelId="Interval"
            id="interval"
            value={props.interval}
            onChange={handleIntervalChange}
            label="interval"
            style={{ width: "5cm" }}
          >
            <MenuItem value="1d">1 day</MenuItem>
            <MenuItem value="1wk">1 week</MenuItem>
            <MenuItem value="1mo">1 month</MenuItem>
            <MenuItem value="3mo">3 month</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
}

export default InformationUser;
