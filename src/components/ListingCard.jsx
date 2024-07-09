import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setWishList } from "../redux/stateSlice";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import {
  ArrowForwardIos,
  ArrowBackIosNew,
  Favorite,
  Info,
} from "@mui/icons-material";

const ListingCard = ({
  listingId,
  creator,
  listingPhotoPaths,
  city,
  province,
  country,
  category,
  type,
  price,
  startDate,
  endDate,
  totalPrice,
  booking,
  updatedAt,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevSlide = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + listingPhotoPaths.length) % listingPhotoPaths.length
    );
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % listingPhotoPaths.length);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const wishList = user?.user?.wishList || [];
  const isLiked = wishList?.find((item) => item?.id === listingId);

  const patchWishList = async () => {
    if (user?.user?.id !== creator?.id) {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/users/${
          user?.user?.id
        }/${listingId}`,
        {
          method: "PATCH",
          header: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      dispatch(setWishList(data.wishList));
    } else {
      return;
    }
  };

  return (
    <Card className="cardcomponent j grow" sx={{ p: 4 }}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="recipe"
            src={
              creator?.profileImagePath?.startsWith("public")
                ? `${
                    import.meta.env.VITE_SERVER_URL
                  }/${creator?.profileImagePath?.replace("public", "")}`
                : creator?.profileImagePath
            }
          ></Avatar>
        }
        title={`${creator?.firstName}${creator?.lastName}`}
        subheader={new Date(updatedAt).toLocaleDateString()}
      />
      <Box className="parentcard">
        <CardMedia
          sx={{ justifyContent: "center" }}
          className="childcard"
          component="img"
          src={
            listingPhotoPaths[currentIndex].startsWith("public")
              ? `${import.meta.env.VITE_SERVER_URL}/${listingPhotoPaths[
                  currentIndex
                ]?.replace("public", "")}`
              : listingPhotoPaths[currentIndex]
          }
        />
        <Box className="childcard" sx={{ justifyContent: "space-between" }}>
          <Box
            onClick={(e) => {
              e.stopPropagation();
              goToPrevSlide(e);
            }}
          >
            <ArrowBackIosNew />
          </Box>
          <Box
            onClick={(e) => {
              e.stopPropagation();
              goToNextSlide(e);
            }}
          >
            <ArrowForwardIos />
          </Box>
        </Box>
      </Box>

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {city}, {province}, {country}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {category}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {!booking ? (
            <>
              {type}
              <br />${price} per night
            </>
          ) : (
            <>
              {startDate} - {endDate}
              <br />${totalPrice} total
            </>
          )}
        </Typography>
      </CardContent>

      <CardActions disableSpacing>
        <IconButton
          aria-label="add to favorites"
          onClick={(e) => {
            e.stopPropagation();
            patchWishList();
          }}
        >
          <Favorite sx={{ color: isLiked ? "red" : "" }} />
        </IconButton>
        <IconButton
          aria-label="share"
          onClick={() => {
            navigate(`/properties/${listingId}`);
          }}
        >
          <Info />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default ListingCard;
