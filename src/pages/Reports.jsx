import ReportsList from "../components/Reports/ReportsList";
import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Button from "@/components/UI/Button";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import IconButton from "@mui/material/IconButton";

const Reports = () => {
  const [value, setValue] = useState("Day");
  const [firstDate, setFirstDate] = useState(new Date());
  const [lastDate, setLastDate] = useState();

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className="reports-page">
      <div className="reports-page__header">
        <div className="reports-page__dropdown">
          <FormControl fullWidth>
            <Select value={value} onChange={handleChange}>
              <MenuItem value={"Day"}>Day</MenuItem>
              <MenuItem value={"Custom"}>Custom</MenuItem>

              {/* <MenuItem value={"Week"}>Week</MenuItem> */}
              {/* <MenuItem value={"Month"}>Month</MenuItem> */}
            </Select>
          </FormControl>
        </div>

        <div className="reports-page__calendar">
          <div className="reports-page__check-in">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label={value == "Day" ? "Day" : "Check-in"}
                value={firstDate}
                onChange={(newValue) => {
                  setFirstDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
          {value == "Day" ? (
            <></>
          ) : (
            <div className="reports-page__check-out">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Check-out"
                  value={lastDate}
                  onChange={(newValue) => {
                    setLastDate(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </div>
          )}
        </div>
        {value == "Custom" ? (
          <></>
        ) : (
          <div className="reports-page__button">
            <IconButton
              size="medium"
              onClick={() =>
                setFirstDate(
                  new Date(firstDate.setDate(firstDate.getDate() - 1))
                )
              }
            >
              <ArrowBackIosNewIcon />
            </IconButton>
            <IconButton
              size="medium"
              onClick={() =>
                setFirstDate(
                  new Date(firstDate.setDate(firstDate.getDate() + 1))
                )
              }
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </div>
        )}
      </div>

      <div className="report-page__body">
        <div className="reports__reports-list">
          <ReportsList />
        </div>
      </div>
    </div>
  );
};

export default Reports;
