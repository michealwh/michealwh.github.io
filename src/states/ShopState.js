import shop_dictionary from "../dictonaries/shop.json";

import purchaseActions from "../modules/PurchaseActions";

const showPrompt = (game, show, showBtns) => {
  if (show == true) {
    game.promptOpen = true;
    game.tweens.add({
      targets: [game.shopPrompt],
      y: 500,
      ease: "Power1",
      duration: 500,
      repeat: 0,
      yoyo: false,
      onComplete: function () { },
    });
    game.tweens.add({
      targets: [game.promptText],
      y: 350,
      ease: "Power1",
      duration: 500,
      repeat: 0,
      yoyo: false,
      onComplete: function () { },
    });
    if (showBtns == true) {
      game.tweens.add({
        targets: [game.promptCostText],
        y: 480,
        ease: "Power1",
        duration: 500,
        repeat: 0,
        yoyo: false,
        onComplete: function () { },
      });
      game.tweens.add({
        targets: [game.confirmBtn, game.cancelBtn],
        y: 600,
        ease: "Power1",
        duration: 500,
        repeat: 0,
        yoyo: false,
        onComplete: function () { },
      });
    }
  } else {
    game.promptOpen = false;
    game.tweens.add({
      targets: [game.shopPrompt, game.promptText],
      y: -500,
      ease: "Power1",
      duration: 500,
      repeat: 0,
      yoyo: false,
      onComplete: function () { },
    });
    game.tweens.add({
      targets: [game.promptCostText],
      y: -450,
      ease: "Power1",
      duration: 500,
      repeat: 0,
      yoyo: false,
      onComplete: function () { },
    });
    game.tweens.add({
      targets: [game.confirmBtn, game.cancelBtn],
      y: -400,
      ease: "Power1",
      duration: 500,
      repeat: 0,
      yoyo: false,
      onComplete: function () { },
    });
  }
};

const confirmButtonHandler = (game, object) => {
  object.scale = 0.2;
  let debounce = false;
  object.on("pointerdown", (pointer, gameObject) => {
    if (debounce === false && game.promptOpen === true) {
      debounce = true;
    } else {
      return;
    }
    game.click_sfx.play();

    game.tweens.add({
      targets: object,
      scale: 0.15,
      rotation: 0,
      ease: "Linear",
      duration: 100,
      repeat: 0,
      yoyo: true,
      onComplete: function () {
        object.scale = 0.2;
        debounce = false;

        let current_globs = game.registry.get("Globble");
        if (game.activeItemInfo == "reroll") {
          let new_globs = current_globs - game.reRollCost;
          game.registry.set("Globble", new_globs.toFixed(2));
          //console.log("Set Globs to:", game.registry.get("Globble"));
          game.rerollButton.input.enabled = false;
          shuffleItems(game, true);
          game.rerollButton.tint = "0x2E2E2E";
          showPrompt(game, false);
          game.registry.set("Reroll_Info", [game.reRollCost, false]);
          game.tweens.add({
            targets: game.rerollButton,
            rotation: 360 * (Math.PI / 180),
            ease: "Linear",
            duration: 400,
            repeat: 0,
            yoyo: false,
            onComplete: function () { },
          });
          return;
        }
        let new_globs = current_globs - game.activeItemInfo.cost;
        game.registry.set("Globble", new_globs.toFixed(2));
        //console.log("Set Globs to:", game.registry.get("Globble"));
        if (!game.activeItemInfo.repeatable) {
          game.activeButton.tint = "0x2E2E2E";
          game.activeButton.input.enabled = false;
          let newKeys = game.allItemKeys.filter(
            (item) => item !== game.activeItemInfo.key
          );
          game.allItemKeys = newKeys;
          let newPlesKeys = game.allPleasantryKeys.filter(
              (item) => item !== game.activeItemInfo.key
            );
            game.allPleasantryKeys = newPlesKeys;
            let newCheapKeys = game.allCheapItemKeys.filter(
              (item) => item !== game.activeItemInfo.key
            );
            game.allCheapItemKeys = newCheapKeys;
            let newExpensiveKeys = game.allExpensiveItemKeys.filter(
              (item) => item !== game.activeItemInfo.key
            );
            game.allExpensiveItemKeys = newExpensiveKeys;
        } else if (game.activeItemInfo.repeatable > 0) {
          game[game.activeItemInfo.key + "Left"] -= 1;
          if (game[game.activeItemInfo.key + "Left"] <= 0) {
            game.activeButton.tint = "0x2E2E2E";
            game.activeButton.input.enabled = false;
            let newKeys = game.allItemKeys.filter(
              (item) => item !== game.activeItemInfo.key
            );
            game.allItemKeys = newKeys;
            let newPlesKeys = game.allPleasantryKeys.filter(
              (item) => item !== game.activeItemInfo.key
            );
            game.allPleasantryKeys = newPlesKeys;
            let newCheapKeys = game.allCheapItemKeys.filter(
              (item) => item !== game.activeItemInfo.key
            );
            game.allCheapItemKeys = newCheapKeys;
            let newExpensiveKeys = game.allExpensiveItemKeys.filter(
              (item) => item !== game.activeItemInfo.key
            );
            game.allExpensiveItemKeys = newExpensiveKeys;
          }
        }
        showPrompt(game, false);
        if (
          !game.activeItemInfo.key.includes("ball") &&
          game.activeItemInfo.type != "ingredient"
        ) {
          let currentItemList = game.registry.get("Items") || [];
          currentItemList.push(game.activeItemInfo.key);
          game.registry.set("Items", currentItemList);
        }
        purchaseActions[game.activeItemInfo.key](game);
      },
    });
  });
};

