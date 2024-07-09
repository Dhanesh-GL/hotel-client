import * as React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setMode } from "../redux/ModeSlice"; 
import {
  setLogin,
  setRegister,
  setForgot,
  setLanding,
  setProfile,
} from "../redux/svgSlice";  
import { setLogout } from "../redux/stateSlice";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Avatar,
  Button,
  Tooltip,
  Container,
  InputBase,
} from "@mui/material";
import { Menu as MenuIcon, Search as SearchIcon } from "@mui/icons-material";
import { styled, alpha } from "@mui/material/styles";
import Mode from "./Mode";
const pages = ["Home", "Create Listing", "Become Host"];
const settings = [
  "Trip List",
  "Wish List",
  "Properties",
  "Reservations",
  "Logout",
];
import login1 from "../assets/login2.svg";
import login2 from "../assets/login1.svg";
import register1 from "../assets/register2.svg";
import register2 from "../assets/register1.svg";
import forgot1 from "../assets/reset2.svg";
import forgot2 from "../assets/reset1.svg";
import landing1 from "../assets/landing1.svg";
import landing2 from "../assets/landing2.svg";
import profile1 from "../assets/profile1.svg";
import profile2 from "../assets/profile2.svg";
function ResponsiveAppBar() {
  const navigate = useNavigate(); 

  const dispatch = useDispatch(); 

  const { mode } = useSelector((state) => state.mode);
  const handleMode = () => {
    dispatch(setMode(mode === "dark" ? "light" : "dark"));
    dispatch(setLogin(mode === "dark" ? login1 : login2));
    dispatch(setRegister(mode === "dark" ? register2 : register1));
    dispatch(setForgot(mode === "dark" ? forgot2 : forgot1));
    dispatch(setLanding(mode === "dark" ? landing1 : landing2));
    dispatch(setProfile(mode === "dark" ? profile1 : profile2));
  };
  const user = useSelector((state) => state.user);

  const [search, setSearch] = useState("");

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
  }));

  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      navigate(`/properties/search/${search}`);
    }
  };

  const handleSettingsClick = (setting) => {
    handleCloseUserMenu();

    switch (setting) {
      case "Trip List":
        navigate(`/${user.user.id}/trips`);
        break;
      case "Wish List":
        navigate(`/${user.user.id}/wishList`);
        break;
      case "Properties":
        navigate(`/${user.user.id}/properties`);
        break;
      case "Reservations":
        navigate(`/${user.user.id}/reservations`);
        break;
      case "Logout":
        navigate("/login");
        dispatch(setLogout());
        break;
      default:
        break;
    }
  };

  const handlePagesClick = (page) => {
    switch (page) {
      case "Home":
        navigate("/");
        handleCloseUserMenu();
        break;
      case "Create Listing":
        navigate("/create-listing");
        handleCloseUserMenu();
        break;
      case "Become Host":
        navigate("/login");
        handleCloseUserMenu();
        break;
      default:
        handleCloseUserMenu();
        break;
    }
  };
  return (
    <AppBar
      position="static"
      style={{ border: "0px", backgroundColor: "transparent" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => handlePagesClick(page)}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
              <Box sx={{ padding: "0px 13px" }}>
                {" "}
                <Mode mode={mode} onChange={handleMode} />
              </Box>
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handlePagesClick(page)}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
            <Box sx={{ p: 0, mr: 1, display: "flex", alignItems: "center" }}>
              <Mode mode={mode} onChange={handleMode} />
            </Box>
          </Box>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              value={search}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
          </Search>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt="Remy Sharp"
                  src={
                    user?.user?.profileImagePath?.startsWith("public")
                      ? `${import.meta.env.VITE_SERVER_URL}/${user.user.profileImagePath.replace(
                          "public",
                          ""
                        )}`
                      : user?.user?.profileImagePath
                  }
                />
              </IconButton>
            </Tooltip>

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => handleSettingsClick(setting)}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
