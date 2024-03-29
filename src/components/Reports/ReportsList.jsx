import { useDispatch, useSelector } from "react-redux";
import { Divider, Card } from "@mui/material";
import { getReports } from "../../store/slices/reportSlice";
import Report from "./Report";
import ReportsListHeader from "./ReportsListHeader";

const ReportsList = () => {
  const dispatch = useDispatch();
  const { reports } = useSelector((state) => state.report);
  const { currentUser } = useSelector((state) => state.auth);

  const selectDate = (startTime, endTime) => {
    dispatch(getReports({ startTime, endTime, workerId: currentUser.id }));
  };

  return (
    <>
      <ReportsListHeader onSelectDate={selectDate} />

      <div className="report-list" variant="outlined">
        <div className="report-list__list-holder">
          {reports.length ? (
            reports.map((report) => (
              <div key={report.date}>
                <h5 className="report-list__date">{report.date}</h5>
                {report.data &&
                  report.data.map((task) => (
                    <Report task={task} key={task.title} />
                  ))}
                <Divider />
              </div>
            ))
          ) : (
            <div className="report-list__no-reports">no reports</div>
          )}
        </div>
      </div>
    </>
  );
};

export default ReportsList;
