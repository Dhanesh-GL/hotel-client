import * as React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setListings } from "../redux/stateSlice";
import Loader from "../components/Loader";
import ListingCard from "../components/ListingCard";
import { Grid } from "@mui/material";

const CategoryPage = () => {
  const [loading, setLoading] = useState(true);
  const { category } = useParams();
  const dispatch = useDispatch();
  const listings = useSelector((state) => state.user.listings);
  const getFeedListings = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/properties?category=${category}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();

      dispatch(setListings({ listings: data }));
      setLoading(false);
    } catch (err) {
      console.log("Fetch Listings Failed", err.message);
    }
  };

  useEffect(() => {
    getFeedListings();
  }, [category]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <h1 style={{ textAlign: "center" }}>{category} listings</h1>
      <Grid container className="res" spacing={3}>
        {listings?.map(
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

export default CategoryPage;
