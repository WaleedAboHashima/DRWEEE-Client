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
  UnarchiveOutlined,
  MoreHorizOutlined,
  CheckOutlined,
} from "@mui/icons-material";
import { LanguageContext } from "language";
import Cookies from "universal-cookie";
import { useDispatch } from "react-redux";
import { GetOrdersHandler } from "apis/data/Orders/GetOrders";
import { ArchiveOrderHandler } from "apis/data/Orders/ArchiveOrder";
const Archive = () => {
  const context = useContext(LanguageContext);
  const [isOpen, setisOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [userdetails, setUserdetails] = useState({});
  const cookies = new Cookies();
  const [orders, setOrders] = useState([]);
  const [editOpen, setEditOpen] = useState(false);
  const [way, setWay] = useState("fixed");
  const dispatch = useDispatch();



  const handleArchive = (id) => {
    dispatch(ArchiveOrderHandler({ id })).then((res) => {
      if (res.payload.status === 200) {
        window.location.reload();
      }
    });
  };
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
      field: "actions",
      headerName: context.language === "en" ? "Actions" : "الاجرائات",
      renderCell: ({ row: { _id } }) => {
        return (
          <Box>
            <IconButton
              onClick={() => {
                handleArchive(_id);
              }}
            >
              <UnarchiveOutlined color="error" />
            </IconButton>
          </Box>
        );
      },
    },
  ];
  useEffect(() => {
    dispatch(GetOrdersHandler()).then((res) => {
      if (res.payload.status === 200) {
        if (res.payload.data.success) {
          const orders = res.payload.data.orders.filter(
            (order) => order.Archived === true
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
        sx={{ "& .MuiTablePagination-root ": { color: "black" } , backgroundColor: 'white'}}
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

export default Archive;
