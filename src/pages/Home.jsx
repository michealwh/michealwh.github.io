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
  const [modalInfo, setModalInfo] = useState("")
  const [onMobile, setOnMobile] = useState(null);
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

  if (!localStorage.getItem("browser")) {
    if (userAgent.indexOf("Firefox") > -1) {
      // may break
      localStorage.setItem("browser", "firefox")
      setModalInfo("This application only has full support for Chrome-based browsers and may break in Firefox.")
      setModalVisible(true);
    } else {
      localStorage.setItem("browser", "chrome-based")
    }
  }

  if (onMobile === null) {
    let firstCheck = false;
    (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) firstCheck = true; })(navigator.userAgent || navigator.vendor || window.opera);
    if (firstCheck === false) {
      if (navigator.userAgentData && navigator.userAgentData.mobile) {
        setOnMobile(true)
        setModalInfo("This application only has full support for desktop devices and will not function properly on mobile devices.")
        setModalVisible(true);
      } else {
        setOnMobile(false)
      }
    } else {
      setOnMobile(true)
      setModalInfo("This application only has full support for desktop devices and will not function properly on mobile devices.")
      setModalVisible(true);
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

        <Paper sx={{ p: 4, backgroundImage: `url(${bubbleGif})` }}>
          <Modal
            open={modalVisible}
            onClose={handleClose}
          >
            <Paper sx={{ p: 4, borderRadius: 0, '&:focus': { outline: 'none' }, border: '3px solid #1d1a46', backgroundImage: `url(${modalGif})`, width: '50%', maxWidth: '400px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
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
          <Stack justifyContent="flex-start" direction="row" spacing={4}>
            <Container sx={{ p: 5, backgroundImage: `url(${partyGif})`, backgroundSize: 'contains', width: '18%', justify: 'left' }}>
            </Container>
          </Stack>

        </Paper>
      </Box>
    </ThemeProvider>
  );
}

export default Home;
