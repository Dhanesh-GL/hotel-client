import { useSelector } from "react-redux";
import ListingCard from "../components/ListingCard";
import { Grid } from "@mui/material";

const WishList = () => {
  const wishList = useSelector((state) => state.user.user.wishList);
   return (
    <>
      <h1 style={{ textAlign: "center" }}>Your Wish List</h1>
      <Grid container className="res" spacing={3}>
        {wishList?.map(
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

export default WishList;
