import Button from "@/components/UI/Button";
import { colors } from "@/common/constants";
import "./style.scss";

const Task = ({ task, onEdit }) => {
  const trimDescription = (description) => {
    return description.slice(0, 100) + '...'
  }
  return (
    <div className="task" style={{ borderColor: colors.light.primary }}>
      <div className="task__body">
        <h4 className="task__title">{task.title}</h4>
        <span className="task__description">{trimDescription(task.description)}</span>
      </div>

      <div className="task__actions">
        <Button small onClick={onEdit}>
          Edit
        </Button>
      </div>
    </div>
  );
};

export default Task;
