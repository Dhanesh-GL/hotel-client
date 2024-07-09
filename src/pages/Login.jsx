import React from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import ResetForm from "../components/ResetForm";
import { useSelector } from "react-redux";

export default function Login() {
  const form = useSelector((state) => state.form);
  const svgMap = {
    login: useSelector((state) => state.svg.login),
    register: useSelector((state) => state.svg.register),
    forgot: useSelector((state) => state.svg.forgot),
    landing: useSelector((state) => state.svg.landing),
    profile: useSelector((state) => state.svg.profile),
  };

  const getSVGForFormType = () => {
    return svgMap[form.form];
  };
  const renderForm = () => {
    switch (form.form) {
      case "login":
        return <LoginForm />;
      case "register":
        return <RegisterForm />;
      case "forgot":
        return <ResetForm />;
      case "profile":
        return <ProfileForm />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container component="main" sx={{ minHeight: "calc(100vh - 69px)" }}>
        <Grid
          item
          xs={false}
          sm={6}
          md={6}
          sx={{
            backgroundImage: `url(${getSVGForFormType()})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "90% 90%",
          }}
        />
        <Grid item xs={12} sm={6} md={6} component={Paper} elevation={6} square>
          {renderForm()}
        </Grid>
      </Grid>
    </Box>
  );
}
