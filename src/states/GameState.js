import dialog_dictionary from "../dictonaries/dialog.json";
import ingredients_dictionary from "../dictonaries/ingredients.json";
import npc_dictionary from "../dictonaries/npcs.json";
import OrderSubmittedHandler from "../modules/OrderSubmittedHandler";
import weeks_info from "../dictonaries/weeks"

const dialogYMove = 500;

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
      if (game.selectedNote !== undefined) {
      } else {
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
  text.depth = 4;
  if (game.text !== undefined) {
    game.text.destroy();
  }
  game.text = text;
  game.qNoButton.input.enabled = true
  game.qYesButton.input.enabled = true
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
    const note_info = game.selectedNote;
    game.selectedNote = undefined;
    game.noteInfoTitle.text = note_info.title;
    if (note_info.title.includes("Untitled")) {
      game.noteInfoTitle.text = ""
    }
    //game.modInfoImage.setTexture(mod_info.key);
    game.noteAuthorText.text = "By: " + game.npcName;
    if (note_info.title.includes("Untitled")) {
      game.noteAuthorText.text = ""
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
    .setDepth(6)
    .setInteractive();
  game.noteInfoTitle = game.add
    .text(500, 280, "Name", {
      fontFamily: "font1",
      fontSize: "50px",
      fill: "black",
    })
    .setOrigin(0.5, 0.5)
    .setDepth(7);
  game.noteAuthorText = game.add
    .text(500, 330, "notes", {
      fontFamily: "font1",
      fontSize: "20px",
      fill: "black",
      wordWrap: { width: 500 },
      align: "center",
    })
    .setOrigin(0.5, 0.5)
    .setDepth(7);
  game.noteInfoText = game.add
    .text(500, 510, "notes", {
      fontFamily: "font1",
      lineSpacing: 20,
      fontSize: "35px",
      fill: "black",
      wordWrap: { width: 500 },
      align: "center",
    })
    .setOrigin(0.5, 0.5)
    .setDepth(7);
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
    game.qNoButton.input.enabled = false
    game.qYesButton.input.enabled = false
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
    game.qNoButton.input.enabled = false
    game.qYesButton.input.enabled = false
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

const customerHandler = (customer, game) => {
  console.log("new customer", customer);
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
        const number_of_ingredients =
          Math.floor(Math.random() * game.ingredientMax) + 1;

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
        let bouncyStyled = false;
        if (game.bouncyballsAllowed) {
          let chance = Math.floor(Math.random() * 4); // 1/4 chance
          if (chance === 0) {
            bouncyStyled = true;
            order_list += " and a bouncy ball";
            game.order.push("bouncy ball");
          }
        }
        game.registry.set("Order_Text", order_list);
        game.registry.set("Order", game.order);
        //console.log(order_list);
        let text =
          dialog_dictionary.greetings[g_index] +
          " " +
          dialog_dictionary.ordering[o_index] +
          " the burger with" +
          order_list +
          ".";
        if (game.secretShopperCustomer) {
          text = "I am customer. Give me the burger with" + order_list + "."
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
        if ((npc_dictionary.npcs[game.current_customer_index].sprite_sheet) && (!game.secretShopperCustomer)) {
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

const showDayFrame = (game, show, islong) => {
  let targetUpdateTextY = 500;
  if (islong) {
    targetUpdateTextY = 550;
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
      y: 365,
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
      y: 600,
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

const newCustomer = (game, just_launched) => {
  if (game.dailyCustomerCount == (game.dailyCustomerMax) && game.secretShopperWeek == true && game.dayOfWeek === "Friday") {
    game.secretShopperCustomer = true;
    console.log("secret shopper is now.");
  } else {
    game.secretShopperCustomer = false;
  }
  if ((game.dailyCustomerCount >= game.dailyCustomerMax && (!game.secretShopperWeek || (game.secretShopperWeek && game.dayOfWeek !== "Friday"))) || game.dailyCustomerCount >= (game.dailyCustomerMax + 1)) {
    console.log("day is over");
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

        console.log("daily customer count", game.dailyCustomerCount);
        console.log("todays customers", game.todays_customers);
        let customer = npc_dictionary.npcs[game.current_customer_index];
        if (game.secretShopperCustomer) {
          console.log("setting customer to secret shopper");
          customer = npc_dictionary.secretshoppers[game.current_customer_index]
          console.log("secret shopper customer is", customer);
        }
        console.log("customer index", game.current_customer_index);
        customerHandler(customer, game);

        game.door_open_sfx.play();
      },
    });
  }
  game.door_rattle_sfx.play();
  shakeDoor();
};

const dayStartHandler = (game) => {
  console.log("starting new day");
  game.registry.set("DayOver", false);
  game.currentDay = parseInt(game.currentDay) + 1;
  game.registry.set("Day", game.currentDay);
  game.dailyCustomerCount = 0;
  game.todays_customers = [];
  const unlockedMaxRatio = Math.floor(
    game.dailyCustomerMax / game.currentUnlockedCustomers.length + 0.5
  );
  let dayNum = game.currentDay - (game.currentWeek * 5);
  if (dayNum % 5 == 0) {
    game.dayOfWeek = "Friday";
  } else if (dayNum % 4 == 0) {
    game.dayOfWeek = "Thursday"
  } else if (dayNum % 3 == 0) {
    game.dayOfWeek = "Wednesday"
  } else if (dayNum % 2 == 0) {
    game.dayOfWeek = "Tuesday"
  } else {
    game.dayOfWeek = "Monday"
  }
  for (let i = 0; i < unlockedMaxRatio; i++) {
    game.todays_customers = game.todays_customers.concat(
      game.currentUnlockedCustomers
    );
    //console.log("adding todays customers", game.todays_customers);
  }
  shuffleArray(game.todays_customers);
  //console.log("shuffled todays customers", game.todays_customers);

  game.todays_customers = game.todays_customers.slice(0, game.dailyCustomerMax);
  if (game.newUnlockedCustomer !== null) {
    console.log("there is a new customer today", game.newUnlockedCustomer);
    if (!game.todays_customers.includes(game.newUnlockedCustomer)) {
      game.todays_customers[0] = game.newUnlockedCustomer;
      console.log("customer doesnt exist so we're adding it in");
    }
    game.newUnlockedCustomer = null;
  }

  if (game.secretShopperWeek == true && game.dayOfWeek === "Friday") { // day is friday secret shopper yes
    let randomShopper = Math.floor(Math.random() * npc_dictionary.secretshoppers.length);
    game.todays_customers.push(randomShopper) // add secret shopper character
  }
  console.log("todays customers", game.todays_customers);

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

const weekStartHandler = (game) => {

  //game.currentWeek=1

  game.weekTitle.text = "Welcome to Week " + (game.currentWeek + 1)
  game.thisWeeksInfo = weeks_info.actual_weeks[game.currentWeek]
  if (!game.thisWeeksInfo) {
    let weekText = ""
    weekText+=  ("You've made it to Week " + (game.currentWeek + 1) + ".")
    if (game.currentWeek % 2 == 0) {
      weekText += " There will be a Secret Shopper arriving this Friday."
      let alottedPoints = 5*Math.floor(game.currentWeek/2);

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
      game.defaultPresentationStandard += 2
      game.defaultPunctualityStandard += 2
      game.defaultPrecisionStandard += 2
      game.defaultPleasantryStandard += 2
      weekText += ` By end of week HR requests your standards are as follows:\n\nPresentation: ${game.secretshopperPresentationStandard}%\nPunctuality: ${game.secretshopperPunctualityStandard}%\nPrecision: ${game.secretshopperPrecisionStandard}%\nPleasantry: ${game.secretshopperPleasantryStandard}%`
      game.weekDescription.text = weekText
    } else {
      
      game.defaultPresentationStandard = (game.secretshopperPresentationStandard + 2)
      game.defaultPunctualityStandard = (game.secretshopperPunctualityStandard + 2)
      game.defaultPrecisionStandard = (game.secretshopperPrecisionStandard + 2)
      game.defaultPleasantryStandard = (game.secretshopperPleasantryStandard + 2)
    }
  } else {
    game.weekDescription.text = game.thisWeeksInfo.description

    if (game.thisWeeksInfo.c_standards) {
      game.defaultPresentationStandard = game.thisWeeksInfo.c_standards[0];
      game.defaultPunctualityStandard = game.thisWeeksInfo.c_standards[1];
      game.defaultPrecisionStandard = game.thisWeeksInfo.c_standards[2];
      game.defaultPleasantryStandard = game.thisWeeksInfo.c_standards[3];
    }
    if (game.thisWeeksInfo.s_standards) {
      game.secretshopperPresentationStandard = game.thisWeeksInfo.s_standards[0];
      game.secretshopperPunctualityStandard = game.thisWeeksInfo.s_standards[1];
      game.secretshopperPrecisionStandard = game.thisWeeksInfo.s_standards[2];
      game.secretshopperPleasantryStandard = game.thisWeeksInfo.s_standards[3];
    }
  }

  if (game.thisWeeksInfo.events.includes("bouncyball")) {
    game.bouncyballsAllowed = true;
  }

  if (game.thisWeeksInfo.events.includes("secretshopper") || (game.currentWeek % 2 == 0 && game.currentWeek >= 4)) {
    game.secretShopperWeek = true;
  } else {
    game.secretShopperWeek = false;
  }

  showWeekFrameHandler(game)
}

const dayEndHandler = (game, just_launched) => {
  game.registry.set("DayOver", true);
  game.dailyCustomerCount = 0;

  if (game.dayOfWeek === "Friday") {
    game.currentWeek += 1;
    game.newWeek = true;
  }
  // if (just_launched) {
  //   game.dayText.text = "Day " + game.currentDay + " (" + game.dayOfWeek + ")" + " Complete!";
  //   game.dayUpdateText.text = "";
  //   game.dayUpdateSprite = null;
  //   showDayFrame(game, true);
  //   return;
  // }
  const moreCustomersSuccess = (game.currentDay + 1) % 4;
  if (moreCustomersSuccess == 0) {
    const moreCustomers = Math.floor(Math.random() * 2) + 1;
    game.dailyCustomerMax += moreCustomers;
    game.registry.set("DailyCustomerMax", game.dailyCustomerMax);
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

  game.dayText.text = game.dayOfWeek + " (" + "Day " + game.currentDay + ")" + " Complete!";
  game.dayUpdateText.text = "";
  game.dayUpdateSprite = null;
  //console.log("unlocked customer", unlockedCustomerSuccess);
  if (unlockedCustomerSuccess == 1 && game.currentLockedCustomers.length > 0) {
    let newCustomerIndex = Math.floor(
      Math.random() * game.currentLockedCustomers.length
    );
    //console.log("unlocked customers and locked customers before",game.currentUnlockedCustomers,game.currentLockedCustomers);

    game.currentUnlockedCustomers.push(
      game.currentLockedCustomers[newCustomerIndex]
    );
    game.currentLockedCustomers = game.currentLockedCustomers.filter(
      (item) => item !== game.currentLockedCustomers[newCustomerIndex]
    );
    // console.log("unlocked customers and locked customers after",game.currentUnlockedCustomers,game.currentLockedCustomers);

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

  if (game.secretShopperWeek === true && game.dayOfWeek === "Thursday") {
    game.dayUpdateText.text += "\n Tomorrow you will have " + (game.dailyCustomerMax + 1) + " visitors.\n Tomorrow is the day."

  } else {
    game.dayUpdateText.text +=
      "\n Tomorrow you will have " + game.dailyCustomerMax + " visitors.";
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
        if (game.newWeek == true) {
          weekStartHandler(game);
        } else {
          dayStartHandler(game);
        }
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
        game.game_over_sfx.play();
        // GAME OVER
        game.dayButton.scale = 0;
        game.dayText.text = "Game Over";
        game.dayUpdateText.text =
          "Ended on Day: " +
          game.registry.get("Day") +
          "\nRemaining Globs: " +
          game.registry.get("Globs") +
          "\nTotal Earnings: " +
          game.registry.get("Total_Globs") +
          "\nPresentation: " +
          game.registry.get("Average_Presentation") +
          "/100" +
          "  Punctuality: " +
          game.registry.get("Average_Punctuality") +
          "/100" +
          "\nPrecision: " +
          game.registry.get("Average_Precision") +
          "/100" +
          "  Pleasantry: " +
          game.registry.get("Average_Pleasantry") +
          "/100" +
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
      newCustomer(game);
    },
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

  game.time.addEvent({
    delay: 2500,
    callback: () => {
      game.text.text = "...";

      // this was added because the hands are initially shown in the shakestate and cannot be placed behind the dialogframe so they
      // are created again here to be hidden
      const handsToHide = game.add.image(500, 50, "hands").setOrigin(0.5, 0);
      handsToHide.depth = 3;

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
        //   console.log("ui shown");
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
  game.time.addEvent({
    delay: 5500,
    callback: () => {
      console.log("doing review");
      OrderSubmittedHandler(game, dialogHandler);
      game.time.addEvent({
        delay: 3000,
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

// restart the game handler after game over
const restartGameHandler = (game, button) => {
  button.on("pointerdown", (pointer, gameObject) => {
    game.click_sfx.play();
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

    game.scene.start("BootState");
  });
};

// furniture handler
const furnitureHandler = (game, furnitureList) => {
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
    }
  }
};

const showWeekFrameHandler = (game) => {

  game.tweens.add({
    targets: [game.weekFrame],
    y: game.weekFrame.y + 1000,
    ease: "Power1",
    duration: 200,
    repeat: 0,
    yoyo: false,
  })
  game.tweens.add({
    targets: [game.weekTitle],
    y: game.weekTitle.y + 1000,
    ease: "Power1",
    duration: 200,
    repeat: 0,
    yoyo: false,
  })
  game.tweens.add({
    targets: [game.weekDescription],
    y: game.weekDescription.y + 1000,
    ease: "Power1",
    duration: 200,
    repeat: 0,
    yoyo: false,
  })
  game.tweens.add({
    targets: [game.introBeginButton],
    y: game.introBeginButton.y + 1000,
    ease: "Power1",
    duration: 200,
    repeat: 0,
    yoyo: false,
  })


}

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
  // weekFrame creation
  game.weekFrame = game.add.image(500, 500, "order_background").setOrigin(.5, .5).setDepth(9).setInteractive()
  game.weekTitle = game.add
    .text(500, 300, "First day on the job.", {
      fontFamily: "unifrakturcook",
      fontSize: "70px",
      fill: "black",
      wordWrap: { width: 600 },
      align: "center",
    })
    .setOrigin(0.5, 0.5)
    .setDepth(10);
  game.weekDescription = game.add
    .text(500, 550, "You got a job at a nearby burger place. Your goal is to appease the customers. Precision, Punctuality and Presentation matter. Pleasantry will matter later. Spend tips you make in the shop. You can make 5 mistakes before they fire you. The rest is up to you.\n\nGood luck.", {
      fontFamily: "font1",
      fontSize: "30px",
      fill: "black",
      wordWrap: { width: 600 },
      align: "center",
    })
    .setOrigin(0.5, 0.5)
    .setDepth(10);
  game.introBeginButton = game.add.image(500, 700, "begin_button").setOrigin(0.5, 0.5)
    .setDepth(10).setInteractive().setTint(0x2dfa67)
  game.introBeginButton.visible = false;
  game.introBeginButton.scale = .2;

  game.time.addEvent({
    delay: 1000,
    callback: () => {
      game.weekFrame.on("pointerdown", (pointer, gameObject) => {
        game.food_click_sfx.play();
        game.tweens.add({
          targets: [game.introBeginButton],
          scale: .15,
          ease: "Power1",
          duration: 100,
          repeat: 0,
          yoyo: true,
          onComplete: function () {
            game.tweens.add({
              targets: [game.weekFrame],
              y: game.weekFrame.y - 1000,
              ease: "Power1",
              duration: 200,
              repeat: 0,
              yoyo: false,
            })
            game.tweens.add({
              targets: [game.weekTitle],
              y: game.weekTitle.y - 1000,
              ease: "Power1",
              duration: 200,
              repeat: 0,
              yoyo: false,
            })
            game.tweens.add({
              targets: [game.weekDescription],
              y: game.weekDescription.y - 1000,
              ease: "Power1",
              duration: 200,
              repeat: 0,
              yoyo: false,
            })
            game.tweens.add({
              targets: [game.introBeginButton],
              y: game.introBeginButton.y - 1000,
              ease: "Power1",
              duration: 200,
              repeat: 0,
              yoyo: false,
              onComplete: function () {
                //weekStartHandler(game);
              }
            })
            if (game.newWeek === true) {
              game.newWeek = false;
              dayStartHandler(game);
            } else {
              newCustomer(game, true);
            }
          }
        })
      })
    },
    callbackScope: game,
    loop: false,
  });
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
    this.click_sfx = this.sound.add("submit_click");
    this.food_click_sfx = this.sound.add("food_click");
    this.game_over_sfx = this.sound.add("game_over_sfx");
    this.door_open_sfx = this.sound.add("door_open").setVolume(1);
    this.door_rattle_sfx = this.sound.add("door_rattling").setVolume(0.2);

    // animation creation
    this.anims.create({
      key: "clap",
      frames: this.anims.generateFrameNumbers("penguin_sheet", {
        frames: [0, 1, 2, 3, 4, 5],
      }),
      frameRate: 14,
      repeat: -1,
    });
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
      .setDepth(4);
    this.dialog_title = this.add
      .text(200, 750 + dialogYMove, "", {
        fontFamily: "font1",
        fontSize: "50px",
        fill: "black",
      })
      .setOrigin(0, 0)
      .setDepth(4);


    introFrameHandler(this)

    // dayFrame creation
    this.dayFrame = this.add
      .image(500, -1000, "notice_background")
      .setOrigin(0.5, 0.5)
      .setDepth(7);
    this.dayFrame.Scale = 0.8;
    this.dayText = this.add
      .text(500, -1100, "Day 1 Complete!", {
        fontFamily: "unifrakturcook",
        fontSize: "70px",
        fill: "#FF7FC5",
        wordWrap: { width: 600 },
        align: "center",
      })
      .setOrigin(0.5, 0.5)
      .setDepth(8);
    this.dayUpdateText = this.add
      .text(500, -900, "", {
        fontFamily: "font1",
        fontSize: "30px",
        fill: "#FF0090",
        wordWrap: { width: 600 },
        align: "center",
      })
      .setOrigin(0.5, 0.5)
      .setDepth(8);
    this.dayButton = this.add
      .image(500, -950, "day_button")
      .setOrigin(0.5, 0.5)
      .setDepth(8)
      .setInteractive();
    dayButtonHandler(this, this.dayButton);
    this.dayButton.scale = 0.2;

    this.restartButton = this.add
      .image(500, -500, "yes_button")
      .setOrigin(0.5, 0.5)
      .setDepth(8)
      .setInteractive();
    this.restartButton.scale = 0.2;
    restartGameHandler(this, this.restartButton);

    this.qYesButton = this.add
      .image(320, 920, "yes_button")
      .setOrigin(0.5, 0.5)
      .setDepth(8)
      .setInteractive();
    this.qYesButton.scale = 0.2;
    this.qYesButton.visible = false;
    this.qNoButton = this.add
      .image(680, 920, "no2_button")
      .setOrigin(0.5, 0.5)
      .setDepth(8)
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

    setupNoteFrame(this);

    // variable setup
    this.dailyCustomerMax = this.registry.get("DailyCustomerMax") || 2;
    this.dayUpdateSprite = null;
    this.dayUpdateSprite2 = null;
    this.ingredientMax = parseInt(this.registry.get("IngredientMax")) || 2;
    this.currentDay = parseInt(this.registry.get("Day")) || 0;
    this.currentWeek = parseInt(this.registry.get("Week") || 0);
    this.dailyCustomerCount = this.registry.get("DailyCustomerCount") || 0;
    this.newUnlockedCustomer = null;

    this.currentAllowedIngredients = {
      topBun: true,
      bottomBun: true,
      beefpatty: true,
    };
    this.currentUnlockedCustomers = this.registry.get("Unlocked_Customers") || [
      0, 1,
    ];
    this.currentLockedCustomers = [];
    for (let i = 0; i < npc_dictionary.npcs.length; i++) {
      if (!this.currentUnlockedCustomers.includes(i)) {
        this.currentLockedCustomers.push(i);
      }
    }
    this.todays_customers = [];

    const unlockedMaxRatio = Math.floor(
      this.dailyCustomerMax / this.currentUnlockedCustomers.length + 0.5
    );
    //console.log("unlocked max ratio", unlockedMaxRatio);
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
    this.current_customer_index = 0;

    this.defaultPunctualityStandard = 70;
    this.defaultPresentationStandard = 70;
    this.defaultPrecisionStandard = 70;
    this.defaultPleasantryStandard = 0;

    this.dayOfWeek = "Monday";
    this.currentDay = 1
    this.currentWeek = 0
    // this.secretShopperWeek = true
    this.thisWeeksInfo = weeks_info.actual_weeks[this.currentWeek]

    if (this.thisWeeksInfo.c_standards) {
      this.defaultPresentationStandard = this.thisWeeksInfo.c_standards[0];
      this.defaultPunctualityStandard = this.thisWeeksInfo.c_standards[1];
      this.defaultPrecisionStandard = this.thisWeeksInfo.c_standards[2];
      this.defaultPleasantryStandard = this.thisWeeksInfo.c_standards[3];
    }
    if (this.thisWeeksInfo.s_standards) {
      this.secretshopperPresentationStandard = this.thisWeeksInfo.s_standards[0];
      this.secretshopperPunctualityStandard = this.thisWeeksInfo.s_standards[1];
      this.secretshopperPrecisionStandard = this.thisWeeksInfo.s_standards[2];
      this.secretshopperPleasantryStandard = this.thisWeeksInfo.s_standards[3];
    }
    this.registry.set("Day", this.currentDay)
    this.registry.set("Week", this.currentWeek)
    //this.registry.set("Health", 5);
    this.registry.set("SwitchNotAllowed", true);
  },

  update() {
    if (this.registry.get("Order_Complete") == true) {
      this.registry.set("Order_Complete", false);
      orderCompleteHandler(this);
    }
    if (this.registry.get("FurnitureShopEvent") !== undefined) {
      furnitureHandler(this, this.registry.get("FurnitureShopEvent"));
      this.registry.set("FurnitureShopEvent", undefined);
    }
  },
};

export default GameState;
