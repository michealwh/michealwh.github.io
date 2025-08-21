// NOTE THAT WHICHEVER THE STARTING SCENE IS FOR SOME REASON NEEDS TO BE IN THE IF ELSE STATEMENT FIRST BEFORE THE OTHER.
// I.E. GAMESTATE BEFORE KITCHENSTATE

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

    const click_sfx = this.sound.add("menu_click");
    this.time_paused = 0;

    const hoverEffectHandler = (object) => {
      object.on("pointerover", (pointer, gameObject) => {
        if (
          (this.scene.isActive("SettingsState") === false &&
            this.scene.isActive("OrderState") === false &&
            (object === kitchenBtn || object === counterBtn)) ||
          object === orderBtn ||
          object === gearBtn
        ) {
          if (
            (object === kitchenBtn && this.scene.isActive("KitchenState")) ||
            (object === counterBtn && this.scene.isActive("GameState"))
          ) {
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

    gearBtn.on("pointerdown", (pointer, gameObject) => {
      click_sfx.play();
      if (this.scene.isActive("SettingsState") === false) {
        this.time_paused_start = this.time.now;
        console.log("setting start of paused time", this.time_paused_start);
      } else {
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
      }
    });

    orderBtn.on("pointerdown", (pointer, gameObject) => {
      click_sfx.play();
      if (this.scene.isActive("SettingsState")) {
        this.time_paused += this.time.now - this.time_paused_start;
        this.scene.pause("SettingsState").run("OrderState");
        this.scene.bringToTop(this.lastScene);
        this.scene.bringToTop("OrderState");
        this.scene.bringToTop();
      } else if (
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
      }
    });

    kitchenBtn.on("pointerdown", (pointer, gameObject) => {
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
      }
    });
    counterBtn.on("pointerdown", (pointer, gameObject) => {
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
      }
    });

    gearBtn.scale = 0.6;
    orderBtn.scale = 0.6;
    kitchenBtn.scale = 0.6;
    counterBtn.scale = 0.6;
  },

  update() {
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
