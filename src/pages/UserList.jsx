import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import { getUsers } from "@/store/slices/userSlice";

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
        </div>
      </Grid>
    </Grid>
  );
};

export default Users;
