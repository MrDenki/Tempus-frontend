import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Button from "@/components/UI/Button";
import TextField from "@/components/UI/TextField";
import BaseForm from "@/components/Forms/BaseForm";
import { useForm, useError } from "@/hooks";
import { required, validTaskTitle, validTaskDescription } from "@/common/rules";
import { length } from "@/common/constants";

const handleSubmit = (event) => {
  event.preventDefault();

  if (!form.valid()) {
    form.touchFields();
    return;
  }
};

const CreateTaskForm = ({ onSubmit, isLoading }) => {
  const form = useForm({
    title: {
      validators: {
        required,
        validTaskTitle,
      },
    },
    description: {
      validators: {
        required,
        validTaskDescription,
      },
    },
  });
};

const CreateTask = () => {
  return (
    <BaseForm title="New Task" onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            className="form__input"
            label="Title"
            name="task_name"
            //   disabled={isLoading}
            //   value={form.email.value}
            //   onChange={(e) => form.email.onChange(e.target.value)}
            //   onBlur={form.email.blur}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            className="form__input"
            label="Description"
            name="task_description"
            //   disabled={isLoading}
            //   value={form.email.value}
            //   onChange={(e) => form.email.onChange(e.target.value)}
            //   onBlur={form.email.blur}
          />
        </Grid>

        <Grid item xs={12}>
          <Button
            className="form__button"
            type="submit"
            // disabled={isLoading}
            fullWidth
          >
            Add Task
          </Button>
        </Grid>
      </Grid>
    </BaseForm>
  );
};

export default CreateTask;
