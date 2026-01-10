import secureLocalStorage from "react-secure-storage";
import dialog_dictionary from "../dictonaries/dialog.json";
import ingredients_dictionary from "../dictonaries/ingredients.json";
import npc_dictionary from "../dictonaries/npcs.json";
import notes_dictionary from "../dictonaries/notes.jsx";
import shop_dictionary from "../dictonaries/shop.json";
import OrderSubmittedHandler from "../modules/OrderSubmittedHandler";
import days_info from "../dictonaries/days";

const dialogYMove = 500;
const uiDepth = 200;

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

const dialogHandler = (passage, game, startingOrder) => {
  const textStyle = {
    fontFamily: "font1",
    fontSize: "20px",
    fill: "black",
    lineSpacing: 1,
    wordWrap: { width: 600 },
    align: "center",
  };
  let text = game.add.text(500, 850, passage, textStyle).setOrigin(0.5, 0.5);
  text.depth = 4 + uiDepth;
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
      if (game.selectedNote !== undefined) {
      } else if (startingOrder) {
        game.registry.set("Order_Began", true);
        game.registry.set("SwitchNotAllowed", false);
      }
    },
  });
};

const questionHandler = (game, action, passage) => {
  game.questionAction = action;
  const textStyle = {
    fontFamily: "font1",
    fontSize: "20px",
    fill: "black",
    lineSpacing: 1,
    wordWrap: { width: 600 },
    align: "center",
  };
  let text = game.add.text(500, 830, passage, textStyle).setOrigin(0.5, 0.5);
  text.depth = 4 + uiDepth;
  if (game.text !== undefined) {
    game.text.destroy();
  }
  game.text = text;
  game.qNoButton.input.enabled = true;
  game.qYesButton.input.enabled = true;
  game.qYesButton.y = 920;
  game.qNoButton.y = 920;
  game.qYesButton.setAlpha(0);
  game.qNoButton.setAlpha(0);
  game.qYesButton.visible = true;
  game.qNoButton.visible = true;
  game.tweens.add({
    targets: [text],
    scale: 1.1,
    ease: "Linear",
    duration: 200,
    repeat: 0,
    yoyo: true,
    onComplete: function () {
      game.tweens.add({
        targets: [game.qYesButton, game.qNoButton],
        alpha: 1,
        ease: "Linear",
        duration: 1000,
        repeat: 0,
        yoyo: false,
        onComplete: function () {
          game.registry.set("SwitchNotAllowed", false);
        },
      });
    },
  });
};

const showNote = (game, shouldShow) => {
  if (shouldShow) {
    game.page_flip_sfx.play();
    const note_info = game.selectedNote;
    game.selectedNote = undefined;
    game.noteInfoTitle.text = note_info.title;
    if (note_info.title.includes("Untitled")) {
      game.noteInfoTitle.text = "";
      game.noteAuthorText.text = "";
      game.noteInfoText.setOrigin(0.5, 0.5);
      game.noteInfoText.x = 500;
      game.noteInfoText.y = 500;
      game.noteInfoText.setAlign("center");
    } else {
      game.noteAuthorText.text = "By: " + game.npcName;
      game.noteInfoText.setOrigin(0, 0);
      game.noteInfoText.x = 220;
      game.noteInfoText.y = 400;
      game.noteInfoText.setAlign("left");
    }
    //game.modInfoImage.setTexture(mod_info.key);

    if (note_info.fontSize) {
      //console.log("font size", note_info.fontSize + "px");
      game.noteInfoText.setFontSize(note_info.fontSize + "px");
    } else {
      game.noteInfoText.setFontSize("35px");
    }
    let infotext = "";
    if (note_info.description) {
      infotext += note_info.description;
    }
    game.noteInfoText.text = infotext;
    game.noteInfoTitle.visible = true;
    game.noteInfoText.visible = true;
    game.noteAuthorText.visible = true;
    game.note_background.visible = true;
  } else {
    game.noteInfoTitle.visible = false;
    game.noteInfoText.visible = false;
    game.noteAuthorText.visible = false;
    game.note_background.visible = false;
    endOfOrderReviewHandler(game);
  }
};

const setupNoteFrame = (game) => {
  game.note_background = game.add
    .image(0, 0, "order_background")
    .setOrigin(0, 0)
    .setDepth(6 + uiDepth)
    .setInteractive();
  game.noteInfoTitle = game.add
    .text(220, 280, "Name", {
      fontFamily: "font1",
      fontSize: "50px",
      fill: "black",
      align: "left",
    })
    .setOrigin(0, 0.5)
    .setDepth(7 + uiDepth);
  game.noteAuthorText = game.add
    .text(220, 330, "notes", {
      fontFamily: "font1",
      fontSize: "20px",
      fill: "black",
      wordWrap: { width: 500 },
      align: "left",
    })
    .setOrigin(0, 0.5)
    .setDepth(7 + uiDepth);
  game.noteInfoText = game.add
    .text(220, 400, "notes", {
      fontFamily: "font1",
      lineSpacing: 15,
      fontSize: "35px",
      fill: "black",
      wordWrap: { width: 600 },
      align: "left",
    })
    .setOrigin(0, 0)
    .setDepth(7 + uiDepth);
  game.note_background.visible = false;
  game.noteInfoTitle.visible = false;
  game.noteAuthorText.visible = false;
  game.noteInfoText.visible = false;

  game.note_background.on("pointerdown", (pointer, gameObject) => {
    showNote(game, false);
  });
};

const questionButtonHandler = (game) => {
  game.qYesButton.on("pointerdown", (pointer, gameObject) => {
    game.qNoButton.input.enabled = false;
    game.qYesButton.input.enabled = false;
    game.tweens.add({
      targets: game.qYesButton,
      scale: 0.15,
      rotation: 0,
      ease: "Linear",
      duration: 100,
      repeat: 0,
      yoyo: true,
      onComplete: function () {
        if (game.questionAction === "note") {
          showNote(game, true);
        }
      },
    });
  });
  game.qNoButton.on("pointerdown", (pointer, gameObject) => {
    game.qNoButton.input.enabled = false;
    game.qYesButton.input.enabled = false;
    game.tweens.add({
      targets: game.qNoButton,
      scale: 0.15,
      rotation: 0,
      ease: "Linear",
      duration: 100,
      repeat: 0,
      yoyo: true,
      onComplete: function () {
        if (game.questionAction === "note") {
          game.selectedNote = undefined;
          endOfOrderReviewHandler(game);
        }
      },
    });
  });
};

