import * as React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { categories, types, facilities } from "../data";
import { useNavigate } from "react-router-dom";

import {
  Box,
  IconButton,
  Grid,
  Typography,
  TextField,
  Button,
  Paper,
} from "@mui/material";
import { BiTrash } from "react-icons/bi";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import InputAdornment from "@mui/material/InputAdornment";

const CreateListing = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [category, setCategory] = useState("");
  const [type, setType] = useState("");

  const [amenities, setAmenities] = useState([]);

  const handleSelectAmenities = (facility) => {
    if (amenities.includes(facility)) {
      setAmenities((prevAmenities) =>
        prevAmenities.filter((option) => option !== facility)
      );
    } else {
      setAmenities((prev) => [...prev, facility]);
    }
  };

  const [photos, setPhotos] = useState([]);

  const handleUploadPhotos = (e) => {
    const newPhotos = Array.from(e.target.files);
    setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
  };

  const handleDragPhoto = (result) => {
    if (!result.destination) return;

    const items = Array.from(photos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setPhotos(items);
  };

  const handleRemovePhoto = (indexToRemove) => {
    setPhotos((prevPhotos) =>
      prevPhotos.filter((_, index) => index !== indexToRemove)
    );
  };

  const creatorId = useSelector((state) => state.user.user.id);
  const onSubmit = async (data) => {
    try {
      data.creatorId = creatorId;
      data.category = category;
      data.type = type;
      data.amenities = amenities;

      const formData = new FormData();
      formData.append("creator", data.creatorId);
      formData.append("category", data.category);

      formData.append("type", data.type);
      formData.append("streetAddress", data.streetAddress);
      formData.append("aptSuite", data.aptSuite);
      formData.append("city", data.city);
      formData.append("province", data.province);
      formData.append("country", data.country);
      formData.append("guestCount", data.guestCount);
      formData.append("bedroomCount", data.bedroomCount);
      formData.append("bedCount", data.bedCount);
      formData.append("bathroomCount", data.bathroomCount);
      formData.append("amenities", JSON.stringify(data.amenities));

      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("highlight", data.highlight);
      formData.append("highlightDesc", data.highlightDesc);
      formData.append("price", data.price);

      photos.forEach((photo, index) => {
        formData.append("listingPhotos", photo);
      });

      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/properties/create`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        navigate("/");
      } else {
        console.error("Failed to create listing:", response.statusText);
      }
    } catch (error) {
      console.error("Failed to create listing:", error.message);
    }
  };

  return (
    <Paper elevation={0}>
      <Box>
        <Typography variant="h4" sx={{ fontWeight: "bold" }} className="ta">
          Publish Your Place
        </Typography>

        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: "bold" }} className="ta">
              What type of place will guests have?{" "}
            </Typography>
            <Grid container className="res">
              {types?.map((item, index) => (
                <Grid
                  item
                  xs={6}
                  sm={4}
                  md={3}
                  lg={2}
                  key={index}
                  className="ja gap"
                >
                  <Box className="jad">
                    <Button
                      variant={type === item.name ? "contained" : "outlined"}
                      onClick={() => setType(item.name)}
                      className="jad iconb"
                    >
                      <Box className="icon ja">{item.icon}</Box>
                    </Button>
                    <Typography variant="body1">{item.name}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
            <Typography variant="h6" sx={{ fontWeight: "bold" }} className="ta">
              Which of these categories best describes your place?
            </Typography>
            <Grid container className="res">
              {categories?.map((item, index) => (
                <Grid
                  item
                  xs={6}
                  sm={4}
                  md={3}
                  lg={2}
                  key={index}
                  className="ja gap"
                >
                  <Box className="jad">
                    <Button
                      variant={
                        category === item.label ? "contained" : "outlined"
                      }
                      onClick={() => setCategory(item.label)}
                      className="jad iconb"
                    >
                      <Box className="icon ja">{item.icon}</Box>
                    </Button>
                    <Typography variant="body1">{item.label}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
            <Typography variant="h6" sx={{ fontWeight: "bold" }} className="ta">
              Tell guests what your place has to offer{" "}
            </Typography>{" "}
            <Grid container className="res">
              {facilities?.map((item, index) => (
                <Grid
                  item
                  xs={6}
                  sm={4}
                  md={3}
                  lg={2}
                  key={index}
                  className="ja gap"
                >
                  <Box className="jad">
                    <Button
                      variant={
                        amenities.includes(item.name) ? "contained" : "outlined"
                      }
                      className="jad iconb"
                      onClick={() => handleSelectAmenities(item.name)}
                    >
                      <Box className="icon ja">{item.icon}</Box>
                    </Button>
                    <Typography variant="body1">{item.name}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
            <Typography variant="h6" sx={{ fontWeight: "bold" }} className="ta">
              Which of these categories best describes your place?
            </Typography>{" "}
            <Grid container className="res">
              <Grid item xs={6} sm={6}>
                <TextField
                  sx={{ px: 0 }}
                  autoComplete="firstName"
                  margin="normal"
                  fullWidth
                  id="firstName"
                  size="small"
                  autoFocus
                  label="Apt, Suite, etc."
                  variant="outlined"
                  name="aptSuite"
                  required
                  {...register("aptSuite", { required: true })}
                />
                {errors.email && (
                  <Typography variant="caption" color="error">
                    {errors.firstName.message}
                  </Typography>
                )}{" "}
              </Grid>
              <Grid item xs={6} sm={6}>
                <TextField
                  sx={{ px: 0 }}
                  margin="normal"
                  fullWidth
                  id="lastName"
                  autoComplete="lastName"
                  size="small"
                  label="Highlight"
                  variant="outlined"
                  name="highlight"
                  required
                  {...register("highlight", { required: true })}
                />
                {errors.email && (
                  <Typography variant="caption" color="error">
                    {errors.lastName.message}
                  </Typography>
                )}{" "}
              </Grid>
            </Grid>
            <Grid container className="res">
              <Grid item xs={6} sm={6}>
                <TextField
                  sx={{ px: 0 }}
                  autoComplete="firstName"
                  margin="normal"
                  fullWidth
                  id="firstName"
                  size="small"
                  autoFocus
                  label="City"
                  variant="outlined"
                  name="city"
                  required
                  {...register("city", { required: true })}
                />
                {errors.email && (
                  <Typography variant="caption" color="error">
                    {errors.firstName.message}
                  </Typography>
                )}{" "}
              </Grid>
              <Grid item xs={6} sm={6}>
                <TextField
                  sx={{ px: 0 }}
                  margin="normal"
                  fullWidth
                  id="lastName"
                  autoComplete="lastName"
                  size="small"
                  label="Country"
                  variant="outlined"
                  name="country"
                  required
                  {...register("country", { required: true })}
                />
                {errors.email && (
                  <Typography variant="caption" color="error">
                    {errors.lastName.message}
                  </Typography>
                )}{" "}
              </Grid>
            </Grid>
            <Grid container className="res">
              <Grid item xs={6} sm={6}>
                <TextField
                  sx={{ px: 0 }}
                  margin="normal"
                  fullWidth
                  id="lastName"
                  autoComplete="lastName"
                  size="small"
                  label="Street Address"
                  variant="outlined"
                  name="streetAddress"
                  required
                  {...register("streetAddress", { required: true })}
                />
                {errors.email && (
                  <Typography variant="caption" color="error">
                    {errors.lastName.message}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={6} sm={6}>
                <TextField
                  sx={{ px: 0 }}
                  margin="normal"
                  fullWidth
                  id="province"
                  autoComplete="province"
                  size="small"
                  label="Province"
                  variant="outlined"
                  name="province"
                  required
                  {...register("province", { required: true })}
                />
                {errors.province && (
                  <Typography variant="caption" color="error">
                    {errors.province.message}
                  </Typography>
                )}
              </Grid>
            </Grid>
            <Grid container className="res">
              <Grid item xs={6} sm={6}>
                <TextField
                  sx={{ px: 0 }}
                  autoComplete="firstName"
                  margin="normal"
                  fullWidth
                  id="firstName"
                  size="small"
                  autoFocus
                  label="Bedroom"
                  variant="outlined"
                  name="bedroomCount"
                  type="number"
                  required
                  {...register("bedroomCount", {
                    required: true,
                    setValueAs: (value) => parseFloat(value),
                  })}
                />
                {errors.email && (
                  <Typography variant="caption" color="error">
                    {errors.firstName.message}
                  </Typography>
                )}{" "}
              </Grid>
              <Grid item xs={6} sm={6}>
                <TextField
                  sx={{ px: 0 }}
                  margin="normal"
                  fullWidth
                  id="lastName"
                  autoComplete="lastName"
                  size="small"
                  label="Guest"
                  variant="outlined"
                  name="guestCount"
                  type="number"
                  required
                  {...register("guestCount", {
                    required: true,
                    setValueAs: (value) => parseFloat(value),
                  })}
                />
                {errors.email && (
                  <Typography variant="caption" color="error">
                    {errors.lastName.message}
                  </Typography>
                )}{" "}
              </Grid>
            </Grid>
            <Grid container className="res">
              <Grid item xs={6} sm={6}>
                <TextField
                  sx={{ px: 0 }}
                  autoComplete="firstName"
                  margin="normal"
                  fullWidth
                  id="firstName"
                  size="small"
                  autoFocus
                  label="Bathroom"
                  variant="outlined"
                  name="bathroomCount"
                  type="number"
                  required
                  {...register("bathroomCount", {
                    required: true,
                    setValueAs: (value) => parseFloat(value),
                  })}
                />
                {errors.email && (
                  <Typography variant="caption" color="error">
                    {errors.firstName.message}
                  </Typography>
                )}{" "}
              </Grid>
              <Grid item xs={6} sm={6}>
                <TextField
                  sx={{ px: 0 }}
                  margin="normal"
                  fullWidth
                  id="lastName"
                  autoComplete="lastName"
                  size="small"
                  label="Bed"
                  variant="outlined"
                  name="bedCount"
                  type="number"
                  required
                  {...register("bedCount", {
                    required: true,
                    setValueAs: (value) => parseFloat(value),
                  })}
                />
                {errors.email && (
                  <Typography variant="caption" color="error">
                    {errors.lastName.message}
                  </Typography>
                )}
              </Grid>
            </Grid>
            <Grid container className="res">
              <Grid item xs={6} sm={6}>
                <TextField
                  sx={{ px: 0 }}
                  autoComplete="firstName"
                  margin="normal"
                  fullWidth
                  id="firstName"
                  size="small"
                  autoFocus
                  label="Highlight"
                  variant="outlined"
                  name="highlight"
                  required
                  {...register("highlight", { required: true })}
                />
                {errors.email && (
                  <Typography variant="caption" color="error">
                    {errors.firstName.message}
                  </Typography>
                )}{" "}
              </Grid>

              <Grid item xs={6} sm={6}>
                <TextField
                  sx={{ px: 0 }}
                  margin="normal"
                  fullWidth
                  id="lastName"
                  autoComplete="lastName"
                  size="small"
                  label="Title"
                  variant="outlined"
                  name="title"
                  required
                  {...register("title", { required: true })}
                />
                {errors.email && (
                  <Typography variant="caption" color="error">
                    {errors.lastName.message}
                  </Typography>
                )}
              </Grid>
            </Grid>
            <Grid container className="res">
              <Grid item xs={6} sm={6}>
                <TextField
                  sx={{ px: 0 }}
                  autoComplete="firstName"
                  margin="normal"
                  fullWidth
                  id="outlined-multiline-flexible"
                  label="Highlight details"
                  multiline
                  maxRows={4}
                  size="small"
                  autoFocus
                  variant="outlined"
                  name="highlightDesc"
                  type="number"
                  required
                  {...register("highlightDesc", { required: true })}
                />
                {errors.email && (
                  <Typography variant="caption" color="error">
                    {errors.firstName.message}
                  </Typography>
                )}
              </Grid>

              <Grid item xs={6} sm={6}>
                <TextField
                  sx={{ px: 0 }}
                  margin="normal"
                  fullWidth
                  id="outlined-multiline-flexible"
                  autoComplete="lastName"
                  size="small"
                  label="Description"
                  variant="outlined"
                  multiline
                  maxRows={4}
                  name="description"
                  required
                  {...register("description", { required: true })}
                />
                {errors.email && (
                  <Typography variant="caption" color="error">
                    {errors.lastName.message}
                  </Typography>
                )}
              </Grid>
            </Grid>
            <Box className="res">
              <TextField
                sx={{ px: 0 }}
                margin="normal"
                fullWidth
                id="lastName"
                autoComplete="lastName"
                size="small"
                label="Amount"
                variant="outlined"
                name="price"
                type="number"
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
                {...register("price", {
                  required: true,
                  setValueAs: (value) => parseFloat(value),
                })}
              />
            </Box>
          </Box>

          <Typography variant="h6" sx={{ fontWeight: "bold" }} className="ta">
            Which of these categories best describes your place?
          </Typography>
          <DragDropContext onDragEnd={handleDragPhoto}>
            <Droppable droppableId="photos" direction="horizontal" type="group">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  <Grid container className="ress">
                    {photos.map((photo, index) => (
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        lg={3}
                        key={index}
                        className="gap "
                      >
                        <Draggable draggableId={index.toString()} index={index}>
                          {(provided) => (
                            <Box
                              className="parentImg"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <img
                                className="childImg"
                                src={URL.createObjectURL(photo)}
                                alt="place"
                              />
                              <IconButton
                                sx={{ position: "absolute" }}
                                onClick={() => handleRemovePhoto(index)}
                              >
                                <BiTrash />
                              </IconButton>
                            </Box>
                          )}
                        </Draggable>
                      </Grid>
                    ))}
                    <Grid item xs={12} sm={6} md={4} lg={3} className="gap ja">
                      <input
                        id="image"
                        type="file"
                        style={{ display: "none" }}
                        accept="image/*"
                        onChange={handleUploadPhotos}
                        multiple
                      />
                      <Button sx={{ padding: 0 }} variant="outlined">
                        <label
                          className="ja"
                          htmlFor="image"
                          style={{
                            width: "275px",
                            height: "275px",
                          }}
                        >
                          Add Images
                        </label>
                      </Button>
                    </Grid>
                  </Grid>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            {" "}
            <Button variant="contained" type="submit">
              CREATE
            </Button>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default CreateListing;
