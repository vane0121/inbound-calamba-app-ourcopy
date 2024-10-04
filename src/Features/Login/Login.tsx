import { AlertColor, Box, Button, IconButton, InputAdornment, Link, TextField } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { Form } from 'react-router-dom'
import ILoginRequest from '../../Shared/Services/Auth/Interface/LoginRequest.interface';
import { useEffect, useState } from 'react';
import { useAuth } from '../../Context/UserContext';
import GetUserPayload from '../../Shared/Services/Jwt/jwtService';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Notice from '../../Components/Notice/Notice';

const validation = Yup.object().shape({
  Username: Yup.string().required("Username is Required"),
  Password: Yup.string().required("Password is Required"),
})


function Login() {
  const { LoginUser, message } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [severity, setSeverity] = useState<AlertColor>();

  // const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ILoginRequest>({ resolver: yupResolver(validation) })


  const handleLogin = async (form: ILoginRequest) => {
    await LoginUser(form);
    const userPayload = await GetUserPayload();

    if (userPayload == null) {
      setSeverity("error");
    } else {
      setSeverity("success")
    }

    setIsOpen(true);
  }

  useEffect(() => {
    document.title = 'WMS | Login';
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };


  return (
    <Box
      sx={{
        backgroundColor: "#002060",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Notice
        ErrorMessage={message}
        Severity={severity ?? 'info'}
        IsSnackbarOpen={isOpen}
        SuccessMessage={message}
        handleSnackbarClose={() => setIsOpen(false)}
      />
      <Box sx={{ flexGrow: 1 }} >
        <Box
          position="absolute" top={0} right={0} py={0}
          component="img"
          src="src/assets/Picture1.png"
          alt="curve"
          sx={{
            transform: "rotate(180deg)",
            width: 500,
          }}
        />
        <Box
          display={"flex"} position="absolute" bottom={0} left={0} p={0}
          component="img"
          src="src/assets/Picture1.png"
          alt="S&R"
          sx={{
            width: 500,
            marginX: -5,
          }}
        />
        <Grid container spacing={2} direction="row" justifyContent="center" alignItems="center" style={{ minHeight: "100vh" }}>
          <Grid size={{ sm: 5, md: 5, lg: 4 }} marginTop={-35}>
            <Box display={"flex"} flexDirection={"column"} >
              <Box
                component="img"
                src="src/assets/snrTransparentLogo.png"
                alt="curve"
                sx={{
                  width: 150,
                }}
              />
              <Box component={"h1"} color={"white"} width={10} fontSize={{ sm: 40, md: 60 }}>
                Distribution Center System
              </Box>
            </Box>
          </Grid>
          <Grid size={{ sm: 6, md: 5, lg: 4 }} marginTop={20} display={"flex"} justifyContent={"center"} >
            <Box
              sx={{
                backgroundColor: "#002060",
                padding: 2,
                border: "solid white .5px",
                borderRadius: 10,
                color: "#FFFFFF",
                zIndex: 3,
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: -1,
                  borderRadius: "inherit", // Ensures the border and content share the same radius
                  padding: "10px", // Thickness of the border
                  background: "linear-gradient(360deg, #021232, #02256b)",
                  "-webkit-mask": "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  "-webkit-mask-composite": "xor",
                  maskComposite: "exclude"
                }
              }}
              position={'absolute'} component={'h2'} width={120} display={"flex"} justifyContent={"center"}>Hello</Box>
            <Box
              sx={{
                marginTop: 5,
                position: "relative",
                padding: 5,
                width: 320,
                maxHeight: 600,
                height: 400,
                borderRadius: 10, // Adjust for your preference
                backgroundColor: "#FFFFFF",
                zIndex: 1,
                // Inner content styles
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: -1,
                  borderRadius: "inherit", // Ensures the border and content share the same radius
                  padding: "10px", // Thickness of the border
                  background: "linear-gradient(360deg, gray, lightgray)",
                  "-webkit-mask": "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  "-webkit-mask-composite": "xor",
                  maskComposite: "exclude"
                }
              }}
            >

              <Form
                noValidate
                onSubmit={handleSubmit(handleLogin)}
              >
                <Box
                  display={'flex'}
                  flexDirection={'column'}
                >
                  <TextField
                    autoComplete="off"
                    label="Username"
                    {...register('Username')}
                    error={!!errors.Username}
                    helperText={errors.Username?.message}
                    sx={{ marginY: '3rem', }} />
                  <TextField
                    slotProps={{
                      input: {
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              edge="end"
                              onClick={togglePasswordVisibility}
                              onMouseDown={(e) => e.preventDefault()}
                              tabIndex={-1}
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }
                    }}
                    label="Password"
                    variant="outlined"
                    fullWidth
                    type={showPassword ? 'text' : 'password'}
                    error={!!errors.Password}
                    helperText={errors.Password?.message}
                    {...register('Password')}
                    sx={{
                      marginBottom: '1.5rem',
                    }} />
                  <Box display="flex" justifyContent="flex-end">
                    <Link href="#">Forgot Password?</Link>
                  </Box>
                  <Button type='submit' sx={{ marginTop: 9, fontSize: 20, borderRadius: 10 }} variant="contained">Sign In</Button>
                </Box>
              </Form>
            </Box>
          </Grid>
        </Grid>
      </Box >
    </Box >
  )
}

export default Login