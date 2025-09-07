import dialog_dictionary from "../dictonaries/dialog.json";
import ingredients_dictionary from "../dictonaries/ingredients.json";
import npc_dictionary from "../dictonaries/npcs.json";

const dialogYMove = 500;

const dialogHandler = (passage, game) => {
  const textStyle = {
    fontFamily: "font1",
    fontSize: "20px",
    fill: "black",
    lineSpacing: 1,
    wordWrap: { width: 600 },
    align: "center",
  };
  let text = game.add.text(500, 850, passage, textStyle).setOrigin(0.5, 0.5);
  text.depth = 4;
  if (game.text !== undefined) {
    game.text.destroy();
  }
  game.text = text;
  game.tweens.add({
    targets: [text],
    scale: 1.1,
    ease: "Linear",
    duration: 200,
    repeat: 0,
    yoyo: true,
    onComplete: function () {
      game.registry.set("Order_Began", true);
      game.registry.set("SwitchNotAllowed", false);
    },
  });
};

const customerHandler = (customer, game) => {
  game.registry.set("SwitchNotAllowed", true);
  if (game.npc !== undefined) {
    game.npc.destroy();
  }
  const object = game.add.sprite(500, 500, customer.sprite).setOrigin(0.5, 0.5);
  const customer_scale = customer.scale;
  object.depth = 1;
  game.npc = object;
  object.x = 500;
  object.y = 500;
  object.scale = customer.start_scale;

  if (game.dialog_title !== undefined) {
    game.dialog_title.y = 750 + dialogYMove;
  }

  if (game.dialog_frame !== undefined) {
    game.dialog_frame.y = 500;
  }
  if (game.text !== undefined) {
    game.text.destroy();
  }

  function dialog() {
    if (game.text !== undefined) {
      game.text.destroy();
    }
    let frame = game.dialog_frame;
    if (frame === undefined) {
      game.dialog_frame = game.add
        .image(0, 500, "dialog_frame")
        .setOrigin(0, 0);
      frame = game.dialog_frame;
      frame.depth = 3;
    }
    frame.y = 500;
    let title = game.dialog_title;
    if (title === undefined) {
      game.dialog_title = game.add
        .text(200, 750 + dialogYMove, "", {
          fontFamily: "font1",
          fontSize: "50px",
          fill: "black",
        })
        .setOrigin(0, 0);
      title = game.dialog_title;
      title.depth = 4;
    }
    if (customer.name === "Random") {
      const first_index = Math.floor(
        Math.random() * npc_dictionary.first_names.length
      );
      const last_index = Math.floor(
        Math.random() * npc_dictionary.last_names.length
      );
      const first_name = npc_dictionary.first_names[first_index];
      const last_name = npc_dictionary.last_names[last_index];
      customer.name = first_name + " " + last_name;
    }
    title.text = customer.name;
    title.y = 750 + dialogYMove;
    game.tweens.add({
      targets: [title],
      y: title.y - dialogYMove,
      scale: 1,
      ease: "Power1",
      duration: 500,
      repeat: 0,
      yoyo: false,
      onComplete: function () {},
    });
    game.tweens.add({
      targets: [frame],
      x: frame.x,
      y: frame.y - dialogYMove,
      scale: 1,
      ease: "Power1",
      duration: 500,
      repeat: 0,
      yoyo: false,
      onComplete: function () {
        const g_index = Math.floor(
          Math.random() * dialog_dictionary.greetings.length
        );
        const o_index = Math.floor(
          Math.random() * dialog_dictionary.ordering.length
        );
        const number_of_ingredients = Math.floor(Math.random() * 5) + 1;

        let order_list = "";
        game.order = [];
        for (let i = 0; i < number_of_ingredients; i++) {
          const ingredient_index = Math.floor(
            Math.random() * ingredients_dictionary.ingredients.length
          );
          order_list += " the ";
          order_list += ingredients_dictionary.ingredients[ingredient_index];
          if (i + 1 !== number_of_ingredients) {
            order_list += " and";
          }
          game.order.push(ingredients_dictionary.ingredients[ingredient_index]);
        }
        game.order.unshift("beefpatty"),
          game.order.unshift("bottomBun"),
          game.order.unshift("topBun");
        game.registry.set("Order_Text", order_list);
        game.registry.set("Order", game.order);
        console.log(order_list);
        let text =
          dialog_dictionary.greetings[g_index] +
          " " +
          dialog_dictionary.ordering[o_index] +
          " the burger with" +
          order_list +
          ".";
        if (npc_dictionary.npcs[game.current_customer_index].sprite_sheet) {
          object.play("glob_talk");
          //game.talk_sfx.play();
        }
        dialogHandler(text, game);
      },
    });
  }

  game.tweens.add({
    targets: object,
    x: object.x,
    y: object.y + 150,
    scale: customer_scale,
    rotation: 360 * (Math.PI / 180),
    ease: "Power1",
    duration: 500,
    repeat: 0,
    yoyo: false,
    onComplete: function () {
      dialog();
    },
  });
};

