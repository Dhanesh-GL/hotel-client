import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { setTripList } from "../redux/stateSlice";
import ListingCard from "../components/ListingCard";
import { Grid } from "@mui/material";

const TripList = () => {
  const [loading, setLoading] = useState(true);
  const userId = useSelector((state) => state.user.user.id);
  const tripList = useSelector((state) => state.user.user.tripList);

  const dispatch = useDispatch();

  const getTripList = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/users/${userId}/trips`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      dispatch(setTripList(data));
      setLoading(false);
    } catch (err) {
      console.log("Fetch Trip List failed!", err.message);
    }
  };

  useEffect(() => {
    getTripList();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <h1 style={{ textAlign: "center" }}>Your Trip List</h1>
      <Grid container className="res" spacing={3}>
         {tripList?.map(
          ({
            listingId,
            host,
            startDate,
            endDate,
            totalPrice,
            booking = true,
            updatedAt,
            listing
          }) => (
            <Grid item xs={12} sm={6} md={4} lg={3} gap={1} key={listingId}>
              <ListingCard
                listingId={listingId}
                creator={host}
                listingPhotoPaths={listing.listingPhotoPaths}
                city={listing.city}
                province={listing.province}
                country={listing.country}
                category={listing.category}
                startDate={startDate}
                endDate={endDate}
                totalPrice={totalPrice}
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

export default TripList;
