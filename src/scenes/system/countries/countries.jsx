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
  Typography,
  useTheme,
} from "@mui/material";
import Header from "components/Header";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { LanguageContext } from "language";
import {
  Delete,
  AddOutlined,
  LocationCityOutlined,
  LocationOnOutlined,
} from "@mui/icons-material";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { GetGeoHandler } from "apis/system/citiesandcountries/getgeo";
import { DeleteCountryHandler } from "apis/system/citiesandcountries/deletegeo";

const Countries = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [rows, setRows] = useState([]);
  const [formOpen, setFormOpen] = useState(false);
  const context = useContext(LanguageContext);
  const [userdetails, setUserdetails] = useState({});
  const [citiesData, setCitiesData] = useState([]);
  const [govData, setGoveData] = useState([]);
  const cookies = new Cookies();
  const navigator = useNavigate();
  const [cityOpen, setCityOpen] = useState(false);
  const [govOpen, setGoveOpen] = useState(false);
  const [error, setError] = useState("");
  const state = useSelector((state) => state.GetUsers);
  const columns = [
    {
      field: "id",
      headerName: "ID",
    },
    {
      field: "Name",
      headerName: context.language === "en" ? "Name" : "لاسم",
      width: 450,
    },
    {
      field: "Cities",
      headerName: context.language === "en" ? "Cities" : "مدن",
      width: 450,
      renderCell: ({ row: { Cities } }) => (
        <IconButton
          onClick={() => {
            setCitiesData(Cities);
            setCityOpen(!cityOpen);
          }}
        >
          <LocationCityOutlined color="success" />
        </IconButton>
      ),
    },
    {
      field: "Governemnets",
      headerName: context.language === "en" ? "Governments" : "محافظات",
      width: 450,
      renderCell: ({ row: { Governments } }) => (
        <IconButton
          onClick={() => {
            setGoveData(Governments);
            setGoveOpen(!govOpen);
          }}
        >
          <LocationOnOutlined color="success" />
        </IconButton>
      ),
    },
    {
      field: "actions",
      headerName: context.language === "en" ? "Actions" : "الاجرائات",
      renderCell: ({ row: { _id, Name } }) => {
        return (
          <Box>
            <IconButton
              onClick={() => {
                setUserdetails({ _id, Name });
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
    dispatch(DeleteCountryHandler({ id: userdetails._id })).then((res) => {
      if (res.payload.data) {
        window.location.reload();
      } else {
        setError(res.payload.message);
      }
    });
  };

  useEffect(() => {
    dispatch(GetGeoHandler()).then((res) => {
      if (res.payload.data) {
        if (res.payload.data.success) {
          setRows(res.payload.data.rules.Countries);
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
          title={context.language === "en" ? "Countries & Cities" : "العملاء"}
          subtitle={
            context.language === "en"
              ? "List Of Countries & Cities"
              : "قائمه العملاء"
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
            onClick={() => navigator("/addcc")}
          >
            {context.language === "en"
              ? "ADD Countries & Cities"
              : "اضافه مسئول"}
            <AddOutlined sx={{ mr: "10px" }} />
          </Button>
        </Box>
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
              Delete <span style={{ color: "red" }}>{userdetails.Name}?</span>
            </Box>
          ) : (
            <Box>
              حذف <span style={{ color: "red" }}>{userdetails.Name}؟</span>
            </Box>
          )}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {context.language === "en"
              ? "Are you sure you want to delete this Country?"
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
        fullWidth
        dir={context.language === "en" ? "ltr" : "rtl"}
        open={govOpen}
        onClose={() => setGoveOpen(!govOpen)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>Governments:</DialogTitle>
        <DialogContent>
          <Box display={"flex"} gap={2} flexDirection={"column"}>
            {govData[0] !== "" ? (
              govData.map((gov, index) => (
                <Typography key={index}>{gov}</Typography>
              ))
            ) : (
              <Typography>No Governements for this country</Typography>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={() => setGoveOpen(!govOpen)}>
            {context.language === "en" ? "Close" : "الغاء"}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        fullWidth
        dir={context.language === "en" ? "ltr" : "rtl"}
        open={cityOpen}
        onClose={() => setCityOpen(!cityOpen)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>Cities:</DialogTitle>
        <DialogContent>
          <Box display={"flex"} gap={2} flexDirection={"column"}>
            {citiesData[0] !== "" ? (
              citiesData.map((city, index) => (
                <Typography key={index}>{city}</Typography>
              ))
            ) : (
              <Typography>No Cities for this country</Typography>
            )}
          </Box>
          <Typography>{error}</Typography>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={() => setCityOpen(!cityOpen)}>
            {context.language === "en" ? "Close" : "الغاء"}
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

export default Countries;
