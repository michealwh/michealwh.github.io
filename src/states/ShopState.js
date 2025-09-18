import shop_dictionary from "../dictonaries/shop.json";

function itemReveal(game,item){
    game.promptOpen = true;
    game.registry.set("SwitchNotAllowed", true);
    const boxView = game.add
      .image(500, 500, item + "_box")
      .setOrigin(0.5, 0.5)
      .setDepth(6);
    boxView.scale = 0;

    game.tweens.add({
      targets: [boxView],
      scale: 1.5,
      ease: "Power1",
      duration: 500,
      repeat: 0,
      yoyo: false,
      onComplete: function () {
          boxView.rotation = -1 * (Math.PI / 180);
          game.tweens.add({
            targets: boxView,
            rotation: 1 * (Math.PI / 180),
            ease: "Linear",
            duration: 100,
            repeat: 3,
            yoyo: true,
            onComplete: function () {
              game.box_sfx.play();
              const itemView = game.add
                .image(500, 500, item)
                .setOrigin(0.5, 0.5);
              itemView.setDepth(8);
              itemView.scale = 0;
              game.tweens.add({
                targets: itemView,
                scale: .5,
                ease: "Linear",
                duration: 100,
                repeat: 0,
                yoyo: false,
                onComplete: function(){
                  game.time.addEvent({
                        delay: 2000,
                        callback: () => {
                          game.tweens.add({
                            targets: [itemView, boxView],
                            scale: 0,
                            rotation: 360,
                            ease: "Linear",
                            duration: 500,
                            repeat: 0,
                            yoyo: false,
                            onComplete: function () {
                              itemView.destroy();
                              boxView.destroy();
                              game.registry.set("SwitchNotAllowed", false);
                              game.promptOpen = false;
                            },
                          });
                        },
                        callbackScope: game,
                        loop: false,
                      });
                }
              });
            },
          });
        
      },
    });
}

