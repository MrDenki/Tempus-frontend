import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import Button from "@/components/UI/Button";
import { getUsers } from "@/store/slices/userSlice";

const UserList = () => {
  const { users } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item textAlign="center">
        <div>
          {users.map((user) => (
            <div key={user.id}>{user.firstName}</div>
          ))}
        </div>
      </Grid>
    </Grid>
  );
};

export default UserList;
