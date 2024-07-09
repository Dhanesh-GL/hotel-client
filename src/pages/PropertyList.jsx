import { useDispatch, useSelector } from "react-redux";
import ListingCard from "../components/ListingCard";
import { useEffect, useState } from "react";
import { setPropertyList } from "../redux/stateSlice";
import Loader from "../components/Loader";
import { Grid } from "@mui/material";

const PropertyList = () => {
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user);
  const propertyList = user?.user?.propertyList;

  const dispatch = useDispatch();
  const getPropertyList = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/users/${user?.user?.id}/properties`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      dispatch(setPropertyList(data));
      setLoading(false);
    } catch (err) {
      console.log("Fetch all properties failed", err.message);
    }
  };

  useEffect(() => {
    getPropertyList();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <h1 style={{textAlign:"center"}}>Your Property List</h1>
      <Grid container className="res" spacing={3}>
        {propertyList?.map(
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
            <Grid item xs={12} sm={6} md={4} lg={3} gap={1} key={id}>
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

export default PropertyList;
