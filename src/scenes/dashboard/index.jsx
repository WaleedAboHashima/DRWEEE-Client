import React, { useContext, useEffect, useState } from "react";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import {
  DownloadOutlined,
  Email,
  PointOfSale,
  PersonAdd,
  Traffic,
  MovingOutlined,
  LocalShippingOutlined,
  WarningAmberOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
  Skeleton,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import StatBox from "components/StatBox";
import { LanguageContext } from "language";
import BarChart from "components/BarChart";
import { useDispatch, useSelector } from "react-redux";
import PieChart from "components/PieChart";
import { GetUsersHandler } from "apis/data/Users/GetUsers";
import { GetOrdersHandler } from "apis/data/Orders/GetOrders";
import { GetReportsHandler } from "apis/system/Reports/GetReports";
import { GetProductsHandler } from "apis/data/Products/GetProducts";

const Dashboard = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const context = useContext(LanguageContext);
  const [users, setUsers] = useState(0);
  const state = {}
  const data = 0
  const [orders, setOrders] = useState([]);
  const [reports, setReports] = useState(0);
  const [products , setProducts] = useState(0);
  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "serviceName",
      headerName: context.language === "ar" ? "اسم الخدمه" : "Service Name",
      flex: 1,
      valueGetter: (value) => value.row.serviceName,
    },
    {
      field: "counter",
      headerName: context.language === "en" ? "Counter" : "العدد",
      flex: 1,
      valueGetter: (value) => value.row.counter,
    },
  ];
  const clientColumns = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "code",
      headerName: context.language === "en" ? "Client Code" : "كود العميل",
      flex: 1,
      valueGetter: (value) => value.row.clientCode,
    },
    {
      field: "counter",
      headerName: context.language === "en" ? "Counter" : "العدد",
      flex: 1,
      valueGetter: (value) => value.row.counter,
    },
  ];
  const ordersColumns = [
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
      headerName: context.language === "en" ? "Customer Name" : "البريد الألكتروني",
      responsive: "sm",
      valueGetter: ({row}) => row.User.Name,
      width: 200,
    },
    {
      field: "Phone",
      headerName: context.language === "en" ? "Customer Phone" : "البريد الألكتروني",
      responsive: "sm",
      valueGetter: ({row}) => row.User.Phone,
      width: 200,
    },
    {
      field: "Status",
      headerName: context.language === "en" ? "Status" : "البريد الألكتروني",
      responsive: "sm",
      width: 200,
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
  ];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetUsersHandler()).then(res => {
      if (res.payload.status === 200) {
        setUsers(res.payload.data.allUsers.length);
      }
    })
    dispatch(GetOrdersHandler()).then(res => {
      if (res.payload.status === 200) {
        setOrders(res.payload.data.orders)
      }
    })
    dispatch(GetReportsHandler()).then(res => {
      if (res.payload.status === 200) {
        setReports(res.payload.data.reports.length);
      }
    });
    dispatch(GetProductsHandler()).then(res => {
      if (res.payload) {
        if (res.payload.status === 200) {
          setProducts(res.payload.data.products.length)
        }
      }
    })
  }, [dispatch]);

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header
          title={context.language === "en" ? "DASHBOARD" : "لوحه التحكم"}
          subtitle={
            context.language === "en"
              ? "Welcome to your dashboard"
              : "اهلا وسهلا بك في لوحه التحكم"
          }
        />
      </FlexBetween>

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        {/* ROW 1 */}
        {state.loading ? (
          <Skeleton
            sx={{
              p: "1.25rem 1rem",
              flex: "1 1 100%",
              gridColumn: "span 2",
              gridRow: "span 1",
              borderRadius: "0.55rem",
            }}
            variant="rectangular"
            height={157}
          />
        ) : (
          <StatBox
            title={context.language === "en" ? "Total Clients" : "جميع العملاء"}
            value={users ? users : 0}
            description="All Clients"
            icon={
              <MovingOutlined
                sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
              />
            }
          />
        )}
        {state.loading ? (
          <Skeleton
            sx={{
              p: "1.25rem 1rem",
              flex: "1 1 100%",
              gridColumn: "span 2",
              gridRow: "span 1",
              borderRadius: "0.55rem",
            }}
            variant="rectangular"
            height={157}
          />
        ) : (
          <StatBox
            title={context.language === "en" ? "Total Products" : "المكسب"}
            value={products ? products : 0}
            description={`All Products`}
            icon={
              <PointOfSale
                sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
              />
            }
          />
        )}
                {state.loading ? (
          <Skeleton
            sx={{
              p: "1.25rem 1rem",
              flex: "1 1 100%",
              gridColumn: "span 2",
              gridRow: "span 1",
              borderRadius: "0.55rem",
            }}
            variant="rectangular"
            height={157}
          />
        ) : (
          <StatBox
            title={context.language === "en" ? "Total Reports" : "عملاء جدد"}
            value={reports ? reports : 0}
            description={`All Reports`}
            icon={
              <WarningAmberOutlined
                sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
              />
            }
          />
        )}
        {state.loading ? (
          <Skeleton
            sx={{
              p: "1.25rem 1rem",
              flex: "1 1 100%",
              gridColumn: "span 2",
              gridRow: "span 1",
              borderRadius: "0.55rem",
            }}
            variant="rectangular"
            height={157}
          />
        ) : (
          <StatBox
            title={context.language === "en" ? "Orders" : "طلبات"}
            value={orders.length ? orders.length : 0}
            description={`Total Orders`}
            icon={
              <LocalShippingOutlined
                sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
              />
            }
          />
        )}
        <Box
          gridColumn="span 12"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >
          <Box display={"flex"} flexDirection={"column"} height={"100%"} >
            <Header
              title={
                context.language === "en" ? "Orders Table" : "جدول الطلبات"
              }
            />
            <DataGrid
              autoPageSize
              disableSelectionOnClick
              loading={state.loading}
              sx={{color: 'black'}}
              localeText={context.language === "en" ? null : arabicLocaleText}
              rows={orders.slice(0, 5).map((user, index) => ({
                id: index + 1,
                ...user,
              }))}
              columns={ordersColumns}
            />
          </Box>
        </Box>


        {/* ROW 2 */}
        <Box
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
              borderRadius: "5rem",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme.palette.background.alt,
              color: `black !important`,
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: theme.palette.background.alt,
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: theme.palette.background.alt,
              color: `black !important`,
              borderTop: "none",
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `black !important`,
            },
          }}
        >
          <Box display={"flex"} flexDirection={"column"} height={"100%"}>
            <Header
              title={
                context.language === "en" ? "Top Services" : "اكثر الخدمات طلبا"
              }
            />
            <DataGrid
              localeText={context.language === "ar" && arabicLocaleText}
              loading={state.loading}
              autoPageSize
              sx={{color: 'black'}}
              rows={
                (data &&
                  data.Services.map((service, index) => ({
                    id: index + 1,
                    ...service,
                  }))) ||
                []
              }
              columns={columns.map((column, index) => ({
                ...column,
                renderCell: (params) => {
                  const position = params.row.id;
                  let textColor = "black";

                  if (position === 1) {
                    textColor = "gold";
                  } else if (position === 2) {
                    textColor = "silver";
                  } else if (position === 3) {
                    textColor = "#cd7f32";
                  }

                  return <div style={{ color: textColor }}>{params.value}</div>;
                },
              }))}
            />
          </Box>
        </Box>
        <Box
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
              borderRadius: "5rem",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme.palette.background.alt,
              color: `black !important`,
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: theme.palette.background.alt,
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: theme.palette.background.alt,
              color: `black !important`,
              borderTop: "none",
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `black !important`,
            },
          }}
        >
          <Box display={"flex"} flexDirection={"column"} height={"100%"}>
            <Header
              title={
                context.language === "en" ? "Top Clients" : "اكثر العملاء شراءا"
              }
            />
            <DataGrid
              autoPageSize
              localeText={context.language === "ar" && arabicLocaleText}
              loading={state.loading}
              sx={{color: 'black'}}
              rows={
                (data &&
                  data.TopClients.map((client, index) => ({
                    id: index + 1,
                    ...client,
                  }))) ||
                []
              }
              columns={clientColumns.map((column, index) => ({
                ...column,
                renderCell: (params) => {
                  const position = params.row.id;
                  let textColor = "black";
                  if (position === 1) {
                    textColor = "gold";
                  } else if (position === 2) {
                    textColor = "silver";
                  } else if (position === 3) {
                    textColor = "#cd7f32";
                  }

                  return <div style={{ color: textColor }}>{params.value}</div>;
                },
              }))}
            />
          </Box>
        </Box>
        <Box
          gridColumn="span 6"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt}
          p={"1rem"}
          borderRadius="0.55rem"
        >
          <Header title={context.language === 'en' ? "Services Chart" : "رسم الخدمات"} />
          <PieChart />
        </Box>
        <Box
          gridColumn="span 6"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt}
          p={"1rem"}
          borderRadius="0.55rem"
        >
          <Header title={"Services Chart"} />
          <BarChart />
        </Box>
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
  noRowsLabel: "لا توجد نتائج",
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

export default Dashboard;
