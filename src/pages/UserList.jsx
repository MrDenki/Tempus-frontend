import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import Button from "@/components/UI/Button";
import { getUsers } from "@/store/slices/userSlice";
import UserList from "../components/User/UserList";

const Users = () => {
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

          <div className="test">
            <UserList
              className="test"
              users={users}
              footer={
                <>
                  <Button className="user-list__button user-list__button-left">
                    Back
                  </Button>
                  <Button className="user-list__button user-list__button-right">
                    Save
                  </Button>
                </>
              }
            />
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default Users;