const purchaseActions = {
  bouncyball: function (game) {
    game.registry.set("SwitchNotAllowed", true);
    game.promptOpen = true;

    let balltypes = [
      "blueball",
      "redball",
      "yellowball",
      "greenball",
      "rarebouncyball25",
    ];

    const boxView = game.add
      .image(500, 500, "bouncyballbox")
      .setOrigin(0.5, 0.5)
      .setDepth(6);
    boxView.scale = 0;

    game.tweens.add({
      targets: [boxView],
      scale: 1.5,
      ease: "Power1",
      duration: 500,
      repeat: 0,
      yoyo: false,
      onComplete: function () {
        function shakeBox() {
          boxView.rotation = -1 * (Math.PI / 180);
          game.tweens.add({
            targets: boxView,
            rotation: 1 * (Math.PI / 180),
            ease: "Linear",
            duration: 100,
            repeat: 3,
            yoyo: true,
            onComplete: function () {
              game.box_sfx.play();
              boxView.rotation = 0;
              let chosenball =
                balltypes[Math.floor(Math.random() * balltypes.length)];
              if (chosenball === "rarebouncyball25") {
                chosenball =
                  balltypes[Math.floor(Math.random() * balltypes.length)];
              }
              const ball = game.add
                .image(500, 500, chosenball)
                .setOrigin(0.5, 0.5);
              ball.setDepth(8);
              ball.scale = 0;
              const reveal_background = game.add
                .image(500, 500, "yellow_hue")
                .setOrigin(0.5, 0.5);
              reveal_background.setDepth(7);
              reveal_background.scale = 0;
              ball.setTintFill("#0a0a0aff");
             
              game.tweens.add({
                targets: [ball],
                scale: 1,
                ease: "Power1",
                duration: 50,
                repeat: 0,
                yoyo: false,
                onComplete: function () {
                  ball.rotation = -5 * (Math.PI / 180);
                  game.tweens.add({
                    targets: ball,
                    scale: 1.2,
                    rotation: 5 * (Math.PI / 180),
                    ease: "Linear",
                    duration: 100,
                    repeat: 3,
                    yoyo: true,
                    onComplete: function () {
                      ball.clearTint();
                      game.tweens.add({
                        targets: reveal_background,
                        scale: 1.5,
                        rotation: 360,
                        ease: "Linear",
                        duration: 200,
                        repeat: 0,
                        yoyo: false,
                        onComplete: function () {},
                      });

                      let targetScale = 1.5;

                      game.tweens.addCounter({
                        from: 3,
                        to: 1.2,
                        duration: 1600,
                        ease: "Linear",
                        onUpdate: (tween, targets, key, current, previous) => {
                          targetScale = current;
                        },
                      });

                      let repeatCount = 6;
                      function ballRepeatHandler(value) {
                        game.tweens.add({
                          targets: [ball],
                          scale: 1.5,
                          ease: "Bounce",
                          duration: 800,
                          repeat: 0,
                          yoyo: false,
                          onComplete: function () {},
                        });
                      }
                      ballRepeatHandler(targetScale);
                      game.time.addEvent({
                        delay: 2000,
                        callback: () => {
                          game.tweens.add({
                            targets: [reveal_background, ball, boxView],
                            scale: 0,
                            rotation: 360,
                            ease: "Linear",
                            duration: 500,
                            repeat: 0,
                            yoyo: false,
                            onComplete: function () {
                              ball.destroy();
                              reveal_background.destroy();
                              boxView.destroy();
                              game.registry.set("SwitchNotAllowed", false);
                              game.promptOpen = false;
                              let itemList =
                                game.registry.get("NewKitchenItem");
                              itemList.push(chosenball);
                              game.registry.set("NewKitchenItem", itemList);
                            },
                          });
                        },
                        callbackScope: game,
                        loop: false,
                      });
                    },
                  });
                },
              });
            },
          });
        }
        shakeBox();
      },
    });
  },
  chair1: function (game) {
    itemReveal(game,"chair1"); 
    let furnitureList = game.registry.get("Furniture_Shop_Event");
    console.log(furnitureList);
    if (furnitureList === undefined) {
      furnitureList = [];
    }
    furnitureList.push("chair");
    game.registry.set("Furniture_Shop_Event", furnitureList);
    let pleasantryScore = game.registry.get("Average_Pleasantry");
    pleasantryScore += 5;
    game.registry.set("Average_Pleasantry", pleasantryScore);
  },
  table1: function (game) {
    itemReveal(game,"table1"); 
    let furnitureList = game.registry.get("Furniture_Shop_Event");
    console.log(furnitureList);
    if (furnitureList === undefined) {
      furnitureList = [];
    }
    furnitureList.push("table");
    game.registry.set("Furniture_Shop_Event", furnitureList);
    let pleasantryScore = game.registry.get("Average_Pleasantry");
    pleasantryScore += 10;
    game.registry.set("Average_Pleasantry", pleasantryScore);
  },
  slorgplush: function (game) {
    itemReveal(game,"slorgplush"); 
    let furnitureList = game.registry.get("Furniture_Shop_Event");
    console.log(furnitureList);
    if (furnitureList === undefined) {
      furnitureList = [];
    }
    furnitureList.push("slorgplush");
    game.registry.set("Furniture_Shop_Event", furnitureList);
    let pleasantryScore = game.registry.get("Average_Pleasantry");
    pleasantryScore += 20;
    game.registry.set("Average_Pleasantry", pleasantryScore);
  },
  slorgbanner: function (game) {
    itemReveal(game,"slorgbanner"); 
    let furnitureList = game.registry.get("Furniture_Shop_Event");
    console.log(furnitureList);
    if (furnitureList === undefined) {
      furnitureList = [];
    }
    furnitureList.push("slorgbanner");
    game.registry.set("Furniture_Shop_Event", furnitureList);
    let pleasantryScore = game.registry.get("Average_Pleasantry");
    pleasantryScore += 40;
    game.registry.set("Average_Pleasantry", pleasantryScore);
  },
};

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
      onComplete: function () {},
    });
    game.tweens.add({
      targets: [game.promptText],
      y: 350,
      ease: "Power1",
      duration: 500,
      repeat: 0,
      yoyo: false,
      onComplete: function () {},
    });
    if (showBtns == true) {
      game.tweens.add({
        targets: [game.promptCostText],
        y: 480,
        ease: "Power1",
        duration: 500,
        repeat: 0,
        yoyo: false,
        onComplete: function () {},
      });
      game.tweens.add({
        targets: [game.confirmBtn, game.cancelBtn],
        y: 600,
        ease: "Power1",
        duration: 500,
        repeat: 0,
        yoyo: false,
        onComplete: function () {},
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
      onComplete: function () {},
    });
    game.tweens.add({
      targets: [game.promptCostText],
      y: -450,
      ease: "Power1",
      duration: 500,
      repeat: 0,
      yoyo: false,
      onComplete: function () {},
    });
    game.tweens.add({
      targets: [game.confirmBtn, game.cancelBtn],
      y: -400,
      ease: "Power1",
      duration: 500,
      repeat: 0,
      yoyo: false,
      onComplete: function () {},
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
        let current_globs = game.registry.get("Globs");
        let new_globs = current_globs - game.activeItemInfo.cost;
        game.registry.set("Globs", new_globs.toFixed(2));
        if (!game.activeItemInfo.repeatable) {
          console.log("should be stopping this");
          game.activeButton.tint = "22222288";
          game.activeButton.input.enabled = false;
        } else if (game.activeItemInfo.repeatable > 0) {
          game[game.activeItemInfo.key + "Left"] -= 1;
          if (game[game.activeItemInfo.key + "Left"] <= 0) {
            game.activeButton.tint = "22222288";
            game.activeButton.input.enabled = false;
          }
        }
        showPrompt(game, false);

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

const purchaseButtonhandler = (game, object, item) => {
  object.scale = 0.2;
  let debounce = false;
  let shopItemInfo = shop_dictionary.purchasables[item];
  object.on("pointerdown", (pointer, gameObject) => {
    if (debounce === false && game.promptOpen === false) {
      debounce = true;
    } else {
      return;
    }
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
        let currentGlobs = game.registry.get("Globs");
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
    if (game.promptOpen === false) {
      mouseEnter = true;
      if (object.x + object.width / 4 + game.infoFrame.width > 1000) {
        game.infoFrame.x = object.x - 52;
        game.infoText.x = object.x - 68;
        game.infoFrame.flipX = true;
        game.infoFrame.setOrigin(1, 1);
        game.infoText.setOrigin(1, 1);
      } else {
        game.infoFrame.setOrigin(0, 1);
        game.infoText.setOrigin(0, 1);
        game.infoFrame.flipX = false;
        game.infoFrame.x = object.x + 50;
        game.infoText.x = object.x + 70;
      }
      game.infoFrame.y = object.y - 5;
      game.infoText.y = object.y - 75;
      game.infoText.text =
        "$" + shopItemInfo.cost + " " + shopItemInfo.description;
      game.tweens.add({
        targets: [game.infoFrame, game.infoText],
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
      console.log("pointer out");
      game.infoFrame.scale = 0;
      game.infoText.scale = 0;
    }
  });
};

var ShopState = {
  preload() {},

  create() {
    // this.bgMusic = this.sound.add("bgMusic")
    // this.bgMusic.setLoop(true);
    // this.bgMusic.volume = 0.1;
    // this.bgMusic.play()

    this.promptOpen = false;
    this.activeItemInfo = {};
    this.chair1Left = shop_dictionary.purchasables.chair.repeatable;
    this.table1Left = shop_dictionary.purchasables.table.repeatable;
    this.slorgplushLeft = shop_dictionary.purchasables.slorgplush.repeatable;
    this.click_sfx = this.sound.add("food_click");
    this.bouncy_sfx = this.sound.add("bouncy_open");
    this.box_sfx = this.sound.add("box_sfx");
    this.box_sfx.volume = 0.8;

    this.add.image(0, 0, "shop_bg").setOrigin(0, 0);

    this.titleText = this.add
      .text(500, 250, "shop", {
        fontFamily: "unifrakturcook",
        fontSize: "120px",
        fill: "#14ff27ff",
        wordWrap: { width: 600 },
        align: "center",
      })
      .setOrigin(0.5, 0.5)
      .setDepth(4);

    // bouncy ball
    this.shopItem = this.add
      .image(300, 420, "bouncyballbox")
      .setOrigin(0.5, 0.5)
      .setDepth(4)
      .setInteractive();
    this.shopItem.scale = 0.8;
    this.shopButton = this.add
      .image(300, 550, "purchase_button")
      .setOrigin(0.5, 0.5)
      .setDepth(4)
      .setInteractive();
    purchaseButtonhandler(this, this.shopButton, "bouncyball");

    // chairs
    this.shopItem = this.add
      .image(500, 420, "chair1_box")
      .setOrigin(0.5, 0.5)
      .setDepth(4)
      .setInteractive();
    this.shopItem.scale = 0.8;
    this.shopButton = this.add
      .image(500, 550, "purchase_button2")
      .setOrigin(0.5, 0.5)
      .setDepth(4)
      .setInteractive();
    purchaseButtonhandler(this, this.shopButton, "chair");

    // tables
    this.shopItem = this.add
      .image(700, 420, "table1_box")
      .setOrigin(0.5, 0.5)
      .setDepth(4)
      .setInteractive();
    this.shopItem.scale = 0.8;
    this.shopButton = this.add
      .image(700, 550, "purchase_button")
      .setOrigin(0.5, 0.5)
      .setDepth(4)
      .setInteractive();
    purchaseButtonhandler(this, this.shopButton, "table");

    // slorg banner
    this.shopItem = this.add
      .image(350, 420 + 300, "slorgbanner_box")
      .setOrigin(0.5, 0.5)
      .setDepth(4)
      .setInteractive();
    this.shopItem.scale = 0.8;
    this.shopButton = this.add
      .image(350, 550 + 300, "purchase_button2")
      .setOrigin(0.5, 0.5)
      .setDepth(4)
      .setInteractive();
    purchaseButtonhandler(this, this.shopButton, "slorgbanner");

    // slorg banner
    this.shopItem = this.add
      .image(650, 420 + 300, "slorgplush_box")
      .setOrigin(0.5, 0.5)
      .setDepth(4)
      .setInteractive();
    this.shopItem.scale = 0.8;
    this.shopButton = this.add
      .image(650, 550 + 300, "purchase_button2")
      .setOrigin(0.5, 0.5)
      .setDepth(4)
      .setInteractive();
    purchaseButtonhandler(this, this.shopButton, "slorgplush");

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
        wordWrap: { width: 260 },
        align: "center",
      })
      .setOrigin(0, 1)
      .setDepth(6);
    this.infoText.scale = 0;
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
  update() {},
};

export default ShopState;