const showDayFrame = (game, show) => {
  if (show == true) {
    game.tweens.add({
      targets: [game.dayFrame],
      y: 500,
      ease: "Power1",
      duration: 500,
      repeat: 0,
      yoyo: false,
      onComplete: function () {},
    });
    game.tweens.add({
      targets: [game.dayText],
      y: 350,
      ease: "Power1",
      duration: 500,
      repeat: 0,
      yoyo: false,
      onComplete: function () {},
    });
    game.tweens.add({
      targets: [game.dayUpdateText],
      y: 500,
      ease: "Power1",
      duration: 500,
      repeat: 0,
      yoyo: false,
    });
    game.tweens.add({
      targets: [game.dayButton],
      y: 600,
      ease: "Power1",
      duration: 500,
      repeat: 0,
      yoyo: false,
    });
  } else {
    game.tweens.add({
      targets: [game.dayFrame, game.dayText],
      y: -1000,
      ease: "Power1",
      duration: 500,
      repeat: 0,
      yoyo: false,
      onComplete: function () {},
    });
    game.tweens.add({
      targets: [game.dayUpdateText],
      y: -900,
      ease: "Power1",
      duration: 500,
      repeat: 0,
      yoyo: false,
    });
    game.tweens.add({
      targets: [game.dayButton],
      y: -950,
      ease: "Power1",
      duration: 500,
      repeat: 0,
      yoyo: false,
    });
  }
};

const newCustomer = (game) => {
  if (game.dailyCustomerCount >= game.dailyCustomerMax) {
    console.log("day is over");
    dayEndHandler(game);
    return;
  }
  function shakeDoor() {
    game.door_hinge.rotation = -1 * (Math.PI / 180);
    game.tweens.add({
      targets: game.door_hinge,
      scale: 1,
      rotation: 1 * (Math.PI / 180),
      ease: "Linear",
      duration: 100,
      repeat: 3,
      yoyo: true,
      onComplete: function () {
        game.door_hinge.rotation = 0;
        const availableCustomers = game.currentUnlockedCustomers.filter(
          (item) => item !== game.current_customer_index
        );
        game.current_customer_index = Math.floor(
          Math.random() * availableCustomers.length
        );
        game.current_customer_index =
          availableCustomers[game.current_customer_index];
        const customer = npc_dictionary.npcs[game.current_customer_index];
        customerHandler(customer, game);
        const doorsfx = game.sound.add("door_open");
        doorsfx.setVolume(1);
        doorsfx.play();
      },
    });
  }
  const doorsfx = game.sound.add("door_rattling");
  doorsfx.setVolume(0.2);
  doorsfx.play();
  shakeDoor();
};

const dayStartHandler = (game) => {
  game.currentDay += 1;
  game.registry.set("Day", game.currentDay);
  game.dailyCustomerCount = 0;
  showDayFrame(game, false);
  game.time.addEvent({
    delay: 200,
    callback: () => {
      newCustomer(game);
    },
    callbackScope: game,
    loop: false,
  });
};