const cancelButtonHandler = (game, object) => {
  object.scale = 0.2;
  let debounce = false;
  object.on("pointerdown", (pointer, gameObject) => {
    if (debounce === false && game.promptOpen === true) {
      debounce = true;
    } else {
      return;
    }
    game.click_sfx.play();
    game.tweens.add({
      targets: object,
      scale: 0.15,
      rotation: 0,
      ease: "Linear",
      duration: 100,
      repeat: 0,
      yoyo: true,
      onComplete: function () {
        showPrompt(game, false);
        object.scale = 0.2;
        debounce = false;
      },
    });
  });
};

const shuffleItems = (game, animate, previousSave) => {


  if (previousSave == true) {
    //console.log("LOADING PREVIOUS SAVE RAAAAH")
    const shopItems = game.registry.get("Daily_Shop_Items");
    game.dailyItems = shopItems;
    game.shopItem1.setTexture(game.dailyItems[0] + "_box");
    game.shopItem2.setTexture(game.dailyItems[1] + "_box");
    game.shopItem3.setTexture(game.dailyItems[2] + "_box");

    if ( !game.allItemKeys.includes(game.dailyItems[0])){
      game.shopButton1.tint = "0x2E2E2E";
      game.shopButton1.input.enabled = false;
    }
     if ( !game.allItemKeys.includes(game.dailyItems[1])){
      game.shopButton2.tint = "0x2E2E2E";
      game.shopButton2.input.enabled = false;
    }
     if ( !game.allItemKeys.includes(game.dailyItems[2])){
      game.shopButton3.tint = "0x2E2E2E";
      game.shopButton3.input.enabled = false;
    }
    return
  } else {
    //console.log("NORMAL ITS NORMAL WE ARE SHUFFLING WHY GOD OH WHY")
  }

  const shuffleArray = (array) => {
    let currentIndex = array.length;
    while (currentIndex != 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
  };

  const currentMoney = game.registry.get("Globble");
  const currentDay = game.registry.get("Day");

  if (currentDay > 20) {
    let shuffledItems = game.allItemKeys;
    shuffleArray(shuffledItems);
    let item1 = shuffledItems[0];
    let item2 = shuffledItems[1];
    let item3 = shuffledItems[2];

    game.dailyItems = [item1, item2, item3, "bouncyball","rcpatty"];
  } else {
    let shuffledItems = game.allItemKeys;
    let shuffledPles = game.allPleasantryKeys;

    shuffleArray(shuffledItems);
    shuffleArray(shuffledPles);
    if (currentMoney < 100 && currentDay < 12) {
      shuffledItems = game.allCheapItemKeys;
      shuffleArray(shuffledItems);
    }

    let item1 = shuffledPles[0];
    let item2 = shuffledItems.find((item) => item !== item1);
    let item3 = shuffledItems.find((item) => item !== item1 && item !== item2);

    let itemList = [item1, item2, item3];
    shuffleArray(itemList);

    game.dailyItems = [itemList[0], itemList[1], itemList[2], "bouncyball","rcpatty"];
  }

  game.registry.set("Daily_Shop_Items", game.dailyItems);
  game.shopItem1.setTexture(game.dailyItems[0] + "_box");
  game.shopItem2.setTexture(game.dailyItems[1] + "_box");
  game.shopItem3.setTexture(game.dailyItems[2] + "_box");

  if (animate == true) {
    game.shopItem1.setTint(0x000000);
    game.shopItem2.setTint(0x000000);
    game.shopItem3.setTint(0x000000);
    // game.shopItem1.scale=0;
    // game.shopItem2.scale=0;
    // game.shopItem3.scale=0;
    game.shopItem1.rotation = -5 * (Math.PI / 180);
    game.shopItem2.rotation = -5 * (Math.PI / 180);
    game.shopItem3.rotation = -5 * (Math.PI / 180);
    game.tweens.add({
      targets: [game.shopItem1, game.shopItem2, game.shopItem3],
      rotation: 5 * (Math.PI / 180),
      ease: "Power1",
      duration: 100,
      repeat: 2,
      yoyo: true,
      onComplete: function () {
        game.shopItem1.clearTint();
        game.shopItem2.clearTint();
        game.shopItem3.clearTint();
        game.shopItem1.rotation = 0;
        game.shopItem2.rotation = 0;
        game.shopItem3.rotation = 0;
      },
    });
  }
  game.shopButton1.input.enabled = true;
  game.shopButton2.input.enabled = true;
  game.shopButton3.input.enabled = true;
  game.shopButton1.clearTint();
  game.shopButton2.clearTint();
  game.shopButton3.clearTint();
};

const purchaseButtonhandler = (game, object, itemIndex) => {
  object.scale = 0.2;
  let debounce = false;
  object.on("pointerdown", (pointer, gameObject) => {
    if (debounce === false && game.promptOpen === false) {
      debounce = true;
    } else {
      return;
    }
    let shopItemInfo = shop_dictionary.purchasables[game.dailyItems[itemIndex]];

    game.activeItemInfo = shopItemInfo;
    game.activeButton = object;
    game.click_sfx.play();
    game.infoFrame.scale = 0;
    game.infoText.scale = 0;
    game.tweens.add({
      targets: object,
      scale: 0.15,
      rotation: 0,
      ease: "Linear",
      duration: 100,
      repeat: 0,
      yoyo: true,
      onComplete: function () {
        object.scale = 0.2;
        debounce = false;
        let currentGlobs = game.registry.get("Globble");
        if (currentGlobs >= shopItemInfo.cost) {
          game.promptText.text = "Purchase: " + shopItemInfo.title;
          game.promptCostText.text = "$" + shopItemInfo.cost;
          showPrompt(game, true, true);
        } else {
          let dialog_options = [
            "Your poverty is insufferable.",
            "Come back when you have the funds.",
            "It's not enough.",
            "You don't have $" + shopItemInfo.cost + ".",
          ];
          game.promptText.text =
            dialog_options[Math.floor(Math.random() * dialog_options.length)];
          showPrompt(game, true, false);
          const hidePrompt = (game) => {
            showPrompt(game, false, false);
          };
          game.time.addEvent({
            delay: 1500,
            callback: () => {
              hidePrompt(game);
            },
            callbackScope: game,
            loop: false,
          });
        }
      },
    });
  });
  let mouseEnter = false;
  object.on("pointerover", (pointer, gameObject) => {
    let shopItemInfo = shop_dictionary.purchasables[game.dailyItems[itemIndex]];
    //console.log(game.dailyItems[itemIndex],game.dailyItems)
    if (game.promptOpen === false) {
      mouseEnter = true;
      if (object.x + object.width / 4 + game.infoFrame.width > 1000) {
        game.infoFrame.x = object.x - 52;
        game.infoText.x = object.x - 135;
        game.infoFrame.flipX = true;
        game.infoFrame.setOrigin(1, 1);
        game.infoText.setOrigin(1, 1);
      } else {
        game.infoFrame.setOrigin(0, 1);
        game.infoText.setOrigin(0, 1);
        game.infoFrame.flipX = false;
        game.infoFrame.x = object.x + 50;
        game.infoText.x = object.x + 120;
      }
      game.infoFrame.y = object.y - 5;
      game.infoText.y = object.y - 100;
      game.infoText.text =
        "C: $" + shopItemInfo.cost + "\nD: " + shopItemInfo.description;
      game.tweens.add({
        targets: [game.infoFrame],
        scale: 1.5,
        ease: "Power1",
        duration: 100,
        repeat: 0,
        yoyo: false,
      });
      game.tweens.add({
        targets: [game.infoText],
        scale: 1,
        ease: "Power1",
        duration: 100,
        repeat: 0,
        yoyo: false,
        onComplete: function () {
          if (mouseEnter == false) {
            game.infoFrame.scale = 0;
            game.infoText.scale = 0;
          }
        },
      });
    }
  });
  object.on("pointerout", (pointer, gameObject) => {
    mouseEnter = false;
    if (game.promptOpen === false) {
      game.infoFrame.scale = 0;
      game.infoText.scale = 0;
    }
  });
};

const reRollButtonhandler = (game, object) => {
  const rerollButton = object;
  rerollButton.scale = 0.2;
  let debounce = false;
  rerollButton.on("pointerdown", (pointer, gameObject) => {
    game.infoFrame.scale = 0;
    game.infoText.scale = 0;
    if (game.promptOpen === false) {
      game.click_sfx.play();
      let currentGlobs = game.registry.get("Globble");
      if (currentGlobs >= game.reRollCost) {
        game.activeItemInfo = "reroll";
        game.promptText.text = "Purchase: Reroll";
        game.promptCostText.text = "$" + game.reRollCost;
        showPrompt(game, true, true);
        game.registry.set("Rerolled_Today", true);
      } else {
        let dialog_options = [
          "Your poverty is insufferable.",
          "Come back when you have the funds.",
          "It's not enough.",
          "You don't have $" + game.reRollCost + ".",
        ];
        game.promptText.text =
          dialog_options[Math.floor(Math.random() * dialog_options.length)];
        showPrompt(game, true, false);
        const hidePrompt = (game) => {
          showPrompt(game, false, false);
        };
        game.time.addEvent({
          delay: 1500,
          callback: () => {
            hidePrompt(game);
          },
          callbackScope: game,
          loop: false,
        });
      }
    }
  });
  let mouseEnter = false;
  rerollButton.on("pointerover", (pointer, gameObject) => {
    if (game.promptOpen === false) {
      mouseEnter = true;
      if (object.x + object.width / 4 + game.infoFrame.width > 1000) {
        game.infoFrame.x = object.x - 5;
        game.infoText.x = object.x - 145;
        game.infoFrame.flipX = true;
        game.infoFrame.setOrigin(1, 1);
        game.infoText.setOrigin(1, 1);
      } else {
        game.infoFrame.setOrigin(0, 1);
        game.infoText.setOrigin(0, 1);
        game.infoFrame.flipX = false;
        game.infoFrame.x = object.x + 50;
        game.infoText.x = object.x + 130;
      }
      game.infoFrame.y = object.y - 5;
      game.infoText.y = object.y - 120;
      game.infoText.text = `C: $${game.reRollCost}\nD: reroll today's shop items`;
      game.tweens.add({
        targets: [game.infoFrame],
        scale: 1.5,
        ease: "Power1",
        duration: 100,
        repeat: 0,
        yoyo: false,
      });
      game.tweens.add({
        targets: [game.infoText],
        scale: 1,
        ease: "Power1",
        duration: 100,
        repeat: 0,
        yoyo: false,
        onComplete: function () {
          if (mouseEnter == false) {
            game.infoFrame.scale = 0;
            game.infoText.scale = 0;
          }
        },
      });
    }
  });
  rerollButton.on("pointerout", (pointer, gameObject) => {
    mouseEnter = false;
    if (game.promptOpen === false) {
      game.infoFrame.scale = 0;
      game.infoText.scale = 0;
    }
  });
};

var ShopState = {
  preload() { },

  create() {
    // this.bgMusic = this.sound.add("bgMusic")
    // this.bgMusic.setLoop(true);
    // this.bgMusic.volume = 0.1;
    // this.bgMusic.play()

    this.promptOpen = false;
    this.day = 1;
    this.activeItemInfo = {};
    this.dailyItems = ["magicdirt", "chair1", "table1", "bouncyball", "rcpatty"];
    this.allItemKeys = [];

    this.allPleasantryKeys = [];
    this.allCheapItemKeys = [];
    this.allExpensiveItemKeys = [];

    this.rcpattyAdded = false;

    for (const item in shop_dictionary.purchasables) {
      if (item === "bouncyball" || item === "rcpatty") continue;
      const itemInfo = shop_dictionary.purchasables[item];
      this.allItemKeys.push(item);
      if (
        itemInfo.description.includes("pleasantry") ||
        item === "pragmaticparty"
      ) {
        this.allPleasantryKeys.push(item);
        ////console.log(this.allPleasantryKeys);
      }
      if (itemInfo.cost < 100) {
        this.allCheapItemKeys.push(item);
      } else {
        this.allExpensiveItemKeys.push(item);
      }
      const itemRepeatable = itemInfo.repeatable;
      if (typeof itemRepeatable === "number") {
        this[item + "Left"] = itemRepeatable;
      }
    }
    this.click_sfx = this.sound.add("food_click");
    this.bouncy_sfx = this.sound.add("bouncy_open");
    this.box_sfx = this.sound.add("box_sfx");
    this.box_sfx.volume = 0.8;
    this.bitspooky_sfx = this.sound.add("bitspooky1");
    this.bitspooky_sfx.volume = .6;

    this.add.image(0, 0, "shop_bg").setOrigin(0, 0);

    this.titleText = this.add
      .text(500, 250, "slorg shop", {
        fontFamily: "unifrakturcook",
        fontSize: "120px",
        fill: "#14ff27ff",
        wordWrap: { width: 600 },
        align: "center",
      })
      .setOrigin(0.5, 0.5)
      .setDepth(4);

    this.infoContentText = this.add
      .text(720, 200, "new stock every day", {
        fontFamily: "font1",
        fontSize: "30px",
        fill: "#ff50df",
        wordWrap: { width: 600 },
        align: "center",
      })
      .setOrigin(0.5, 0.5)
      .setDepth(4);
    this.infoContentText.rotation = 15 * (Math.PI / 180);
    // first item
    this.shopItem1 = this.add
      .image(280, 500, "magicdirt_box")
      .setOrigin(0.5, 0.5)
      .setDepth(4)
      .setInteractive();
    this.shopItem1.scale = 0.8;
    this.shopButton1 = this.add
      .image(280, 640, "purchase_button")
      .setOrigin(0.5, 0.5)
      .setDepth(4)
      .setInteractive();
    purchaseButtonhandler(this, this.shopButton1, 0);

    // second item
    this.shopItem2 = this.add
      .image(500, 500, "chair1_box")
      .setOrigin(0.5, 0.5)
      .setDepth(4)
      .setInteractive();
    this.shopItem2.scale = 0.8;
    this.shopButton2 = this.add
      .image(500, 640, "purchase_button2")
      .setOrigin(0.5, 0.5)
      .setDepth(4)
      .setInteractive();
    purchaseButtonhandler(this, this.shopButton2, 1);

    // third item
    this.shopItem3 = this.add
      .image(720, 500, "table1_box")
      .setOrigin(0.5, 0.5)
      .setDepth(4)
      .setInteractive();
    this.shopItem3.scale = 0.8;
    this.shopButton3 = this.add
      .image(720, 640, "purchase_button")
      .setOrigin(0.5, 0.5)
      .setDepth(4)
      .setInteractive();
    purchaseButtonhandler(this, this.shopButton3, 2);

    // bouncy ball
    this.shopItem4 = this.add
      .image(500, 800, "bouncyball_box") // 500, 800
      .setOrigin(0.5, 0.5)
      .setDepth(4)
      .setInteractive();
    this.shopItem4.scale = 0.8;
    this.shopButton4 = this.add
      .image(500, 940, "purchase_button") // 500, 940
      .setOrigin(0.5, 0.5)
      .setDepth(4)
      .setInteractive();
    purchaseButtonhandler(this, this.shopButton4, 3);

    this.shopItem5 = this.add
      .image(610, 800, "rcpatty_box")
      .setOrigin(0.5, 0.5)
      .setDepth(4)
      .setInteractive();
    this.shopItem5.scale = 0.8;
    this.shopButton5 = this.add
      .image(610, 940, "purchase_button")
      .setOrigin(0.5, 0.5)
      .setDepth(4)
      .setInteractive();
    this.shopItem5.visible=false;
    this.shopButton5.visible=false;

    this.rerollButton = this.add
      .image(820, 340, "reroll_button")
      .setDepth(4)
      .setOrigin(0.5, 0.5)
      .setInteractive();
    this.rerollButton.scale = 0.2;
    //this.rerollButton.rotation=35*(Math.PI/180);
    reRollButtonhandler(this, this.rerollButton);

    const AlreadyOwnedItems = this.registry.get("Modifiers") || [];
    if (AlreadyOwnedItems.length > 0) {
      //console.log("found owned items");
      AlreadyOwnedItems.forEach((item) => {
        let itemInfo = shop_dictionary.purchasables[item];
        if (itemInfo === undefined) {
          //console.log("item info undefined for", item);
          return;
        }
        if (!itemInfo.repeatable) {
          //console.log("removing non repeatable item:", item);
          //this[item + "Button"].tint = "0x2E2E2E";
          //this[item + "Button"].input.enabled = false;
          let newKeys = this.allItemKeys.filter((otheritem) => otheritem !== item);
          let newPlesKeys = this.allPleasantryKeys.filter((otheritem) => otheritem !== item);
          let newCheapKeys = this.allCheapItemKeys.filter((otheritem) => otheritem !== item);
          let newExpensiveKeys = this.allExpensiveItemKeys.filter((otheritem) => otheritem !== item);
          this.allPleasantryKeys = newPlesKeys;
          this.allCheapItemKeys = newCheapKeys;
          this.allExpensiveItemKeys = newExpensiveKeys;
          this.allItemKeys = newKeys;
          ////console.log("new all item keys:",this.allItemKeys);
        } else if (itemInfo.repeatable > 0) {
          this[item + "Left"] -= 1;
          //console.log("reducing repeatable item:", item, "left:", this[item + "Left"]);
          if (this[item + "Left"] <= 0) {
            ////console.log("removing repeatable item:", item);
            //this[item + "Button"].tint = "0x2E2E2E";
            //this[item + "Button"].input.enabled = false;
            let newKeys = this.allItemKeys.filter((otheritem) => otheritem !== item);
            this.allItemKeys = newKeys;
            ////console.log("new all item keys:",this.allItemKeys);
            let newPlesKeys = this.allPleasantryKeys.filter(
              (otheritem) => otheritem !== item
            );
            this.allPleasantryKeys = newPlesKeys;
            ////console.log("new all pleasantry keys:",this.allPleasantryKeys);
            let newCheapKeys = this.allCheapItemKeys.filter(
              (otheritem) => otheritem !== item
            );
            this.allCheapItemKeys = newCheapKeys;
            ////console.log("new all cheap keys:",this.allCheapItemKeys);
            let newExpensiveKeys = this.allExpensiveItemKeys.filter(
              (otheritem) => otheritem !== item
            );
            this.allExpensiveItemKeys = newExpensiveKeys;
            ////console.log("new all expensive keys:",this.allExpensiveItemKeys);
          }
        }
      });
    }

    const totalMoney = this.registry.get("Globble") || 0;
    if (this.registry.get("Reroll_Info") === undefined || this.registry.get("Reroll_Info") === null) {
      //console.log("no reroll info found, generating new");
      this.reRollCost = Math.floor(Math.random() * Math.max(1, totalMoney / 2)) + 1.99;
      this.registry.set("Reroll_Info", [this.reRollCost, true]);
    } else {
      //console.log("found reroll info in registry:");
      //console.log(this.registry.get("Reroll_Info"))
      this.reRollCost = this.registry.get("Reroll_Info")[0];
      if (this.registry.get("Reroll_Info")[1] === false) {
        this.rerollButton.input.enabled = false;
        this.rerollButton.tint = "0x2E2E2E";
      }
    }


    if (this.registry.get("ShopDay") !== undefined) { // previous save detected
      this.day = this.registry.get("ShopDay");
      if (this.day >= this.registry.get("Day")) {
        shuffleItems(this, false, true);
      } else {
        //console.log("should auto shuffle items")
      }
    } else {
      this.day = this.registry.get("Day");
      this.registry.set("ShopDay", this.day);
      shuffleItems(this);
    }

    this.infoFrame = this.add
      .image(100, 100, "info_frame")
      .setOrigin(0, 1)
      .setDepth(5);
    this.infoFrame.scale = 0;
    this.infoText = this.add
      .text(-100, -100, "shop", {
        fontFamily: "font1",
        fontSize: "20px",
        fill: "#09376bff",
        wordWrap: { width: 280 },
      })
      .setOrigin(0, 1)
      .setDepth(6);
    this.infoText.scale = 0;
    Phaser.Display.Align.In.Center(this.infoText, this.infoFrame);
    this.shopPrompt = this.add
      .image(500, -500, "notice_background2")
      .setOrigin(0.5, 0.5)
      .setDepth(7);
    this.promptText = this.add
      .text(500, -500, "Purchase", {
        fontFamily: "font1",
        fontSize: "50px",
        fill: "#f0e338ff",
        wordWrap: { width: 600 },
        align: "center",
      })
      .setOrigin(0.5, 0.5)
      .setDepth(8);
    this.promptCostText = this.add
      .text(500, -450, "$10.99", {
        fontFamily: "font1",
        fontSize: "100px",
        fill: "#49e9f5ff",
        wordWrap: { width: 600 },
        align: "center",
      })
      .setOrigin(0.5, 0.5)
      .setDepth(8);
    this.confirmBtn = this.add
      .image(400, -400, "yes_button")
      .setOrigin(0.5, 0.5)
      .setInteractive()
      .setDepth(8);
    this.confirmBtn.scale = 0.2;
    confirmButtonHandler(this, this.confirmBtn);
    this.cancelBtn = this.add
      .image(600, -400, "no_button")
      .setOrigin(0.5, 0.5)
      .setInteractive()
      .setDepth(8);
    cancelButtonHandler(this, this.cancelBtn);
  },
  update() {
    if (this.registry.get("Day") !== this.day) {
      //console.log("day changed in shop");
      this.day = this.registry.get("Day");
      this.registry.set("ShopDay", this.day);
      this.registry.set("Rerolled_Today", false);
      this.rerollButton.input.enabled = true;
      this.rerollButton.clearTint();
      const totalMoney = this.registry.get("Globble") || 0;
      this.reRollCost = Math.floor(Math.random() * Math.max(1, totalMoney / 2)) + 1.99;
      this.registry.set("Reroll_Info", [this.reRollCost, true]);
      //console.log("rerollcost", this.reRollCost, totalMoney);
      shuffleItems(this);
    }
    if(this.registry.get("RCPattyAdded") === true && this.rcpattyAdded === false){
      this.rcpattyAdded = true;
      this.shopItem5.visible=true;
      this.shopButton5.visible=true;
      this.shopItem4.x=390;
      this.shopButton4.x=390;
      purchaseButtonhandler(this, this.shopButton5, 4);
    }
  },
};

export default ShopState;
