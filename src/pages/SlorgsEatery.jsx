import Phaser from "phaser";
import React, {useEffect} from "react";
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
} from "@mui/material";
import { deepOrange, yellow } from "@mui/material/colors";
import greenGif from "../assets/website/greenlo.gif";

import GameComponent from "../components/GameComponent";


function resizeApp() {
    //console.log("Resizing app...");
    let game_ratio = 1000/1000;

    let div = document.getElementById("phaser-container");
    div.style.width = window.innerHeight * game_ratio + "px";
    div.style.height = window.innerHeight + "px";

    let canvas = document.getElementsByTagName("canvas")[0];

    let dpi_w = parseInt(div.style.width) / canvas.width;
    let dpi_h = parseInt(div.style.height) / canvas.height;

    let height = window.innerHeight * (dpi_w / dpi_h) * .8;
    let width = height;

    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    div.style.width = width + "px";
    div.style.height = height + "px";
  }

const SlorgsEatery = () => {
  const theme = createTheme({
    typography: {
      fontFamily: ["UnifrakturCook", "cursive"].join(","),
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
          root: {
            elevation: 3,
          },
        },
      },
    },
  });
  const config = {
    type: Phaser.AUTO,
    parent: "phaser-container",
    width: 1000,
    height: 1000,
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      max: {
        width: 1000,
        height: 1000,
      },
    },
    physics: {
      default: "arcade",
      arcade: {
        gravity: { y: 200 },
      },
    },
  };

  window.addEventListener('resize', resizeApp);
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
        <Grid container direction="column" alignItems="center">
          <GameComponent config={config}></GameComponent>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default SlorgsEatery;
