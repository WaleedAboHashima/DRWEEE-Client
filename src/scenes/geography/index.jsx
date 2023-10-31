import React, { useContext, useEffect, useState } from "react";
import { Box, CircularProgress, Typography, useTheme } from "@mui/material";
import Header from "components/Header";
import { LanguageContext } from "language";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useDispatch } from "react-redux";
import axios from "axios";
import { GetOrdersHandler } from "apis/data/Orders/GetOrders";

const CustomMarker = ({ position, label, info, country }) => {
  const [isHovered, setIsHovered] = useState(false);
  const context = useContext(LanguageContext);
  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };
  return (
    <>
      <Marker
        position={position}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      />
      {isHovered &&
        info.map((info) => (
          <Box
            sx={{
              position: "absolute",
              zIndex: 1,
              background: "white",
              padding: "8px",
              borderRadius: "4px",
              color: "black",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
              top: 30,
              left: 30
            }}
          >
            <Typography> Name : {info.Name}</Typography>
            <Typography>Phone: {info.Phone}</Typography>
            <Typography>Address: {info.Address}</Typography>
          </Box>
        ))}
    </>
  );
};

const Geography = () => {
  const theme = useTheme();
  const context = useContext(LanguageContext);
  const dispatch = useDispatch();
  const [currentLocation, setCurrentLocation] = useState();
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState({});
  const [locations, setLocations] = useState([{ lat: "", lng: "" }]);

  const mapOptions = {
    disableDefaultUI: true, // Hide default controls
    // streetViewControl: true,
    zoomControl: true, // Show zoom controls
    // mapTypeId: "satellite", // Set default display to satellite view
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
          setLoading(false);
        },
        (error) => {
          console.log("Error getting current location:", error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    dispatch(GetOrdersHandler()).then((res) => {
      if (res.payload.data) {
        const location = res.payload.data.orders.map(
          (order) => order.User.Location
        );
        setLocations(location);
        const user = res.payload.data.orders.map((order) => order.User);
        setInfo(user);
      }
    });
  }, [dispatch]);

  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title={context.language === "en" ? "GEOGRAPHY" : "الموقع الجغرافي"}
        subtitle={
          context.language === "en"
            ? "Find where your users are located."
            : "مواقع المستخدمين."
        }
      />
      <Box
        mt="40px"
        height="75vh"
        border={`1px solid ${theme.palette.secondary[200]}`}
        borderRadius="4px"
      >
        <LoadScript googleMapsApiKey="AIzaSyCewVD8Afv0cy6NGoCZkQ4PZRW3OQCFfHA">
          {loading ? (
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              height={"100%"}
            >
              <CircularProgress />
            </Box>
          ) : (
            <GoogleMap
              options={mapOptions}
              mapContainerStyle={{ height: "100%", width: "100%" }}
              zoom={5}
              center={currentLocation}
            >
              {locations.length > 0 &&
                locations.map((location, index) => {
                  return (
                    <CustomMarker
                      key={index}
                      position={{
                        lat: parseFloat(location.lat),
                        lng: parseFloat(location.lng),
                      }}
                      info={info}
                    />
                  );
                })}
            </GoogleMap>
          )}
        </LoadScript>
      </Box>
    </Box>
  );
};

export default Geography;
