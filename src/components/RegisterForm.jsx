import React from "react";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import { useForm } from "react-hook-form";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import { useDispatch } from "react-redux";
import { setForm } from "../redux/FormSlice";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [profileImageURL, setProfileImageURL] = React.useState(null);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImageURL(URL.createObjectURL(file));
    }
  };

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (data.profileImagePath) {
      data.profileImagePath = data.profileImagePath[0];
      data.password = data.password1;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("email", data.email);
      formData.append("password", data.password1);
      formData.append("profileImage", data.profileImagePath);

      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/auth/register`, {
        method: "POST",
        body: formData,
      });
      const responseData = await response.json();

      if (responseData.success) {
        dispatch(setForm("login"));
      }
    } catch (err) {
      console.log("Registration failed", err.message);
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
        <input
          type="file"
          id="image-picker"
          accept="image/*"
          style={{ display: "none" }}
          {...register("profileImagePath", {
            onChange: handleImageChange,
          })}
        />
        <label htmlFor="image-picker">
          <Avatar
            alt="Profile Image"
            src={profileImageURL}
            sx={{ width: "100px", height: "100px", border: "6px solid black" }}
          />
        </label>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ width: "100%" }}
        >
          <Grid container spacing={2}>
            <Grid item xs={6} sm={6}>
              <TextField
                sx={{ px: 0 }}
                autoComplete="firstName"
                name="firstName"
                margin="normal"
                required
                fullWidth
                id="firstName"
                label="First Name"
                size="small"
                autoFocus
                {...register("firstName", {
                  required: "First name is required",
                })}
              />
              {errors.email && (
                <Typography variant="caption" color="error">
                  {errors.firstName.message}
                </Typography>
              )}{" "}
            </Grid>
            <Grid item xs={6} sm={6}>
              <TextField
                sx={{ px: 0 }}
                margin="normal"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lastName"
                size="small"
                {...register("lastName", {
                  required: "Last name is required",
                })}
              />
              {errors.email && (
                <Typography variant="caption" color="error">
                  {errors.lastName.message}
                </Typography>
              )}{" "}
            </Grid>
          </Grid>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            size="small"
            {...register("email", {
              required: "Email is required",
            })}
          />
          {errors.email && (
            <Typography variant="caption" color="error">
              {errors.email.message}
            </Typography>
          )}
          <Grid container spacing={2}>
            <Grid item xs={6} sm={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="password1"
                label="Password"
                type="password"
                id="password1"
                autoComplete="password"
                size="small"
                {...register("password1", { required: "Password is required" })}
              />
              {errors.password1 && (
                <Typography variant="caption" color="error">
                  {errors.password1.message}
                </Typography>
              )}{" "}
            </Grid>
            <Grid item xs={6} sm={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="password2"
                label="Confirm password"
                type="password"
                id="password2"
                autoComplete="password"
                size="small"
                {...register("password2", {
                  required: "Password is required",
                })}
              />
              {errors.password2 && (
                <Typography variant="caption" color="error">
                  {errors.password2.message}
                </Typography>
              )}
            </Grid>
          </Grid>
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
            Register
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
                onClick={() => dispatch(setForm("login"))}
                sx={{ textDecoration: "none", cursor: "pointer" }}
                color="inherit"
                variant="body2"
              >
                Login
              </Link>
            </Grid>
          </Grid>
          <Copyright sx={{ mt: 5 }} />
        </Box>
      </Box>
    </div>
  );
};

export default RegisterForm;
