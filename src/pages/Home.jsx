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
  Stack,
  Modal
} from "@mui/material";
import SlorgsEatery from "./SlorgsEatery";
import { deepOrange, yellow, green } from "@mui/material/colors";
import greenGif from "../assets/website/greenlo.gif";
import bubbleGif from "../assets/website/080.gif";
import modalGif from "../assets/website/stars_10.gif";
import slorgsBtnBg from "../assets/website/goldglitter.gif";
import partyGif from "../assets/website/Party.gif";
import somethingBtnBg from "../assets/website/trees_3.gif";
import buttonSelectSfx from "../assets/sounds/click_sfx.wav";

function Home() {
  const [count, setCount] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalInfo,setModalInfo] = useState("")
  const [onMobile,setOnMobile] = useState(null);
  const handleOpen = () => setModalVisible(true);
  const handleClose = () => setModalVisible(false);

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

  var userAgent = navigator.userAgent;

    if (!localStorage.getItem("browser")){
      if(userAgent.indexOf("Firefox") > -1){
        // may break
        localStorage.setItem("browser","firefox")
        setModalInfo("This application only has full support for Chrome-based browsers and may break in Firefox.")
        setModalVisible(true);
      } else {
        localStorage.setItem("browser","chrome-based")
      }
    }

    if(onMobile === null){
      if(navigator.userAgentData && navigator.userAgentData.mobile){
        setOnMobile(true)
        setModalInfo("This application only has full support for desktop devices and will not function properly on mobile devices.")
        setModalVisible(true);
      } else {
        setOnMobile(false)
      }
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
          <Modal
            open={modalVisible}
            onClose={handleClose}
          >
            <Paper sx={{ p: 4, borderRadius: 0, '&:focus': {outline: 'none'}, border: '3px solid #1d1a46',  backgroundImage: `url(${modalGif})`, width: '50%', maxWidth: '400px', position: 'absolute', top: '50%', left: '50%',transform: 'translate(-50%, -50%)' }}>
          <Typography variant="h2" color="secondary" align="center">
            Attention!
          </Typography>
          <Typography align="center" variant="h4" color="lightblue" sx={{ mt: 2 }}>
            {modalInfo}
          </Typography>
        </Paper>
          </Modal>
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
