import * as React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { facilities } from "../data";
import { DateRange } from "react-date-range";
import { addDays } from "date-fns";
import { Button, Grid, Typography, Box, Paper } from "@mui/material";
import Loader from "../components/Loader";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const ListingDetails = () => {
  const [loading, setLoading] = useState(true);

  const { listingId } = useParams();
  const [listing, setListing] = useState(null);

  const getListingDetails = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/properties/${listingId}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      setListing(data);
      setLoading(false);
    } catch (err) {
      console.log("Fetch Listing Details Failed", err.message);
    }
  };

  useEffect(() => {
    getListingDetails();
  }, []);

  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  const handleSelect = (ranges) => {
    setDateRange([ranges.selection]);
  };

  const start = new Date(dateRange[0].startDate);
  const end = new Date(dateRange[0].endDate);
  const dayCount = Math.round(end - start) / (1000 * 60 * 60 * 24); 

   const customerId = useSelector((state) => state?.user?.user?.id);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const bookingForm = {
        customerId,
        listingId,
        hostId: listing.creator.id,
        startDate: dateRange[0].startDate.toDateString(),
        endDate: dateRange[0].endDate.toDateString(),
        totalPrice: listing.price * dayCount,
      };

      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/bookings/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingForm),
      });

      if (response.ok) {
        navigate(`/${customerId}/trips`);
      }
    } catch (err) {
      console.log("Submit Booking Failed.", err.message);
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <Paper>
      <Typography variant="h6" sx={{ fontWeight: "bold" }} className="ta">
        {listing.title}{" "}
      </Typography>
      <Grid container className="res">
        {listing.listingPhotoPaths?.map((photo, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={index}
            className="gap ja"
          >
            <img
              className="parentImg"
              src={
                photo?.startsWith("public")
                  ? `${import.meta.env.VITE_SERVER_URL}/${photo.replace("public", "")}`
                  : photo
              }
              alt="listing photo"
            />
          </Grid>
        ))}
      </Grid>
      <Typography variant="h6" sx={{ fontWeight: "bold" }} className="res">
        {`${listing.type} in ${listing.city}, ${listing.province}, ${listing.country}`}
      </Typography>
      <Typography variant="h6" sx={{ fontWeight: "bold" }} className="res">
        {`${listing.guestCount} guests - ${listing.bedroomCount} bedroom(s) - ${listing.bedCount} bed(s) - ${listing.bathroomCount} bathroom(s)`}
      </Typography>

      <div>
        <div>
          <Typography className="res">What this place offers?</Typography>
          <Grid container spacing={2} className="res">
            {listing.amenities[0].split(",").map((item, index) => (
              <Grid item xs={6} sm={4} md={3} lg={2} key={index}>
                <Box className="icon">
                  {facilities.find((facility) => facility.name === item)?.icon}
                </Box>

                <p>{item}</p>
              </Grid>
            ))}
          </Grid>
        </div>
        <Box className="jas res wrap">
          <Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {`Hosted by ${listing.creator.firstName} ${listing.creator.lastName}`}
              </Typography>{" "}
              <img
                style={{ width: "350px", height: "350px" }}
                className="img"
                src={
                  listing.creator.profileImagePath?.startsWith("public")
                    ? `${import.meta.env.VITE_SERVER_URL}/${listing.creator.profileImagePath.replace(
                        "public",
                        ""
                      )}`
                    : listing.creator.profileImagePath
                }
              />
            </Box>
            <Box sx={{ width: "350px" }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Description
              </Typography>
              <Typography>
                {listing.description}
                <br />
                {listing.highlight}
                <br />
                {listing.highlightDesc}
              </Typography>
            </Box>
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              How long do you want to stay?
            </Typography>

            <div>
              <DateRange
                style={{ width: "350px" }}
                onChange={handleSelect}
                showSelectionPreview={true}
                moveRangeOnFirstSelection={false}
                months={1}
                ranges={dateRange}
                editableDateInputs={true}
              />
              {dayCount > 1 ? (
                <Typography>
                  ${listing.price} x {dayCount} nights
                </Typography>
              ) : (
                <Typography>
                  ${listing.price} x {dayCount} night
                </Typography>
              )}
              <Typography>Total price: ${listing.price * dayCount} </Typography>{" "}
              <Typography>
                Start Date: {dateRange[0].startDate.toDateString()}
              </Typography>
              <Typography>
                End Date: {dateRange[0].endDate.toDateString()}
              </Typography>
              <Button
                variant="contained"
                type="submit"
                onClick={() => handleSubmit()}
              >
                BOOKING
              </Button>
            </div>
          </Box>
        </Box>
      </div>
    </Paper>
  );
};

export default ListingDetails;
