import {Routes} from './Routes';
import Footer from './pages/Footer';
import {
  Button,
  createTheme,
  ThemeProvider,
  Box,
  Grid,
  Paper,
  Container,
  Typography,
  Stack
} from "@mui/material";
import { deepOrange, yellow } from "@mui/material/colors";
import greenGif from "./assets/website/greenlo.gif";

function App() {

  const theme = createTheme({
    typography: {
      fontFamily: [
        'UnifrakturCook',
        'cursive',
      ].join(','),
    },
    palette: {
      primary: deepOrange,
      secondary: yellow,
      background: {
        default: "#1e201dff",
      },
      title: {
        default: "#fffc52ff",
        secondary: "#39502dff",
      }
    },
    components: {
      MuiButton: {
        defaultProps: {
          disableRipple: true,
          disableElevation: true,
        },
        styleOverrides: {
          root: {
            textTransform: "none",
            fontSize: "1rem",
            borderRadius: "2px",
            "&:focus": {
              outline: "none",
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            elevation: 3,
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box
              sx={{
                backgroundImage: `url(${greenGif})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100vh",
                minWidth: "100vw",
                bgcolor: "background.default",
                textAlign: "center",
              }}
            >

        <Grid container direction="column" alignItems="center">
 <Routes />
      
      <Footer/>
          </Grid>
            </Box>
    </ThemeProvider>
  );
}

export default App;
