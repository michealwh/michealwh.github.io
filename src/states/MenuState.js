// NOTE THAT WHICHEVER THE STARTING SCENE IS FOR SOME REASON NEEDS TO BE IN THE IF ELSE STATEMENT FIRST BEFORE THE OTHER.
// I.E. GAMESTATE BEFORE KITCHENSTATE

const globUpdateHandler = (game) => {
  const currentAmount = parseFloat(game.globText.text);
  const newAmount = game.registry.get("Points");
  const difference = (newAmount - currentAmount).toFixed(2);
  game.globText.setText(newAmount.toString());
  if (difference > 0) {
    game.addedText.setText("+" + difference);
    game.addedText.setFill("rgba(89, 141, 64, 1)");
  } else {
    game.addedText.setText(difference.toString());
    game.addedText.setFill("rgba(209, 69, 69, 1)");
  }
  game.addedText.y = 55;
  game.addedText.alpha = 1;
  game.tweens.add({
    targets: game.addedText,
    y: game.addedText.y + 100,
    alpha: 0,
    ease: "Linear",
    duration: 500,
    repeat: 0,
    yoyo: false,
  });
};

const healthHandler = (game) => {
  const new_health = game.registry.get("Health");

  if (new_health < game.health) {
    // health was taken away
    game.health -= 1;
    const targetHealthPart = game.healthItems[0];
    targetHealthPart.rotation = -5 * (Math.PI / 180);
    game.tweens.add({
      targets: targetHealthPart,
      rotation: 5 * (Math.PI / 180),
      ease: "Linear",
      duration: 100,
      repeat: 1,
      yoyo: true,
      onComplete: function () {
        targetHealthPart.body.setAllowGravity(true);
        let direction = Math.round(Math.random());
        if (direction !== 1) {
          direction = -1;
        }
        targetHealthPart.setVelocity(direction * Math.random() * 15, -15);

        game.healthItems.splice(0, 1);
      },
    });
  }
};

