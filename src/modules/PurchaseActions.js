import shop_dictionary from "../dictonaries/shop.json";

function itemReveal(game, item) {
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
          let targetScale = .5;
          if(shop_dictionary.purchasables[item].scale){
            targetScale=shop_dictionary.purchasables[item].scale
          }
          game.tweens.add({
            targets: itemView,
            scale: targetScale,
            ease: "Linear",
            duration: 100,
            repeat: 0,
            yoyo: false,
            onComplete: function () {
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
      .image(500, 500, "bouncyball_box")
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
                        onComplete: function () { },
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
                          onComplete: function () { },
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
                                game.registry.get("NewKitchenItemEvent");
                              itemList.push(chosenball);
                              game.registry.set("NewKitchenItemEvent", itemList);
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
    itemReveal(game, "chair1");
    let furnitureList = game.registry.get("FurnitureShopEvent") || [];
    if ((Array.isArray(furnitureList) && furnitureList.length===0)  || furnitureList === undefined) {
      furnitureList = [];
    }
    furnitureList.push("chair1");
    game.registry.set("FurnitureShopEvent", furnitureList);

    let currentModList = game.registry.get("Modifiers") || [];
    currentModList.push("chair1")
    //console.log(currentModList)
    game.registry.set("Modifiers", currentModList)

    let pleasantryScore = parseInt(game.registry.get("Average_Pleasantry")) || 0;
    pleasantryScore += 5;
    game.registry.set("Average_Pleasantry", pleasantryScore);
  },
  table1: function (game) {
    itemReveal(game, "table1");
    let furnitureList = game.registry.get("FurnitureShopEvent") || [];
    if ((Array.isArray(furnitureList) && furnitureList.length===0)  || furnitureList === undefined) {
      furnitureList = [];
    }
    furnitureList.push("table1");
    game.registry.set("FurnitureShopEvent", furnitureList);
    let currentModList = game.registry.get("Modifiers") || [];
    currentModList.push("table1")
    game.registry.set("Modifiers", currentModList)
    let pleasantryScore = parseInt(game.registry.get("Average_Pleasantry")) || 0;
    pleasantryScore += 10;
    game.registry.set("Average_Pleasantry", pleasantryScore);
  },
  slorgplush: function (game) {
    itemReveal(game, "slorgplush");
    let furnitureList = game.registry.get("FurnitureShopEvent") || [];
    if ((Array.isArray(furnitureList) && furnitureList.length===0)  || furnitureList === undefined) {
      furnitureList = [];
    }
    furnitureList.push("slorgplush");
    game.registry.set("FurnitureShopEvent", furnitureList);
    let currentModList = game.registry.get("Modifiers") || [];
    currentModList.push("slorgplush")
    game.registry.set("Modifiers", currentModList)
    let pleasantryScore = parseInt(game.registry.get("Average_Pleasantry")) || 0;
    pleasantryScore += 20;
    game.registry.set("Average_Pleasantry", pleasantryScore);
  },
  slorgbanner: function (game) {
    itemReveal(game, "slorgbanner");
    let furnitureList = game.registry.get("FurnitureShopEvent") || [];
    if ((Array.isArray(furnitureList) && furnitureList.length===0)  || furnitureList === undefined) {
      furnitureList = [];
    }
    furnitureList.push("slorgbanner");
    game.registry.set("FurnitureShopEvent", furnitureList);
    let currentModList = game.registry.get("Modifiers") || [];
    currentModList.push("slorgbanner")
    game.registry.set("Modifiers", currentModList)
    let pleasantryScore = parseInt(game.registry.get("Average_Pleasantry")) || 0;
    pleasantryScore += 40;
    game.registry.set("Average_Pleasantry", pleasantryScore);
  },
  condimentcaroler: function (game) {
    itemReveal(game, "condimentcaroler");
    let furnitureList = game.registry.get("FurnitureShopEvent") || [];
    if ((Array.isArray(furnitureList) && furnitureList.length===0)  || furnitureList === undefined) {
      furnitureList = [];
    }
    furnitureList.push("condimentcaroler");
    game.registry.set("FurnitureShopEvent", furnitureList);

    let currentModList = game.registry.get("Modifiers") || [];
    currentModList.push("condimentcaroler")
    //console.log(currentModList)
    game.registry.set("Modifiers", currentModList)
    game.registry.set("CondimentCarolerAdded",true)
  },
  magicdirt: function (game) {
    itemReveal(game, "magicdirt")
    let currentModList = game.registry.get("Modifiers") || [];
    currentModList.push("magicdirt")
    game.registry.set("Modifiers", currentModList)
  },
  stevenswish: function (game) {
    itemReveal(game, "stevenswish")
    let currentModList = game.registry.get("Modifiers") || [];
    currentModList.push("stevenswish")
    game.registry.set("Modifiers", currentModList)
  },
  burgerpolish: function (game) {
    itemReveal(game, "burgerpolish")
    let currentModList = game.registry.get("Modifiers") || [];
    currentModList.push("burgerpolish")
    game.registry.set("Modifiers", currentModList)
  },
  pragmaticparty: function (game) {
    itemReveal(game, "pragmaticparty")
    let currentModList = game.registry.get("Modifiers") || [];
    currentModList.push("pragmaticparty")
    game.registry.set("Modifiers", currentModList)
    let pleasantryScore = parseInt(game.registry.get("Average_Pleasantry")) || 0;
    pleasantryScore += 1;
    game.registry.set("Average_Pleasantry", pleasantryScore);
  },
  thewhisk: function (game) {
    itemReveal(game, "thewhisk")
    let currentModList = game.registry.get("Modifiers") || [];
    currentModList.push("thewhisk")
    game.registry.set("Modifiers", currentModList)
  },
  aqualificprism: function (game) {
    itemReveal(game, "aqualificprism")
    let currentModList = game.registry.get("Modifiers") || [];
    currentModList.push("aqualificprism")
    game.registry.set("Modifiers", currentModList)
  },
  killercheddar: function (game) {
    itemReveal(game, "killercheddar")
    let currentModList = game.registry.get("Modifiers") || [];
    currentModList.push("killercheddar")
    game.registry.set("Modifiers", currentModList)
    let currentRatChance = game.registry.get("currentRatChance") || 0
    game.registry.set("currentRatChance", (currentRatChance + 1))
  },
  ratnip: function (game) {
    itemReveal(game, "ratnip")
    let currentModList = game.registry.get("Modifiers") || [];
    currentModList.push("ratnip")
    game.registry.set("Modifiers", currentModList)
  },
  cryochamber: function (game) {
    itemReveal(game, "cryochamber")
    let currentModList = game.registry.get("Modifiers") || [];
    currentModList.push("cryochamber")
    game.registry.set("Modifiers", currentModList)
  },
  burgertime: function (game) {
    itemReveal(game, "burgertime")
    let currentModList = game.registry.get("Modifiers") || [];
    currentModList.push("burgertime")
    game.registry.set("Modifiers", currentModList)
  },

  scentedbounce: function (game) {
    itemReveal(game, "scentedbounce")
    let currentModList = game.registry.get("Modifiers") || [];
    currentModList.push("scentedbounce")
    game.registry.set("Modifiers", currentModList)
  },

  glumtrident: function (game) {
    itemReveal(game, "glumtrident")
    let currentModList = game.registry.get("Modifiers") || [];
    currentModList.push("glumtrident")
    game.registry.set("Modifiers", currentModList)
  },

  bouncezine: function (game) {
    itemReveal(game, "bouncezine")
    let currentModList = game.registry.get("Modifiers") || [];
    currentModList.push("bouncezine")
    game.registry.set("Modifiers", currentModList)
  },

  toddsrequest: function (game) {
    itemReveal(game, "toddsrequest")
    let currentModList = game.registry.get("Modifiers") || [];
    currentModList.push("toddsrequest")
    game.registry.set("Modifiers", currentModList)
  },

  bottomfeeder: function (game) {
    itemReveal(game, "bottomfeeder")
    let currentModList = game.registry.get("Modifiers") || [];
    currentModList.push("bottomfeeder")
    game.registry.set("Modifiers", currentModList)
  },

  bofoundation: function (game) {
    itemReveal(game, "bofoundation")
    game.time.addEvent({
      delay: 1800,
      callback: () => {
        game.bitspooky_sfx.play();
      }
    })
    let currentModList = game.registry.get("Modifiers") || [];
    currentModList.push("bofoundation")
    game.registry.set("Modifiers", currentModList)
  },

  glumdevil: function (game) {
    game.registry.set("SwitchNotAllowed", true);
    game.promptOpen = true;

    let glumtypes = [
      "glumglum",
      "glumgrin",
      "glumheart",
      "glumpleased",
      "glumwhistle",
    ];

    const boxView = game.add
      .image(500, 500, "glumdevil_box")
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
              let chosenglum =
                glumtypes[Math.floor(Math.random() * glumtypes.length)];
              if (chosenglum === "glumheart") {
                chosenglum =
                  glumtypes[Math.floor(Math.random() * glumtypes.length)];
              }
              const glum = game.add
                .image(500, 500, chosenglum)
                .setOrigin(0.5, 0.5);
              glum.setDepth(8);
              glum.scale = 0;
              const reveal_background = game.add
                .image(500, 500, "yellow_hue")
                .setOrigin(0.5, 0.5);
              reveal_background.setDepth(7);
              reveal_background.scale = 0;
              glum.setTintFill("#0a0a0aff");

              game.tweens.add({
                targets: [glum],
                scale: 1,
                ease: "Power1",
                duration: 50,
                repeat: 0,
                yoyo: false,
                onComplete: function () {
                  glum.rotation = -5 * (Math.PI / 180);
                  game.tweens.add({
                    targets: glum,
                    scale: 1.2,
                    rotation: 5 * (Math.PI / 180),
                    ease: "Linear",
                    duration: 100,
                    repeat: 3,
                    yoyo: true,
                    onComplete: function () {
                      glum.clearTint();
                      game.tweens.add({
                        targets: reveal_background,
                        scale: 1.5,
                        rotation: 360,
                        ease: "Linear",
                        duration: 200,
                        repeat: 0,
                        yoyo: false,
                        onComplete: function () { },
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
                      function glumRepeatHandler(value) {
                        game.tweens.add({
                          targets: [glum],
                          scale: 1.5,
                          ease: "Bounce",
                          duration: 800,
                          repeat: 0,
                          yoyo: false,
                          onComplete: function () { },
                        });
                      }
                      glumRepeatHandler(targetScale);
                      game.time.addEvent({
                        delay: 2000,
                        callback: () => {
                          game.tweens.add({
                            targets: [reveal_background, glum, boxView],
                            scale: 0,
                            rotation: 360,
                            ease: "Linear",
                            duration: 500,
                            repeat: 0,
                            yoyo: false,
                            onComplete: function () {
                              glum.destroy();
                              reveal_background.destroy();
                              boxView.destroy();
                              
                                let furnitureList = game.registry.get("FurnitureShopEvent") || [];
                                if ((Array.isArray(furnitureList) && furnitureList.length===0)  || furnitureList === undefined) {
                                  furnitureList = [];
                                }
                                
                                furnitureList.push((chosenglum));
                                game.registry.set("FurnitureShopEvent", furnitureList);
                                let currentModList = game.registry.get("Modifiers") || [];
                                currentModList.push("glumdevil")
                                game.registry.set("Modifiers", currentModList)
                                const currentGlumCount = game.registry.get("GlumDevilCount") || 0;
                                game.registry.set("GlumDevilCount", currentGlumCount + 1);
                                let pleasantryScore = parseInt(game.registry.get("Average_Pleasantry")) || 0;
                                if (chosenglum == "glumheart") {
                                  pleasantryScore+=10;
                                } else {
                                  pleasantryScore+=4;
                                }
                                game.registry.set("Average_Pleasantry", pleasantryScore);
                                game.registry.set("SwitchNotAllowed", false);
                                game.promptOpen = false;
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
  }
};

export default purchaseActions;