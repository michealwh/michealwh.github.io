// GENERAL ASSETS

import skyBg from "../assets/game/jebsSky.png";
import roomBg from "../assets/game/jebsBackdrop.png";
import counterBg from "../assets/game/jebsCounter.png";
import jebsDoorFrame from "../assets/game/jebsDoorFrame.png";
import jebsDoorHinge from "../assets/game/jebsDoorHinge.png";
import jebsWindows from "../assets/game/jebsWindows.png";
import frog_head from "../assets/game/frog_head.png";
import hands from "../assets/game/jebsHands2.0.png";

// NPC ASSETS

import guy3 from "../assets/game/npcs/guy3.png";
import guy4 from "../assets/game/npcs/guy4.png";
import glob_man from "../assets/game/npcs/glob_man2.0.png";
import cool_gruy from "../assets/game/npcs/cool_gruy.png";
import mouf_galf from "../assets/game/npcs/mouf_galf.png";
import smorg_bloo from "../assets/game/npcs/smorg_bloo.png";
import smorg_boo from "../assets/game/npcs/smorg_boo.png";
import smorg_gloo from "../assets/game/npcs/smorg_gloo.png";
import smorg_groo from "../assets/game/npcs/smorg_groo.png";
import smorg_moo from "../assets/game/npcs/smorg_moo.png";

// SPRITESHEET ASSETS

import glob_man_sheet from "../assets/game/spritesheets/glob_man_sprite_sheet.png";

// KITCHEN ASSETS

import jebsKitchen from "../assets/game/jebsKitchen.png";
import trash_can from "../assets/game/trash_can.png";
import serving_plate from "../assets/game/serving_plate.png";

// FOOD ASSETS

import bottomBun from "../assets/game/food/bottomBun.png";
import topBun from "../assets/game/food/topBun.png";
import lettuce from "../assets/game/food/lettuce.png";
import beefpatty from "../assets/game/food/beefpatty.png";
import bbq from "../assets/game/food/bbq.png";
import ketchup from "../assets/game/food/ketchup.png";
import mustard from "../assets/game/food/mustard.png";
import onion from "../assets/game/food/onion.png";
import ranch from "../assets/game/food/ranch.png";
import tomato from "../assets/game/food/tomato.png";
import ketchupBottle from "../assets/game/food/ketchupBottle.png";
import mustardBottle from "../assets/game/food/mustardBottle.png";
import bbqBottle from "../assets/game/food/bbqBottle2.png";
import ranchBottle from "../assets/game/food/ranchBottle.png";

// UI ASSETS
import chef_icon from "../assets/ui/chef_icon.png";
import desk_icon from "../assets/ui/desk_icon.png";
import gear_icon from "../assets/ui/gear_icon.png";
import notebook_icon from "../assets/ui/notebook_icon.png";
import order_background from "../assets/ui/order_background.png";
import dialog_frame from "../assets/ui/dialog_frame.png";
import submit_button from "../assets/ui/submit_button.png";
import holy_glob from "../assets/ui/holy_glob2.png";

// SOUND ASSETS
import door_open from "../assets/sounds/door_opening.mp3";
import door_rattling from "../assets/sounds/door_rattling.mp3";
import click_sfx from "../assets/sounds/click_sfx.wav";
import food_sfx from "../assets/sounds/food_sfx.mp3";
import food_sfx1 from "../assets/sounds/food_sfx1.mp3";
import cluttered_ambience2 from "../assets/sounds/cluttered_ambience2.mp3";
import button_warble1 from "../assets/sounds/button_warble1.mp3";
import button_warble2 from "../assets/sounds/button_warble2.mp3";
import button_warble3 from "../assets/sounds/button_warble3.mp3";
import trash_sfx from "../assets/sounds/trash_sfx.mp3";
import eat_sfx1 from "../assets/sounds/eat_sfx1.mp3";
import presentation_sfx1 from "../assets/sounds/presentation_sfx1.mp3";

import success_sfx1 from "../assets/sounds/success_sfx1.mp3";

import spooky_sfx1 from "../assets/sounds/spooky_sfx1.mp3";
import spooky_sfx2 from "../assets/sounds/spooky_sfx2.mp3";
import spooky_sfx3 from "../assets/sounds/spooky_sfx3.mp3";

import voice_line1 from "../assets/sounds/voice_line1.mp3";
import voice_line2 from "../assets/sounds/voice_line2.mp3";
import voice_line3 from "../assets/sounds/voice_line3.mp3";
import text_sfx from "../assets/sounds/text_sfx.mp3";

