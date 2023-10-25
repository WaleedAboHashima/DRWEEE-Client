
import { useTheme } from "@emotion/react";
import { AddOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Header from "components/Header";
import { LanguageContext } from "language";
import React, { useContext, useEffect, useState } from "react";
import Cookies from "universal-cookie";
import AdminIcon from "assets/addAdmin.svg";
import { useDispatch } from "react-redux";
import { GetCountriesHandler } from "apis/citiesandcountries";
const AddProduct = () => {
  const context = useContext(LanguageContext);
  const cookies = new Cookies();
  const theme = useTheme();
  const [role, setRole] = useState("");
  const [countries, setCountires] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCoutnry, setSelectedCountry] = useState("");
  const dispatch = useDispatch();
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  return (
    <Box m="1.5rem 2rem">
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        flexDirection={{ xs: "column", sm: "row" }}
        gap={{ xs: 6, md: 2 }}
        alignItems={"center"}
      >
        <Header
          title={context.language === "en" ? "ADD ADMINS" : "العملاء"}
          subtitle={
            context.language === "en" ? "Add Admin Below" : "قائمه العملاء"
          }
        />
      </Box>
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"column"}
        // p={4}
        gap={2}
      >
        <img height={250} src={AdminIcon} />
        <Box
          display={"flex"}
          flexDirection={{ xs: "column", lg: "row" }}
          width={{ xs: "100%", md: "50%" }}
          gap={1}
          height={"100%"}
        >
          <Box
            width={"100%"}
            display={"flex"}
            flexDirection={"column"}
            p={2}
            gap={2}
            sx={{ backgroundColor: "green", borderRadius: 5 }}
          >
            <Header title={"Please enter Admin information below: "} />
            <TextField placeholder="Username" />
            <TextField placeholder="Email" />
            <TextField placeholder="Phone" />
            <TextField placeholder="Password" />
            <Select onChange={(e) => setRole(e.target.value)}>
              <MenuItem value={"Admin"}>Admin</MenuItem>
              <MenuItem value={"SuperVisor"}>SuperVisor</MenuItem>
              <MenuItem value={"CityAdmin"}>CityAdmin</MenuItem>
            </Select>
            <Select
              sx={{ display: !role && "none" }}
              value={selectedCoutnry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              MenuProps={MenuProps}
            >
              {role === "Admin" ? (
                countries.map((country) => (
                  <MenuItem key={country.country} value={country.country}>
                    {country.country}
                  </MenuItem>
                ))
              ) : role === "SuperVisor" ? (
                <MenuItem>SuperVisor</MenuItem>
              ) : (
                cities.map((city) => <MenuItem key={city} value={city}>{city}</MenuItem>)
              )}
            </Select>
            <Typography>Permission: </Typography>
            <FormControlLabel control={<Checkbox />} label="Add Admins" />
          </Box>
        </Box>
        <Box width={"100%"} display={"flex"} gap={2} justifyContent={"right"}>
          <Button color="error" variant="contained">
            Cancel
          </Button>
          <Button variant="contained">Add</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AddProduct;