const dayEndHandler = (game) => {
  game.dailyCustomerCount = 0;

  const moreCustomers = Math.floor(Math.random() * 2)+1;
  game.dailyCustomerMax += moreCustomers;
  const unlockedCustomerSuccess = (game.currentDay+1)%2;
  game.dayText.text = "Day " + game.currentDay + " Complete!";
  game.dayUpdateText.text = "";
  console.log("unlocked customer", unlockedCustomerSuccess);
  if (unlockedCustomerSuccess == 1 && game.currentLockedCustomers.length > 0) {
    let newCustomerIndex = Math.floor(
      Math.random() * game.currentLockedCustomers.length
    );
    game.currentLockedCustomers = game.currentLockedCustomers.filter(
      (item) => item !== game.currentUnlockedCustomers[newCustomerIndex]
    );
    game.currentUnlockedCustomers.push(newCustomerIndex);
    game.dayUpdateText.text = "You have unlocked a new customer!";
  }

  showDayFrame(game, true);
};

const dayButtonHandler = (game, button) => {
  button.on("pointerdown", (pointer, gameObject) => {
    game.click_sfx.play();

    game.tweens.add({
      targets: button,
      scale: 0.15,
      rotation: 0,
      ease: "Linear",
      duration: 100,
      repeat: 0,
      yoyo: true,
      onComplete: function () {
        dayStartHandler(game);
      },
    });
  });
};

