import { categories } from "../data";
import { Box, Typography, Grid, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <Typography variant="h4" component="h1" className="ta" sx={{ m: 1 }}>
        Explore Top Categories
      </Typography>
      <Grid container className="res">
        {categories?.slice(1, 5).map((category, index) => (
          <Grid
            item
            key={index}
            xs={12}
            sm={6}
            md={3}
            lg={3}
            className="ja gap"
          >

            <Button
              className="parentbox"
              variant="outlined"
              onClick={() => navigate(`/properties/category/${category.label}`)}
            >
              <img
                className="childbox"
                src={category.img}
                alt={category.label}
              />
              <Box className="childbox jad">
                <Box className="overlay"></Box>
                <Box className="icon" sx={{ p: 2 }}>
                  {category.icon}
                </Box>
                <Typography variant="body1">{category.label}</Typography>
              </Box>
            </Button>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Categories;
