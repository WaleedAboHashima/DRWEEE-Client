import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import Header from "components/Header";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { LanguageContext } from "language";
import { Delete, Edit, AddOutlined } from "@mui/icons-material";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { GetProductsHandler } from "apis/data/Products/GetProducts";
import { DeleteProductHandler } from "apis/data/Products/DeleteProduct";
import { AddProductsHandler } from "apis/data/Products/AddProducts";
import { CloudUploadOutlined } from "@mui/icons-material";
import { EditProductHandler } from "apis/data/Products/EditProduct";

const Products = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [rows, setRows] = useState([]);
  const [formOpen, setFormOpen] = useState(false);
  const context = useContext(LanguageContext);
  const cookies = new Cookies();
  const [image, setImage] = useState();
  const [points, setPoints] = useState("");
  const [errorMessage, setError] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const navigator = useNavigate();
  const [editOpen, setEditOpen] = useState(false);
  const [name, setName] = useState("");
  const [way, setWay] = useState("fixed");
  const [productDetails, setProductData] = useState("");
  const state = useSelector((state) => state.GetUsers);
  const columns = [
    {
      field: "id",
      headerName: "ID",
    },
    {
      field: "Image",
      headerName: context.language === "en" ? "Image" : "البريد الألكتروني",
      renderCell: ({ row }) => (
        <img
          src={row.Image}
          style={{ padding: "5px 0", borderRadius: "10px" }}
          alt={"Product Image"}
          width="60%"
          height="150%"
        />
      ),
      width: 175,
    },
    {
      field: "Name",
      headerName: context.language === "en" ? "Name" : "لاسم",
      width: 250,
    },
    {
      field: "Points",
      headerName: context.language === "en" ? "Points" : "الدور",
      width: 200,
    },
    {
      field: "Price",
      headerName: context.language === "en" ? "Price" : "الدور",
      width: 200,
    },
    {
      field: "Description",
      headerName: context.language === "en" ? "Description" : "الهاتف",
      width: 250,
    },
    {
      field: "actions",
      headerName: context.language === "en" ? "Actions" : "الاجرائات",
      renderCell: ({ row: { _id, Name } }) => {
        return (
          <Box>
            <IconButton
              onClick={() => {
                setWay(way);
                setProductData({ _id, Name });
                setEditOpen(true);
              }}
            >
              <Edit sx={{ color: "green" }} />
            </IconButton>
            <IconButton
              onClick={() => {
                setProductData({ _id, Name });
                setFormOpen(true);
              }}
            >
              <Delete color="error" />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  const handleFileChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = (id) => {
    setError("");
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("points", points);
    formData.append("description", description);
    formData.append("image", image);
    dispatch(
      EditProductHandler({ id: productDetails._id, formdata: formData })
    ).then((res) => {
      if (res.payload.data) {
        if (res.payload.data.success) {
          setEditOpen(!editOpen);
          window.location.reload();
        } else {
          setError(res.payload.data.message);
        }
      } else {
        setError("Error in the submited fields");
      }
    });
  };

  const handleDelete = () => {
    dispatch(DeleteProductHandler({ id: productDetails._id })).then((res) => {
      if (res.payload.data.success) {
        window.location.reload();
      }
    });
  };

  useEffect(() => {
    dispatch(GetProductsHandler()).then((res) => {
      if (res.payload.status === 200) {
        setRows(res.payload.data.products);
      }
    });
  }, [dispatch]);

  return (
    <Box m="1.5rem 2.5rem">
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        flexDirection={{ xs: "column", sm: "row" }}
        gap={{ xs: 6 }}
        alignItems={"center"}
      >
        <Header
          title={context.language === "en" ? "Products" : "العملاء"}
          subtitle={
            context.language === "en" ? "List Of Products" : "قائمه العملاء"
          }
        />
        <Box display={"flex"} gap={2}>
          <Button
            sx={{
              display:
                cookies.get("_auth_role") === "Owner" ? "inlineblock" : "none",
              backgroundColor: "#2F8608",
              ":hover": {
                backgroundColor: "#2F860890",
              },
              color: theme.palette.secondary[200],
              fontSize: "14px",
              fontWeight: "bold",
              p: "10px 20px",
            }}
            onClick={() => navigator("/addproduct")}
          >
            {context.language === "en" ? "ADD PRODUCTS" : "اضافه مسئول"}
            <AddOutlined sx={{ mr: "10px" }} />
          </Button>
        </Box>
      </Box>
      <Box
        mt="40px"
        height="75vh"
        sx={{
          "& .MuiTablePagination-root ": { color: "black" },
          backgroundColor: "white",
        }}
      >
        <DataGrid
          autoPageSize
          disableSelectionOnClick
          sx={{ color: "black" }}
          loading={state.loading}
          localeText={context.language === "en" ? null : arabicLocaleText}
          components={{ Toolbar: GridToolbar }}
          rows={rows.map((user, index) => ({
            id: index + 1,
            ...user,
          }))}
          columns={columns}
        />
      </Box>
      <Dialog
        dir={context.language === "en" ? "ltr" : "rtl"}
        open={formOpen}
        onClose={() => setFormOpen(!formOpen)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {context.language === "en" ? (
            <Box>
              Delete{" "}
              <span style={{ color: "red" }}>{productDetails.Name}?</span>
            </Box>
          ) : (
            <Box>
              حذف <span style={{ color: "red" }}>{productDetails.Name}؟</span>
            </Box>
          )}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {context.language === "en"
              ? "Are you sure you want to delete this product?"
              : "هل انت متأكد بأنك تريد ازاله هذا الموظف؟"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFormOpen(!formOpen)}>
            {" "}
            {context.language === "en" ? "Cancel" : "الغاء"}
          </Button>
          <Button onClick={() => handleDelete()} autoFocus color="error">
            {context.language === "en" ? "Delete" : "حذف"}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        dir={context.language === "en" ? "ltr" : "rtl"}
        open={editOpen}
        onClose={() => setEditOpen(!editOpen)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {context.language === "en" ? (
            <Box>
              Edit{" "}
              <span style={{ color: theme.palette.primary[400] }}>
                {productDetails.Name}?
              </span>
            </Box>
          ) : (
            <Box>
              تعديل{" "}
              <span style={{ color: theme.palette.primary[400] }}>
                {productDetails.Name}؟
              </span>
            </Box>
          )}
        </DialogTitle>
        <DialogContent>
          <Box
            width={"100%"}
            display={"flex"}
            flexDirection={"column"}
            p={5}
            gap={2}
          >
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
                      maxWidth: "50%",
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
            ></Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditOpen(!editOpen)}>
            {" "}
            {context.language === "en" ? "Cancel" : "الغاء"}
          </Button>
          <Button onClick={() => handleSubmit()} autoFocus color="success">
            {context.language === "en" ? "Edit" : "تعديل"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

const arabicLocaleText = {
  toolbarDensity: "كثافة",
  toolbarDensityLabel: "كثافة",
  toolbarDensityCompact: "مضغوط",
  toolbarDensityStandard: "معياري",
  toolbarDensityComfortable: "مريح",
  toolbarColumns: "أعمدة",
  toolbarFilters: "تصفية",
  filterOperatorAnd: "Custom And",
  filterOperatorOr: "Custom Or",
  filterValuePlaceholder: "Custom Value",
  toolbarFiltersTooltipHide: "إخفاء الفلاتر",
  toolbarFiltersTooltipShow: "عرض الفلاتر",
  noResultsOverlayLabel: "لا توجد نتائج",
  noRowsLabel: "لا تجود كروت اتصالات",
  toolbarFiltersTooltipActive: (count) =>
    `${count} ${count === 1 ? "فلتر" : "فلاتر"}`,
  toolbarExport: "تصدير",
  toolbarExportPrint: "طباعه",
  toolbarExportCSV: "CSV تنزيل",
  footerRowSelected: (count) =>
    count !== 1
      ? `${count.toLocaleString()} صفوف محددة`
      : `${count.toLocaleString()} صف محدد`,
};

export default Products;
