import * as React from "react";
import Button from "../components/UI/Button";
import BaseForm from "@/components/Forms/BaseForm";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
// import TextField from "@/components/UI/TextField";
import { useForm, useError } from "@/hooks";
import { required, minLength, maxLength } from "@/common/rules";
import { length } from "@/common/constants";
import TextField from '@mui/material/TextField';

const CreateTaskModal = ({ onSubmit, isLoading }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const form = useForm({
    taskTitle: {
      validators: {
        required,
        minLength: minLength(length.taskTitleMinLength),
        maxLength: maxLength(length.taskTitleMaxLength),
      },
    },
    taskDescription: {
      validators: {
        required,
        minLength: minLength(length.tastDescriptionMinLength),
        maxLength: maxLength(length.taskDescriptionMaxLength),
      },
    },
  });

  const [taskTitleError, taskTitleErrorMessage] = useError(form.taskTitle);
  const [taskDescriptionError, taskDescriptionErrorMessage] = useError(
    form.taskDescription
  );

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.valid()) {
      form.touchFields();
      return;
    }

    const data = new FormData(event.currentTarget);

    const credentials = {
      taskTitle: data.get("taskTitle"),
      taskDescription: data.get("taskDescription"),
    };

    onSubmit(credentials);
  };

  return (
    <div>
      <Button onClick={handleOpen}>Add Task</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

        <BaseForm title="New Task" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                className="form__input"
                label="Title"
                name="task_title"
                disabled={isLoading}
                error={taskTitleError}
                helperText={taskTitleErrorMessage}
                value={form.taskTitle.value}
                onChange={(e) => form.taskTitle.onChange(e.target.value)}
                onBlur={form.taskTitle.blur}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                id="outlined-multiline-static"
                label="Description"
                multiline
                minrows={4}
                defaultValue="Default Value"
                name="task_description"
                disabled={isLoading}
                error={taskDescriptionError}
                helperText={taskDescriptionErrorMessage}
                value={form.taskDescription.value}
                onChange={(e) => form.taskDescription.onChange(e.target.value)}
                onBlur={form.taskDescription.blur}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                className="form__button"
                type="submit"
                disabled={isLoading}
                fullWidth
              >
                Add Task
              </Button>
            </Grid>
          </Grid>
        </BaseForm>
      </Modal>
    </div>
  );
};

export default CreateTaskModal;
