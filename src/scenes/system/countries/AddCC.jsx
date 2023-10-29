import { useTheme } from "@emotion/react";
import { Box, Button, MenuItem, Select, TextField, Typography } from "@mui/material";
import Header from "components/Header";
import { LanguageContext } from "language";
import React, { useContext, useEffect, useState } from "react";
import AdminIcon from "assets/addAdmin.svg";
import { useDispatch } from "react-redux";
import { GetCountriesHandler } from "apis/system/citiesandcountries";
import { useNavigate } from "react-router-dom";
import { AddGeoInfo } from "apis/system/citiesandcountries/addgeo";
const AddCC = () => {
  const context = useContext(LanguageContext);
  const [countries, setCountires] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("0");
  const [selectedCoutnry, setSelectedCountry] = useState("0");
  const navigator = useNavigate();
  const [error, setError] = useState("");
  const [government, setGovernment] = useState("");
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

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    const filteredCountry = countries.find(
      (found) => found.country === country
    );
    setCities(filteredCountry.cities);
  };

  const handleAddGeo = () => {
    dispatch(
      AddGeoInfo({ city: selectedCity, country: selectedCoutnry, government })
    ).then((res) => {
      if (res.payload.data.success) {
        window.location = "/countries";
      } else {
        setError(res.payload.data.message);
      }
    });
  };

  useEffect(() => {
    dispatch(GetCountriesHandler()).then((res) => {
      if (res.payload.status === 200) {
        if (res.payload.data.success) {
          const countries = res.payload.data.data.countries;
          setCountires(countries);
        }
      }
    });
  }, []);

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
          title={
            context.language === "en" ? "ADD COUNTRIES & CITIES" : "العملاء"
          }
          subtitle={
            context.language === "en"
              ? "Add Countries & Cities below"
              : "قائمه العملاء"
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
            <Header title={"Please enter information below: "} />
            <Select
              value={selectedCoutnry}
              onChange={(e) => {
                handleCountryChange(e.target.value);
              }}
              MenuProps={MenuProps}
            >
              <MenuItem disabled value={"0"}>
                Select A Country
              </MenuItem>
              {countries.length &&
                countries.map((country, index) => (
                  <MenuItem key={index} value={country.country}>
                    {country.country}
                  </MenuItem>
                ))}
            </Select>
            <Select
              MenuProps={MenuProps}
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              <MenuItem disabled value={"0"}>
                Select A City
              </MenuItem>
              {cities &&
                cities.map((city, index) => (
                  <MenuItem key={index} value={city}>
                    {city}
                  </MenuItem>
                ))}
            </Select>
            <TextField
              placeholder="Government"
              value={government}
              onChange={(e) => setGovernment(e.target.value)}
            />
            <Box
              width={"100%"}
              display={"flex"}
              gap={2}
              justifyContent={"right"}
            >
              <Button
                onClick={() => navigator("/countries")}
                color="error"
                variant="contained"
              >
                Cancel
              </Button>
              <Button
                onClick={() => handleAddGeo()}
                type="submit"
                disabled={
                  selectedCity.length > 1 ||
                  selectedCoutnry.length > 1 ||
                  government
                    ? false
                    : true
                }
                variant="contained"
              >
                Add
              </Button>
            </Box>
            <Typography variant="h3">{error}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AddCC;
