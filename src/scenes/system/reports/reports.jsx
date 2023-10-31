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
  Typography,
} from "@mui/material";
import Header from "components/Header";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
  Delete,
  Edit,
  CloseOutlined,
  MoreVertOutlined,
} from "@mui/icons-material";
import { LanguageContext } from "language";
import Cookies from "universal-cookie";
import { useDispatch } from "react-redux";
import { GetReportsHandler } from "apis/system/Reports/GetReports";
const Reports = () => {
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
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 300,
    },
    {
      field: "email",
      headerName: context.language === "en" ? "Email" : "البريد الألكتروني",
      responsive: "sm",
      width: 350,
    },
    {
      field: "phone",
      headerName: context.language === "en" ? "Phone" : "الهاتف",
      width: 300,
    },
    {
      field: "message",
      headerName: context.language === "en" ? "Message" : "الهاتف",
      width: 300,
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
    dispatch(GetReportsHandler()).then((res) => {
      if (res.payload.status === 200) {
        if (res.payload.data.success) {
          setRows(res.payload.data.reports);
        }
      }
    });
  }, []);

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
          title={context.language === "en" ? "Reports" : "العملاء"}
          subtitle={
            context.language === "en" ? "List Of Reports" : "قائمه العملاء"
          }
        />
      </Box>
      <Box
        mt="40px"
        height="75vh"
        sx={{ "& .MuiTablePagination-root ": { color: "black" } }}
      >
        <DataGrid
          autoPageSize
          disableSelectionOnClick
          sx={{ color: "black" }}
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

export default Reports;