var MenuState = {
  preload() {},

  create() {
    const gearBtn = this.add
      .image(40, 45, "gear_icon")
      .setOrigin(0.5, 0.5)
      .setInteractive();
    const orderBtn = this.add
      .image(135, 45, "notebook_icon")
      .setOrigin(0.5, 0.5)
      .setInteractive();
    const kitchenBtn = this.add
      .image(235, 45, "chef_icon")
      .setOrigin(0.5, 0.5)
      .setInteractive();
    const counterBtn = this.add
      .image(340, 45, "desk_icon")
      .setOrigin(0.5, 0.5)
      .setInteractive();

    const shopBtn = this.add
      .image(440, 45, "shop_icon")
      .setOrigin(0.5, 0.5)
      .setInteractive();


    gearBtn.scale = 0.6;
    orderBtn.scale = 0.6;
    kitchenBtn.scale = 0.6;
    counterBtn.scale = 0.6;
    shopBtn.scale = 0.6;

    const globIcon = this.add
      .image(1000, 55, "holy_glob")
      .setOrigin(1, 1)
      .setInteractive();
    globIcon.scale = 0.2;
    this.globIcon = globIcon;

    const globText = this.add.text(915, 60, "0", {
      fontFamily: "font1",
      fontSize: "50px",
      fill: "rgba(157, 255, 122, 1)",
    });
    globText.setOrigin(1, 1);
    globText.depth = 1;
    globText.setStyle({
      stroke: "rgba(115, 90, 90, 1)",
      strokeThickness: 4,
    });
    this.globText = globText;

    const addedText = this.add.text(915, 55, "", {
      fontFamily: "font1",
      fontSize: "50px",
      fill: "rgba(47, 73, 37, 1)",
    });
    addedText.setOrigin(1, 1);
    this.addedText = addedText;

    // health items

    // const tintColor = Phaser.Display.Color.GetColor(10, 10, 10);
    // const burgerBottomBG = this.physics.add
    //   .image(955, 105, "bottomBun")
    //   .setOrigin(0.5, 0.5);
    // burgerBottomBG.scale = 0.3;
    // burgerBottomBG.setTint(tintColor);
    // burgerBottomBG.tintFill = true;
    // burgerBottomBG.body.setAllowGravity(false);
    // const beefpattyBG = this.physics.add
    //   .image(955, 100, "beefpatty")
    //   .setOrigin(0.5, 0.5);
    // beefpattyBG.scale = 0.3;
    // beefpattyBG.setTint(tintColor);
    // beefpattyBG.tintFill = true;
    // beefpattyBG.body.setAllowGravity(false);
    // const lettuceBG = this.physics.add
    //   .image(955, 95, "lettuce")
    //   .setOrigin(0.5, 0.5);
    // lettuceBG.scale = 0.3;
    // lettuceBG.setTint(tintColor);
    // lettuceBG.tintFill = true;
    // lettuceBG.body.setAllowGravity(false);
    // const ketchupBG = this.physics.add
    //   .image(955, 90, "ketchup")
    //   .setOrigin(0.5, 0.5);
    // ketchupBG.scale = 0.3;
    // ketchupBG.setTint(tintColor);
    // ketchupBG.tintFill = true;
    // ketchupBG.body.setAllowGravity(false);
    // const burgerTopBG = this.physics.add
    //   .image(955, 80, "topBun")
    //   .setOrigin(0.5, 0.5);
    // burgerTopBG.setTint(tintColor);
    // burgerTopBG.tintFill = true;
    // burgerTopBG.scale = 0.3;
    // burgerTopBG.body.setAllowGravity(false);

    const burgerBottom = this.physics.add
      .image(955, 105, "bottomBun")
      .setOrigin(0.5, 0.5);
    burgerBottom.scale = 0.3;
    burgerBottom.body.setAllowGravity(false);
    const beefpatty = this.physics.add
      .image(955, 100, "beefpatty")
      .setOrigin(0.5, 0.5);
    beefpatty.scale = 0.3;
    beefpatty.body.setAllowGravity(false);
    const lettuce = this.physics.add
      .image(955, 95, "lettuce")
      .setOrigin(0.5, 0.5);
    lettuce.scale = 0.3;
    lettuce.body.setAllowGravity(false);
    const ketchup = this.physics.add
      .image(955, 90, "ketchup")
      .setOrigin(0.5, 0.5);
    ketchup.scale = 0.3;
    ketchup.body.setAllowGravity(false);
    const burgerTop = this.physics.add
      .image(955, 80, "topBun")
      .setOrigin(0.5, 0.5);
    burgerTop.scale = 0.3;
    burgerTop.body.setAllowGravity(false);

    this.healthItems = [burgerTop, ketchup, lettuce, beefpatty, burgerBottom];
    this.health = 5;

    const click_sfx = this.sound.add("menu_click");
    this.time_paused = 0;

    const hoverEffectHandler = (object) => {
      object.on("pointerover", (pointer, gameObject) => {
        if (this.registry.get("SwitchNotAllowed") === true) {
          return;
        }
        if (
          (this.scene.isActive("SettingsState") === false &&
            this.scene.isActive("OrderState") === false &&
            (object === kitchenBtn || object === counterBtn || object === shopBtn)) ||
          object === orderBtn ||
          object === gearBtn
        ) {
          if (
            (object === kitchenBtn && this.scene.isActive("KitchenState")) ||
            (object === counterBtn && this.scene.isActive("GameState")) ||
            (object === shopBtn && this.scene.isActive("ShopState"))
          ) {
            return;
          }
          if ( object === orderBtn && this.scene.isActive("SettingsState")){
            return;
          }
          this.tweens.add({
            targets: object,
            scale: 0.65,
            //rotation: 5 * (Math.PI / 180),
            ease: "Linear",
            duration: 10,
            repeat: 0,
            yoyo: false,
          });
        }
      });

      object.on("pointerout", (pointer, gameObject) => {
        this.tweens.add({
          targets: object,
          scale: 0.6,
          rotation: 0 * (Math.PI / 180),
          ease: "Linear",
          duration: 10,
          repeat: 0,
          yoyo: false,
        });
      });
    };

    hoverEffectHandler(gearBtn);
    hoverEffectHandler(orderBtn);
    hoverEffectHandler(kitchenBtn);
    hoverEffectHandler(counterBtn);
    hoverEffectHandler(shopBtn);

    gearBtn.on("pointerdown", (pointer, gameObject) => {
      if (this.scene.isActive("SettingsState") === false) {
        if (this.registry.get("SwitchNotAllowed") === true) {
          return;
        }
        click_sfx.play();
        this.time_paused_start = this.time.now;
        console.log("setting start of paused time", this.time_paused_start);
      } else {
        click_sfx.play();
        console.log("stopping paused time");
        this.time_paused += this.time.now - this.time_paused_start;
        console.log(this.time_paused, this.time_paused_start, this.time.now);
      }

      if (this.scene.isActive("OrderState")) {
        this.scene.pause("OrderState").run("SettingsState");
        this.scene.bringToTop(this.lastScene);
        this.scene.bringToTop("SettingsState");
        this.scene.bringToTop();
      } else if (this.scene.isActive("SettingsState")) {
        this.scene.pause("SettingsState").run(this.lastScene);
        this.scene.bringToTop(this.lastScene);
        this.scene.bringToTop();
      } else if (this.scene.isActive("KitchenState")) {
        this.lastScene = "KitchenState";
        this.scene.pause("KitchenState").run("SettingsState");
        this.scene.bringToTop("SettingsState");
        this.scene.bringToTop();
      } else if (
        this.scene.isActive("GameState") &&
        this.scene.isPaused("GameState") === false
      ) {
        this.lastScene = "GameState";
        this.scene.pause("GameState").run("SettingsState");
        this.scene.bringToTop("SettingsState");
        this.scene.bringToTop();
      } else if (this.scene.isActive("ShopState") && this.scene.isPaused("ShopState") === false){
        this.lastScene = "ShopState";
        this.scene.pause("ShopState").run("SettingsState");
        this.scene.bringToTop("SettingsState");
        this.scene.bringToTop();
      }
    });

    orderBtn.on("pointerdown", (pointer, gameObject) => {
      if (
        this.registry.get("SwitchNotAllowed") === true ||
        this.scene.isActive("SettingsState")
      ) {
        return;
      }
      click_sfx.play();
      if (
        this.scene.isActive("OrderState") &&
        this.scene.isPaused("OrderState") === false
      ) {
        this.scene.pause("OrderState").run(this.lastScene);
        this.scene.bringToTop(this.lastScene);
        this.scene.bringToTop();
      } else if (this.scene.isActive("KitchenState")) {
        this.lastScene = "KitchenState";
        this.scene.pause("KitchenState").run("OrderState");
        this.scene.bringToTop("OrderState");
        this.scene.bringToTop();
      } else if (this.scene.isActive("GameState")) {
        this.lastScene = "GameState";
        this.scene.pause("GameState").run("OrderState");
        this.scene.bringToTop("OrderState");
        this.scene.bringToTop();
      } else if (this.scene.isActive("ShopState")){
         this.lastScene = "ShopState";
        this.scene.pause("ShopState").run("OrderState");
        this.scene.bringToTop("OrderState");
        this.scene.bringToTop();
      }
    });

    kitchenBtn.on("pointerdown", (pointer, gameObject) => {
      if (this.registry.get("SwitchNotAllowed") === true) {
        return;
      }
      if (this.scene.isActive("GameState")) {
        click_sfx.play();
        this.tweens.add({
          targets: kitchenBtn,
          scale: 0.6,
          rotation: 0 * (Math.PI / 180),
          ease: "Linear",
          duration: 10,
          repeat: 0,
          yoyo: false,
        });
        this.scene.pause("GameState").run("KitchenState");
        this.scene.bringToTop("KitchenState");
        this.scene.bringToTop();
      } else if (this.scene.isActive("ShopState")){
        click_sfx.play();
        this.tweens.add({
          targets: kitchenBtn,
          scale: 0.6,
          rotation: 0 * (Math.PI / 180),
          ease: "Linear",
          duration: 10,
          repeat: 0,
          yoyo: false,
        });
        this.scene.pause("ShopState").run("KitchenState");
        this.scene.bringToTop("KitchenState");
        this.scene.bringToTop();
      }
    });
    counterBtn.on("pointerdown", (pointer, gameObject) => {
      if (this.registry.get("SwitchNotAllowed") === true) {
        return;
      }
      if (this.scene.isActive("KitchenState")) {
        click_sfx.play();
        this.tweens.add({
          targets: counterBtn,
          scale: 0.6,
          rotation: 0 * (Math.PI / 180),
          ease: "Linear",
          duration: 10,
          repeat: 0,
          yoyo: false,
        });
        this.scene.pause("KitchenState").run("GameState");
        this.scene.bringToTop("GameState");
        this.scene.bringToTop();
      } else if (this.scene.isActive("ShopState")) {
        click_sfx.play();
        this.tweens.add({
          targets: counterBtn,
          scale: 0.6,
          rotation: 0 * (Math.PI / 180),
          ease: "Linear",
          duration: 10,
          repeat: 0,
          yoyo: false,
        });
        this.scene.pause("ShopState").run("GameState");
        this.scene.bringToTop("GameState");
        this.scene.bringToTop();
      }
    });
    shopBtn.on("pointerdown", (pointer, gameObject) => {
      if (this.registry.get("SwitchNotAllowed") === true) {
        return;
      }
      if (this.scene.isActive("KitchenState")) {
        click_sfx.play();
        this.tweens.add({
          targets: shopBtn,
          scale: 0.6,
          rotation: 0 * (Math.PI / 180),
          ease: "Linear",
          duration: 10,
          repeat: 0,
          yoyo: false,
        });
        this.scene.pause("KitchenState").run("ShopState");
        this.scene.bringToTop("ShopState");
        this.scene.bringToTop();
      } else if(this.scene.isActive("GameState")) {
        click_sfx.play();
        this.tweens.add({
          targets: shopBtn,
          scale: 0.6,
          rotation: 0 * (Math.PI / 180),
          ease: "Linear",
          duration: 10,
          repeat: 0,
          yoyo: false,
        });
        this.scene.pause("GameState").run("ShopState");
        this.scene.bringToTop("ShopState");
        this.scene.bringToTop();
      }
    });
  },

  update() {
    if (this.registry.get("ChangedHealth") === true) {
      console.log("GOT CHANGED HEALTH ON MENU");
      this.registry.set("ChangedHealth", false);
      healthHandler(this);
    }
    if (
      this.registry.get("Points") !== undefined &&
      this.globText.text !== this.registry.get("Points").toString()
    ) {
      globUpdateHandler(this);
    }
    if (this.registry.get("Order_Began") === true) {
      this.registry.set("Order_Began", false);
      this.time_order_began = this.time.now;
    }
    if (this.registry.get("Order_Complete") === true) {
      this.time_order_finished = this.time.now;
      const time_finished =
        (this.time_order_finished - this.time_order_began - this.time_paused) /
        1000;

      const ingredientCount = this.registry.get("Order").length;
      console.log(
        "Time per each ingredient:" + time_finished / ingredientCount
      );
      const punctualityStat = Math.floor(
        100 - Math.min(100, time_finished / ingredientCount)
      );
      this.registry.set("Order_Time_Finished", time_finished);
      this.time_paused = 0;
      const currentPunctualityStat = this.registry.get("Average_Punctuality");
      let punctualityToSet = Math.floor(punctualityStat);
      this.registry.set("Current_Punctuality", punctualityToSet);
      if (currentPunctualityStat > 0) {
        punctualityToSet = Math.floor(
          (currentPunctualityStat + punctualityStat) / 2
        );
      }
      this.registry.set("Average_Punctuality", punctualityToSet);
      console.log(
        "Order Time Finished",
        this.registry.get("Order_Time_Finished")
      );
    }
  },
};

export default MenuState;
