import React, { useContext, useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
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
} from "@mui/material";
import Header from "components/Header";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
  Delete,
  Edit,
  CloseOutlined,
  MoreVertOutlined,
  ArchiveOutlined,
  MoreHorizOutlined,
  DoneOutlineOutlined,
  CheckOutlined,
  RemoveRedEyeOutlined,
} from "@mui/icons-material";
import { LanguageContext } from "language";
import Cookies from "universal-cookie";
import { useDispatch } from "react-redux";
import { GetOrdersHandler } from "apis/data/Orders/GetOrders";
import { ArchiveOrderHandler } from "apis/data/Orders/ArchiveOrder";
import { ChangeOrderStatusHandler } from "apis/data/Orders/ChangeStatus";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useTheme } from "@emotion/react";

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
          <Typography> Name : {info.Name}</Typography>
          <Typography>Phone: {info.Phone}</Typography>
          <Typography>Address: {info.Address}</Typography>
        </Box>
      )}
    </>
  );
};

const Orders = () => {
  const context = useContext(LanguageContext);
  const [isOpen, setisOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [orderDetails, setOrderDetails] = useState({});
  const [status, setStatus] = useState(0);
  const [orders, setOrders] = useState([]);
  const [productDetails, setProductDetails] = useState({
    Products: [],
    User: { Location: {} },
  });
  const [editOpen, setEditOpen] = useState(false);
  const theme = useTheme();
  const dispatch = useDispatch();
  const columns = [
    {
      field: "id",
      headerName: "ID",
    },
    {
      field: "OrderNo",
      headerName: context.language === "en" ? "Order No." : "لاسم",
      width: 200,
    },
    {
      field: "Name",
      headerName:
        context.language === "en" ? "Customer Name" : "البريد الألكتروني",
      responsive: "sm",
      valueGetter: ({ row }) => row.User.Name,
      width: 200,
    },
    {
      field: "Phone",
      headerName:
        context.language === "en" ? "Customer Phone" : "البريد الألكتروني",
      responsive: "sm",
      valueGetter: ({ row }) => row.User.Phone,
      width: 200,
    },
    {
      field: "Status",
      headerName: context.language === "en" ? "Status" : "البريد الألكتروني",
      responsive: "sm",
      width: 200,
      renderCell: ({ row: { Status } }) => {
        return (
          <Box
            width="100%"
            p="5px"
            display="flex"
            backgroundColor={
              Status === "Pending"
                ? "orange"
                : Status === "Delivered"
                ? "green"
                : Status === "On the way"
                ? "#5E35B1"
                : "red"
            }
            borderRadius="4px"
          >
            {Status === "Pending" ? (
              <MoreHorizOutlined sx={{ color: "white" }} />
            ) : Status === "Delivered" ? (
              <CheckOutlined sx={{ color: "white" }} />
            ) : Status === "On the way" ? (
              <CircularProgress sx={{ color: "white" }} size={20} />
            ) : (
              <CloseOutlined sx={{ color: "white" }} />
            )}
            <Typography color={"white"} sx={{ ml: "5px" }}>
              {Status}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "TotalPoints",
      headerName: context.language === "en" ? "TotalPoints" : "الدور",
      width: 200,
    },
    {
      field: "TotalPrice",
      headerName: context.language === "en" ? "TotalPrice" : "الهاتف",
      width: 250,
    },
    {
      width: 275,
      field: "actions",
      headerName: context.language === "en" ? "Actions" : "الاجرائات",
      renderCell: ({ row: { _id, Products, User } }) => {
        return (
          <Box>
            <IconButton
              onClick={() => {
                setOrderDetails({ _id });
                setisOpen(true);
              }}
            >
              <Edit sx={{ color: "green" }} />
            </IconButton>
            <IconButton
              onClick={() => {
                setProductDetails({
                  Products: Products,
                  User: User,
                });
                setEditOpen(true);
              }}
            >
              <RemoveRedEyeOutlined color="primary" />
            </IconButton>
            <IconButton
              onClick={() => {
                handleArchive(_id);
              }}
            >
              <ArchiveOutlined color="error" />
            </IconButton>
          </Box>
        );
      },
    },
  ];
  const prodColumns = [
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
      width: 400,
    },
  ];

  const mapOptions = {
    disableDefaultUI: true, // Hide default controls
    // streetViewControl: true,
    zoomControl: true, // Show zoom controls
    // mapTypeId: "satellite", // Set default display to satellite view
  };

  const handleEdit = () => {
    dispatch(ChangeOrderStatusHandler({ id: orderDetails._id, status })).then(
      (res) => {
        if (res.payload.status === 200) {
          window.location.reload();
        }
      }
    );
  };

  const handleArchive = (id) => {
    dispatch(ArchiveOrderHandler({ id })).then((res) => {
      if (res.payload.status === 200) {
        window.location.reload();
      }
    });
  };

  useEffect(() => {
    dispatch(GetOrdersHandler()).then((res) => {
      if (res.payload.status === 200) {
        if (res.payload.data.success) {
          const orders = res.payload.data.orders.filter(
            (order) => order.Archived === false
          );
          setRows(orders);
        }
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
          title={context.language === "en" ? "Orders" : "العملاء"}
          subtitle={
            context.language === "en" ? "List Of Orders" : "قائمه العملاء"
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
          loading={orders && false}
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
        fullWidth
        open={isOpen}
        onClose={() => setisOpen(!isOpen)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <Box>
            <Select
              onChange={(e) => setStatus(e.target.value)}
              value={status}
              fullWidth
            >
              <MenuItem value={0}>Select a status</MenuItem>
              <MenuItem value={"Pending"}>Pending</MenuItem>
              <MenuItem value={"Delivered"}>Delivered</MenuItem>
              <MenuItem value={"On the way"}>On the way</MenuItem>
              <MenuItem value={"Canceled"}>Canceled</MenuItem>
            </Select>
          </Box>
          <DialogActions>
            <Button
              onClick={() => handleEdit()}
              disabled={!status && true}
              variant="contained"
            >
              SAVE
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
      <Dialog
        dir={context.language === "en" ? "ltr" : "rtl"}
        open={editOpen}
        fullScreen
        onClose={() => {
          setProductDetails({ Products: [], User: { Location: {} } });
          setEditOpen(!editOpen);
        }}
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
              <span>{productDetails.Name}</span>
            </Box>
          ) : (
            <Box>
              تعديل{" "}
              <span style={{ color: theme.palette.primary[400] }}>
                {productDetails.Name}؟
              </span>
            </Box>
          )}
          <IconButton
            onClick={() => {
              setProductDetails({ Products: [], User: { Location: {} } });
              setEditOpen(false);
            }}
          >
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
              display={"flex"}
              flexDirection={"column"}
              gap={2}
              width={"100%"}
              alignItems={"flex-start"}
              height={"100vh"}
            >
              <Box height="40vh" width={"100%"} borderRadius="4px">
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
                        lat: parseFloat(productDetails.User.Location.lat),
                        lng: parseFloat(productDetails.User.Location.lng),
                      }}
                    >
                      <CustomMarker
                        position={{
                          lat: parseFloat(productDetails.User.Location.lat),
                          lng: parseFloat(productDetails.User.Location.lng),
                        }}
                        info={productDetails.User}
                      />
                    </GoogleMap>
                  )}
                </LoadScript>
              </Box>
              <Typography variant="h3" sx={{ textAlign: "center" }}>
                Name: {productDetails.User.Name}
              </Typography>
              <Typography variant="h3" sx={{ textAlign: "center" }}>
                Phone: {productDetails.User.Phone}
              </Typography>
              <Typography variant="h3" sx={{ textAlign: "center" }}>
                Products:
              </Typography>
              <DataGrid
                sx={{ width: "100%", height: "100%" }}
                rows={productDetails.Products.map((prod, index) => ({
                  id: index + 1,
                  ...prod,
                }))}
                columns={prodColumns}
              />
            </Box>
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

export default Orders;
