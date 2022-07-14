import Card from "@mui/material/Card";

const Report = ({ task }) => {
  
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    let hourStr = date.getHours();
    let minStr = date.getMinutes();
    if (hourStr < 10) hourStr = `0${hourStr}`;
    if (minStr < 10) minStr = `0${minStr}`;
    return `${hourStr}:${minStr}`;
  };

  const formatWorkTime = (workTime) => {
    let delta = Math.floor(workTime / 1000);
    let days = Math.floor(delta / 86400);
    delta -= days * 86400;
    let hours = Math.floor(delta / 3600) % 24;
    hours += days * 24;
    delta -= hours * 3600;
    let minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;
    let seconds = delta % 60;
    let hourStr = hours;
    let minStr = minutes;
    let secStr = seconds;
    if (hours < 10) hourStr = `0${hours}`;
    if (minutes < 10) minStr = `0${minutes}`;
    if (seconds < 10) secStr = `0${seconds}`;
    return `${hourStr}:${minStr}:${secStr}`;
  };

  return (
    <Card variant="outlined" className="task-report">
      <div className="task-report__container container1">
        <div className="task-report__task-title">{task.title}</div>
        <div className="task-report__timelines">
          <ul>
            {task.timeLines.map((timeline) => (
              <li className="task-report__timeline" key={timeline.id}>
                <span>{formatTime(timeline.startTime)}</span>
                <span> - </span>
                <span>{formatTime(timeline.endTime)}</span>
                <span className="task-report__timeline-work-time">
                  {formatWorkTime(timeline.workTime)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="task-report__container task-report__work-time">
        <h4>{formatWorkTime(task.workTime)}</h4>
      </div>
    </Card>
  );
};

export default Report;
