import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { setReservationList } from "../redux/stateSlice";
import ListingCard from "../components/ListingCard";
import { Grid } from "@mui/material";

const ReservationList = () => {
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user);
  const reservationList = useSelector(
    (state) => state.user.user.reservationList
  );
   const dispatch = useDispatch();

  const getReservationList = async () => {
     try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/users/${user?.user?.id}/reservations`,
        {
          method: "GET",
        }
      );

      const data = await response.json();

      dispatch(setReservationList(data));
      setLoading(false);
    } catch (err) {
      console.log("Fetch Reservation List failed!", err.message);
    }
  };

  useEffect(() => {
    getReservationList();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <h1 style={{textAlign:"center"}}>Your Reservation List</h1>
      <Grid container className="res" spacing={3}>
        {reservationList?.map(
          ({
            id,
            creator,
            listingPhotoPaths,
            city,
            province,
            country,
            category,
            type,
            price,
            booking = false,
            updatedAt,
          }) => (
            <Grid
            item xs={12} sm={6} md={4} lg={3} gap={1}
              key={id}
            >
              <ListingCard
                 listingId={id}
                 creator={creator}
                 listingPhotoPaths={listingPhotoPaths}
                 city={city}
                 province={province}
                 country={country}
                 category={category}
                 type={type}
                 price={price}
                 booking={booking}
                 updatedAt={updatedAt}
              />
            </Grid>
          )
        )}
      </Grid>
    </>
  );
};

export default ReservationList;