const customerHandler = (customer, game, previousSave) => {
  //console.log("new customer", customer);
  game.registry.set("SwitchNotAllowed", true);
  if (game.npc !== undefined) {
    game.npc.destroy();
  }
  const object = game.add.sprite(500, 500, customer.sprite).setOrigin(0.5, 0.5);
  const customer_scale = customer.scale;
  object.depth = 2;
  game.npc = object;
  game.npcName = customer.name;
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
    frame.y = 500;
    let title = game.dialog_title;
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
      onComplete: function () { },
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

        let text = "";
        if (!previousSave) {
          if (game.ingredientMax < 0) {
            // incase of items that could break this
            game.ingredientMax = 0;
          }
          const number_of_ingredients =
            Math.floor(Math.random() * game.ingredientMax) + 1;

          let order_list = "";
          game.order = [];
          for (let i = 0; i < number_of_ingredients; i++) {
            const ingredient_index = Math.floor(
              Math.random() * game.availableIngredients.length
            );
            order_list += " the ";
            order_list += game.availableIngredients[ingredient_index];
            if (i + 1 !== number_of_ingredients) {
              order_list += " and";
            }
            game.order.push(game.availableIngredients[ingredient_index]);
          }
          game.order.unshift("beefpatty"),
            game.order.unshift("bottomBun"),
            game.order.unshift("topBun");
          let bouncyStyled = false;
          if (game.bouncyballsAllowed) {
            let chance = Math.floor(Math.random() * 4); // 1/4 chance
            if (game.currentDay >= 12) {
              chance = Math.floor(Math.random() * 8); // 1/8 chance
            }
            if (chance === 0) {
              bouncyStyled = true;
              order_list += " and a bouncy ball";
              game.order.push("bouncy ball");
            }
          }
          game.registry.set("Order_Text", order_list);
          game.registry.set("Order", game.order);
          ////console.log(order_list);
          text =
            dialog_dictionary.greetings[g_index] +
            " " +
            dialog_dictionary.ordering[o_index] +
            " the burger with" +
            order_list +
            ".";
          if (game.secretShopperCustomer) {
            text = "i am customer. give me the burger with" + order_list + ".";
          }
          if (bouncyStyled) {
            text = text.slice(0, text.length - 19);
            let bounce_dialog = [
              " and i'll have it the bouncy way please.",
              " and can i get that the bouncy way?",
              " and i'll get it the bouncy way.",
            ];
            let choice =
              bounce_dialog[Math.floor(Math.random() * bounce_dialog.length)];
            text += choice;
          }
        } else {
          // previous save exists
          //console.log("---Restoring previous customer state:", customer);
          const order_list = game.registry.get("Order_Text");
          const Order = game.registry.get("Order");
          let bouncyStyled = false;
          if (Order.includes("bouncy ball")) {
            bouncyStyled = true;
          }
          text =
            dialog_dictionary.greetings[g_index] +
            " " +
            dialog_dictionary.ordering[o_index] +
            " the burger with" +
            order_list +
            ".";
          if (game.secretShopperCustomer) {
            text = "i am customer. give me the burger with" + order_list + ".";
          }
          if (bouncyStyled) {
            text = text.slice(0, text.length - 19);
            let bounce_dialog = [
              " and i'll have it the bouncy way please.",
              " and can i get that the bouncy way?",
              " and i'll get it the bouncy way.",
            ];
            let choice =
              bounce_dialog[Math.floor(Math.random() * bounce_dialog.length)];
            text += choice;
          }
        }
        if (
          npc_dictionary.npcs[game.current_customer_index].sprite_sheet &&
          !game.secretShopperCustomer
        ) {
          object.play("glob_talk");
          //game.talk_sfx.play();
        }
        dialogHandler(text, game, true);
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

const showDayFrame = (game, show, islong) => {
  let targetUpdateTextY = 355;
  if (islong) {
    targetUpdateTextY = 355;
  }
  if (show == true) {
    game.tweens.add({
      targets: [game.dayFrame],
      y: 500,
      ease: "Power1",
      duration: 500,
      repeat: 0,
      yoyo: false,
      onComplete: function () { },
    });
    game.tweens.add({
      targets: [game.dayText],
      y: 285,
      ease: "Power1",
      duration: 500,
      repeat: 0,
      yoyo: false,
      onComplete: function () { },
    });
    game.tweens.add({
      targets: [game.dayUpdateText],
      y: targetUpdateTextY,
      ease: "Power1",
      duration: 500,
      repeat: 0,
      yoyo: false,
    });
    game.tweens.add({
      targets: [game.dayButton],
      y: 650,
      ease: "Power1",
      duration: 500,
      repeat: 0,
      yoyo: false,
    });

    if (game.dayUpdateSprite !== null) {
      game.dayUpdateSprite = game.add
        .sprite(250, -950, "penguin_sheet2")
        .setOrigin(0.5, 0)
        .setDepth(10);
      game.dayUpdateSprite2 = game.add
        .sprite(750, -950, "penguin_sheet2")
        .setOrigin(0.5, 0)
        .setDepth(10);
      game.tweens.add({
        targets: [game.dayUpdateSprite, game.dayUpdateSprite2],
        y: 580,
        ease: "Power1",
        duration: 500,
        repeat: 0,
        yoyo: false,
      });
      game.dayUpdateSprite.play("clap");
      game.dayUpdateSprite2.play("clap");
    }
  } else {
    game.tweens.add({
      targets: [game.dayFrame, game.dayText],
      y: -1000,
      ease: "Power1",
      duration: 500,
      repeat: 0,
      yoyo: false,
      onComplete: function () { },
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
    if (game.dayUpdateSprite !== null) {
      game.tweens.add({
        targets: [game.dayUpdateSprite, game.dayUpdateSprite2],
        y: -950,
        ease: "Power1",
        duration: 500,
        repeat: 0,
        yoyo: false,
        onComplete: function () {
          game.dayUpdateSprite.destroy();
          game.dayUpdateSprite2.destroy();
        },
      });
    }
  }
};

const newCustomer = (game, just_launched, previousSave) => {
  if (
    game.dailyCustomerCount == game.dailyCustomerMax &&
    game.secretShopperDay == true
  ) {
    game.secretShopperCustomer = true;
    //console.log("secret shopper is now.");
  } else {
    game.secretShopperCustomer = false;
  }
  if (
    (game.dailyCustomerCount >= game.dailyCustomerMax &&
      !game.secretShopperDay) ||
    game.dailyCustomerCount >= game.dailyCustomerMax + 1
  ) {
    //console.log("day is over");
    //console.log("secretshopper day", game.secretShopperDay);
    dayEndHandler(game, just_launched);
    return;
  } else if (game.todays_customers.length <= game.dailyCustomerCount) {
    //console.log(game.dailyCustomerCount >= game.dailyCustomerMax);
    //console.log("day is over but this shouldn't be happening");
    dayEndHandler(game, just_launched);
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

        game.current_customer_index =
          game.todays_customers[game.dailyCustomerCount];

        //console.log("customer max", game.dailyCustomerMax);
        //console.log("daily customer count", game.dailyCustomerCount);
        //console.log("todays customers", game.todays_customers);
        let customer = npc_dictionary.npcs[game.current_customer_index];
        if (game.secretShopperCustomer) {
          //console.log("setting customer to secret shopper");
          customer = npc_dictionary.secretshoppers[game.current_customer_index];
          //console.log("secret shopper customer is", customer);
        }
        //console.log("customer index", game.current_customer_index);
        customerHandler(customer, game, previousSave);

        game.door_open_sfx.play();
      },
    });
  }
  game.door_rattle_sfx.play();
  shakeDoor();
};

