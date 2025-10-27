
import smileSheet from "../assets/game/spritesheets/loadingsmile.png"
import earthSheet from "../assets/game/spritesheets/rotateEarth.png"
import loadingSky from "../assets/game/loadingSky.png"

function resizeApp() {
  --console.log("Resizing app...");
  let game_ratio = 1000 / 1000;

  let div = document.getElementById("phaser-container");
  div.style.width = window.innerHeight * game_ratio + "px";
  div.style.height = window.innerHeight + "px";

  let canvas = document.getElementsByTagName("canvas")[0];

  let dpi_w = parseInt(div.style.width) / canvas.width;
  let dpi_h = parseInt(div.style.height) / canvas.height;

  let height = window.innerHeight * (dpi_w / dpi_h) * 0.8;
  let width = height;

  canvas.style.width = width + "px";
  canvas.style.height = height + "px";
  div.style.width = width + "px";
  div.style.height = height + "px";
}

var BootState = {
  preload() {

    this.load.spritesheet("loadingSmile",smileSheet,{
        frameWidth: 844,
        frameHeight: 759
    });

    this.load.image("loading_sky",loadingSky)

    this.load.spritesheet("earth",earthSheet,{
        frameWidth: 50,
        frameHeight: 50
    });

  },

  create() {
    resizeApp();

    this.scene.start("LoadState")

  },
};

export default BootState;
