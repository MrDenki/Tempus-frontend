import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import WorkIcon from "@mui/icons-material/Work";
import { Checkbox } from "@mui/material";

const UserListItem = ({ className, user, selected, onClick }) => {
  const classes = ["user-list__item"];
  if (selected) classes.push("selected");

  return (
    <ListItem className={classes.join(" ")} onClick={() => onClick(user.id)}>
      <Checkbox className="user-list__item-checkbox" checked={selected} />

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
  );
};

export default UserListItem;
