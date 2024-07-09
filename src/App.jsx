import { BrowserRouter, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/Login";
import CreateListing from "./pages/CreateListing";
import ListingDetails from "./pages/ListingDetails";
import TripList from "./pages/TripList";
import WishList from "./pages/WishList";
import PropertyList from "./pages/PropertyList";
import ReservationList from "./pages/ReservationList";
import CategoryPage from "./pages/CategoryPage";
import SearchPage from "./pages/SearchPage";
import { Outlet, Navigate, Route, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Navbar from "./components/Navbar";

function App() {
  const dark = createTheme({
    palette: {
      mode: "dark",
    },
  });
  const light = createTheme({
    palette: {
      mode: "light",
    },
  });

  function Layout() {
    const { user } = useSelector((state) => state.user);
    const location = useLocation();

    if (user?.token) {
       return <Outlet />;
    } else {
       return <Navigate to="/login" state={{ from: location }} replace />;
    }
  }

  const { mode } = useSelector((state) => state.mode);

 
  return (
    <ThemeProvider theme={mode === "dark" ? dark : light}>
      <div         className="app"
>
        <BrowserRouter>
          <Navbar />

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/create-listing" element={<CreateListing />} />
            <Route path="/properties/:listingId" element={<ListingDetails />} />
            <Route
              path="/properties/category/:category"
              element={<CategoryPage />}
            />
            <Route path="/properties/search/:search" element={<SearchPage />} />
            <Route path="/:userId/trips" element={<TripList />} />
            <Route path="/:userId/wishList" element={<WishList />} />
            <Route path="/:userId/properties" element={<PropertyList />} />
            <Route path="/:userId/reservations" element={<ReservationList />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
