import React from "react";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import { useForm } from "react-hook-form";

import Link from "@mui/material/Link";

import TextField from "@mui/material/TextField";

import LoadingButton from "@mui/lab/LoadingButton";

import Typography from "@mui/material/Typography";

import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import { setForm } from "../redux/FormSlice"; 
import { setLogin } from "../redux/stateSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(); 

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const loggedIn = await response.json();
       if (loggedIn.success) {
        dispatch(
          setLogin({
            user: loggedIn.user,
            token: loggedIn.token,
          })
        );
        navigate("/");
      }
    } catch (err) {
      console.log("Login failed", err.message);
    }
    setLoading(false);
  };

  const [loading, setLoading] = React.useState(false);

  function Copyright(props) {
    return (
      <Typography variant="body2" align="center" {...props}>
        {"Copyright © "}
        Hub
        {` ${new Date().getFullYear()}`}
      </Typography>
    );
  }
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        minHeight: "100%",
      }}
    >
      <Box
        sx={{
          mx: { xs: 4, sm: 8, md: 12 },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Avatar sx={{ m: 1 }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ width: "100%" }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            size="small"
            {...register("email", {
              required: "Email is required",
            })}
          />
          {errors.email && (
            <Typography variant="caption" color="error">
              {errors.email.message}
            </Typography>
          )}{" "}
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="password"
            size="small"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <Typography variant="caption" color="error">
              {errors.password.message}
            </Typography>
          )}
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            endIcon={<LoginOutlinedIcon />}
            loading={loading}
            loadingPosition="end"
            sx={{
              mt: 3,
              mb: 2,
              background: "linear-gradient(to right, red, yellow)",
              boxShadow: "0 0 10px yellow",
            }}
          >
            Login
          </LoadingButton>
          <Grid container>
            <Grid item xs>
              <Link
                onClick={() => dispatch(setForm("forgot"))}
                sx={{ textDecoration: "none", cursor: "pointer" }} 
                color="inherit"
                variant="body2"
              >
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link
                onClick={() => dispatch(setForm("register"))}
                sx={{ textDecoration: "none", cursor: "pointer" }} 
                color="inherit"
                variant="body2"
              >
                {"Sign Up"}
              </Link>
            </Grid>
          </Grid>
          <Copyright sx={{ mt: 5 }} />
        </Box>
      </Box>
    </div>
  );
};

export default LoginForm;
