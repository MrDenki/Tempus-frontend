import { useEffect, useState } from "react";
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
import { Card } from "@mui/material";

const ReportsListHeader = ({ onSelectDate }) => {
  const [value, setValue] = useState("Day");
  const [firstDate, setFirstDate] = useState(new Date());
  const [lastDate, setLastDate] = useState(new Date());

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const selectFirstDate = (date) => {
    if (value === "Day") {
      const date1 = new Date(date);
      date.setUTCHours(0, 0, 0, 0);
      date1.setUTCHours(23, 59, 59, 999);
      setFirstDate(date);
      onSelectDate(date, date1);
    } else {
      setFirstDate(date);
      date.setUTCHours(0, 0, 0, 0);
      onSelectDate(date, lastDate);
    }
  };

  const selectYesterdayDay = () => {
    const date = new Date(firstDate.setDate(firstDate.getDate() - 1));
    const date1 = new Date(date);

    date.setUTCHours(0, 0, 0, 0);
    date1.setUTCHours(23, 59, 59, 999);

    setFirstDate(date);
    onSelectDate(date, date1);
  };

  const selectTomorrowDay = () => {
    const date = new Date(firstDate.setDate(firstDate.getDate() + 1));
    const date1 = new Date(date);

    date.setUTCHours(0, 0, 0, 0);
    date1.setUTCHours(23, 59, 59, 999);

    setFirstDate(date);
    onSelectDate(date, date1);
  };

  const selectSecondDate = (date) => {
    date.setUTCHours(23, 59, 59, 999);
    setLastDate(date);
    onSelectDate(firstDate, date);
  };

  useEffect(() => {
    firstDate.setUTCHours(0, 0, 0, 0);
    lastDate.setUTCHours(23, 59, 59, 999);
    onSelectDate(firstDate, lastDate);
  }, []);

  return (
    <div className="report-list__header">
      <div className="report-list__container">
        <div className="report-list__dropdown">
          <FormControl className="report-list__filter-type">
            <Select value={value} onChange={handleChange}>
              <MenuItem value={"Day"}>Day</MenuItem>
              <MenuItem value={"Custom"}>Custom</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className="report-list__calendar">
          <div className="report-list__check-in">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label={value == "Day" ? "Day" : "Check-in"}
                value={firstDate}
                onChange={selectFirstDate}
                inputFormat="dd MMM yyyy"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    className="report-list__report-input"
                  />
                )}
              />
            </LocalizationProvider>
          </div>
          {value == "Day" ? (
            <></>
          ) : (
            <div className="report-list__check-out">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Check-out"
                  value={lastDate}
                  onChange={selectSecondDate}
                  inputFormat="dd MMM yyyy"
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      className="report-list__report-input"
                    />
                  )}
                />
              </LocalizationProvider>
            </div>
          )}
        </div>
        {value == "Custom" ? (
          <></>
        ) : (
          <div className="report-list__buttons">
            <IconButton
              size="medium"
              className="report-list__button"
              onClick={selectYesterdayDay}
            >
              <ArrowBackIosNewIcon />
            </IconButton>

            <IconButton
              size="medium"
              className="report-list__button"
              onClick={selectTomorrowDay}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportsListHeader;
