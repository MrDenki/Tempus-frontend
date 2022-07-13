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
              onChange={selectFirstDate}
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
                onChange={selectSecondDate}
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
          <IconButton size="medium" onClick={selectYesterdayDay}>
            <ArrowBackIosNewIcon />
          </IconButton>

          <IconButton size="medium" onClick={selectTomorrowDay}>
            <ArrowForwardIosIcon />
          </IconButton>
        </div>
      )}
    </div>
  );
};

export default ReportsListHeader;
