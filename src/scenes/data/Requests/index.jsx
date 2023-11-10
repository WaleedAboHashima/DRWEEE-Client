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
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import Header from "components/Header";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { LanguageContext } from "language";
import {
  CheckOutlined,
  CloseOutlined,
  Delete,
  RemoveRedEyeRounded,
} from "@mui/icons-material";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { DeleteProductHandler } from "apis/data/Products/DeleteProduct";
import { EditProductHandler } from "apis/data/Products/EditProduct";
import { GetRequestsHandler } from "apis/data/Requests/GetRequests";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { ConfirmRequestHandler } from "apis/data/Requests/ConfirmRequests";
import { RemoveRequestHandler } from "apis/data/Requests/DeleteRequest";

const Requests = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [rows, setRows] = useState([]);
  const [formOpen, setFormOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const context = useContext(LanguageContext);
  const [way, setWay] = useState("fixed");
  const [price, setPrice] = useState();
  const [points, setPoints] = useState();
  const [requestDetails, setRequestDetails] = useState("");
  const [productDetails, setProductData] = useState("");
  const [userDetails, setUserDetails] = useState("");
  const state = useSelector((state) => state.GetUsers);
  const [error, setError] = useState("");
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
      field: "Customer",
      headerName: context.language === "en" ? "Customer Name" : "لاسم",
      width: 250,
      valueGetter: ({ row: { User } }) => User.fullName,
    },
    {
      field: "Customer Email",
      headerName: context.language === "en" ? "Email" : "لاسم",
      width: 250,
      valueGetter: ({ row: { User } }) => User.email,
    },
    {
      field: "Name",
      headerName: context.language === "en" ? "Name" : "لاسم",
      width: 250,
    },
    {
      field: "Description",
      headerName: context.language === "en" ? "Description" : "الهاتف",
      width: 250,
    },
    {
      field: "actions",
      width: 300,
      headerName: context.language === "en" ? "Actions" : "الاجرائات",
      renderCell: ({
        row: { _id, Name, Image, Location, Description, Quantity, Price, User },
      }) => {
        return (
          <Box>
            <IconButton
              onClick={() => {
                setRequestDetails({ _id, Name });
                setConfirmOpen(true);
              }}
            >
              <CheckOutlined color="success" />
            </IconButton>
            <IconButton
              onClick={() => {
                setWay(way);
                setProductData({
                  _id,
                  Name,
                  Image,
                  Lat: Location.lat,
                  Lng: Location.lng,
                  Description,
                  Quantity,
                  Price,
                });
                setUserDetails(User);
                setEditOpen(true);
              }}
            >
              <RemoveRedEyeRounded sx={{ color: "black" }} />
            </IconButton>
            <IconButton
              onClick={() => {
                setProductData({ _id, Name });
                setFormOpen(true);
              }}
            >
              <CloseOutlined color="error" />
            </IconButton>
          </Box>
        );
      },
    },
  ];
  const CustomMarker = ({ position, info }) => {
    const [isHovered, setIsHovered] = useState(false);
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
        {isHovered && (
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
              left: 30,
            }}
          >
            <Typography> Name : {info.fullName}</Typography>
            <Typography>Email: {info.email}</Typography>
            <Typography>Phone: {info.phone}</Typography>
          </Box>
        )}
      </>
    );
  };

  const mapOptions = {
    disableDefaultUI: true, // Hide default controls
    // streetViewControl: true,
    zoomControl: true, // Show zoom controls
    // mapTypeId: "satellite", // Set default display to satellite view
  };
  const handleDelete = () => {
    dispatch(RemoveRequestHandler({ id: productDetails._id })).then((res) => {
      if (res.payload) {
        if (res.payload.status === 200) {
          window.location.reload();
        }
      }
    });
  };

  const handleConfirm = () => {
    dispatch(
      ConfirmRequestHandler({ id: requestDetails._id, price, points })
    ).then((res) => {
      if (res.payload) {
        if (res.payload.status === 200) {
          window.location.reload();
        } else {
          setError(res.payload.message);
        }
      } else {
        setError("Server Error");
      }
    });
  };

  useEffect(() => {
    dispatch(GetRequestsHandler()).then((res) => {
      if (res.payload.status === 200) {
        setRows(res.payload.data.requests);
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
          title={context.language === "en" ? "Requests" : "العملاء"}
          subtitle={
            context.language === "en" ? "List Of Requests" : "قائمه العملاء"
          }
        />
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
              Remove{" "}
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
              ? "Are you sure you want to remove this request?"
              : "هل انت متأكد بأنك تريد ازاله هذا الموظف؟"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFormOpen(!formOpen)}>
            {" "}
            {context.language === "en" ? "Cancel" : "الغاء"}
          </Button>
          <Button onClick={() => handleDelete()} autoFocus color="error">
            {context.language === "en" ? "Remove" : "حذف"}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        dir={context.language === "en" ? "ltr" : "rtl"}
        open={confirmOpen}
        onClose={() => setConfirmOpen(!confirmOpen)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Box display={"flex"} gap={0.5}>
            Confirm Request:
            <Typography variant="h5" color={"yellow"}>
              {requestDetails.Name}
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box display={"flex"} flexDirection={"column"} gap={2}>
            <TextField
              placeholder="Points"
              type="number"
              value={points}
              onChange={(e) => setPoints(e.target.value)}
            />
            <TextField
              placeholder="Price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <Typography>{error}</Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(!confirmOpen)} color="error">
            {" "}
            {context.language === "en" ? "Cancel" : "الغاء"}
          </Button>
          <Button onClick={() => handleConfirm()} autoFocus color="secondary">
            {context.language === "en" ? "Confirm" : "حذف"}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        dir={context.language === "en" ? "ltr" : "rtl"}
        open={editOpen}
        fullScreen
        onClose={() => setEditOpen(!editOpen)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          display={"flex"}
          justifyContent={"space-between"}
        >
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
          <IconButton onClick={() => setEditOpen(false)}>
            <CloseOutlined />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box
            width={"100%"}
            display={"flex"}
            flexDirection={"column"}
            p={5}
            gap={2}
          >
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
                  height={300}
                  src={productDetails.Image}
                  alt={`uploaded image`}
                  style={{
                    maxWidth: "100%",
                    borderRadius: "20px",
                  }}
                />
              </Box>
            </Box>
            <Box
              display={"flex"}
              flexDirection={"column"}
              gap={2}
              width={"100%"}
              alignItems={"flex-start"}
            >
              <Typography variant="h3" sx={{ textAlign: "center" }}>
                Name: {productDetails.Name}
              </Typography>
              <Typography variant="h3" sx={{ textAlign: "center" }}>
                Description: {productDetails.Description}
              </Typography>
              <Typography variant="h3" sx={{ textAlign: "center" }}>
                Location:
              </Typography>
              <Box height="75vh" width={"100%"} borderRadius="4px">
                <LoadScript googleMapsApiKey="AIzaSyCewVD8Afv0cy6NGoCZkQ4PZRW3OQCFfHA">
                  {!productDetails ? (
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
                      zoom={20}
                      center={{
                        lat: parseFloat(productDetails.Lat),
                        lng: parseFloat(productDetails.Lng),
                      }}
                    >
                      <CustomMarker
                        position={{
                          lat: parseFloat(productDetails.Lat),
                          lng: parseFloat(productDetails.Lng),
                        }}
                        info={userDetails}
                      />
                    </GoogleMap>
                  )}
                </LoadScript>
              </Box>
            </Box>
            <Box
              width={"100%"}
              display={"flex"}
              gap={2}
              justifyContent={"right"}
            ></Box>
          </Box>
        </DialogContent>
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

export default Requests;
