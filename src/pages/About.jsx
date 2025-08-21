import { useState } from "react";
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
import greenGif from "../assets/website/greenlo.gif";
import oceanGif from "../assets/website/OceanCraban.gif";
import blinkieGif from "../assets/website/blinkiesCafe_Rats.gif";

function Home() {
  const [count, setCount] = useState(0);

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
          minHeight: "95vh",
          minWidth: "100vw",
          bgcolor: "background.default",
          textAlign: "center",
        }}
      >
        <Grid container spacing={2} direction="column" alignItems="center">
<h2>This page is empty you overgrown granite-head!</h2>
         <Container sx={{ p: 5,  backgroundImage: `url(${oceanGif})`, backgroundSize: '20%'}}></Container>
         
          <Container sx={{ p: 1.75,  backgroundImage: `url(${blinkieGif})`, backgroundSize: 'contain', width:"200px"}}></Container>
        </Grid>

      </Box>
    </ThemeProvider>
  );
}

export default Home;
