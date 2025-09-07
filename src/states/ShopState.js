import shop_dictionary from "../dictonaries/shop.json";

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
      .setOrigin(0.5, 0.5);
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
                rotation: 360,
                ease: "Power1",
                duration: 1000,
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
                    repeat: 6,
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
                      game.tweens.add({
                        targets: ball,
                        scale: 1.5,
                        rotation: 0,
                        ease: "Linear",
                        duration: 100,
                        repeat: 0,
                        yoyo: true,
                        onComplete: function () {
                          game.time.addEvent({
                            delay: 1500,
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
                                  let itemList = game.registry.get("NewKitchenItem")
                                  itemList.push(chosenball)
                                  console.log(itemList)
                                  game.registry.set(
                                    "NewKitchenItem",
                                    itemList
                                  );
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
            },
          });
        }
        shakeBox();
      },
    });
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
        let current_points = game.registry.get("Points");
        let new_points = current_points - game.activeItemInfo.cost;
        game.registry.set("Points", new_points.toFixed(2));
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
        let currentPoints = game.registry.get("Points");
        if (currentPoints >=shopItemInfo.cost) {
          game.promptText.text = "Purchase: " + shopItemInfo.title;
          game.promptCostText.text = "$" + shopItemInfo.cost;
          showPrompt(game, true, true);
        } else {
          let dialog_options = [
            "You're... BROKE!",
            "Come back when you have the funds.",
            "It's not enough.",
            "It's literally $" + shopItemInfo.cost,
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
  object.on("pointerover", (pointer, gameObject) => {
    if (game.promptOpen === false) {
      game.infoFrame.x = object.x + 50;
      game.infoFrame.y = object.y - 5;
      game.infoText.x = object.x + 70;
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
        onComplete: function () {},
      });
    }
  });
  object.on("pointerout", (pointer, gameObject) => {
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
    this.click_sfx = this.sound.add("food_click");

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
    this.shopItem = this.add
      .image(100, 420, "bouncyballbox")
      .setOrigin(0.5, 0.5)
      .setDepth(4)
      .setInteractive();
    this.shopItem.scale = 0.8;
    this.shopButton = this.add
      .image(100, 550, "purchase_button")
      .setOrigin(0.5, 0.5)
      .setDepth(4)
      .setInteractive();
    purchaseButtonhandler(this, this.shopButton, "bouncyball");
    this.shopButton2 = this.add
      .image(500, -700, "purchase_button2")
      .setOrigin(0.5, 0.5)
      .setDepth(4)
      .setInteractive();
    this.shopButton2.scale = 0.2;

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
