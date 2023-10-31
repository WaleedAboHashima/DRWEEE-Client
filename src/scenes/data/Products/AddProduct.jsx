import {  CloudUploadOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import Header from "components/Header";
import { LanguageContext } from "language";
import React, { useContext, useEffect, useState } from "react";
import InfoIcon from "assets/addProduct.svg";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AddProductsHandler } from "apis/data/Products/AddProducts";
const AddProduct = () => {
  const context = useContext(LanguageContext);
  const [image, setImage] = useState();
  const [points, setPoints] = useState("");
  const [errorMessage, setError] = useState("");
  const [name, setName] = useState("");
  const state = useSelector(state => state.AddProducts)
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const handleFileChange = (event) => {
    setImage(event.target.files[0]);
  };
  const handleSubmit = () => {
    setError("");
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("points", points);
    formData.append("description", description);
    formData.append("image", image);
    dispatch(AddProductsHandler(formData)).then((res) => {
      if (res.payload.data) {
        if (res.payload.data.success) {
          navigator("/products");
        } else {
          setError(res.payload.data.message);
        }
      } else {
        setError("Error in the submited fields");
      }
    });
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
          title={context.language === "en" ? "ADD PRODUCT" : "العملاء"}
          subtitle={
            context.language === "en"
              ? "Add Product Information Below : "
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
            <Header title={"Please Enter Product Data Below: "} />
            {image ? (
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
                <Box
                  justifyContent={"center"}
                  gap={2}
                  alignItems={"center"}
                  display={"flex"}
                  width={"100%"}
                  flexDirection={"column"}
                >
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`uploaded image`}
                    style={{
                      maxHeight: "20%",
                      maxWidth: "20%",
                      borderRadius: "20px",
                    }}
                  />
                  <Button
                    onClick={() => {
                      setImage("");
                    }}
                    variant="contained"
                    color="error"
                    className="remove-button"
                  >
                    Remove
                  </Button>
                </Box>
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
                          ? "Upload Product Image"
                          : "رفع صوره المتجر"}
                      </Typography>
                      <Typography variant="subtitle1" color="textSecondary">
                        {context.language === "en"
                          ? " Click to select an image file here"
                          : " انقر او اسحب الصوره هنا لرفعها"}
                      </Typography>
                    </Box>
                  </label>
                </Box>
              </Box>
            )}
            <TextField
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
            />
            <TextField
              value={points}
              onChange={(e) => setPoints(e.target.value)}
              placeholder="Points"
            />
            <TextField
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
            />
            <TextField
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              variant="outlined"
              multiline
              rows={6}
              placeholder="Description..."
            />
            <Typography variant="h2" sx={{ textAlign: "center" }}>
              {errorMessage}
            </Typography>
            <Box
              width={"100%"}
              display={"flex"}
              gap={2}
              justifyContent={"right"}
            >
              <Button
                disabled={!name}
                type="submit"
                onClick={() => handleSubmit()}
                variant="contained"
              >
                {state.loading ? <CircularProgress size={25} sx={{color: 'white'}} /> : "Add"}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AddProduct;
