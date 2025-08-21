import Phaser from "phaser";
import React, {useState, useEffect} from "react";
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
import cloud_bg from "../assets/game/cloud_bg.png";
import frog_head from "../assets/game/frog_head.png";
import star1 from "../assets/game/star1.png";
import toad_milkloaf from "../assets/sounds/toad_milkloaf.mp3";
import GameComponent from "../components/GameComponent";

class Example extends Phaser.Scene {
  preload() {

    this.load.image("sky", cloud_bg);
    this.load.image("head", frog_head);
    this.load.image("star", star1);
    this.load.audio("bgMusic", toad_milkloaf)
  }

  create() {
    this.bgMusic = this.sound.add("bgMusic")
    this.bgMusic.setLoop(true);
    this.bgMusic.play()
    this.add.image(0, 0, "sky").setOrigin(0, 0);

    const particles = this.add.particles(0, 0, "star", {
      speed: 100,
      scale: { start: .5, end: 0 },
      blendMode: "ADD",
      angle: { min: 0, max: 360 },
    });

    const logo = this.physics.add.image(400, 100, "head");

    logo.setVelocity(100, 200);
    logo.setBounce(1, 1);
    logo.setCollideWorldBounds(true);

    particles.startFollow(logo);
  }
}

const SomethingElse = () => {
  
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
    parent: 'phaser-container',
    width:500,
    height:500,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        max: {
          width: 500,
          height: 500,
        },
    },
    scene: Example,
    physics: {
      default: "arcade",
      arcade: {
        gravity: { y: 150 },
      },
    },
  };
  const [isPlaying, setIsPlaying] = useState(false);

  let backgroundMusic = new Audio(toad_milkloaf);
  backgroundMusic.muted = false;
  backgroundMusic.loop = true;
  
    // const playBackgroundMusic = () => {
    //   backgroundMusic.load()
    //   backgroundMusic.play()
    //   setIsPlaying(true);
    // }

    // useEffect(() => {

    //   document.addEventListener("mousedown", () => {
    //     if (!isPlaying){
          
    //       setIsPlaying(true);
    //       console.log(isPlaying)
    //     playBackgroundMusic();
    //     console.log(isPlaying)
    //   }
    //   });
      

    // }, []);

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
      ><Grid container direction="column" alignItems="center" sx={{lineHeight:0}}>
        <Paper elevation={3} square sx={{ p: 0 }}>

<GameComponent config={config}></GameComponent>
        </Paper>
        </Grid>
        
      </Box>
    </ThemeProvider>
  );
};

export default SomethingElse;
