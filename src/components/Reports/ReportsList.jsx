import { useDispatch, useSelector } from "react-redux";
import Card from "@mui/material/Card";
import { Divider } from "@mui/material";
import Report from "./Report";
import { getReports } from "../../store/slices/reportSlice";
import { useEffect } from "react";
import ReportsListHeader from "./ReportsListHeader";

const ReportsList = () => {
  const dispatch = useDispatch();
  const { reports } = useSelector((state) => state.report);
  const { currentUser } = useSelector((state) => state.auth);

  const selectDate = (startTime, endTime) => {
    dispatch(getReports({ startTime, endTime, workerId: currentUser.id }));
  };

  // useEffect(() => {
  //   const startTime = new Date(new Date().setHours(0))
  //   const endTime = new Date();
  //   dispatch(getReports({ startTime, endTime, workerId: currentUser.id }));
  // }, []);

  return (
    <>
      <ReportsListHeader onSelectDate={selectDate} />

      <Card className="report-list" variant="outlined">
        <div className="report-list__list-holder">
          {reports ? (
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
            <div>no reports</div>
          )}
        </div>
      </Card>
    </>
  );
};

export default ReportsList;
