import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import MUITextField from "@mui/material/TextField";
import Button from "@/components/UI/Button";
import TextField from "@/components/UI/TextField";
import BaseForm from "@/components/Forms/BaseForm";
import { useForm, useError } from "@/hooks";
import { required, minLength, maxLength } from "@/common/rules";
import { length } from "@/common/constants";
import { useEffect } from "react";
import { getUsers } from "@/store/slices/userSlice";
import { useState } from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import WorkIcon from "@mui/icons-material/Work";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  outline: "none",
  p: 4,
};

const CreateTaskModal = ({ show, onClose, onSubmit, isLoading }) => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);
  const { currentUser } = useSelector((state) => state.auth);
  const [selectedUserId, setSelectedUserId] = useState();

  useEffect(() => {
    dispatch(getUsers());
  }, []);

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
        // minLength: minLength(length.tastDescriptionMinLength),
        // maxLength: maxLength(length.taskDescriptionMaxLength),
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

    if (!selectedUserId) {
      console.log("not valid");
      return;
    }

    const data = new FormData(event.currentTarget);

    const task = {
      title: data.get("taskTitle"),
      description: data.get("taskDescription"),
      creatorId: currentUser.id,
      workerId : selectedUserId,
    };

    onSubmit(task);
    onClose()
  };

  const handleClick = (userId) => {
    setSelectedUserId(userId);
    console.log(userId);
  };

  return (
    <Modal open={show} onClose={onClose}>
      <div style={style}>
        <BaseForm title="New Task" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                className="form__input"
                label="Title"
                name="taskTitle"
                disabled={isLoading ? true : false}
                error={taskTitleError}
                helperText={taskTitleErrorMessage}
                value={form.taskTitle.value}
                onChange={(e) => form.taskTitle.onChange(e.target.value)}
                onBlur={form.taskTitle.blur}
              />
            </Grid>

            <Grid item xs={12}>
              <MUITextField
                label="Description"
                multiline
                fullWidth
                name="taskDescription"
                disabled={isLoading ? true : false}
                error={taskDescriptionError}
                helperText={taskDescriptionErrorMessage}
                value={form.taskDescription.value}
                onChange={(e) => form.taskDescription.onChange(e.target.value)}
                onBlur={form.taskDescription.blur}
              />
            </Grid>

            <Grid item xs={12}>
              {users.length && (
                <List
                  sx={{
                    width: "100%",
                    position: "relative",
                    overflow: "auto",
                    maxHeight: 100,
                    "& ul": { padding: 0 },
                  }}
                >
                  {users.map((user) => (
                    <ListItem
                      key={user.id}
                      onClick={() => handleClick(user.id)}
                    >
                      <ListItemAvatar>
                        <Avatar>
                          <WorkIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={`${user.firstName} ${user.lastName}`}
                        secondary={`${user.email}`}
                      />
                    </ListItem>
                  ))}
                </List>
              )}

              {!users.length && <div>Not users</div>}
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
      </div>
    </Modal>
  );
};

export default CreateTaskModal;
