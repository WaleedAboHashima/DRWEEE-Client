import React, { useContext, useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
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
import {
  Delete,
  Edit,
  AddOutlined,
  SellOutlined,
  CloseOutlined,
  MoreVertOutlined,
} from "@mui/icons-material";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { GetUsersHandler } from "apis/data/Users/GetUsers";
import { GetProductsHandler } from "apis/data/Products/GetProducts";

const Products = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [rows, setRows] = useState([]);
  const [formOpen, setFormOpen] = useState(false);
  const context = useContext(LanguageContext);
  const [isOpen, setisOpen] = useState(false);
  const [userdetails, setUserdetails] = useState({});
  const cookies = new Cookies();
  const [type, setType] = useState(0);
  const navigator = useNavigate();
  const [orders, setOrders] = useState([]);
  const [editOpen, setEditOpen] = useState(false);
  const [name, setName] = useState();
  const [salary, setSalary] = useState();
  const [percentage, setPercentage] = useState();
  const [way, setWay] = useState("fixed");
  const state = useSelector((state) => state.GetUsers);

  const columns = [
    {
      field: "id",
      headerName: "ID",
    },
    {
      field: "Image",
      headerName: context.language === "en" ? "Image" : "البريد الألكتروني",
      renderCell: ({row}) => <img width={'auto'} height={'100px'} src={row.Image} />,
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
      renderCell: ({
        row: { _id, name, type, orders, salary, percentage, way },
      }) => {
        return (
          <Box>
            <IconButton
              onClick={() => {
                setWay(way);
                setUserdetails({ _id, name, salary, percentage });
                setEditOpen(true);
              }}
            >
              <Edit sx={{ color: "green" }} />
            </IconButton>
            <IconButton
              onClick={() => {
                setUserdetails({ _id, name });
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
              backgroundColor: '#2F8608',
              ":hover" : {
                backgroundColor: '#2F860890'
              },
              color: theme.palette.secondary[200],
              fontSize: "14px",
              fontWeight: "bold",
              p: "10px 20px",
            }}
            // onClick={() => navigator("/addproduct")}
          >
            {context.language === "en" ? "ADD PRODUCTS" : "اضافه مسئول"}
            <AddOutlined sx={{ mr: "10px" }} />
          </Button>
        </Box>
      </Box>
      <Box mt="40px" height="75vh"
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
              Delete <span style={{ color: "red" }}>{userdetails.name}?</span>
            </Box>
          ) : (
            <Box>
              حذف <span style={{ color: "red" }}>{userdetails.name}؟</span>
            </Box>
          )}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {context.language === "en"
              ? "Are you sure you want to delete this employee?"
              : "هل انت متأكد بأنك تريد ازاله هذا الموظف؟"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFormOpen(!formOpen)}>
            {" "}
            {context.language === "en" ? "Cancel" : "الغاء"}
          </Button>
          <Button autoFocus color="error">
            {context.language === "en" ? "Delete" : "حذف"}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        fullScreen
        open={isOpen}
        onClose={() => setisOpen(!isOpen)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          display={"flex"}
          justifyContent={"space-between"}
        >
          <span style={{ color: "white" }}>
            Orders for the user : {userdetails.name}
          </span>
          <IconButton
            onClick={() => {
              setisOpen(false);
              setOrders([]);
            }}
          >
            <CloseOutlined />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box display={"flex"} flexWrap={"wrap"} gap={20}>
            {orders ? (
              orders.map((order) => (
                <Card sx={{ width: 345, maxWidth: 345 }}>
                  <CardHeader
                    avatar={
                      <Avatar sx={{ bgcolor: "white" }} aria-label="recipe">
                        R
                      </Avatar>
                    }
                    action={
                      <IconButton aria-label="settings">
                        <MoreVertOutlined />
                      </IconButton>
                    }
                    title={order.service.name}
                    subheader={order.amount_paid}
                  />
                  <Box
                    display={"flex"}
                    flexWrap={"wrap"}
                    justifyContent={"space-between"}
                    flexDirection={"column"}
                    gap={3}
                    p={3}
                  >
                    <Typography>
                      Client Name : {`${order.client.full_name}`}
                    </Typography>
                    <Typography>Client Code : {order.client.code}</Typography>
                    <Typography>Doctors : {order.doctor.name}</Typography>
                    <Typography>
                      Assistances :{" "}
                      {order.assistances.map((assistance) => assistance.name)}
                    </Typography>
                    <Typography>
                      Addtional Info :
                      <br />
                      {order.addtionalInfo.map((info) => {
                        const keyValuePairs = Object.entries(info);
                        const result = keyValuePairs.map(
                          ([key, value], index) => (
                            <Box key={index} display={"flex"}>
                              <Typography>
                                {key} : {value}
                              </Typography>
                            </Box>
                          )
                        );
                        return result;
                      })}
                    </Typography>
                  </Box>
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      Time : {order.time}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Date : {order.date}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Finished : {order.done ? "Yes" : "No"}
                    </Typography>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                width={"100%"}
                height={"100%"}
              >
                No Orders Found
              </Box>
            )}
          </Box>
        </DialogContent>
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
                {userdetails.name}?
              </span>
            </Box>
          ) : (
            <Box>
              تعديل{" "}
              <span style={{ color: theme.palette.primary[400] }}>
                {userdetails.name}؟
              </span>
            </Box>
          )}
        </DialogTitle>
        <DialogContent>
          <Box
            display={"flex"}
            alignItems={"center"}
            gap={2}
            flexDirection={"column"}
          >
            <TextField
              fullWidth
              dir={context.language === "en" ? "ltr" : "rtl"}
              placeholder={
                context.language === "en"
                  ? `Name: ${userdetails.name}`
                  : `الاسم: ${userdetails.name}`
              }
              onChange={(e) => setName(e.target.value)}
            />
            {way === "fixed" ? (
              <TextField
                dir={context.language === "en" ? "ltr" : "rtl"}
                fullWidth
                placeholder={
                  context.language === "en"
                    ? `Salary: ${userdetails.salary}`
                    : `المرتب: ${userdetails.salary}`
                }
                onChange={(e) => setSalary(e.target.value)}
              />
            ) : (
              <TextField
                dir={context.language === "en" ? "ltr" : "rtl"}
                fullWidth
                placeholder={
                  context.language === "en"
                    ? `Percentage %: ${userdetails.percentage}`
                    : `النسبه : ${userdetails.percentage} %`
                }
                onChange={(e) => setPercentage(e.target.value)}
              />
            )}
            <Select
              sx={
                context.language === "ar" && {
                  "& .MuiSvgIcon-root": {
                    left: "7px",
                    right: "auto",
                  },
                }
              }
              fullWidth
              value={way}
              onChange={(e) => setWay(e.target.value)}
            >
              <MenuItem
                dir={context.language === "en" ? "ltr" : "rtl"}
                value={"fixed"}
              >
                {context.language === "en" ? "Fixed" : "ثابت"}
              </MenuItem>
              <MenuItem
                dir={context.language === "en" ? "ltr" : "rtl"}
                value={"com"}
              >
                {context.language === "en" ? "Commission" : "عموله"}
              </MenuItem>
            </Select>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditOpen(!editOpen)}>
            {" "}
            {context.language === "en" ? "Cancel" : "الغاء"}
          </Button>
          <Button autoFocus color="success">
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
