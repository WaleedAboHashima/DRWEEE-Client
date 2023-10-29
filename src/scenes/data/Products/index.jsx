import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  MenuItem,
  Select,
  TextField,
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
import { DeleteProductHandler } from 'apis/data/Products/DeleteProduct';

const Products = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [rows, setRows] = useState([]);
  const [formOpen, setFormOpen] = useState(false);
  const context = useContext(LanguageContext);
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
                // setEditOpen(true);
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

  const handleDelete = () => {
    dispatch(DeleteProductHandler({id: productDetails._id})).then(res => {
      if (res.payload.status === 200) {
        window.location.reload();
      } 
    })
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
      <Box mt="40px" height="75vh">
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
