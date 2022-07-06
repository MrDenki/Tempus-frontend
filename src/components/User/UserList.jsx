import { useState } from "react";
import List from "@mui/material/List";
import UserListItem from "./UserListItem";
// import { TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@/components/UI/TextField";
import { Checkbox } from "@mui/material";
import Button from "@/components/UI/Button";

const UserList = ({ className, users, workers, footer }) => {
  const [addedWorkers, setAddedWorkers] = useState([]);
  const [searchText, setSearchText] = useState("");

  const handleClick = (userId) => {
    if (userInWorkers(userId)) {
      const _ = [...addedWorkers];
      const index = _.indexOf(userId);
      _.splice(index, 1);
      setAddedWorkers(_);
    } else {
      const _ = [...addedWorkers];
      _.push(userId);
      setAddedWorkers(_);
    }
  };

  const userInWorkers = (userId) => {
    return addedWorkers.includes(userId);
  };

  const [age, setAge] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <>
      <div className="user-list__header">
        <div className="user-list__header-item user-list__search">
          <TextField
            // className="user-list__search"
            small
            icon={<SearchIcon />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        <div className="user-list__header-item">
          <div className="circle">{addedWorkers.length}</div>
          <Button text>Appointed</Button>
        </div>
      </div>

      <div className={["user-list", className].join(" ")}>
        {!!users.length && (
          <List className="user-list__list">
            {users.map((user) => (
              <UserListItem
                selected={userInWorkers(user.id)}
                user={user}
                onClick={handleClick}
                key={user.id}
              />
            ))}
          </List>
        )}

        {!users.length && (
          <div className="user-list__no-users">No users??🤔</div>
        )}
      </div>

      {footer}
    </>
  );
};

export default UserList;