const orderCompleteHandler = (game) => {
  game.registry.set("SwitchNotAllowed", true);
  game.dailyCustomerCount += 1;
  const recieved_order = game.registry.get("Burger");
  const expected_order = game.registry.get("Order");

  game.scene.bringToTop("ShakeState");

  console.log("dialog should be hidden");

  game.dialog_frame.y += dialogYMove;
  game.dialog_title.y += dialogYMove;
  game.text.y += dialogYMove;

  game.time.addEvent({
    delay: 2500,
    callback: () => {
      console.log("showing ui");
      game.text.text = "...";

      // this was added because the hands are initially shown in the shakestate and cannot be placed behind the dialogframe so they
      // are created again here to be hidden
      const handsToHide = game.add.image(500, 50, "hands").setOrigin(0.5, 0);
      handsToHide.depth = 2;

      game.time.addEvent({
        delay: 200,
        callback: () => {
          game.tweens.add({
            targets: handsToHide,
            y: handsToHide.y + 500,
            ease: "Linear",
            duration: 500,
            repeat: 0,
            yoyo: false,
            onComplete: function () {
              console.log("hands are hidden");
              handsToHide.destroy();
            },
          });
        },
        callbackScope: game,
        loop: false,
      });

      game.tweens.add({
        targets: game.dialog_frame,
        y: game.dialog_frame.y - dialogYMove,
        ease: "Linear",
        duration: 500,
        repeat: 0,
        yoyo: false,
        onComplete: function () {
          console.log("ui shown");
        },
      });
      game.tweens.add({
        targets: game.dialog_title,
        y: game.dialog_title.y - dialogYMove,
        ease: "Linear",
        duration: 500,
        repeat: 0,
        yoyo: false,
        onComplete: function () {},
      });
      game.tweens.add({
        targets: game.text,
        y: game.text.y - dialogYMove,
        ease: "Linear",
        duration: 500,
        repeat: 0,
        yoyo: false,
        onComplete: function () {},
      });
    },
    callbackScope: game,
    loop: false,
  });
  game.time.addEvent({
    delay: 5500,
    callback: () => {
      console.log("doing review");
      let ingredients_missed = [];
      for (let i = 0; i < expected_order.length; i++) {
        let index = recieved_order.indexOf(expected_order[i]);
        if (index !== -1) {
          recieved_order.splice(index, 1);
        } else {
          ingredients_missed.push(expected_order[i]);
        }
      }

      const orderAccuracy =
        (Math.max(
          0,
          expected_order.length -
            (recieved_order.length + ingredients_missed.length)
        ) /
          expected_order.length) *
        100;

      console.log("ingredients missed", ingredients_missed);

      const current_orders = game.registry.get("Total_Orders");
      game.registry.set("Total_Orders", current_orders + 1);

      const currentPrecisionStat = game.registry.get("Average_Precision");
      let precisionToSet = Math.floor(orderAccuracy);
      if (currentPrecisionStat > 0) {
        precisionToSet = Math.floor(
          (currentPrecisionStat + precisionToSet) / 2
        );
      }
      game.registry.set("Average_Precision", precisionToSet);

      const presentationStat = game.registry.get("Current_Presentation");
      const punctualityStat = Math.floor(
        100 -
          Math.min(
            100,
            game.registry.get("Order_Time_Finished") / expected_order.length
          )
      );

      if (recieved_order.length <= 0 && ingredients_missed.length === 0) {
        const index = Math.floor(
          Math.random() * dialog_dictionary.success.length
        );
        const good_response = dialog_dictionary.success[index];
        const current_points = game.registry.get("Points");
        let new_points =
          Math.floor(
            ((presentationStat + orderAccuracy + punctualityStat) / 4.6) * 10
          ) / 100;
        if (presentationStat < 10) {
          new_points = new_points * (presentationStat / 100);
        }
        if (punctualityStat < 50) {
          new_points = new_points * (punctualityStat / 100);
        }
        let new_total_points = parseFloat(current_points) + new_points;
        if (
          npc_dictionary.npcs[game.current_customer_index].name.includes(
            "Glorb"
          )
        ) {
          new_total_points = parseFloat(current_points) + new_points * 2;
        }

        if (npc_dictionary.npcs[game.current_customer_index].sprite_sheet) {
          game.npc.play("glob_happy");
        }
        game.registry.set("Points", new_total_points.toFixed(2));
        const current_correct = game.registry.get("Total_Correct") || 0;
        game.registry.set("Total_Correct", current_correct + 1);
        game.success_sfx1.play();
        dialogHandler(good_response, game);
      } else {
        const index = Math.floor(Math.random() * dialog_dictionary.fail.length);
        const bad_response = dialog_dictionary.fail[index];
        if (bad_response.includes("money")) {
          const current_points = game.registry.get("Points");
          let new_points = current_points - 9.99;
          if (
            npc_dictionary.npcs[game.current_customer_index].name.includes(
              "Glorb"
            )
          ) {
            new_points = current_points - 19.99;
          }
          game.registry.set("Points", new_points.toFixed(2));
        }
        const sound_num = Math.floor(Math.random() * 3) + 1;
        game["spooky_sfx" + sound_num].play();
        dialogHandler(bad_response, game);
        const current_health = game.registry.get("Health");
        game.registry.set("Health", current_health - 1);
        game.registry.set("ChangedHealth", true);
        if (npc_dictionary.npcs[game.current_customer_index].sprite_sheet) {
          game.npc.play("glob_angry");
        }
      }

      game.time.addEvent({
        delay: 3000,
        callback: function () {
          game.tweens.add({
            targets: [game.dialog_title, game.text],
            y: 750 + dialogYMove,
            ease: "Power1",
            duration: 500,
            repeat: 0,
            yoyo: false,
          });
          game.tweens.add({
            targets: [game.dialog_frame],
            y: 500,
            ease: "Power1",
            duration: 500,
            repeat: 0,
            yoyo: false,
          });
          game.tweens.add({
            targets: game.npc,
            x: game.npc.x,
            y: game.npc.y + 350,
            ease: "Power1",
            duration: 500,
            repeat: 0,
            yoyo: false,
            onComplete: function () {
              if (game.registry.get("Health") <= 0) {
                // GAME OVER
                game.dayButton.scale = 0;
                game.dayText.text = "Game Over";
                game.dayUpdateText.text = "Ended on Day: " + game.registry.get("Day");
                showDayFrame(game, true);
                game.scene.pause("MenuState");
                return;
              }
              newCustomer(game);
            },
          });
        },
        callbackScope: game,
        loop: false,
      });
    },
    callbackScope: game,
    loop: false,
  });
};

