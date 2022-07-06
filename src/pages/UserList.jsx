import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import Button from "@/components/UI/Button";
import { getUsers } from "@/store/slices/userSlice";
import UserList from "@/components/User/UserList";

const Users = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);

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

          {/* <div className="test">
            <UserList className="test" users={users} />
          </div> */}
        </div>
      </Grid>
    </Grid>
  );
};

export default Users;
