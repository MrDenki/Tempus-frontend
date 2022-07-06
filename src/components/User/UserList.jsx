import { useState, useEffect } from "react";
import List from "@mui/material/List";
import UserListItem from "./UserListItem";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@/components/UI/TextField";
import Button from "@/components/UI/Button";
import { useDebounce } from "@/hooks";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "@/store/slices/userSlice";
import { assignWorker, unassignWorker } from "../../store/slices/tasksSlice";
import Spiner from "@/components/UI/Spiner";

const UserList = ({ className, selectedTask, onSearch }) => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [isShowOnlyAssignedUsers, setIsShowOnlyAssignedUsers] = useState(false);
  const debouncedOnSearch = useDebounce(onSearch, 500);
  const { users } = useSelector((state) => state.user);
  const { isLoading, isSearch } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const showOnlyAssignedUsers = () => {
    if (!isShowOnlyAssignedUsers) {
      dispatch(getUsers({ taskId: selectedTask.id }));
      setIsShowOnlyAssignedUsers(true);
    } else {
      dispatch(getUsers());
      setIsShowOnlyAssignedUsers(false);
    }
  };

  const searchTask = (e) => {
    setSearchText(e.target.value);
    debouncedOnSearch(e.target.value);
  };

  const selectUser = (userId) => {
    let isUserSelected = false;
    selectedTask.workers.forEach((worker) => {
      if (worker.workerId === userId) isUserSelected = true;
    });

    const obj = {
      taskId: selectedTask.id,
      workerId: userId,
    };

    if (isUserSelected) dispatch(unassignWorker(obj));
    else dispatch(assignWorker(obj));
  };

  const isUserAssignedToCurrentTask = (userId) => {
    if (!selectedTask) return;

    let selected = false;
    selectedTask.workers.forEach((worker) => {
      if (worker.workerId === userId) selected = true;
    });

    return selected;
  };

  return (
    <>
      <div className="user-list__header">
        <div className="user-list__header-item user-list__search">
          <TextField
            small
            icon={<SearchIcon />}
            value={searchText}
            onChange={searchTask}
          />
        </div>

        <div className="user-list__header-item">
          <div className="circle">{selectedTask && selectedTask.workers && selectedTask.workers.length}</div>
          <Button text onClick={showOnlyAssignedUsers}>
            {isShowOnlyAssignedUsers ? 'Assigned': 'Unassigned'}
          </Button>
        </div>
      </div>

      <div className={["user-list", className].join(" ")}>
        {!!users.length && (
          <List className="user-list__list">
            {users.map((user) => (
              <UserListItem
                selected={isUserAssignedToCurrentTask(user.id)}
                user={user}
                onClick={selectUser}
                key={user.id}
              />
            ))}
          </List>
        )}

        {!users.length && (isLoading || isSearch) && (
          <div className="user-list__spiner">
            <Spiner />
          </div>
        )}

        {!users.length && !isLoading && !isSearch && (
          <div className="user-list__no-users">
            <span className="user-list__no-users-smile">🤔</span>
            No users??
          </div>
        )}
      </div>
    </>
  );
};

export default UserList;
