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
    itemReveal(game,"chair1"); 
    let furnitureList = game.registry.get("FurnitureShopEvent");
    if (furnitureList === undefined) {
      furnitureList = [];
    }
    furnitureList.push("chair1");
    game.registry.set("FurnitureShopEvent", furnitureList);

    let currentModList = game.registry.get("Modifiers") || [];
    currentModList.push("chair1")
    --console.log(currentModList)
    game.registry.set("Modifiers",currentModList)

    let pleasantryScore = parseInt(game.registry.get("Average_Pleasantry"));
    pleasantryScore += 5;
    game.registry.set("Average_Pleasantry", pleasantryScore);
  },
  table1: function (game) {
    itemReveal(game,"table1"); 
    let furnitureList = game.registry.get("FurnitureShopEvent");
    if (furnitureList === undefined) {
      furnitureList = [];
    }
    furnitureList.push("table1");
    game.registry.set("FurnitureShopEvent", furnitureList);
       let currentModList = game.registry.get("Modifiers") || [];
    currentModList.push("table1")
    game.registry.set("Modifiers",currentModList)
    let pleasantryScore = parseInt(game.registry.get("Average_Pleasantry"));
    pleasantryScore += 10;
    game.registry.set("Average_Pleasantry", pleasantryScore);
  },
  slorgplush: function (game) {
    itemReveal(game,"slorgplush"); 
    let furnitureList = game.registry.get("FurnitureShopEvent");
    if (furnitureList === undefined) {
      furnitureList = [];
    }
    furnitureList.push("slorgplush");
    game.registry.set("FurnitureShopEvent", furnitureList);
       let currentModList = game.registry.get("Modifiers") || [];
    currentModList.push("slorgplush")
    game.registry.set("Modifiers",currentModList)
    let pleasantryScore = parseInt(game.registry.get("Average_Pleasantry"));
    pleasantryScore += 20;
    game.registry.set("Average_Pleasantry", pleasantryScore);
  },
  slorgbanner: function (game) {
    itemReveal(game,"slorgbanner"); 
    let furnitureList = game.registry.get("FurnitureShopEvent");
    if (furnitureList === undefined) {
      furnitureList = [];
    }
    furnitureList.push("slorgbanner");
    game.registry.set("FurnitureShopEvent", furnitureList);
       let currentModList = game.registry.get("Modifiers") || [];
    currentModList.push("slorgbanner")
    game.registry.set("Modifiers",currentModList)
    let pleasantryScore = parseInt(game.registry.get("Average_Pleasantry"));
    pleasantryScore += 40;
    game.registry.set("Average_Pleasantry", pleasantryScore);
  },
  magicdirt: function (game){
    itemReveal(game,"magicdirt")
    let currentModList = game.registry.get("Modifiers") || [];
    currentModList.push("magicdirt")
    game.registry.set("Modifiers",currentModList)
  },
  stevenswish: function (game){
    itemReveal(game,"stevenswish")
    let currentModList = game.registry.get("Modifiers") || [];
    currentModList.push("stevenswish")
    game.registry.set("Modifiers",currentModList)
  },
  burgerpolish: function (game){
    itemReveal(game,"burgerpolish")
    let currentModList = game.registry.get("Modifiers") || [];
    currentModList.push("burgerpolish")
    game.registry.set("Modifiers",currentModList)
  },
  pragmaticparty: function (game){
    itemReveal(game,"pragmaticparty")
    let currentModList = game.registry.get("Modifiers") || [];
    currentModList.push("pragmaticparty")
    game.registry.set("Modifiers",currentModList)
    let pleasantryScore = parseInt(game.registry.get("Average_Pleasantry"));
    pleasantryScore += 1;
    game.registry.set("Average_Pleasantry", pleasantryScore);
  },
  thewhisk: function (game){
    itemReveal(game,"thewhisk")
    let currentModList = game.registry.get("Modifiers") || [];
    currentModList.push("thewhisk")
    game.registry.set("Modifiers",currentModList)
  },
  aqualificprism: function (game){
    itemReveal(game,"aqualificprism")
    let currentModList = game.registry.get("Modifiers") || [];
    currentModList.push("aqualificprism")
    game.registry.set("Modifiers",currentModList)
  }
};

export default purchaseActions;