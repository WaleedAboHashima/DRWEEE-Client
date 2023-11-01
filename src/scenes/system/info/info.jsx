import { CloudUploadOutlined } from "@mui/icons-material";
import { Box, Button, TextField, Typography } from "@mui/material";
import Header from "components/Header";
import { LanguageContext } from "language";
import React, { useContext, useState } from "react";
import InfoIcon from "assets/editInfo.svg";
import { useDispatch } from "react-redux";
import { AddInfoHandler } from "apis/system/info/addInfo";
const Info = () => {
  const context = useContext(LanguageContext);
  const [images, setImages] = useState([]);
  const [txt, setTxt] = useState();
  const [video, setVideo] = useState();
  const dispatch = useDispatch();
  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("text", txt);
    formData.append("video", video);
    images.map(image => formData.append('images', image))
    dispatch(AddInfoHandler(formData)).then((res) => {
      if (res.payload.data) {
        if (res.payload.status === 200) {
          window.location = "/info";
        }
      }
    });
  };

  const handleFileChange = (event) => {
    const selectedFiles = event.target.files;
    const imageArray = [];

    for (let i = 0; i < selectedFiles.length; i++) {
      imageArray.push(selectedFiles[i]);
    }

    setImages(imageArray);
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
            sx={{ backgroundColor: "#7BB18D", borderRadius: 5 }}
          >
            <Header
              title={"Please Enter Home Page Introduction Data Below: "}
            />
            <TextField
              onChange={(e) => setVideo(e.target.value)}
              variant="outlined"
              placeholder="Video URL EX: https://www.youtube.com/"
            />
            <TextField
              onChange={(e) => setTxt(e.target.value)}
              variant="outlined"
              multiline
              rows={6}
              placeholder="Please enter the home page info...."
            />
            {images.length > 0 ? (
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: { xs: "column", lg: "row" },
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                {images.map((image, index) => (
                  <Box
                    key={index}
                    justifyContent={"center"}
                    gap={2}
                    alignItems={"center"}
                    display={"flex"}
                    width={"100%"}
                    flexDirection={"column"}
                  >
                    <img
                      src={URL.createObjectURL(image)}
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
              <Button
                onClick={() => handleSubmit()}
                disabled={video && txt && images.length > 0 ? false : true}
                variant="contained"
              >
                Add
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Info;
