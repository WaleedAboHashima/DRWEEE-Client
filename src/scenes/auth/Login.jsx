import {
  Box,
  IconButton,
  TextField,
  Button,
  Link,
  useMediaQuery,
  CircularProgress,
  Typography,
  useTheme,
} from "@mui/material";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import GTranslateIcon from "@mui/icons-material/GTranslate";
import TranslateIcon from "@mui/icons-material/Translate";
import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import logo from "assets/logoImage.svg";
import logoDark from "assets/logoImage.svg";
import Cookies from "universal-cookie";
import jwt from "jwt-decode";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LanguageContext } from "../../language";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { setMode } from "apis/global";
import { LoginHandler } from "apis/auth/Login";

const Login = () => {
  // Variables.

  const context = useContext(LanguageContext);
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const state = useSelector((state) => state.Login);
  const [error, setError] = useState();
  const [hidden, setHidden] = useState(true);
  const theme = useTheme();
  const Uschema = yup.object().shape({
    email: yup
      .string()
      .email()
      .required(
        context.language === "en"
          ? "Your Email is required."
          : "البريد الالكتروني مطلوب"
      ),
    password: yup
      .string()
      .required(
        context.language === "en"
          ? "Password is Required."
          : "كلمه المرور مطلوبه"
      )
      .min(5),
  });
  // Functions.

  const handleFormSubmit = () => {
    setError("");
    dispatch(LoginHandler({ email: email, password: password })).then((res) => {
      if (res.payload) {
        if (res.payload.status === 200) {
          if (
            res.payload.data.user.role === "Owner" ||
            res.payload.data.user.role === "Admin"
          ) {
            const decoded = jwt(res.payload.data.token);
            cookies.set("_auth_token", res.payload.data.token, {
              expires: new Date(decoded.exp * 1000),
              secure: false,
            });
            cookies.set("_auth_username", res.payload.data.user.fullName, {
              expires: new Date(decoded.exp * 1000),
            });
            cookies.set("_auth_id", res.payload.data.user._id, {
              expires: new Date(decoded.exp * 1000),
            });
            cookies.set("_auth_role", res.payload.data.user.role, {
              expires: new Date(decoded.exp * 1000),
            });
            window.location.pathname = "/";
          } else {
            setError(
              context.language === "en"
                ? "No Access."
                : "هذا المستخدم ليس له صلاحيه بالدخول"
            );
          }
        } else if (res.payload.status === 400) {
          setError(
            context.language === "en"
              ? "Password is incorrect."
              : "كلمه المرور غير صحيحه"
          );
        } else if (res.payload.status === 404) {
          setError(
            context.language === "en" ? "User not found." : "المستخدم غير موجود"
          );
        } else {
          setError(res.payload.message);
        }
      } else {
        setError("Server Error.");
      }
    });
  };


  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh" // Change height to minHeight
      padding="20px" // Add some padding
    >
      <Box
        backgroundColor={"#1E8C45"}
        padding="20px" // Add some padding
        width={{ xs: "100%", sm: "80%", md: "60%", lg: "40%", xl: "30%" }} // Use responsive width
        textAlign={context.language === "en" ? "right" : "left"}
        borderRadius={5}
      >
        {/* <Box>
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <LightModeOutlinedIcon
                sx={{ fontSize: "25px", color: "white" }}
              />
            ) : (
              <DarkModeOutlinedIcon sx={{ fontSize: "25px", color: "white" }} />
            )}
          </IconButton>
          <IconButton
            onClick={() =>
              handleLanguageChange(context.language === "en" ? "ar" : "en")
            }
          >
            {context.language === "en" ? (
              <TranslateIcon sx={{ color: "white" }} />
            ) : (
              <GTranslateIcon sx={{ color: "white" }} />
            )}
          </IconButton>
        </Box> */}
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          width="100%"
        >
          <Box width="100%" height="auto" textAlign="center">
            <img src={logo} width="50%" />
            <Typography variant="h3" color={'#F5F5F5'}>Welcome Back!</Typography>
          </Box>
          {/* Container */}
          <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            validationSchema={Uschema}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
            }) => (
              <motion.form
                initial={{ opacity: 0, transition: { duration: 0.5 } }}
                animate={{ opacity: 1, transition: { duration: 0.5 } }}
                exit={{ opacity: 0, transition: { duration: 0.5 } }}
                onSubmit={handleSubmit}
                style={{ margin: "5% 0", width: "100%" }}
              >
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  flexDirection="column"
                  gap="20px"
                >
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="email"
                    placeholder={
                      context.language === "en"
                        ? "Email*"
                        : "البريد الالكتروني*"
                    }
                    onBlur={handleBlur}
                    onChange={handleChange}
                    onChangeCapture={(e) => setEmail(e.target.value)}
                    value={values.email}
                    required
                    name="email"
                    error={!!touched.email && !!errors.email}
                    helperText={touched.email && errors.email}
                    sx={{
                      width: "70%",
                      "& .MuiFormHelperText-root":
                        context.language === "en"
                          ? {
                              textAlign: "left",
                              fontSize: "15px",
                            }
                          : { textAlign: "right", fontSize: "15px" },
                    }}
                  />
                  <TextField
                    fullWidth
                    variant="outlined"
                    type={hidden ? "password" : "text"}
                    placeholder={
                      context.language === "en" ? "Password*" : "كلمه المرور*"
                    }
                    InputProps={{
                      endAdornment: (
                        <IconButton onClick={() => setHidden(!hidden)}>
                          {hidden ? (
                            <VisibilityOffOutlinedIcon
                              sx={{ color: theme.palette.primary[500] }}
                            />
                          ) : (
                            <VisibilityOutlinedIcon
                              sx={{ color: theme.palette.primary[500] }}
                            />
                          )}
                        </IconButton>
                      ),
                    }}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    onChangeCapture={(e) => setPassword(e.target.value)}
                    value={values.password}
                    name="password"
                    required
                    error={!!touched.password && !!errors.password}
                    helperText={touched.password && errors.password}
                    sx={{
                      width: "70%",
                      "& .MuiFormHelperText-root":
                        context.language === "en"
                          ? {
                              textAlign: "left",
                              fontSize: "15px",
                            }
                          : { textAlign: "right", fontSize: "15px" },
                    }}
                  />
                  <Button
                    type="submit"
                    sx={{
                      width: "70%",
                      backgroundColor: "#307a59",
                      padding: "10px",
                    }}
                    variant="filled"
                    // onClick={() => setOpen(true)}
                  >
                    {context.language === "en" ? "Sign In" : "تسجيل الدخول"}
                  </Button>

                  <Link
                  color={'#F5F5F5'}
                    sx={{ cursor: "pointer" }}
                    onClick={() => navigator("/forgot")}
                    underline="hover"
                  >
                    {context.language === "en"
                      ? "Forgot Password ?"
                      : "نسيت كلمه المرور؟"}
                  </Link>
                  <Typography sx={{ color: "white" }} variant="h4">
                    {error}
                  </Typography>
                </Box>
              </motion.form>
            )}
          </Formik>
        </Box>
      </Box>
    </Box>
  );
};

const initialValues = {
  email: "",
  password: "",
};

export default Login;
