// MODULES
import secureLocalStorage from "react-secure-storage";

// DICTONARY
import shop_dictonary from "../dictonaries/shop.json";

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
import guy41 from "../assets/game/npcs/guy4.1.png";
import guy42 from "../assets/game/npcs/guy4.2.png";
import guy43 from "../assets/game/npcs/guy4.3.png";
import glob_man from "../assets/game/npcs/glob_man2.0.png";
import glob_man2 from "../assets/game/npcs/glob_man2.png";
import glob_man3 from "../assets/game/npcs/glob_man3.png";
import cool_gruy from "../assets/game/npcs/cool_gruy.png";
import mouf_galf from "../assets/game/npcs/mouf_galf.png";
import smorg_bloo from "../assets/game/npcs/smorg_bloo.png";
import smorg_boo from "../assets/game/npcs/smorg_boo.png";
import smorg_gloo from "../assets/game/npcs/smorg_gloo.png";
import smorg_groo from "../assets/game/npcs/smorg_groo.png";
import smorg_moo from "../assets/game/npcs/smorg_moo.png";
import greenmaiden from "../assets/game/npcs/gorl.png";
import felip from "../assets/game/npcs/felip.png";
import shorts_guy1 from "../assets/game/npcs/shorts_guy1.png";
import shorts_guy2 from "../assets/game/npcs/shorts_guy2.png";
import shorts_guy3 from "../assets/game/npcs/shorts_guy3.png";
import gorl2 from "../assets/game/npcs/gorl2.png";
import gorl3 from "../assets/game/npcs/gorl3.png";
import proglog from "../assets/game/npcs/proglog.png";

import gorath from "../assets/game/special/gorath.png";
import monrock from "../assets/game/special/morock.png";
import rethnor from "../assets/game/special/rethnor.png";

// SPRITESHEET ASSETS

import glob_man_sheet from "../assets/game/spritesheets/glob_man_sprite_sheet.png";
import penguinclap from "../assets/game/spritesheets/penguinclap2.png";

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

// SHOP ASSETS
import purple_bg from "../assets/game/purple_bg.png";
import rarebouncyball25 from "../assets/game/shop/rarebouncyball2.5.png";
import bouncyballbox from "../assets/game/shop/bouncyballbox.png";
import chair1_box from "../assets/game/shop/chair1_box.png";
import table1_box from "../assets/game/shop/table1_box.png";
import slorgbanner_box from "../assets/game/shop/slorgbanner_box.png";
import slorgplush_box from "../assets/game/shop/slorgplush_box.png";
import magicdirt_box from "../assets/game/shop/magicdirt_box.png";
import stevenswish_box from "../assets/game/shop/stevenswish_box.png";
import burgerpolish_box from "../assets/game/shop/burgerpolish_box.png";
import pragmaticparty_box from "../assets/game/shop/pragmaticparty_box.png";
import thewhisk_box from "../assets/game/shop/thewhisk_box.png";
import aqualificprism_box from "../assets/game/shop/aqualificprism_box.png";



import blueball from "../assets/game/shop/bluebouncyball.png";
import redball from "../assets/game/shop/redbouncyball.png";
import greenball from "../assets/game/shop/greenbouncyball.png";
import yellowball from "../assets/game/shop/yellowbouncyball.png";
import chair1 from "../assets/game/shop/chair_1.png";
import table1 from "../assets/game/shop/table_1.png";
import slorgbanner from "../assets/game/shop/slorgsflag2.png";
import slorgplush from "../assets/game/shop/slorg_plush.png";
import magicdirt from "../assets/game/shop/magicdirt.png";
import stevenswish from "../assets/game/shop/stevenswish.png";
import burgerpolish from "../assets/game/shop/burgerpolish.png";
import pragmaticparty from "../assets/game/shop/pragmaticparty.png";
import thewhisk from "../assets/game/shop/thewhisk.png";
import aqualificprism from "../assets/game/shop/aqualificprism.png";