var GameState = {
  preload() {},

  create() {
    // this.bgMusic = this.sound.add("cluttered_ambience2");
    // this.bgMusic.setLoop(true);
    // this.bgMusic.volume = 0.1;
    // this.bgMusic.play()

    this.talk_sfx = this.sound.add("voice_line1");
    this.talk_sfx.setVolume(0.2);
    this.happy_sfx = this.sound.add("voice_line2");
    this.angry_sfx = this.sound.add("voice_line3");
    this.eat_sfx = this.sound.add("eat_sfx1");
    this.spooky_sfx1 = this.sound.add("spooky_sfx1");
    this.spooky_sfx2 = this.sound.add("spooky_sfx2");
    this.spooky_sfx3 = this.sound.add("spooky_sfx3");
    this.success_sfx1 = this.sound.add("success_sfx1");
    this.click_sfx = this.sound.add("submit_click");

    this.anims.create({
      key: "glob_talk",
      frames: this.anims.generateFrameNumbers("glob_man_sheet", {
        frames: [1, 0],
      }),
      frameRate: 8,
      repeat: 2,
    });

    this.anims.create({
      key: "glob_happy",
      frames: this.anims.generateFrameNumbers("glob_man_sheet", {
        frames: [2],
      }),
      frameRate: 1,
      repeat: 0,
    });

    this.anims.create({
      key: "glob_angry",
      frames: this.anims.generateFrameNumbers("glob_man_sheet", {
        frames: [3],
      }),
      frameRate: 1,
      repeat: 0,
    });

    this.add.image(0, 0, "sky").setOrigin(0, 0);
    this.add.image(0, 0, "room").setOrigin(0, 0);
    this.add.image(0, 0, "windows").setOrigin(0, 0);
    this.add.image(0, 0, "doorFrame").setOrigin(0, 0);
    this.door_hinge = this.add.image(500, 500, "doorHinge").setOrigin(0.5, 0.5);

    this.dayFrame = this.add
      .image(500, -1000, "notice_background")
      .setOrigin(0.5, 0.5)
      .setDepth(3);
    this.dayFrame.Scale = 0.8;
    this.dayText = this.add
      .text(500, -1100, "Day 1 Complete!", {
        fontFamily: "unifrakturcook",
        fontSize: "80px",
        fill: "#FF7FC5",
        wordWrap: { width: 600 },
        align: "center",
      })
      .setOrigin(0.5, 0.5)
      .setDepth(4);
    this.dayUpdateText = this.add
      .text(500, -900, "", {
        fontFamily: "font1",
        fontSize: "30px",
        fill: "#FF0090",
        wordWrap: { width: 400 },
        align: "center",
      })
      .setOrigin(0.5, 0.5)
      .setDepth(4);
    this.dayButton = this.add
      .image(500, -950, "day_button")
      .setOrigin(0.5, 0.5)
      .setDepth(4)
      .setInteractive();
    dayButtonHandler(this, this.dayButton);
    this.dayButton.scale = 0.2;
    this.dailyCustomerMax = 2;
    this.currentDay = 1;
    this.dailyCustomerCount = 0;
    this.currentAllowedIngredients = {
      topBun: true,
      bottomBun: true,
      beefpatty: true,
    };
    this.currentUnlockedCustomers = [0, 1];
    this.currentLockedCustomers = [];
    for (let i = 0; i < npc_dictionary.npcs.length; i++) {
      if (!this.currentUnlockedCustomers.includes(i)) {
        this.currentLockedCustomers.push(i);
      }
    }
    this.registry.set("Day", this.currentDay);
    this.registry.set("Health", 5);
    this.registry.set("SwitchNotAllowed", true);

    const counter = this.add.image(0, 0, "counter").setOrigin(0, 0);
    counter.depth = 2;

    newCustomer(this);
  },

  update() {
    if (this.registry.get("Order_Complete") == true) {
      this.registry.set("Order_Complete", false);
      orderCompleteHandler(this);
    }
  },
};

export default GameState;
