import { useState } from "react";
import {
  Button,
  createTheme,
  ThemeProvider,
  Box,
  Grid,
  Paper,
  Container,
} from "@mui/material";
import { deepOrange, yellow } from "@mui/material/colors";

function Example() {
  const [count, setCount] = useState(0);

  const theme = createTheme({
    palette: {
      primary: deepOrange,
      secondary: yellow,
      background: {
        default: "#f5f5f5",
      },
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
          defaultProps: {
            elevation: 3,
          },
          root: {},
        },
      },
    },
  });
  return (
    <>
      <ThemeProvider theme={theme}>
        <Box 
          fullWidth
          sx={{
          }}
        >
          <Grid container direction="column" alignItems="center" justify="center">
           
              <Container maxWidth={false} disableGutters>
                <Paper>
                  <Box
                    sx={{
                      height: "100%",
                      width: "100%",

                      bgcolor: "background.default",
                    }}
                  >
                    <h2>Hello</h2>
                  </Box>
                </Paper>
              </Container>
            
              <Container
                fullWidth
                disableGutters
                sx={{
                  height: "100%",
                  width: "100%",
                  bgcolor: "background.default",
                }}
              >
                <Box
                  sx={{
                    height: "100%",
                    width: "100%",
                    bgcolor: "background.default",
                  }}
                >
                  <Button
                    variant="contained"
                    sx={{ border: "3px solid", borderColor: "secondary.main" }}
                  >
                    enter rat race
                  </Button>
                </Box>

                <p className="read-the-docs">Brewed for your enjoyment.</p>
              </Container>
          </Grid>
        </Box>
      </ThemeProvider>
    </>
  );
}

export default Example;
