import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setListings } from "../redux/stateSlice";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import ListingCard from "../components/ListingCard";
import { Grid } from "@mui/material";
const SearchPage = () => {
  const [loading, setLoading] = useState(true);
  const { search } = useParams();
  const listings = useSelector((state) => state.user.listings);

  const dispatch = useDispatch();

  const getSearchListings = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/properties/search/${search}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
       dispatch(setListings({ listings: data }));
      setLoading(false);
    } catch (err) {
      console.log("Fetch Search List failed!", err.message);
    }
  };

  useEffect(() => {
    getSearchListings();
  }, [search]);
   return loading ? (
    <Loader />
  ) : (
    <>
      <h1 style={{textAlign:"center"}}>{search}</h1>
      <Grid container spacing={2} className="res">
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
            updatedAt,
            booking = false,
          }) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={id}>
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

export default SearchPage;
