import Card from "@mui/material/Card";
import moment from "moment";

const Report = ({ task }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return `${date.getFullYear()}.${date.getMonth()}.${date.getDay()} ${date.getHours()}.${date.getMinutes()}`
  };
  return (
    <Card className="task-report">
      <div className="task-report__task-title">{task.title}</div>
      {task.TimeLines.map((timeline) => (
        <div key={timeline.id}>
          <span>{formatDate(timeline.startTime)}</span>
          <span> - </span>
          <span>{formatDate(timeline.endTime)}</span>
        </div>
      ))}
    </Card>
  );
};

export default Report;
