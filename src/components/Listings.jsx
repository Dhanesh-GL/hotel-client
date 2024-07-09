import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setListings } from "../redux/stateSlice";
import { categories } from "../data";
import { Button, Grid, Box, Typography } from "@mui/material";
import ListingCard from "./ListingCard";
import Loader from "./Loader";

const Listings = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState("All");

  const listings = useSelector((state) => state.user.listings);

  const getFeedListings = async () => {
    try {
      const response = await fetch(
        selectedCategory !== "All"
          ? `${import.meta.env.VITE_SERVER_URL}/properties?category=${selectedCategory}`
          : `${import.meta.env.VITE_SERVER_URL}/properties`,
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
  }, [selectedCategory]);

  return (
    <>
      <Grid container className="res">
        {categories?.map((category, index) => (
          <Grid item xs={6} sm={4} md={3} lg={2} className="ja gap" key={index}>
            <Box className="jad">
              <Button
                onClick={() => setSelectedCategory(category.label)}
                variant={
                  selectedCategory === category.label ? "contained" : "outlined"
                }
                className="jad iconb"
              >
                <Box className="icon ja">{category.icon}</Box>
              </Button>
              <Typography variant="body1">{category.label}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
      {loading ? (
        <Loader />
      ) : (
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
              index,
            }) => (
              <Grid item xs={12} sm={6} md={4} lg={3} gap={1} key={id} >
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
      )}
    </>
  );
};

export default Listings;
