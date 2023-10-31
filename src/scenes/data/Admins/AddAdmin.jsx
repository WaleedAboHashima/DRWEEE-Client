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
import { GetCountriesHandler } from "apis/system/citiesandcountries";
import { GetGeoHandler } from "apis/system/citiesandcountries/getgeo";
import { GetUsersHandler } from "apis/data/Users/GetUsers";
import { AddUsersHandler } from "apis/data/Users/AddUsers";
const AddAdmin = () => {
  const context = useContext(LanguageContext);
  const cookies = new Cookies();
  const theme = useTheme();
  // Form var
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Admin");
  const [selectedAdmin, setSelectedAdmin] = useState(0);
  const [selectedCoutnry, setSelectedCountry] = useState(0);
  const [selectedCity, setSelectedCity] = useState(0);
  const [selectedGov, setSelectedGov] = useState(0);
  const [permission, setPermission] = useState("");
  // Normal var
  const [countries, setCountires] = useState([]);
  const [cities, setCities] = useState([]);
  const [governments, setGovernments] = useState([]);
  const [error, setError] = useState("");
  const [admins, setAdmins] = useState([]);
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

  const handleSubmit = () => {
    setError("");
    dispatch(
      AddUsersHandler({
        name,
        email,
        phone,
        password,
        permission,
        role,
        selectedAdmin,
        selectedCity,
        selectedCoutnry,
        selectedGov,
      })
    ).then((res) => {
      if (res.payload.status === 200) {
        if (res.payload.data.success) {
          window.location.pathname = "/users";
        } else {
          setError(res.payload.data.message);
        }
      } else if (res.payload.status === 409) {
        setError("A user with this info exsits");
      } else if (res.payload.status === 403) {
        setError("All Fields are required");
      } else {
        setError(
          "ERROR! Please check that there is no user with one of the info"
        );
      }
    });
  };

  const handleAdminChange = (value) => {
    setSelectedAdmin(value);
    const filteradmin = admins.find((ad) => ad._id === value);
    if (filteradmin) {
      // Check if filteradmin is found
      const adminCountry = filteradmin.Country;
      if (adminCountry) {
        // Check if adminCountry is not undefined
        const filterCountry = countries.find(
          (country) => country.Name === adminCountry
        );

        if (filterCountry) {
          // Check if filterCountry is found
          setCities(filterCountry.Cities);
          setGovernments(filterCountry.Governments);
        } else {
          console.log("No matching country found for adminCountry");
        }
      } else {
        console.log("adminCountry is undefined");
      }
    } else {
      console.log("No matching admin found for value");
    }
  };

  useEffect(() => {
    dispatch(GetGeoHandler()).then((res) => {
      if (res.payload.data) {
        setCountires(res.payload.data.rules.Countries);
      }
    });
    dispatch(GetUsersHandler()).then((res) => {
      if (res.payload.data) {
        const admins = res.payload.data.allUsers.filter(
          (user) => user.role === "Admin"
        );
        setAdmins(admins);
      }
    });
  }, [dispatch]);
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
            sx={{ backgroundColor: "#7BB18D", borderRadius: 5 }}
          >
            <Header title={"Please enter Admin information below: "} />
            <TextField
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
            />
            <TextField
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <TextField
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone"
            />
            <TextField
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <Select onChange={(e) => setRole(e.target.value)} value={role}>
              <MenuItem value={"Admin"}>Admin</MenuItem>
              <MenuItem value={"SuperVisor"}>SuperVisor</MenuItem>
              <MenuItem value={"CityAdmin"}>CityAdmin</MenuItem>
            </Select>
            {/* Super Visor */}
            <Select
              value={selectedAdmin}
              onChange={(e) => handleAdminChange(e.target.value)}
              sx={{
                display:
                  role === "SuperVisor" || role === "CityAdmin"
                    ? "block"
                    : "none",
              }}
            >
              <MenuItem value={0}>Select An Admin</MenuItem>
              {admins.map((admin, i) => (
                <MenuItem
                  key={i}
                  value={admin._id}
                >{`${admin.fullName} (${admin.Country})`}</MenuItem>
              ))}
            </Select>
            {/* Roles */}
            <Select
              sx={{ display: !role && "none" }}
              value={
                role === "Admin"
                  ? selectedCoutnry
                  : role === "SuperVisor"
                  ? selectedGov
                  : selectedCity
              }
              onChange={(e) => {
                role === "Admin"
                  ? setSelectedCountry(e.target.value)
                  : role === "SuperVisor"
                  ? setSelectedGov(e.target.value)
                  : setSelectedCity(e.target.value);
              }}
              MenuProps={MenuProps}
            >
              <MenuItem value={0}>{role === 'Admin' ? 'Select A Country' : role === 'SuperVisor' ? 'Select A Government' : 'Select A City' }</MenuItem>
              {role === "Admin"
                ? countries.map((country, index) => (
                    <MenuItem key={index} value={country.Name}>
                      {country.Name}
                    </MenuItem>
                  ))
                : role === "SuperVisor"
                ? governments.map((gov, index) => (
                    <MenuItem key={index} value={gov}>
                      {gov}
                    </MenuItem>
                  ))
                : cities.map((city, index) => (
                    <MenuItem key={index} value={city}>
                      {city}
                    </MenuItem>
                  ))}
            </Select>
            <Typography>Permission: </Typography>
            <FormControlLabel
              value={permission}
              control={
                <Checkbox
                  onChange={(e) => {
                    if (e.target.checked) {
                      setPermission(e.target.value);
                    } else {
                      setPermission("");
                    }
                  }}
                />
              }
              label={
                role === "Admin"
                  ? "Add Admins"
                  : role === "SuperVisor"
                  ? "Add SuperVisors"
                  : "Add CityAdmins"
              }
            />
            <Typography variant="h3" textAlign={"center"}>
              {error}
            </Typography>
            <Box
              width={"100%"}
              display={"flex"}
              gap={2}
              justifyContent={"right"}
            >
              <Button
                onClick={() => (window.location.pathname = "/users")}
                color="error"
                variant="contained"
              >
                Cancel
              </Button>
              <Button onClick={() => handleSubmit()} variant="contained">
                Add
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AddAdmin;
