import React, { useContext } from "react";
import {
  Box,
  Collapse,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import {
  ChevronLeft,
  HomeOutlined,
  Groups2Outlined,
  ReceiptLongOutlined,
  PublicOutlined,
  DnsOutlined,
  GroupOutlined,
  ChevronRight,
  AccessTimeFilledOutlined,
  Inventory2Outlined,
  PersonOutlined,
  ReportGmailerrorredRounded,
  ListOutlined,
  BarChartOutlined,
  ExpandLess,
  ExpandMore,
  WarningOutlined,
  InfoOutlined,
  ArchiveOutlined,
} from "@mui/icons-material";
import { useState } from "react";
import FlexBetween from "./FlexBetween";
import { motion } from "framer-motion";
import { LanguageContext } from "language";
import logo from "assets/logoImage.svg";
import logoLight from "assets/logoImage.svg";
import StorageIcon from "@mui/icons-material/Storage";
import { useLocation, useNavigate } from "react-router-dom";

const CustomList = ({ navItems }) => {
  const [openItemIndices, setOpenItemIndices] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const handleItemClick = (index) => {
    if (openItemIndices.includes(index)) {
      // If the item is already open, close it
      setOpenItemIndices(openItemIndices.filter((i) => i !== index));
    } else {
      // If the item is closed, open it
      setOpenItemIndices([...openItemIndices, index]);
    }
  };
  return (
    <List aria-labelledby="data">
      {navItems.map((navItem, index) => {
        const isOpen = openItemIndices.includes(index);
        return (
          <div key={index}>
            <ListItemButton
              sx={{
                borderRadius: "50px 0px 0px 50px",
                backgroundColor:
                  location.pathname === `/${navItem.url}` && "#A9DFBF",
              }}
              onClick={() =>
                !navItem.url
                  ? handleItemClick(index)
                  : navigate(`${navItem.url}`)
              }
            >
              <ListItemIcon
                sx={{
                  color: location.pathname === `/${navItem.url}` && navItem.text ==="Dashboard" ? "#2F8608" : "#00000080",
                }}
              >
                {navItem.icon}
              </ListItemIcon>
              <ListItemText
                sx={{
                  color: location.pathname === `/${navItem.url}` && navItem.text ==="Dashboard" ? "#2F8608" : "#00000080",
                  fontWeight: location.pathname === `/${navItem.url}` && navItem.text ==="Dashboard" ? "bold" : "",
                }}
              >
                {navItem.text}
              </ListItemText>
              {!navItem.url ? isOpen ? <ExpandLess  sx={{color: '#00000080'}} /> : <ExpandMore sx={{color: '#00000080'}} /> : ""}
            </ListItemButton>
            {navItem.components &&
              navItem.components.map((component, componentIndex) => {
                const isActive = location.pathname === `/${component.url}`;
                return (
                  <Collapse
                    key={componentIndex}
                    in={isOpen}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List component="div" disablePadding>
                      <ListItemButton
                        sx={{
                          borderRadius: "50px 0px 0px 50px",
                          pl: 4,
                          backgroundColor: isActive && "#A9DFBF",
                          color: isActive ? "#2F8608" : '#00000080',
                        }}
                        onClick={() => navigate(`${component.url}`)}
                      >
                        <ListItemIcon sx={{ color: isActive ? "#2F8608" : "#00000080" }}>
                          {component.icon}
                        </ListItemIcon>
                        <ListItemText primary={component.text} />
                      </ListItemButton>
                    </List>
                  </Collapse>
                );
              })}
          </div>
        );
      })}
    </List>
  );
};

const Sidebar = ({
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const theme = useTheme();
  const context = useContext(LanguageContext);
  const navItems = [
    {
      text: context.language === "en" ? "Dashboard" : "لوحه التحكم",
      icon: <HomeOutlined />,
      url: "dashboard",
    },
    {
      text: context.language === "en" ? "Data" : "بيانات",
      icon: <StorageIcon />,
      components: [
        {
          text: context.language === "en" ? "Users" : "مستخدمون",
          icon: <Groups2Outlined />,
          url: "users",
        },
        {
          text: context.language === "en" ? "Products" : "المواعيد",
          icon: <ListOutlined />,
          url: "products",
        },
        {
          text: context.language === "en" ? "Geography" : "الموقع الجغرافي",
          icon: <PublicOutlined />,
          url: "geography",
        },
      ],
    },
    {
      text: context.language === "en" ? "System" : "النظام",
      icon: <BarChartOutlined />,
      components: [
        {
          text: context.language === "en" ? "Countries and Cities" : "الخدمات",
          icon: <DnsOutlined />,
          url: "countries",
        },
        {
          text: context.language === "en" ? "Orders" : "الفواتير",
          icon: <ReceiptLongOutlined />,
          url: "orders",
        },
        {
          text: context.language === "en" ? "Archive" : "ارشيف" ,
          icon: <ArchiveOutlined />,
          url: "archive",
        },
        {
          text: context.language === "en" ? "Reports" : "التقارير",
          icon: <ReportGmailerrorredRounded />,
          url: "reports",
        },
        {
          text: context.language === "en" ? "Info" : "الحضور",
          icon: <InfoOutlined />,
          url: "info",
        },
      ],
    },

    // {
    //   text: "Admin",
    //   icon: <AdminPanelSettingsOutlined />,
    // },
    // {
    //   text: "Performance",
    //   icon: <TrendingUpOutlined />,
    // },
  ];

  return (
    <Box
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: isSidebarOpen ? 1 : 0, y: isSidebarOpen ? 0 : -20 }}
      transition={{ duration: 0.3 }}
      exit={{ opacity: 0 }}
    >
      {isSidebarOpen && (
        <Drawer
          dir={context.language === "en" ? "ltr" : "rtl"}
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor={context.language === "en" ? "left" : "right"}
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              // color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSixing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <img
                    style={{ objectFit: "cover", borderRadius: "99px" }}
                    width={"100%"}
                    src={theme.palette.mode === "dark" ? logo : logoLight}
                    alt="company logo"
                  />
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    {context.language === "en" ? (
                      <ChevronLeft />
                    ) : (
                      <ChevronRight />
                    )}
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <CustomList navItems={navItems} />
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
