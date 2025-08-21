
import {
  Button,
  createTheme,
  ThemeProvider,
  Box,
  Grid,
  Paper,
  Container,
  Typography,
  BottomNavigation
} from "@mui/material";
import { deepOrange, yellow} from "@mui/material/colors";

function Footer() {

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
        <BottomNavigation sx={{backgroundColor: "transparent", height:"5vh"}}>

          <Container maxWidth="lg" >
            <Typography variant="body2" color="text.secondary" align="center" sx = {{position: 'absolute', bottom: 0, left: 0, right: 0, textAlign: 'center'}}>
              {'© '}
              {new Date().getFullYear()}
              {' Brewed for you.'}
            </Typography>
            
          </Container>
        </BottomNavigation>
      
    </ThemeProvider>
  );
}

export default Footer;
