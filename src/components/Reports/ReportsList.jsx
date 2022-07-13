import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "@mui/material/Card";
import Report from "./Report";

const ReportsList = () => {
  // const dispatch = useDispatch()
  const { reports } = useSelector((state) => state.report);

  // useEffect(() => {
  // dispatch()
  // }, []);

  console.log(reports);
  return (
    <Card className="report-list">
      {reports ? (
        reports.map((task) => <Report task={task} key={task.id} />)
      ) : (
        <div>no reports</div>
      )}
    </Card>
  );
};

export default ReportsList;
