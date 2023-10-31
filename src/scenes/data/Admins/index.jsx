import React, { useContext, useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
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
import { DeleteUserHandler } from "apis/data/Users/DeleteUser";
import { EditUsersHandler } from "apis/data/Users/EditUser";

const Users = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [rows, setRows] = useState([]);
  const [formOpen, setFormOpen] = useState(false);
  const context = useContext(LanguageContext);
  const [userdetails, setUserdetails] = useState({});
  const cookies = new Cookies();
  const navigator = useNavigate();
  const [editOpen, setEditOpen] = useState(false);
  const [name, setName] = useState();
  const [way, setWay] = useState("fixed");
  const state = useSelector((state) => state.GetUsers);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [permission, setPermission] = useState("");
  const [error, setError] = useState("");
  const columns = [
    {
      field: "id",
      headerName: "ID",
    },
    {
      field: "fullName",
      headerName: context.language === "en" ? "Name" : "لاسم",
      width: 250,
    },
    {
      field: "email",
      headerName: context.language === "en" ? "Email" : "البريد الألكتروني",
      responsive: "sm",
      width: 350,
    },
    {
      field: "role",
      headerName: context.language === "en" ? "Role" : "الدور",
      width: 300,
    },
    {
      field: "phone",
      headerName: context.language === "en" ? "Phone" : "الهاتف",
      width: 250,
    },
    {
      field: "actions",
      headerName: context.language === "en" ? "Actions" : "الاجرائات",
      renderCell: ({ row: { _id, fullName, role } }) => {
        return (
          <Box>
            <IconButton
              onClick={() => {
                setWay(way);
                setUserdetails({ _id, fullName, role });
                setEditOpen(true);
              }}
            >
              <Edit sx={{ color: "green" }} />
            </IconButton>
            <IconButton
              onClick={() => {
                setUserdetails({ _id, fullName });
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

  const handleEdit = () => {
    dispatch(
      EditUsersHandler({
        _id: userdetails._id,
        name: name && name,
        phone: phone && phone,
        email: email && email,
        permission: permission && permission,
      })
    ).then((res) => {
      if (res.payload.status === 200) {
        window.location.reload();
      }
    });
  };

  const handleDelete = () => {
    dispatch(DeleteUserHandler({ _id: userdetails._id })).then((res) => {
      if (res.payload.status === 200) {
        window.location.reload();
      }
    });
  };

  useEffect(() => {
    dispatch(GetUsersHandler()).then((res) => {
      if (res.payload.status === 200) {
        setRows(res.payload.data.allUsers);
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
          title={context.language === "en" ? "Users" : "العملاء"}
          subtitle={
            context.language === "en" ? "List Of Users" : "قائمه العملاء"
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
            onClick={() => navigator("/addadmin")}
          >
            {context.language === "en" ? "ADD ADMINS" : "اضافه مسئول"}
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
              Delete{" "}
              <span style={{ color: "red" }}>{userdetails.fullName}?</span>
            </Box>
          ) : (
            <Box>
              حذف <span style={{ color: "red" }}>{userdetails.fullName}؟</span>
            </Box>
          )}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {context.language === "en"
              ? "Are you sure you want to delete this user?"
              : "هل انت متأكد بأنك تريد ازاله هذا الموظف؟"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFormOpen(!formOpen)}>
            {" "}
            {context.language === "en" ? "Cancel" : "الغاء"}
          </Button>
          <Button autoFocus color="error" onClick={() => handleDelete()}>
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
                {userdetails.fullName}?
              </span>
            </Box>
          ) : (
            <Box>
              تعديل{" "}
              <span style={{ color: theme.palette.primary[400] }}>
                {userdetails.fullName}؟
              </span>
            </Box>
          )}
        </DialogTitle>
        <DialogContent>
          <Box
            width={"100%"}
            display={"flex"}
            flexDirection={"column"}
            p={2}
            gap={2}
          >
            <TextField
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
            />
            <TextField
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <TextField
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone"
            />
            {/* Roles */}
            <Typography>Permission: </Typography>
            <FormControlLabel
              label={
                userdetails.role === "Admin"
                  ? "Add Admins"
                  : userdetails.role === "SuperVisor"
                  ? "Add Super Visors"
                  : "Add City Admins"
              }
              value={permission}
              control={
                <Checkbox
                  onChange={(e) => {
                    if (e.target.checked) {
                      setPermission(e.target.value);
                    } else {
                      setPermission("");
                    }
                  }}
                />
              }
            />
            <Typography variant="h3" textAlign={"center"}>
              {error}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditOpen(!editOpen)}>
            {" "}
            {context.language === "en" ? "Cancel" : "الغاء"}
          </Button>
          <Button onClick={() => handleEdit()} autoFocus color="success">
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

export default Users;