const dayStartHandler = (game) => {
  //console.log("starting new day");
  game.registry.set("SwitchNotAllowed", true);
  game.registry.set("DayOver", false);
  game.currentDay = parseInt(game.currentDay) + 1;
  //console.log("Setting Day reg to", game.currentDay);
  game.registry.set("Day", game.currentDay);
  game.dailyCustomerCount = 0;
  game.todays_customers = game.registry.get("Todays_Customer") || [];

  // modifier handling

  const modifiers = game.registry.get("Modifiers") || [];

  const bouncezineCount = modifiers.reduce(
    (n, val) => n + (val === "bouncezine"),
    0
  );

  for (let i = 0; i < bouncezineCount; i++) {
    let chance = Math.floor(Math.random() * 5); // 20% chance
    if (chance === 0) {
      //console.log("adding free bouncyball");
      let balltypes = [
        "blueball",
        "redball",
        "yellowball",
        "greenball",
        "rarebouncyball25",
      ];
      let chosenball = balltypes[Math.floor(Math.random() * balltypes.length)];
      if (chosenball === "rarebouncyball25") {
        chosenball = balltypes[Math.floor(Math.random() * balltypes.length)];
      }
      let itemList = game.registry.get("NewKitchenItemEvent");

      itemList.push(chosenball);
      game.registry.set("NewKitchenItemEvent", itemList);
    } else {
      //console.log("not adding free bouncyball");
    }
  }
  //console.log("bouncezine count:", bouncezineCount);
  // customer selection
  const unlockedMaxRatio = Math.floor(
    game.dailyCustomerMax / game.currentUnlockedCustomers.length + 0.5
  );
  for (let i = 0; i < unlockedMaxRatio; i++) {
    game.todays_customers = game.todays_customers.concat(
      game.currentUnlockedCustomers
    );
    ////console.log("adding todays customers", game.todays_customers);
  }
  shuffleArray(game.todays_customers);
  ////console.log("shuffled todays customers", game.todays_customers);

  game.todays_customers = game.todays_customers.slice(0, game.dailyCustomerMax);
  if (game.newUnlockedCustomer !== null) {
    //console.log("there is a new customer today", game.newUnlockedCustomer);
    if (!game.todays_customers.includes(game.newUnlockedCustomer)) {
      game.todays_customers[0] = game.newUnlockedCustomer;
      //console.log("customer doesnt exist so we're adding it in");
    }
    game.newUnlockedCustomer = null;
  }

  if (game.secretShopperDay == true) {
    //console.log("secret shopper is today!!!!");
    // day is friday secret shopper yes
    let randomShopper = Math.floor(
      Math.random() * npc_dictionary.secretshoppers.length
    );
    game.todays_customers.push(randomShopper); // add secret shopper character
  }
  //console.log("todays customers", game.todays_customers);

  game.registry.set("Todays_Customers", game.todays_customers);
  //console.log("registry TC set to", game.registry.get("Todays_Customers"));
  game.registry.set("DailyCustomerCount", game.dailyCustomerCount);
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

const dayEndHandler = (game, just_launched, previousSave) => {
  game.registry.set("SwitchNotAllowed", false);
  game.registry.set("DayOver", true);
  game.dailyCustomerCount = 0;
  if (!previousSave) {
    if (game.dailyCustomerMax < 8) {
      const moreCustomersSuccess = (game.currentDay + 1) % 4;
      if (moreCustomersSuccess == 0) {
        let moreCustomers = Math.floor(Math.random() * 2) + 1;
        if (game.dailyCustomerMax + moreCustomers > 8) {
          moreCustomers = 1;
        }
        game.dailyCustomerMax += moreCustomers;
        game.registry.set("DailyCustomerMax", game.dailyCustomerMax);
      }
    }
    const unlockedCustomerSuccess = (game.currentDay + 1) % 2;

    if (game.currentDay + 1 === 2) {
      game.ingredientMax += 1; // 3
    } else if (game.currentDay + 1 == 4) {
      game.ingredientMax += 1; // 4
    } else if (game.currentDay + 1 == 6) {
      game.ingredientMax += 1; // 5
    } else if (game.currentDay + 1 == 8) {
      game.ingredientMax += 1; // 6
    } else if (game.currentDay + 1 == 16) {
      game.ingredientMax += 2; // 8
    } else if (game.currentDay + 1 == 64) {
      game.ingredientMax += 4; // 12
    }
    game.registry.set("IngredientMax", parseInt(game.ingredientMax));

    game.dayText.text = "Day " + game.currentDay + " Complete!";
    game.dayUpdateText.text = "";
    game.dayUpdateSprite = null;
    ////console.log("unlocked customer", unlockedCustomerSuccess);
    if (
      unlockedCustomerSuccess == 1 &&
      game.currentLockedCustomers.length > 0
    ) {
      let newCustomerIndex = Math.floor(
        Math.random() * game.currentLockedCustomers.length
      );
      ////console.log("unlocked customers and locked customers before",game.currentUnlockedCustomers,game.currentLockedCustomers);

      game.currentUnlockedCustomers.push(
        game.currentLockedCustomers[newCustomerIndex]
      );
      game.currentLockedCustomers = game.currentLockedCustomers.filter(
        (item) => item !== game.currentLockedCustomers[newCustomerIndex]
      );
      // //console.log("unlocked customers and locked customers after",game.currentUnlockedCustomers,game.currentLockedCustomers);

      game.newUnlockedCustomer =
        game.currentUnlockedCustomers[game.currentUnlockedCustomers.length - 1];
      game.registry.set("Unlocked_Customers", game.currentUnlockedCustomers);
      if (game.currentLockedCustomers.length <= 0) {
        game.dayUpdateText.text += "You have now unlocked all customers!";
        game.dayUpdateSprite = "penguin_sheet";
      } else {
        game.dayUpdateText.text += "You have unlocked a new customer!";
      }
    }

    game.thisDaysInfo = days_info.actual_days[game.currentDay + 1];
    const lastDayNum = Object.keys(days_info.actual_days)[
      Object.keys(days_info.actual_days).length - 1
    ];
    //console.log("last day info", lastDayNum);
    if (!game.thisDaysInfo) {
      let dayText = "";
      if ((game.currentDay + 1) % 5 == 0) {
        // every fifth day have a secret shopper
        dayText += "There will be a Secret Shopper arriving tomorrow.";
        let alottedPoints = Math.floor(Math.pow(1.1, game.currentDay + 1)); // this is expo progression

        while (alottedPoints > 0) {
          let statToIncrease = Math.floor(Math.random() * 4);
          if (statToIncrease == 0) {
            game.secretshopperPresentationStandard += 1;
          } else if (statToIncrease == 1) {
            game.secretshopperPunctualityStandard += 1;
          } else if (statToIncrease == 2) {
            game.secretshopperPrecisionStandard += 1;
          } else if (statToIncrease == 3) {
            game.secretshopperPleasantryStandard += 1;
          }
          alottedPoints -= 1;
        }
        game.defaultPresentationStandard += 2;
        game.defaultPunctualityStandard += 2;
        game.defaultPrecisionStandard += 2;
        game.defaultPleasantryStandard += 2;
        dayText += ` By end of day HR requests your standards are as follows:\nPresentation: ${game.secretshopperPresentationStandard}% Punctuality: ${game.secretshopperPunctualityStandard}%\nPrecision: ${game.secretshopperPrecisionStandard}%  Pleasantry: ${game.secretshopperPleasantryStandard}%`;

        game.registry.set("CustomerStandards", [
          game.defaultPresentationStandard,
          game.defaultPunctualityStandard,
          game.defaultPrecisionStandard,
          game.defaultPleasantryStandard,
        ]);
        game.registry.set("SecretShopperStandards", [
          game.secretshopperPresentationStandard,
          game.secretshopperPunctualityStandard,
          game.secretshopperPrecisionStandard,
          game.secretshopperPleasantryStandard,
        ]);
      } else if (game.currentDay + 1 > lastDayNum) {
        // has to be after the last recorded day
        game.defaultPresentationStandard =
          game.secretshopperPresentationStandard + 2;
        game.defaultPunctualityStandard =
          game.secretshopperPunctualityStandard + 2;
        game.defaultPrecisionStandard = game.secretshopperPrecisionStandard + 2;
        game.defaultPleasantryStandard =
          game.secretshopperPleasantryStandard + 2;

        game.registry.set("CustomerStandards", [
          game.defaultPresentationStandard,
          game.defaultPunctualityStandard,
          game.defaultPrecisionStandard,
          game.defaultPleasantryStandard,
        ]);
      }
      game.dayUpdateText.text += "\n" + dayText;
      //console.log("adding", game.dayUpdateText.text, "to update text");
    } else {
      //console.log("adding", game.thisDaysInfo.description, "to update text");
      if (game.thisDaysInfo.description) {
        game.dayUpdateText.text += "\n" + game.thisDaysInfo.description;
      }
      if (game.thisDaysInfo.c_standards) {
        game.defaultPresentationStandard = game.thisDaysInfo.c_standards[0];
        game.defaultPunctualityStandard = game.thisDaysInfo.c_standards[1];
        game.defaultPrecisionStandard = game.thisDaysInfo.c_standards[2];
        game.defaultPleasantryStandard = game.thisDaysInfo.c_standards[3];

        game.registry.set("CustomerStandards", [
          game.defaultPresentationStandard,
          game.defaultPunctualityStandard,
          game.defaultPrecisionStandard,
          game.defaultPleasantryStandard,
        ]);
      }
      if (game.thisDaysInfo.s_standards) {
        game.secretshopperPresentationStandard =
          game.thisDaysInfo.s_standards[0];
        game.secretshopperPunctualityStandard =
          game.thisDaysInfo.s_standards[1];
        game.secretshopperPrecisionStandard = game.thisDaysInfo.s_standards[2];
        game.secretshopperPleasantryStandard = game.thisDaysInfo.s_standards[3];
        game.registry.set("SecretShopperStandards", [
          game.secretshopperPresentationStandard,
          game.secretshopperPunctualityStandard,
          game.secretshopperPrecisionStandard,
          game.secretshopperPleasantryStandard,
        ]);
      }

      if (game.thisDaysInfo.events.includes("bouncyball")) {
        game.bouncyballsAllowed = true;
        game.registry.set("BouncyBallsAllowed", true);
      }
    }

    //console.log(game.thisDaysInfo || "nothing");

    if (
      (game.thisDaysInfo &&
        game.thisDaysInfo.events.includes("secretshopper")) ||
      (game.currentDay + 1) % 5 == 0
    ) {
      game.secretShopperDay = true;
    } else {
      game.secretShopperDay = false;
    }
    game.registry.set("SecretShopperDay", game.secretShopperDay)


    if (game.thisDaysInfo && game.thisDaysInfo.events.includes("cheese")) {
      game.registry.set("CheeseAdded", true);
      if (!game.availableIngredients.includes("cheddar")) {
        game.availableIngredients.push("cheddar");
        game.availableIngredients.push("pepperjack");
        game.availableIngredients.push("swisscheese");
      }
    }

    if (game.thisDaysInfo && game.thisDaysInfo.events.includes("rats")) {
      //console.log("setting rats added to true");
      game.registry.set("RatsAdded", true);
    }

    if (game.secretShopperDay === true) {
      game.dayUpdateText.text +=
        "\n Tomorrow you will have " +
        (game.dailyCustomerMax + 1) +
        " visitors.";
    } else {
      game.dayUpdateText.text +=
        "\n Tomorrow you will have " + game.dailyCustomerMax + " visitors.";
    }
  } else {
    // loading previous save

    const unlockedCustomerSuccess = (game.currentDay + 1) % 2;

    game.dayText.text = "Day " + game.currentDay + " Complete!";
    game.dayUpdateText.text = "";
    game.dayUpdateSprite = null;
    ////console.log("unlocked customer", unlockedCustomerSuccess);
    if (
      unlockedCustomerSuccess == 1 &&
      game.currentLockedCustomers.length > 0
    ) {
      if (game.currentLockedCustomers.length <= 0) {
        game.dayUpdateText.text += "You have now unlocked all customers!";
        game.dayUpdateSprite = "penguin_sheet";
      } else {
        game.dayUpdateText.text += "You have unlocked a new customer!";
      }
    }

    game.thisDaysInfo = days_info.actual_days[game.currentDay + 1];
    const lastDayNum = Object.keys(days_info.actual_days)[
      Object.keys(days_info.actual_days).length - 1
    ];
    //console.log("last day info", lastDayNum);
    if (!game.thisDaysInfo) {
      let dayText = "";
      if ((game.currentDay + 1) % 5 == 0) {
        // every fifth day have a secret shopper
        dayText += "There will be a Secret Shopper arriving tomorrow.";
        dayText += ` By end of day HR requests your standards are as follows:\nPresentation: ${game.secretshopperPresentationStandard}% Punctuality: ${game.secretshopperPunctualityStandard}%\nPrecision: ${game.secretshopperPrecisionStandard}%  Pleasantry: ${game.secretshopperPleasantryStandard}%`;
      } else if (game.currentDay + 1 > lastDayNum) {
        // has to be after the last recorded day
      }
      game.dayUpdateText.text += "\n" + dayText;
      //console.log("adding", game.dayUpdateText.text, "to update text");
    } else {
      //console.log("adding", game.thisDaysInfo.description, "to update text");
      if (game.thisDaysInfo.description) {
        game.dayUpdateText.text += "\n" + game.thisDaysInfo.description;
      }
      if (game.thisDaysInfo.c_standards) {
        game.defaultPresentationStandard = game.thisDaysInfo.c_standards[0];
        game.defaultPunctualityStandard = game.thisDaysInfo.c_standards[1];
        game.defaultPrecisionStandard = game.thisDaysInfo.c_standards[2];
        game.defaultPleasantryStandard = game.thisDaysInfo.c_standards[3];
        game.registry.set("CustomerStandards", [
          game.defaultPresentationStandard,
          game.defaultPunctualityStandard,
          game.defaultPrecisionStandard,
          game.defaultPleasantryStandard,
        ]);
      }
      if (game.thisDaysInfo.s_standards) {
        game.secretshopperPresentationStandard =
          game.thisDaysInfo.s_standards[0];
        game.secretshopperPunctualityStandard =
          game.thisDaysInfo.s_standards[1];
        game.secretshopperPrecisionStandard = game.thisDaysInfo.s_standards[2];
        game.secretshopperPleasantryStandard = game.thisDaysInfo.s_standards[3];
        game.registry.set("SecretShopperStandards", [
          game.secretshopperPresentationStandard,
          game.secretshopperPunctualityStandard,
          game.secretshopperPrecisionStandard,
          game.secretshopperPleasantryStandard,
        ]);
      }

      if (game.thisDaysInfo.events.includes("bouncyball")) {
        game.bouncyballsAllowed = true;
      }
    }

    //console.log(game.thisDaysInfo || "nothing");

    if (
      (game.thisDaysInfo &&
        game.thisDaysInfo.events.includes("secretshopper")) ||
      (game.currentDay + 1) % 5 == 0
    ) {
      game.secretShopperDay = true;
    } else {
      game.secretShopperDay = false;
    }

    if (game.thisDaysInfo && game.thisDaysInfo.events.includes("cheese")) {
      game.registry.set("CheeseAdded", true);
      if (!game.availableIngredients.includes("cheddar")) {
        game.availableIngredients.push("cheddar");
      }
      if (!game.availableIngredients.includes("pepperjack")) {
        game.availableIngredients.push("pepperjack");
      }
      if (!game.availableIngredients.includes("swisscheese")) {
        game.availableIngredients.push("swisscheese");
      }
    }

    if (game.thisDaysInfo && game.thisDaysInfo.events.includes("rats")) {
      //console.log("setting rats added to true");
      game.registry.set("RatsAdded", true);
    }

    if (game.secretShopperDay === true) {
      game.dayUpdateText.text +=
        "\n Tomorrow you will have " +
        (game.dailyCustomerMax + 1) +
        " visitors.";
    } else {
      game.dayUpdateText.text +=
        "\n Tomorrow you will have " + game.dailyCustomerMax + " visitors.";
    }
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

const endOfOrderReviewHandler = (game) => {
  game.tweens.add({
    targets: [game.dialog_title, game.text, game.qNoButton, game.qYesButton],
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

  game.time.addEvent({
    delay: 500,
    callback: () => {
      if (game.registry.get("Health") > 0) {
        newCustomer(game);
      } else {
        game.game_over_sfx.play();
        // GAME OVER
        game.dayButton.scale = 0;
        game.dayText.text = "Game Over";
        game.dayUpdateText.text =
          "Ended on Day: " +
          game.registry.get("Day") +
          "\nRemaining Globs: " +
          game.registry.get("Globble") +
          "\nTotal Earnings: " +
          game.registry.get("Total_Globs") +
          "\nPresentation: " +
          game.registry.get("Average_Presentation") +
          "%" +
          "  Punctuality: " +
          game.registry.get("Average_Punctuality") +
          "%" +
          "\nPrecision: " +
          game.registry.get("Average_Precision") +
          "%" +
          "  Pleasantry: " +
          game.registry.get("Average_Pleasantry") +
          "%" +
          "\nDo you wish to restart?";
        game.tweens.add({
          targets: game.restartButton,
          y: 680,
          ease: "Power1",
          duration: 500,
          repeat: 0,
          yoyo: false,
        });
        showDayFrame(game, true, true);
        game.scene.pause("MenuState");
        return;
      }
    },
  });

  game.tweens.add({
    targets: game.npc,
    x: game.npc.x,
    y: game.npc.y + 350 * 2,
    ease: "Power1",
    duration: 1000,
    repeat: 0,
    yoyo: false,
    onComplete: function () { },
  });
};

const orderCompleteHandler = (game) => {
  game.registry.set("SwitchNotAllowed", true);
  game.dailyCustomerCount += 1;
  game.registry.set("DailyCustomerCount", game.dailyCustomerCount);
  const recieved_order = game.registry.get("Burger");
  const expected_order = game.registry.get("Order");

  game.scene.bringToTop("ShakeState");

  game.dialog_frame.y += dialogYMove;
  game.dialog_title.y += dialogYMove;
  game.text.y += dialogYMove;

  game.handsToHideTimedEvent = game.time.addEvent({
    delay: 2500,
    callback: () => {
      game.text.text = "...";

      // this was added because the hands are initially shown in the shakestate and cannot be placed behind the dialogframe so they
      // are created again here to be hidden
      const handsToHide = game.add.image(500, 50, "hands").setOrigin(0.5, 0);
      handsToHide.depth = 3 + uiDepth;

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
        // onComplete: function () {
        //   //console.log("ui shown");
        // },
      });
      game.tweens.add({
        targets: game.dialog_title,
        y: game.dialog_title.y - dialogYMove,
        ease: "Linear",
        duration: 500,
        repeat: 0,
        yoyo: false,
        onComplete: function () { },
      });
      game.tweens.add({
        targets: game.text,
        y: game.text.y - dialogYMove,
        ease: "Linear",
        duration: 500,
        repeat: 0,
        yoyo: false,
        onComplete: function () { },
      });
    },
    callbackScope: game,
    loop: false,
  });
  //console.log("doing review");
  game.orderFinishedTimedEvent = game.time.addEvent({
    delay: 2700,
    callback: () => {
      OrderSubmittedHandler(game, dialogHandler);
      game.time.addEvent({
        delay: 3000 + 5500 - 2700,
        callback: function () {
          if (game.selectedNote === undefined) {
            endOfOrderReviewHandler(game);
          } else {
            game.time.addEvent({
              delay: 200,
              callback: () => {
                questionHandler(
                  game,
                  "note",
                  "The customer hands you a note. Read it?"
                );
              },
              callbackScope: game,
              loop: false,
            });
          }
        },
        callbackScope: game,
        loop: false,
      });
    },
    callbackScope: game,
    loop: false,
  });
};

const restartGameFunction = (game) => {

  game.registry.reset();
  //location.reload();
  game.scene.stop("MenuState");
  game.scene.stop("GameState");
  game.scene.stop("ShakeState");
  game.scene.stop("KitchenState");
  game.scene.stop("SettingsState");
  game.scene.stop("OrderState");
  game.scene.stop("ShopState");
  game.scene.stop("DataState");
  game.scene.stop("LoadState");
  game.scene.stop("GalleryState");
  //console.log(game.anims);
  game.registry.destroy();
  game.events.off();

  // wipe save data
  function wipeData(game) {
    for (const key in secureLocalStorage._localStorageItems) {
      // loops through all keys
      const newKey = key.replace("@secure.", "");
      secureLocalStorage.setItem(newKey, null);
      game.registry.set(newKey, secureLocalStorage.getItem(newKey));
    }
  }

  wipeData(game);
  game.scene.start("BootState");
  //window.location.reload();

}

// restart the game handler after game over
const restartGameHandler = (game, button) => {
  button.on("pointerdown", (pointer, gameObject) => {
    game.click_sfx.play();

    game.cameras.main.fadeOut(300, 0, 0, 0);

    game.time.addEvent({
      delay: 1000,
      callback: () => {
        restartGameFunction(game);
      },
    });
  });
};

// furniture handler
const furnitureHandler = (game, furnitureList,previousSave) => {
  for (const i in furnitureList) {
    const object = furnitureList[i];
    if (object === "chair1" && game.availableChairs.length > 0) {
      let targetIndex = Math.floor(Math.random() * game.availableChairs.length);
      let chair = game.availableChairs[targetIndex];
      chair.visible = true;
      game.addedChairs.push(chair);
      game.availableChairs.splice(targetIndex, 1);
    } else if (object === "table1" && game.availableTables.length > 0) {
      let targetIndex = Math.floor(Math.random() * game.availableTables.length);
      let table = game.availableTables[targetIndex];
      table.visible = true;
      game.addedTables.push(table);
      game.availableTables.splice(targetIndex, 1);
    } else if (object === "slorgplush" && game.availablePlushes.length > 0) {
      let targetIndex = Math.floor(
        Math.random() * game.availablePlushes.length
      );
      let plush = game.availablePlushes[targetIndex];
      plush.visible = true;
      game.addedPlushes.push(plush);
      game.availablePlushes.splice(targetIndex, 1);
    } else if (object === "slorgbanner") {
      game.slorgbanner.visible = true;
    } else if (object.includes("glum")) {
      let xPos = Math.floor(Math.random() * 850) + 100;
      let yPos = Math.floor(Math.random() * 200) + 670;

      const glum = game.add
        .image(xPos, yPos, object)
        .setOrigin(1, 0)
        .setDepth(yPos - 668);
      glum.scale = 1;
    }
    if (!previousSave) {
      const addedFurniture = game.registry.get("Added_Furniture") || [];
      addedFurniture.push(object);
      game.registry.set("Added_Furniture", addedFurniture);
    }
  }
};

const introFrameHandler = (game) => {
  // game.introBeginButton.on("pointerover",(pointer,gameObject)=>{
  //   game.tweens.add({
  //     targets: [game.introBeginButton],
  //     scale: .21,
  //   ease: "Power1",
  //     duration: 100,
  //     repeat: 0,
  //     yoyo: false
  //   })
  // })
  // game.introBeginButton.on("pointerout",(pointer,gameObject)=>{
  //   game.tweens.add({
  //     targets: [game.introBeginButton],
  //     scale: .2,
  //   ease: "Power1",
  //     duration: 100,
  //     repeat: 0,
  //     yoyo: false
  //   })
  // })
  // introFrame creation
  game.introFrame = game.add
    .image(500, 500, "order_background")
    .setOrigin(0.5, 0.5)
    .setDepth(9 + uiDepth)
    .setInteractive();
  game.introTitle = game.add
    .text(500, 300, "First day on the job.", {
      fontFamily: "unifrakturcook",
      fontSize: "70px",
      fill: "black",
      wordWrap: { width: 600 },
      align: "center",
    })
    .setOrigin(0.5, 0.5)
    .setDepth(10 + uiDepth);
  game.introDescription = game.add
    .text(
      500,
      550,
      "You got a job at a nearby burger place. Your goal is to appease the customers. Precision, Punctuality and Presentation matter. Pleasantry will matter later. Spend tips you make in the shop. You can make 5 mistakes before they fire you. The rest is up to you.\n\nGood luck.",
      {
        fontFamily: "font1",
        fontSize: "30px",
        fill: "black",
        wordWrap: { width: 600 },
        align: "center",
      }
    )
    .setOrigin(0.5, 0.5)
    .setDepth(10 + uiDepth);
  game.introBeginButton = game.add
    .image(500, 700, "begin_button")
    .setOrigin(0.5, 0.5)
    .setDepth(10 + uiDepth)
    .setInteractive()
    .setTint(0x2dfa67);
  game.introBeginButton.visible = false;
  game.introBeginButton.scale = 0.2;

  game.time.addEvent({
    delay: 1000,
    callback: () => {
      game.introFrame.on("pointerdown", (pointer, gameObject) => {
        game.food_click_sfx.play();
        game.tweens.add({
          targets: [game.introBeginButton],
          scale: 0.15,
          ease: "Power1",
          duration: 100,
          repeat: 0,
          yoyo: true,
          onComplete: function () {
            game.tweens.add({
              targets: [game.introFrame],
              y: game.introFrame.y - 1000,
              ease: "Power1",
              duration: 200,
              repeat: 0,
              yoyo: false,
            });
            game.tweens.add({
              targets: [game.introTitle],
              y: game.introTitle.y - 1000,
              ease: "Power1",
              duration: 200,
              repeat: 0,
              yoyo: false,
            });
            game.tweens.add({
              targets: [game.introDescription],
              y: game.introDescription.y - 1000,
              ease: "Power1",
              duration: 200,
              repeat: 0,
              yoyo: false,
            });
            game.tweens.add({
              targets: [game.introBeginButton],
              y: game.introBeginButton.y - 1000,
              ease: "Power1",
              duration: 200,
              repeat: 0,
              yoyo: false,
              onComplete: function () {
                //weekStartHandler(game);
              },
            });

            newCustomer(game, true);
          },
        });
      });
    },
    callbackScope: game,
    loop: false,
  });
};


const showLoadFrame = (game,show) => {
  if (show === true) {
    game.loadFrame.visible = true;
    game.loadTitle.visible = true;
    game.loadDescription.visible = true;
    game.loadYesButton.visible = true;
    game.loadNoButton.visible = true;

    game.tweens.add({
      targets: [game.loadFrame,game.loadDescription],
      y: 500,
      ease: "Power1",
      duration: 200,
      repeat: 0,
      yoyo: false,
      onComplete: function () {
      },
    });

    game.tweens.add({
      targets: [game.loadYesButton,game.loadNoButton],
      y: 650,
      ease: "Power1",
      duration: 200,
      repeat: 0,
      yoyo: false,
      onComplete: function () {
      },
    });

    game.tweens.add({
      targets: [game.loadTitle],
      y: 350,
      ease: "Power1",
      duration: 200,
      repeat: 0,
      yoyo: false,
      onComplete: function () {
      },
    });

  } else {
    game.tweens.add({
      targets: [game.loadFrame,game.loadDescription],
      y: 500-1000,
      ease: "Power1",
      duration: 200,
      repeat: 0,
      yoyo: false,
      onComplete: function () {
      },
    });

    game.tweens.add({
      targets: [game.loadYesButton,game.loadNoButton],
      y: 650-1000,
      ease: "Power1",
      duration: 200,
      repeat: 0,
      yoyo: false,
      onComplete: function () {
      },
    });

    game.tweens.add({
      targets: [game.loadTitle],
      y: 350-1000,
      ease: "Power1",
      duration: 200,
      repeat: 0,
      yoyo: false,
      onComplete: function () {
      },
    });
    
  }
}

const loadGameButtonsHandler = (game) => {
  game.loadYesButton.on("pointerdown", (pointer, gameObject) => {
    game.click_sfx.play();

    game.tweens.add({
      targets: game.loadYesButton,
      scale: 0.15,
      rotation: 0,
      ease: "Linear",
      duration: 100,
      repeat: 0,
      yoyo: true,
      onComplete: function () {
        showLoadFrame(game, false);

      //console.log("--LOADED SAVE HANDLING--");
      // handle saved games
      //console.log("not at start skipping intro frame");
      //console.log("todays customers", game.todays_customers);

      if (game.registry.get("Added_Furniture") && game.registry.get("Added_Furniture").length > 0) {
        let addedFurniture = game.registry.get("Added_Furniture");
        const furnitureList = game.registry.get("FurnitureShopEvent") || [];

        // furniture shop event is causing problems with glumdevils loading in
        if ((Array.isArray(furnitureList) && furnitureList.length>0)  && game.registry.get("FurnitureShopEvent") !== undefined) {
          addedFurniture.push(...game.registry.get("FurnitureShopEvent"));
          //console.log("added furn shop event to prev loaded furniture")
          game.registry.set("FurnitureShopEvent", []);
          game.registry.set("Added_Furniture", addedFurniture);
        }
        furnitureHandler(game, addedFurniture,true);
      }

      if (game.registry.get("RatsAdded") === true) {
        let totalRats = 0;
        totalRats = game.registry.get("RatsToAdd") || 0;
        totalRats += game.registry.get("KitchenRatCount") || 0;
        game.registry.set("KitchenRatCount", 0);
        game.registry.set("RatsToAdd", totalRats);
      }
      // bouncyballs in kitchen from previous save
      // already handled in load state
      // if (game.registry.get("BouncyBallsInKitchen") !== undefined && game.registry.get("BouncyBallsInKitchen").length > 0) {
      //   let ingredientToAddList = game.registry.get("NewKitchenItemEvent") || [];
      //   const bouncyballsInKitchen = game.registry.get("BouncyBallsInKitchen");
      //   for (const i in bouncyballsInKitchen) {
      //     ingredientToAddList.push(bouncyballsInKitchen[i]);
      //   }
      //   game.registry.set("NewKitchenItemEvent", ingredientToAddList);
      // }
      if (game.todays_customers.length == 0) {
        game.todays_customers = game.registry.get("Todays_Customers") || [];
        //console.log(
        
      }
      if (game.registry.get("SecretShopperDay") && game.registry.get("SecretShopperDay") == true) {
        game.secretShopperDay = true;
      }
      if (
        game.registry.get("DayOver") == undefined ||
        game.registry.get("DayOver") == false
      ) {
        //console.log("DAY OVER IS FALSE");
        game.registry.set("DayOver", false);

        //console.log("CALLING NEW CUSTOMER FROM LOAD");
        //console.log("todays customers", game.todays_customers);
        //console.log("daily customer count", game.dailyCustomerCount);
        //console.log("daily customer max", game.dailyCustomerMax);
        newCustomer(game, true, true); // continuing the day will need to add handling for secret shopper other assigned customers
      } else if (game.registry.get("DayOver") == true) {
        //console.log("END OF DAY SHOWDAYFRAME");
        game.registry.set("SwitchNotAllowed", false);
        dayEndHandler(game, false, true);
      }
      game.registry.set("Paused", false);
      game.registry.set("Day", game.currentDay);
      },
    });
  })

  game.loadNoButton.on("pointerdown", (pointer, gameObject) => {
    game.click_sfx.play();

    game.tweens.add({
      targets: game.loadNoButton,
      scale: 0.15,
      rotation: 0,
      ease: "Linear",
      duration: 100,
      repeat: 0,
      yoyo: true,
      onComplete: function () {
        restartGameFunction(game);
      },
    });
  })
}

var GameState = {
  preload() { },

  create() {
    // this.bgMusic = this.sound.add("cluttered_ambience2");
    // this.bgMusic.setLoop(true);
    // this.bgMusic.volume = 0.1;
    // this.bgMusic.play()

    this.talk_sfx = this.sound.add("voice_line1").setVolume(0.2);
    this.happy_sfx = this.sound.add("voice_line2");
    this.angry_sfx = this.sound.add("voice_line3");
    this.eat_sfx = this.sound.add("eat_sfx1");
    this.spooky_sfx1 = this.sound.add("spooky_sfx1");
    this.spooky_sfx2 = this.sound.add("spooky_sfx2");
    this.spooky_sfx3 = this.sound.add("spooky_sfx3");
    this.success_sfx1 = this.sound.add("success_sfx1");
    this.good_review_sfx = this.sound.add("success_sfx2").setVolume(0.8);
    this.click_sfx = this.sound.add("submit_click");
    this.food_click_sfx = this.sound.add("food_click");
    this.game_over_sfx = this.sound.add("game_over_sfx");
    this.door_open_sfx = this.sound.add("door_open").setVolume(1);
    this.door_rattle_sfx = this.sound.add("door_rattling").setVolume(0.2);
    this.page_flip_sfx = this.sound.add("page_flip_sfx").setVolume(0.8);

    // animation creation
    if (!this.anims.get("clap")) {
      this.anims.create({
        key: "clap",
        frames: this.anims.generateFrameNumbers("penguin_sheet", {
          frames: [0, 1, 2, 3, 4, 5],
        }),
        frameRate: 14,
        repeat: -1,
      });
    }
    if (!this.anims.get("glob_talk")) {
      this.anims.create({
        key: "glob_talk",
        frames: this.anims.generateFrameNumbers("glob_man_sheet", {
          frames: [1, 0],
        }),
        frameRate: 8,
        repeat: 2,
      });
    }

    if (!this.anims.get("glob_happy")) {
      this.anims.create({
        key: "glob_happy",
        frames: this.anims.generateFrameNumbers("glob_man_sheet", {
          frames: [2],
        }),
        frameRate: 1,
        repeat: 0,
      });
    }

    if (!this.anims.get("glob_angry")) {
      this.anims.create({
        key: "glob_angry",
        frames: this.anims.generateFrameNumbers("glob_man_sheet", {
          frames: [3],
        }),
        frameRate: 1,
        repeat: 0,
      });
    }

    // base creation

    this.add.image(0, 0, "sky").setOrigin(0, 0).setDepth(0);
    this.add.image(0, 0, "room").setOrigin(0, 0);
    this.add.image(0, 0, "windows").setOrigin(0, 0);
    this.add.image(0, 0, "doorFrame").setOrigin(0, 0);
    this.door_hinge = this.add
      .image(500, 500, "doorHinge")
      .setOrigin(0.5, 0.5)
      .setDepth(2);
    this.add.image(0, 0, "counter").setOrigin(0, 0).setDepth(3);

    // dialogFrame creation
    this.dialog_frame = this.add
      .image(0, 500, "dialog_frame")
      .setOrigin(0, 0)
      .setDepth(4 + uiDepth);
    this.dialog_title = this.add
      .text(200, 750 + dialogYMove, "", {
        fontFamily: "font1",
        fontSize: "50px",
        fill: "black",
      })
      .setOrigin(0, 0)
      .setDepth(4 + uiDepth);

    // dayFrame creation
    this.dayFrame = this.add
      .image(500, -1000, "notice_background")
      .setOrigin(0.5, 0.5)
      .setDepth(7 + uiDepth);
    this.dayFrame.Scale = 0.8;
    this.dayText = this.add
      .text(500, -1100, "Day 1 Complete!", {
        fontFamily: "unifrakturcook",
        fontSize: "70px",
        fill: "#FF7FC5",
        wordWrap: { width: 600 },
        align: "center",
      })
      .setOrigin(0.5, 0)
      .setDepth(8 + uiDepth);
    this.dayUpdateText = this.add
      .text(500, -900, "", {
        fontFamily: "font1",
        fontSize: "30px",
        fill: "#FF0090",
        wordWrap: { width: 650 },
        align: "center",
      })
      .setOrigin(0.5, 0)
      .setDepth(8 + uiDepth);
    this.dayButton = this.add
      .image(500, -950, "day_button")
      .setOrigin(0.5, 0.5)
      .setDepth(8 + uiDepth)
      .setInteractive();
    dayButtonHandler(this, this.dayButton);
    this.dayButton.scale = 0.2;

    this.restartButton = this.add
      .image(500, -500, "yes_button")
      .setOrigin(0.5, 0.5)
      .setDepth(8 + uiDepth)
      .setInteractive();
    this.restartButton.scale = 0.2;
    restartGameHandler(this, this.restartButton);

    this.qYesButton = this.add
      .image(320, 920, "yes_button")
      .setOrigin(0.5, 0.5)
      .setDepth(8 + uiDepth)
      .setInteractive();
    this.qYesButton.scale = 0.2;
    this.qYesButton.visible = false;
    this.qNoButton = this.add
      .image(680, 920, "no2_button")
      .setOrigin(0.5, 0.5)
      .setDepth(8 + uiDepth)
      .setInteractive();
    this.qNoButton.scale = 0.2;
    this.qNoButton.visible = false;

    questionButtonHandler(this);

    // furniture creation
    const chair1 = this.add
      .image(10, 457, "chair1")
      .setOrigin(0, 0)
      .setDepth(2);
    chair1.scale = 0.5;
    chair1.visible = false;
    const chair2 = this.add
      .image(220, 458, "chair1")
      .setOrigin(0, 0)
      .setDepth(2);
    chair2.scale = 0.5;
    chair2.visible = false;
    chair2.flipX = true;
    const chair3 = this.add
      .image(1000 - 220, 465, "chair1")
      .setOrigin(1, 0)
      .setDepth(0);
    chair3.scale = 0.5;
    chair3.visible = false;
    const chair4 = this.add
      .image(1003, 467, "chair1")
      .setOrigin(1, 0)
      .setDepth(2);
    chair4.scale = 0.5;
    chair4.visible = false;
    chair4.flipX = true;
    this.availableChairs = [chair1, chair2, chair3, chair4];
    this.addedChairs = [];
    const table1 = this.add
      .image(90, 511, "table1")
      .setOrigin(0, 0)
      .setDepth(2);
    table1.scale = 0.4;
    table1.visible = false;
    const table2 = this.add
      .image(935, 510, "table1")
      .setOrigin(1, 0)
      .setDepth(2);
    table2.scale = 0.4;
    table2.visible = false;
    this.availableTables = [table1, table2];
    this.addedTables = [];
    const slorgbanner = this.add
      .image(490, 150, "slorgbanner")
      .setOrigin(0.5, 0.5)
      .setDepth(1);
    slorgbanner.scale = 0.8;
    slorgbanner.visible = false;
    this.slorgbanner = slorgbanner;
    const slorgplush = this.add
      .image(1062, 526, "slorgplush")
      .setOrigin(1, 0)
      .setDepth(2);
    slorgplush.scale = 0.45;
    slorgplush.visible = false;
    this.availablePlushes = [slorgplush];
    this.addedPlushes = [];

    // previous save frame setup
    const loadFrame = this.add.image(500, 500-1000, "order_background").setOrigin(0.5, 0.5).setDepth(9 + uiDepth);
    loadFrame.scale = 1.2;
    loadFrame.setTint(0x6a329f);
    const loadTitle = this.add.text(500, 350-1000, "Ready to Earn?", { fontFamily: "unifrakturcook", fontSize: "80px", fill: "#fdff58", wordWrap: { width: 600 }, align: "center" }).setOrigin(0.5, 0.5).setDepth(10 + uiDepth);
    const loadDescription = this.add.text(500, 500-1000, `Return to your previous save with 'indeed' or start over by pressing 'cancel'.`, { fontFamily: "unifrakturcook", fontSize: "50px", fill: "#fdff58", wordWrap: { width: 600 }, align: "center" }).setOrigin(0.5, 0.5).setDepth(10 + uiDepth);

    const loadYesButton = this.add.image(400, 650-1000, "yes_button").setOrigin(0.5, 0.5).setDepth(10 + uiDepth).setInteractive();
    loadYesButton.scale = .2;
    const loadNoButton = this.add.image(600, 650-1000, "no_button").setOrigin(0.5, 0.5).setDepth(10 + uiDepth).setInteractive();
    loadNoButton.scale = .2;

    this.loadYesButton = loadYesButton;
    this.loadNoButton = loadNoButton;
    this.loadFrame = loadFrame;
    this.loadTitle = loadTitle;
    this.loadDescription = loadDescription;

    loadGameButtonsHandler(this);

    setupNoteFrame(this);

    // variable setup
    this.dailyCustomerMax = this.registry.get("DailyCustomerMax") || 2;
    this.dayUpdateSprite = null;
    this.dayUpdateSprite2 = null;
    this.ingredientMax = parseInt(this.registry.get("IngredientMax")) || 2;
    this.currentDay = parseInt(this.registry.get("Day")) || 1;
    //console.log("current day set to", this.currentDay);
    this.dailyCustomerCount = this.registry.get("DailyCustomerCount") || 0;
    this.newUnlockedCustomer = null;

    this.availableIngredients = ingredients_dictionary.ingredients;
    this.currentUnlockedCustomers = this.registry.get("Unlocked_Customers") || [
      0, 1,
    ];
    this.currentLockedCustomers = [];
    for (let i = 0; i < npc_dictionary.npcs.length; i++) {
      if (!this.currentUnlockedCustomers.includes(i)) {
        this.currentLockedCustomers.push(i);
      }
    }
    //console.log(
    this.todays_customers = this.registry.get("Todays_Customers") || [];

    if (this.todays_customers.length == 0) { // no previous save
      // first day set up
      const unlockedMaxRatio = Math.floor(
        this.dailyCustomerMax / this.currentUnlockedCustomers.length + 0.5
      );
      ////console.log("unlocked max ratio", unlockedMaxRatio);
      for (let i = 0; i < unlockedMaxRatio; i++) {
        this.todays_customers = this.todays_customers.concat(
          this.currentUnlockedCustomers
        );
      }
      shuffleArray(this.todays_customers);
      this.todays_customers = this.todays_customers.slice(
        0,
        this.dailyCustomerMax
      );
      this.registry.set("Todays_Customers", this.todays_customers);
      //console.log("registry TC set to", this.registry.get("Todays_Customers"));
      this.registry.set("DailyCustomerCount", this.dailyCustomerCount);
    }

    if (this.registry.get("CheeseAdded") === true) { // if cheese event happened previously
      this.availableIngredients.push("cheddar");
      this.availableIngredients.push("pepperjack");
      this.availableIngredients.push("swisscheese");
    }
    this.current_customer_index = 0;

    const loadedStandards = this.registry.get("CustomerStandards");

    const loadedSecretStandards = this.registry.get("SecretShopperStandards");

    if (loadedStandards && loadedStandards.length == 4) {
      this.defaultPresentationStandard = loadedStandards[0];
      this.defaultPunctualityStandard = loadedStandards[1];
      this.defaultPrecisionStandard = loadedStandards[2];
      this.defaultPleasantryStandard = loadedStandards[3];
    } else {
      this.defaultPresentationStandard = 70;
      this.defaultPunctualityStandard = 70;
      this.defaultPrecisionStandard = 70;
      this.defaultPleasantryStandard = 0;
      this.registry.set("CustomerStandards", [
        this.defaultPresentationStandard,
        this.defaultPunctualityStandard,
        this.defaultPrecisionStandard,
        this.defaultPleasantryStandard,
      ]);
    }

    if (loadedSecretStandards && loadedSecretStandards.length == 4) {
      this.secretshopperPresentationStandard = loadedSecretStandards[0];
      this.secretshopperPunctualityStandard = loadedSecretStandards[1];
      this.secretshopperPrecisionStandard = loadedSecretStandards[2];
      this.secretshopperPleasantryStandard = loadedSecretStandards[3];
    }

    this.secretShopperDay = false;
    this.bouncyballsAllowed = this.registry.get("BouncyBallsAllowed") || false;
    // this.secretShopperDay = true
    this.thisDaysInfo = days_info.actual_days[this.currentDay];

    //console.log(this.thisDaysInfo);
    //console.log(days_info, days_info.actual_days);

    let formattedNotes = notes_dictionary;
    let untitledCount = 0;
    for (var npc in formattedNotes) {
      const npcNotes = formattedNotes[npc].notes;
      if (npcNotes) {
        for (let i = 0; i < npcNotes.length; i++) {
          if (npcNotes[i].title == "Untitled") {
            untitledCount += 1;
            formattedNotes[npc].notes[i].title = `Untitled #${untitledCount}`;
          }
        }
      }
    }

    this.formattedNotes = formattedNotes;
    if (this.thisDaysInfo) {
      if (this.thisDaysInfo.c_standards) {
        this.defaultPresentationStandard = this.thisDaysInfo.c_standards[0];
        this.defaultPunctualityStandard = this.thisDaysInfo.c_standards[1];
        this.defaultPrecisionStandard = this.thisDaysInfo.c_standards[2];
        this.defaultPleasantryStandard = this.thisDaysInfo.c_standards[3];
      }
      if (this.thisDaysInfo.s_standards) {
        this.secretshopperPresentationStandard =
          this.thisDaysInfo.s_standards[0];
        this.secretshopperPunctualityStandard =
          this.thisDaysInfo.s_standards[1];
        this.secretshopperPrecisionStandard = this.thisDaysInfo.s_standards[2];
        this.secretshopperPleasantryStandard = this.thisDaysInfo.s_standards[3];
      }
    }

    this.registry.set("SwitchNotAllowed", true);

    if (this.registry.get("Total_Orders") > 0) {


      this.registry.set("Paused", true);
      showLoadFrame(this, true);
    } else {
      //console.log("orders was norders");
      introFrameHandler(this);
    }
    //console.log("Setting Day reg to", this.currentDay);
    this.registry.set("Day", this.currentDay);
    //this.registry.set("Health", 5);

    this.keyX = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
  },

  update() {
    if (Phaser.Input.Keyboard.JustDown(this.keyX)) {
      if (
        this.handsToHideTimedEvent &&
        !this.handsToHideTimedEvent.hasDispatched
      ) {
        this.orderFinishedTimedEvent.remove();
        this.handsToHideTimedEvent.remove();
        this.dialog_frame.y = this.dialog_frame.y - dialogYMove;
        (this.dialog_title.y = this.dialog_title.y - dialogYMove),
          //console.log("doing review");
        OrderSubmittedHandler(this, dialogHandler, "skipEverything");
        this.time.addEvent({
          delay: 3000,
          callback: function () {
            if (this.selectedNote === undefined) {
              endOfOrderReviewHandler(this);
            } else {
              this.time.addEvent({
                delay: 200,
                callback: () => {
                  questionHandler(
                    this,
                    "note",
                    "The customer hands you a note. Read it?"
                  );
                },
                callbackScope: this,
                loop: false,
              });
            }
          },
          callbackScope: this,
          loop: false,
        });
      }
    }
    if (this.registry.get("Order_Complete") == true) {
      this.registry.set("Order_Complete", false);
      orderCompleteHandler(this);
    }
    const furnitureList = this.registry.get("FurnitureShopEvent") || [];
    if (this.registry.get("Paused") !== true && (Array.isArray(furnitureList) && furnitureList.length > 0) && this.registry.get("FurnitureShopEvent") !== undefined) {
      //console.log("furniture handler event")
      furnitureHandler(this, this.registry.get("FurnitureShopEvent"));
      this.registry.set("FurnitureShopEvent", []);

    }
  },
};

export default GameState;