// UI ASSETS
import chef_icon from "../assets/ui/chef_icon.png";
import desk_icon from "../assets/ui/desk_icon.png";
import gear_icon from "../assets/ui/gear_icon.png";
import notebook_icon from "../assets/ui/notebook_icon.png";
import shop_icon from "../assets/ui/shop_icon2.png";
import order_background from "../assets/ui/order_background.png";
import dialog_frame from "../assets/ui/dialog_frame.png";
import submit_button from "../assets/ui/submit_button.png";
import day_button from "../assets/ui/day_button.png";
import holy_glob from "../assets/ui/holy_glob2.png";
import notice_bg from "../assets/ui/notice_background.png";
import notice_bg2 from "../assets/ui/notice_background2.png";
import purchase_button from "../assets/ui/purchase_button.png";
import purchase_button2 from "../assets/ui/purchase_button2.png";
import info_frame from "../assets/ui/info_frame.png";
import yes_button from "../assets/ui/yes_button.png";
import no_button from "../assets/ui/no_button.png";
import yellow_hue from "../assets/ui/yellow_hue.png";
import tab_frame from "../assets/ui/tab_frame.png";
import no2_button from "../assets/ui/no2_button.png"
import begin_button from "../assets/ui/begin_button.png"

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
import game_over_sfx from "../assets/sounds/game_over_sfx.mp3";
import bouncy_open from "../assets/sounds/slorg_bouncy_open.mp3";
import box_sfx from "../assets/sounds/box_sfx.mp3";
import page_flip_sfx from "../assets/sounds/page_flip_sfx.mp3";

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

    this.load.audio("bouncy_open", bouncy_open);
    this.load.audio("box_sfx", box_sfx);
    this.load.audio("game_over_sfx", game_over_sfx);
    this.load.audio("page_flip_sfx", page_flip_sfx);

    //this.load.audio("cluttered_ambience2", cluttered_ambience2);
    this.load.spritesheet("glob_man_sheet", glob_man_sheet, {
      frameWidth: 1000,
      frameHeight: 1000,
    });

    this.load.image("chef_icon", chef_icon);
    this.load.image("desk_icon", desk_icon);
    this.load.image("gear_icon", gear_icon);
    this.load.image("notebook_icon", notebook_icon);
    this.load.image("shop_icon", shop_icon);
    this.load.image("order_background", order_background);
    this.load.image("dialog_frame", dialog_frame);
    this.load.image("submit_button", submit_button);
    this.load.image("day_button", day_button);
    this.load.image("holy_glob", holy_glob);
    this.load.image("notice_background", notice_bg);
    this.load.image("notice_background2", notice_bg2);
    this.load.image("purchase_button", purchase_button);
    this.load.image("purchase_button2", purchase_button2);
    this.load.image("info_frame", info_frame);
    this.load.image("yes_button", yes_button);
    this.load.image("no_button", no_button);
    this.load.image("yellow_hue", yellow_hue);
    this.load.image("tab_frame",tab_frame);
    this.load.image("no2_button",no2_button);
    this.load.image("begin_button",begin_button);

    this.load.image("sky", skyBg);
    this.load.image("room", roomBg);
    this.load.image("doorFrame", jebsDoorFrame);
    this.load.image("doorHinge", jebsDoorHinge);
    this.load.image("windows", jebsWindows);
    this.load.image("counter", counterBg);
    this.load.image("head", frog_head);
    this.load.image("hands", hands);

    this.load.image("guy4", guy4);
    this.load.image("guy4.1", guy41);
    this.load.image("guy4.2", guy42);
    this.load.image("guy4.3", guy43);
    this.load.image("guy3", guy3);
    this.load.image("glob_man2.0", glob_man);
    this.load.image("glob_man2", glob_man2);
    this.load.image("glob_man3", glob_man3);
    this.load.image("cool_gruy", cool_gruy);
    this.load.image("mouf_galf", mouf_galf);
    this.load.image("smorg_bloo", smorg_bloo);
    this.load.image("smorg_boo", smorg_boo);
    this.load.image("smorg_gloo", smorg_gloo);
    this.load.image("smorg_groo", smorg_groo);
    this.load.image("smorg_moo", smorg_moo);
    this.load.image("greenmaiden", greenmaiden);
    this.load.image("felip", felip);
    this.load.image("shorts_guy1", shorts_guy1);
    this.load.image("shorts_guy2", shorts_guy2);
    this.load.image("shorts_guy3", shorts_guy3);
    this.load.image("gorl2", gorl2);
    this.load.image("gorl3", gorl3);
    this.load.image("proglog", proglog);

    this.load.image("gorath", gorath);
    this.load.image("monrock", monrock);
    this.load.image("rethnor", rethnor);

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

    this.load.image("shop_bg", purple_bg);
    this.load.image("rarebouncyball25", rarebouncyball25);
    this.load.image("redball", redball);
    this.load.image("blueball", blueball);
    this.load.image("greenball", greenball);
    this.load.image("yellowball", yellowball);
    this.load.image("bouncyball_box", bouncyballbox);
    this.load.image("chair1", chair1);
    this.load.image("table1", table1);
    this.load.image("slorgbanner", slorgbanner);
    this.load.image("slorgplush", slorgplush);
    this.load.image("magicdirt",magicdirt);
    this.load.image("stevenswish",stevenswish)
    this.load.image("burgerpolish",burgerpolish)
    this.load.image("pragmaticparty",pragmaticparty)
    this.load.image("thewhisk",thewhisk)
    this.load.image("aqualificprism",aqualificprism)

    this.load.image("chair1_box", chair1_box);
    this.load.image("table1_box", table1_box);
    this.load.image("slorgbanner_box", slorgbanner_box);
    this.load.image("slorgplush_box", slorgplush_box);
    this.load.image("magicdirt_box",magicdirt_box);
    this.load.image("stevenswish_box",stevenswish_box);
    this.load.image("burgerpolish_box",burgerpolish_box);
    this.load.image("pragmaticparty_box",pragmaticparty_box);
    this.load.image("thewhisk_box",thewhisk_box);
    this.load.image("aqualificprism_box",aqualificprism_box);


    this.load.spritesheet("penguin_sheet", penguinclap, {
      frameWidth: 64,
      frameHeight: 64,
    });
  },

  create() {
    // this.time.addEvent({
    //   delay: 3000,
    //   callback: startGame,
    //   callbackScope: this,
    //   loop: false,
    // });

    const defaultGlobs = 0;
    const defaultHealth = 5;
    const defaultIngredientMax = 2;
    const defaultCustomers = [0, 1];
    const defaultDailyCustomerMax = 2;

    const Total_Globs = parseFloat(secureLocalStorage.getItem("Total_Globs"));
    const Globs = parseFloat(secureLocalStorage.getItem("Globs"));
    const Total_Orders = parseInt(secureLocalStorage.getItem("Total_Orders"));
    const Total_Correct = parseInt(secureLocalStorage.getItem("Total_Correct"));
    const Average_Pleasantry = parseInt(secureLocalStorage.getItem("Average_Pleasantry"));
    const Average_Precision = parseInt(secureLocalStorage.getItem("Average_Precision"));
    const Average_Presentation = parseInt(secureLocalStorage.getItem("Average_Presentation"));
    const Average_Punctuality = parseInt(secureLocalStorage.getItem("Average_Punctuality"));
    const DayCount = parseInt(secureLocalStorage.getItem("Day"));
    const Health = parseInt(secureLocalStorage.getItem("Health"));
    const Unlocked_Customers = secureLocalStorage.getItem("Unlocked_Customers");
    const Items = secureLocalStorage.getItem("Items");
    const IngredientMax = parseInt(secureLocalStorage.getItem("IngredientMax"));
    const DailyCustomerMax = parseInt(secureLocalStorage.getItem("DailyCustomerMax"));
    const DailyCustomerCount = parseInt(secureLocalStorage.getItem("DailyCustomerCount"));
    let furnitureList = [];
    let ingredientList = [];

    if (true){ //(Health === null || Health === undefined || Health <= 0) {
      // new save
      this.registry.set("Total_Globs", 0);
      this.registry.set("Globs", defaultGlobs);
      this.registry.set("Total_Orders", 0);
      this.registry.set("Total_Correct", 0);
      this.registry.set("Average_Pleasantry", 0);
      this.registry.set("Average_Precision", 0);
      this.registry.set("Average_Presentation", 0);
      this.registry.set("Average_Punctuality", 0);
      this.registry.set("Day", 1);
      this.registry.set("DayOver",false);

      this.registry.set("IngredientMax", defaultIngredientMax);
      this.registry.set("Unlocked_Customers", defaultCustomers);
      this.registry.set("DailyCustomerMax", defaultDailyCustomerMax);
      this.registry.set("Health", defaultHealth);
      this.registry.set("Items", []);
      this.registry.set("Notes",{})
      this.registry.set("Modifiers",[])

      // modifier values

      this.registry.set("Pleasantry_Mod",0);
      this.registry.set("Precision_Mod",0);
      this.registry.set("Presentation_Mod",0);
      this.registry.set("Punctuality_Mod",0);
      this.registry.set("Tip_Mod",0);

      secureLocalStorage.setItem("Health", defaultHealth);
      secureLocalStorage.setItem("Total_Globs", 0);
      secureLocalStorage.setItem("Total_Orders", 0);
      secureLocalStorage.setItem("Total_Correct", 0);
      secureLocalStorage.setItem("Globs", defaultGlobs);
      secureLocalStorage.setItem("IngredientMax", defaultIngredientMax);
      secureLocalStorage.setItem(
        "Unlocked_Customers",
        JSON.stringify(defaultCustomers)
      );
      secureLocalStorage.setItem("DailyCustomerMax", defaultDailyCustomerMax);
      secureLocalStorage.setItem("DailyCustomerCount", 0);
    } else {
      // load save
      this.registry.set("Total_Globs", Total_Globs || 0);
      this.registry.set("Globs", Globs || defaultGlobs);
      this.registry.set("Total_Orders", Total_Orders || 0);
      this.registry.set("Total_Correct", Total_Correct || 0);
      this.registry.set("Average_Pleasantry", Average_Pleasantry || 0);
      this.registry.set("Average_Precision", Average_Precision || 0);
      this.registry.set("Average_Presentation", Average_Presentation || 0);
      this.registry.set("Average_Punctuality", Average_Punctuality || 0);
      this.registry.set("Day", DayCount || 1);

      this.registry.set("IngredientMax", IngredientMax || defaultIngredientMax);
      this.registry.set(
        "Unlocked_Customers",
        Unlocked_Customers ? JSON.parse(Unlocked_Customers) : defaultCustomers
      );
      this.registry.set(
        "DailyCustomerMax",
        DailyCustomerMax || defaultDailyCustomerMax
      );
      this.registry.set("DailyCustomerCount", DailyCustomerCount || 0);

      this.registry.set("Health", Health || defaultHealth);
      this.registry.set("Items", Items ? JSON.parse(Items) : []);

      let ItemList = JSON.parse(Items);
      if (ItemList){
        for (let i = 0; i < ItemList.length; i++) {
        const itemInfo = shop_dictonary.purchasables[ItemList[i]];
        if (itemInfo) {
          if (itemInfo.type === "furniture") {
            furnitureList.push(ItemList[i]);
          } else if (itemInfo.type === "ingredient") {
            ingredientList.push(ItemList[i]);
          }
        } else if (ItemList[i].includes("ball")) {
          ingredientList.push(ItemList[i]);
        }
      }
      }
    }

    this.registry.set("FurnitureShopEvent", furnitureList);
    this.registry.set("NewKitchenItemEvent", ingredientList);
    this.scene.launch("DataState");
    this.scene.launch("MenuState");
    this.scene.launch("ShakeState");
    //this.scene.launch("ShopState");
    this.scene.launch("GameState");
    //this.scene.launch("GalleryState");
  },
};

export default LoadState;
