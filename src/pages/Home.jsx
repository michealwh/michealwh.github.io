import { useState } from "react";
import { Link } from "react-router-dom";
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
import SlorgsEatery from "./SlorgsEatery";
import { deepOrange, yellow, green } from "@mui/material/colors";
import greenGif from "../assets/website/greenlo.gif";
import bubbleGif from "../assets/website/080.gif";
import slorgsBtnBg from "../assets/website/goldglitter.gif";
import partyGif from "../assets/website/Party.gif";
import somethingBtnBg from "../assets/website/trees_3.gif";
import buttonSelectSfx from "../assets/sounds/click_sfx.wav";

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

  let buttonClickSFX = new Audio(buttonSelectSfx);

  const handleSlorgsClick = () => {
    buttonClickSFX.play()
  }
  

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

        <Paper sx={{ p: 4,  backgroundImage: `url(${bubbleGif})`}}>
<Grid container direction="column" alignItems="center" spacing={4}>
          <Grid>
            <Typography variant="h2" component="h1" gutterBottom sx={{ color: "title.default", textShadow: '-5px -5px 0 green, 5px -5px 0 black, -5px 5px 0 green, 5px 5px 0 black' }}>
              Welcome to Slorg's Eatery
            </Typography>
          </Grid>

          <Grid>
            <Container maxWidth="sm">
                <Button
                  variant="contained"
                  component={Link}
                  to="/race"
                  sx={{
                    width: "100%",
                    fontSize: "1.5rem",
                    border: "3px solid",
                    borderColor: "secondary.main",
                    backgroundImage: `url(${slorgsBtnBg})`,
                    textShadow: '-1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black'
                  }}
                  onClick={() => 
                    handleSlorgsClick()}
                >
                  enter rat race
                </Button>
            </Container>
          </Grid>
          <Grid>
            <Container maxWidth="sm">
                <Button
                  variant="contained"
                 component={Link}
                  to="/something-else"
                  sx={{
                    width: "100%",
                    border: "3px solid",
                    borderColor: "secondary.main",
                    backgroundImage: `url(${somethingBtnBg})`,
                    textShadow: '-1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black'
                  }}
                  onClick={() => 
                    handleSlorgsClick()}
                
                >
                  something to stare at
                </Button>
            </Container>
          </Grid>
        </Grid>
        <Stack justifyContent="flex-start"  direction="row" spacing={4}>
            <Container sx={{ p: 5,  backgroundImage: `url(${partyGif})`, backgroundSize: 'contains', width: '18%', justify:'left' }}>
        </Container>
        </Stack>
        
        </Paper>
      </Box>
    </ThemeProvider>
  );
}

export default Home;
