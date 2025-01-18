import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { adminLogin, getAdmin } from "../../redux/thunks/admin";

import { Container, Paper, TextField, Typography, Button } from "@mui/material";
import { useInputValidation } from "6pp";

// assets
import { bgGradient } from "../../constants/color";

const AdminLogin = () => {
  const dispatch = useDispatch();
  const secretKey = useInputValidation("");

  const { isAdmin } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getAdmin());
  }, [dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(adminLogin(secretKey.value));
  };

  if (isAdmin) return <Navigate to="/admin/dashboard" />;

  return (
    <div
      style={{
        backgroundImage: bgGradient,
      }}
    >
      <Container
        component={"main"}
        maxWidth={"xs"}
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h5">Admin Login</Typography>
          <form
            style={{ width: "100%", marginTop: "1rem" }}
            onSubmit={submitHandler}
          >
            <TextField
              required
              fullWidth
              label="Secret Key"
              margin="normal"
              variant="outlined"
              type="password"
              value={secretKey.value}
              onChange={secretKey.changeHandler}
            />

            <Button
              sx={{ marginTop: "1rem" }}
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
            >
              Login
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default AdminLogin;