var LoadState = {
  preload() {
    //this.add.image(0,0,"loading_sky").setOrigin(0, 0);
    this.logo = this.add.text(20, 20, "Loading...", {
      fontFamily: "font1",
      fill: "white",
    });
    this.logo.anchorX = 0.5;
    this.logo.anchorY = 0.5;

    this.anims.create({
      key: "rotate_earth",
      frames: this.anims.generateFrameNumbers("earth", {
        frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
      }),
      frameRate: 18,
      repeat: -1,
    });

    this.anims.create({
      key: "smile_anim",
      frames: this.anims.generateFrameNumbers("loadingSmile", {
        frames: [0, 1, 2],
      }),
      frameRate: 1,
      repeat: -1,
    });
    this.smile = this.add.sprite(500, 500, "loadingSmile");
    this.smile.play("smile_anim");

    this.load.audio("door_open", door_open);
    this.load.audio("door_rattling", door_rattling);
    this.load.audio("menu_click", button_warble1);
    this.load.audio("submit_click", button_warble2);
    this.load.audio("food_click", button_warble3);
    this.load.audio("food_sfx", food_sfx);
    this.load.audio("food_sfx1", food_sfx1);
    this.load.audio("click_sfx", click_sfx);
    this.load.audio("trash_sfx", trash_sfx);
    this.load.audio("eat_sfx1", eat_sfx1);
    this.load.audio("presentation_sfx1", presentation_sfx1);

    this.load.audio("success_sfx1", success_sfx1);

    this.load.audio("spooky_sfx1", spooky_sfx1);
    this.load.audio("spooky_sfx2", spooky_sfx2);
    this.load.audio("spooky_sfx3", spooky_sfx3);

    this.load.audio("voice_line1", voice_line1);
    this.load.audio("voice_line2", voice_line2);
    this.load.audio("voice_line3", voice_line3);

    //this.load.audio("cluttered_ambience2", cluttered_ambience2);
    this.load.spritesheet("glob_man_sheet",glob_man_sheet,{
            frameWidth: 1000,
            frameHeight: 1000
        });

    this.load.image("chef_icon", chef_icon);
    this.load.image("desk_icon", desk_icon);
    this.load.image("gear_icon", gear_icon);
    this.load.image("notebook_icon", notebook_icon);
    this.load.image("order_background", order_background);
    this.load.image("dialog_frame", dialog_frame);
    this.load.image("submit_button", submit_button);
    this.load.image("holy_glob", holy_glob);

    this.load.image("sky", skyBg);
    this.load.image("room", roomBg);
    this.load.image("doorFrame", jebsDoorFrame);
    this.load.image("doorHinge", jebsDoorHinge);
    this.load.image("windows", jebsWindows);
    this.load.image("counter", counterBg);
    this.load.image("head", frog_head);
    this.load.image("hands", hands);

    this.load.image("guy4",guy4)
    this.load.image("guy3",guy3)
    this.load.image("glob_man2.0", glob_man);
    this.load.image("cool_gruy", cool_gruy);
    this.load.image("mouf_galf", mouf_galf);
    this.load.image("smorg_bloo", smorg_bloo);
    this.load.image("smorg_boo", smorg_boo);
    this.load.image("smorg_gloo", smorg_gloo);
    this.load.image("smorg_groo", smorg_groo);
    this.load.image("smorg_moo", smorg_moo);

    this.load.image("kitchen", jebsKitchen);
    this.load.image("trashcan", trash_can);
    this.load.image("servingplate", serving_plate);

    this.load.image("bottomBun", bottomBun);
    this.load.image("topBun", topBun);
    this.load.image("lettuce", lettuce);
    this.load.image("beefpatty", beefpatty);
    this.load.image("bbq", bbq);
    this.load.image("ketchup", ketchup);
    this.load.image("mustard", mustard);
    this.load.image("onion", onion);
    this.load.image("ranch", ranch);
    this.load.image("tomato", tomato);
    this.load.image("ketchupBottle", ketchupBottle);
    this.load.image("mustardBottle", mustardBottle);
    this.load.image("bbqBottle", bbqBottle);
    this.load.image("ranchBottle", ranchBottle);
  },

  create() {
    function startGame() {
      this.registry.set("Points", 0);
      this.registry.set("Total_Orders", 0);

      this.scene.launch("MenuState");
      this.scene.launch("GameState");
    }

    // this.time.addEvent({
    //   delay: 3000,
    //   callback: startGame,
    //   callbackScope: this,
    //   loop: false,
    // });

    this.registry.set("Points", 0);
    this.registry.set("Total_Orders", 0);

    this.scene.launch("MenuState");
    this.scene.launch("ShakeState");
    this.scene.launch("GameState");
  },
};

export default LoadState;
