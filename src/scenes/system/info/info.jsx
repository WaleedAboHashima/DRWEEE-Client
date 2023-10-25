import { useTheme } from "@emotion/react";
import { AddOutlined, CloudUploadOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Header from "components/Header";
import { LanguageContext } from "language";
import React, { useContext, useEffect, useState } from "react";
import InfoIcon from "assets/editInfo.svg";
import { useDispatch } from "react-redux";
import { GetCountriesHandler } from "apis/citiesandcountries";
const Info = () => {
  const context = useContext(LanguageContext);
  const [role, setRole] = useState("");
  const [countries, setCountires] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("0");
  const [selectedCity, setSelectedCity] = useState("0");
  const [governement, setGovernement] = useState("");
  const [images, setImages] = useState([]);
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

  const handleFileChange = (event) => {
    const selectedFiles = event.target.files;
    const imageArray = [];

    for (let i = 0; i < selectedFiles.length; i++) {
      imageArray.push(URL.createObjectURL(selectedFiles[i]));
    }

    setImages(imageArray);
  };

  useEffect(() => {
    dispatch(GetCountriesHandler()).then((res) => {
      if (res.payload.status === 200) {
        if (res.payload.data.success) {
          console.log(res.payload.data);
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
          title={context.language === "en" ? "Information" : "العملاء"}
          subtitle={
            context.language === "en"
              ? "Edit app information below : "
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
        <img height={250} src={InfoIcon} />
        <Box
          display={"flex"}
          flexDirection={{ xs: "column", lg: "row" }}
          width={{ xs: "100%", md: "100%" }}
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
            <Header
              title={"Please Enter Home Page Introduction Data Below: "}
            />
            <TextField variant="outlined" multiline rows={6} placeholder="Please enter the home page info...." />
            {images.length > 0 ? (
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: {xs: "column", lg: 'row'},
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                {images.map((image, index) => (
                  <Box key={index} justifyContent={'center'} gap={2} alignItems={'center'} display={'flex'} width={'100%'} flexDirection={'column'}>
                    <img
                      src={image}
                      alt={`uploaded image ${index}`}
                      style={{
                        maxHeight: "100%",
                        maxWidth: "50%",
                      }}
                    />
                    <Button
                      onClick={() => {
                        const newImages = images.slice(); // Create a copy of the images array
                        newImages.splice(index, 1);
                        setImages(newImages);
                      }}
                      variant="contained"
                      color="error"
                      className="remove-button"
                    >
                      Remove
                    </Button>
                  </Box>
                ))}
              </Box>
            ) : (
              <Box
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"center"}
                alignItems={"center"}
                gap={2}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                    backgroundColor: "transparent",
                    padding: 5,
                    mx: "auto",
                    width: "300px",
                    height: "200px",
                    //   border: `2px dashed ${colors.primary[500]}`,
                    borderRadius: 1,
                    "&:hover": {
                      cursor: "pointer",
                      backgroundColor: "#e0e0e010",
                    },
                  }}
                >
                  <input
                    style={{ display: "none" }}
                    accept="image/*"
                    sx={{ display: "none" }}
                    id="upload-image"
                    type="file"
                    onChange={handleFileChange}
                    multiple
                  />
                  <label htmlFor="upload-image">
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                    >
                      <CloudUploadOutlined
                        sx={{ fontSize: 48, marginBottom: 1 }}
                      />
                      <Typography variant="h6">
                        {context.language === "en"
                          ? "Upload Home Image"
                          : "رفع صوره المتجر"}
                      </Typography>
                      <Typography variant="subtitle1" color="textSecondary">
                        {context.language === "en"
                          ? " Click or drag and drop image file here"
                          : " انقر او اسحب الصوره هنا لرفعها"}
                      </Typography>
                    </Box>
                  </label>
                </Box>
                {/* <Box color={"red"}>{logoError}</Box> */}
              </Box>
            )}
            <Box
              width={"100%"}
              display={"flex"}
              gap={2}
              justifyContent={"right"}
            >
              <Button variant="contained">Add</Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Info;
