import Button from "@/components/UI/Button";
import { colors } from "@/common/constants";
import "./style.scss";

const Task = ({ task, onEdit }) => {
  const trimDescription = (description) => {
    if (description.length >= 100) return description.slice(0, 100) + "...";
    return description
  };
  return (
    <div className="task" style={{ borderColor: colors.light.primary }}>
      <div className="task__body">
        <h4 className="task__title">{task.title}</h4>
        <span className="task__description">
          {trimDescription(task.description)}
        </span>
      </div>

      <div className="task__actions">
        <Button small onClick={() => onEdit(task)}>
          Edit
        </Button>
      </div>
    </div>
  );
};

export default Task;
