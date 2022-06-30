import List from "@mui/material/List";
import Task from "../Task";
import Button from "@/components/UI/Button";

const TaskList = ({ tasks, onCreate, onEdit }) => {
  return (
    <>
      <Button success onClick={() => onCreate()}>
        Create new task
      </Button>

      {/* onDelete={() => onDelete(task.id)} */}
      {/* onUpdate={() => onUpdate(task.id)} */}

      {!!tasks.length && (
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          {tasks.length && tasks.map((task) => (
            <Task task={task} onEdit={onEdit} key={task.id} />
          ))}
        </List>
      )}

      {!tasks.length && <div>No tasks</div>}
    </>
  );
};

export default TaskList;
