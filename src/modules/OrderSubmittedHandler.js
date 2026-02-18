import dialog_dictionary from "../dictonaries/dialog.json";
import npc_dictionary from "../dictonaries/npcs.json";
import notes_dictionary from "../dictonaries/notes.jsx";

const OrderSubmittedHandler = (game, dialogHandler, event) => {
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
  const modifierAnimation = (game, modifier, quick) => {
    const x = Math.floor(Math.random() * 900) + 50;
    const y = 1000;

    let waitTime = Math.floor(Math.random() * 1000) + 500;
    if (quick === true) {
      waitTime = Math.floor(Math.random() * 50) + 100;
    }
    game.time.addEvent({
      delay: waitTime,
      callback: () => {
        const newMod = game.physics.add
          .image(x, y, modifier)
          .setOrigin(0.5, 0.5)
          .setDepth(20)
          .setInteractive()
          .setDisplaySize(100, 100);
        const dirx = Math.floor(Math.random() * 2);
        let velx = Math.random() * 15 + 1;
        if (dirx == 1) {
          velx = velx * -1;
        }
        newMod.setVelocity(velx, -1 * (Math.random() * 100 + 900));
        game.time.addEvent({
          delay: 2500,
          callback: () => {
            game.tweens.add({
              targets: [newMod],
              scale: 0,
              ease: "Linear",
              duration: 200,
              repeat: 0,
              yoyo: false,
              onComplete: function () {
                if (newMod) {
                  newMod.destroy();
                }
              },
            });
          },
        });
      },
    });
  };

  const recieved_order = game.registry.get("Burger");

  const recieved_order_copy = [...recieved_order];

  const expected_order = game.registry.get("Order");
  let moneyAddition = 0;
  let ingredients_missed = [];

  for (let i = 0; i < expected_order.length; i++) {
    let index = recieved_order.indexOf(expected_order[i]);
    if (expected_order[i].includes("ball")) {
      index = recieved_order.findIndex((element) => element.includes("ball"));
      if (recieved_order[index] === "rarebouncyball25") {
        moneyAddition += 5.33;
      }
    }
    if (index !== -1) {
      recieved_order.splice(index, 1);
    } else {
      ingredients_missed.push(expected_order[i]);
    }
  }

  let precisionStat =
    (Math.max(
      0,
      expected_order.length -
      (recieved_order.length + ingredients_missed.length)
    ) /
      expected_order.length) *
    100;
  let presentationStat = parseInt(game.registry.get("Current_Presentation"));
  let punctualityStat = parseInt(game.registry.get("Current_Punctuality"));
  let pleasantryStat = parseInt(game.registry.get("Average_Pleasantry")) || 0;

  const current_globs = game.registry.get("Globble");
  const current_total_globs = game.registry.get("Total_Globs");

  let npc_info = npc_dictionary.npcs[game.current_customer_index];
  if (game.secretShopperCustomer) {
    npc_info = npc_dictionary.secretshoppers[game.current_customer_index];
  }
  let has_passed = true;
  let failure_reason = "general";

  let bottom_ingredient = recieved_order_copy[0];
  if (
    bottom_ingredient !== "bottomBun" &&
    expected_order.includes("bottomBun")
  ) {
    // bottom ingredient check
    //console.log("failed bottom bun check");
    presentationStat -= 45;
  }

  if (
    (recieved_order.length <= 0 && ingredients_missed.length === 0) === false
  ) {
    // check precision
    has_passed = false;
  }

  //console.log("currentstandards", game.defaultPresentationStandard, game.defaultPunctualityStandard, game.defaultPrecisionStandard, game.defaultPleasantryStandard);

  function getStandardChance(baseStandard) {
    return Math.max(0, baseStandard - Math.floor(Math.random() * 10));
  }

  let presentationChance = getStandardChance(game.defaultPresentationStandard); // for normal
  let punctualityChance = getStandardChance(game.defaultPunctualityStandard);
  let pleasantryChance = getStandardChance(game.defaultPleasantryStandard);
  let precisionChance = getStandardChance(game.defaultPrecisionStandard);

  if (game.defaultPleasantryStandard == 0) {
    pleasantryChance = 0;
  }
  if (game.secretShopperCustomer) {
    presentationChance = game.secretshopperPresentationStandard;
    punctualityChance = game.secretshopperPunctualityStandard;
    pleasantryChance = game.secretshopperPleasantryStandard;
    precisionChance = game.secretshopperPrecisionStandard;
  }
  ////console.log("pres:",presentationChance,presentationStat)
  ////console.log("punc:",punctualityChance,punctualityStat)

  const CurrentDay = game.registry.get("Day");
  const Total_Orders = game.registry.get("Total_Orders");

  const Modifiers = game.registry.get("Modifiers") || [];


  let presentationMod = 1;
  let punctualityMod = 1;
  let pleasantryMod = 1;
  let precisionMod = 1;

  let tipMod = 0;

  let tipAdditions = 0;

  let chanceOfNoLossLife = 0;

  let allActivatedMods = [];

  for (let i = 0; i < Modifiers.length; i++) {
    switch (Modifiers[i]) {
      case "magicdirt": {
        if ((Total_Orders + 1) % 5 == 0) {
          let chance = Math.floor(Math.random() * 2) + 1;
          if (chance == 1) {
            allActivatedMods.push("magicdirt");
            pleasantryStat = Math.max(90, pleasantryStat);
            presentationStat = Math.max(90, presentationStat);
            punctualityStat = Math.max(90, presentationStat);
            precisionStat = Math.max(90, precisionStat);
          }
        }
        break;
      }
      case "toddsrequest": {
        if (CurrentDay % 2 == 1) {
          precisionStat += 5;
          allActivatedMods.push("toddsrequest");
        }
        break
      }
      case "bottomfeeder":
          { let produceCount = 0;
          let passed=true;
          for (let i=0; i< recieved_order_copy.length;i++){
            if (recieved_order_copy[i] === "lettuce" || recieved_order_copy[i] === "tomato" || recieved_order_copy[i] === "onion"){
              produceCount++;
              if (produceCount !== i){
                passed=false;
                break;
              }
              //console.log("found produce", recieved_order_copy[i], "at",i);
            }
          }
          if (passed){
            precisionMod+=.2
            allActivatedMods.push("bottomfeeder");
          }
        break; }
      case "stevenswish": {
        if (CurrentDay % 2 == 0) {
          tipMod += 0.4;
          allActivatedMods.push("stevenswish");
        }
        break;
      }
      case "burgerpolish": {
        //console.log("incrementing burgerpolish");
        presentationStat += 3;
        allActivatedMods.push("burgerpolish");
        break;
      }
      case "pragmaticparty": {
        presentationStat += 1;
        punctualityStat += 1;
        precisionStat += 1;
        //pleasantryStat += 1;
        allActivatedMods.push("pragmaticparty");
        break;
      }
      case "bofoundation": {
        let noSpaces = npc_info.name.replaceAll(" ", "");
        tipAdditions += 800 / noSpaces.length;
        allActivatedMods.push("bofoundation");
        break;
      }
      case "thewhisk": {
        let chance = Math.floor(Math.random() * 100) + 1;
        if (chance <= 30) {
          allActivatedMods.push("thewhisk");
          let totalStandards = 0;
          if (npc_info.standards && npc_info.standards.precision) {
            totalStandards += npc_info.standards.precision;
          } else {
            if (game.secretShopperCustomer) {
              totalStandards += game.secretshopperPrecisionStandard;
            } else {
              totalStandards += game.defaultPrecisionStandard;
            }
          }
          if (npc_info.standards && npc_info.standards.presentation) {
            totalStandards += npc_info.standards.presentation;
          } else {
            if (game.secretShopperCustomer) {
              totalStandards += game.secretshopperPresentationStandard;
            } else {
              totalStandards += game.defaultPresentationStandard;
            }
          }
          if (npc_info.standards && npc_info.standards.punctuality) {
            totalStandards += npc_info.standards.punctuality;
          } else {
            if (game.secretShopperCustomer) {
              totalStandards += game.secretshopperPunctualityStandard;
            } else {
              totalStandards += game.defaultPunctualityStandard;
            }
          }
          if (npc_info.standards && npc_info.standards.pleasantry) {
            totalStandards += npc_info.standards.pleasantry;
          } else {
            if (game.secretShopperCustomer) {
              totalStandards += game.secretshopperPleasantryStandard;
            } else {
              totalStandards += game.defaultPleasantryStandard;
            }
          }
          //console.log("modifier", totalStandards / 4, (totalStandards / 4) * 0.01 * 2);
          let newAmount = (totalStandards / 4) * 0.01 * 2;

          tipMod += newAmount;
        }
        break;
      }
      case "aqualificprism": {
        chanceOfNoLossLife += 1;
        break;
      }
      case "ratnip": {
        const ratsNotAdded = game.registry.get("RatsToAdd") || 0;
        const ratsAdded = game.registry.get("KitchenRatCount") || 0;
        if (ratsNotAdded + ratsAdded > 0) {
          allActivatedMods.push("ratnip");
        }
        tipAdditions += (ratsNotAdded + ratsAdded) * 5;
        break;
      }
      case "cryochamber": {
        allActivatedMods.push("cryochamber");
        punctualityChance -= 4;
        //console.log("punct chance decreased by 4 to", punctualityChance);
        //console.log("new punct chance:", punctualityChance);
        break;
      }
      case "burgertime": {
        const ingredientBonus = 2 * recieved_order_copy.length;
        allActivatedMods.push("burgertime");
        punctualityStat += ingredientBonus;
        //console.log("punct stat increased by", ingredientBonus);
        //console.log("new punct stat:", punctualityStat);
        break;
      }
      case "scentedbounce": {
        const bouncyBallsInKitchen =
          game.registry.get("BouncyBallsInKitchen") || [];
        if (bouncyBallsInKitchen.length > 0) {
          allActivatedMods.push("scentedbounce");
        }
        presentationStat += bouncyBallsInKitchen.length;
        //console.log( "presentation stat increased by", bouncyBallsInKitchen.length);
        //console.log("new presentation stat:", presentationStat);
        break;
      }
      case "glumtrident": {
        const glumDevilCount = game.registry.get("GlumDevilCount") || 0;
        if (glumDevilCount > 0) {
          allActivatedMods.push("glumtrident");
        }
        precisionStat += glumDevilCount;
        //console.log("precision stat increased by", glumDevilCount);
        //console.log("new precision stat:", precisionStat);
        break;
      }
      default:
        break;
    }
  }

  presentationStat*=presentationMod;
  punctualityStat*=punctualityMod;
  pleasantryStat*=pleasantryMod;
  precisionStat*=precisionMod;


  // rat effect handling
  // let ratsNotAdded = game.registry.get("RatsToAdd") || 0
  // let ratsAdded = game.registry.get("KitchenRatCount") || 0

  // for(let i=0; i< (ratsNotAdded+ratsAdded);i++){
  //   pleasantryStat-=3
  // }

  if (npc_info.standards) {
    // check custom standards
    if (npc_info.standards.presentation) {
      if (presentationStat < npc_info.standards.presentation) {
        has_passed = false;
        failure_reason = "presentation";
      }
    } else if (presentationChance > presentationStat) {
      has_passed = false;
      failure_reason = "presentation";
    }
    if (npc_info.standards.punctuality) {
      if (punctualityStat < npc_info.standards.punctuality) {
        has_passed = false;
        failure_reason = "punctuality";
      }
    } else if (punctualityChance > punctualityStat) {
      has_passed = false;
      failure_reason = "punctuality";
    }
    if (npc_info.standards.precision) {
      if (precisionStat < npc_info.standards.precision) {
        has_passed = false;
        failure_reason = "general";
      } else if (precisionChance > precisionStat) {
        has_passed = false;
        failure_reason = "general";
      }
    }
    if (npc_info.standards.pleasantry) {
      if (pleasantryStat < npc_info.standards.pleasantry) {
        has_passed = false;
        failure_reason = "pleasantry";
      }
    } else if (pleasantryChance > pleasantryStat) {
      has_passed = false;
      failure_reason = "pleasantry";
    }
  } else {
    // normal standards
    if (presentationChance > presentationStat) {
      has_passed = false;
      failure_reason = "presentation";
    } else if (punctualityChance > punctualityStat) {
      has_passed = false;
      failure_reason = "punctuality";
    } else if (precisionChance > precisionStat) {
      has_passed = false;
      failure_reason = "general";
    } else if (pleasantryChance > pleasantryStat) {
      has_passed = false;
      failure_reason = "pleasantry";
    }
  }

  //console.log("pres", presentationStat, presentationChance);
  //console.log("pleas", pleasantryStat, pleasantryChance);

  // ORDERING RESULTS HANDLER
  const orderResultsHandler = (game) => {
    if (has_passed === true) {
      // burger success
      const index = Math.floor(
        Math.random() * dialog_dictionary.success.length
      );
      let good_response = dialog_dictionary.success[index];
      if (game.secretShopperCustomer) {
        const secretindex = Math.floor(
          Math.random() * dialog_dictionary.secret_success.length
        );
        good_response = dialog_dictionary.secret_success[secretindex];
      }
      let glob_change =
        Math.floor(
          ((presentationStat + precisionStat + punctualityStat) / 4.6) * 10
        ) / 100;
      if (presentationStat < 10) {
        glob_change = glob_change * (presentationStat / 100);
      }
      if (punctualityStat < 50) {
        glob_change = glob_change * (punctualityStat / 100);
      }
      ////console.log("GLOBS EARNED:", glob_change);
      if (npc_info.name.includes("Glorb")) {
        tipMod += 1;
      }
      glob_change += parseFloat(glob_change) * tipMod;
      glob_change += tipAdditions;
      let new_total_globs = parseFloat(
        parseFloat(current_globs) + parseFloat(glob_change)
      );
      let new_total_points = parseFloat(
        parseFloat(current_total_globs) + parseFloat(glob_change)
      );
      new_total_globs =
        parseFloat(new_total_globs) + parseFloat((pleasantryStat / 100) * 20);
      if (npc_info.sprite_sheet) {
        // if its the glorb then make it smile
        game.npc.play("glob_happy");
      }
      new_total_globs += moneyAddition;
      game.registry.set("Globble", new_total_globs.toFixed(2));
      //console.log("Set Globs to:", game.registry.get("Globble"));
      game.registry.set("Total_Globs", new_total_points.toFixed(2));
      const current_correct = parseInt(game.registry.get("Total_Correct")) || 0;
      game.registry.set("Total_Correct", current_correct + 1);

      // chance of winning a review/life
      let chanceTotal =
        presentationChance +
        punctualityChance +
        precisionChance +
        pleasantryChance;
      let statsTotal =
        presentationStat + punctualityStat + precisionStat + pleasantryStat;

      let ratio = statsTotal / chanceTotal;
      const currentHealth = game.registry.get("Health");
      const targetChance = 10; // chance of winning a life back
      let chance = Math.floor(Math.random() * targetChance) + 1;
      chance += ratio / 2;
      if (ratio >= 1.5 && currentHealth < 5 && chance >= targetChance) {
        // good review
        ////console.log("WE GOT A GOOD REVIEW!!!",ratio,chance);
        good_response =
          dialog_dictionary.goodreview[
          Math.floor(Math.random() * dialog_dictionary.goodreview.length)
          ];
        let currentReviews = game.registry.get("Total_Good_Reviews") || 0;
        game.registry.set("Total_Good_Reviews", currentReviews + 1);
        game.registry.set("Health", currentHealth + 1);
        game.good_review_sfx.play();
      } else {
        // normal success
        game.success_sfx1.play();
      }

      // NOTE SECTION
      const defaultStartDay = 5; // for notes
      let selectedNote = null;
      if (game.formattedNotes[game.npcName]) {
        let notes_info = game.formattedNotes[game.npcName];
        //console.log(notes_info.startday, CurrentDay);
        if (
          (notes_info.startday && CurrentDay >= notes_info.startday) ||
          (CurrentDay >= defaultStartDay && !notes_info.startday)
        ) {
          let all_collected_notes = game.registry.get("Notes") || {};
          let npc_collected = all_collected_notes[game.npcName];
          let notes = notes_info.notes;
          let order = notes_info.order;
          if (!(npc_collected && npc_collected.length >= notes.length)) {
            let noteSuccess = Math.floor(
              Math.random() * game.formattedNotes[game.npcName].chance
            );
            //console.log("note success:", noteSuccess);
            if (noteSuccess === 0) {
              if (order === "chrono") {
                if (npc_collected === undefined) {
                  all_collected_notes[game.npcName] = [0];
                  selectedNote = notes[0];
                } else {
                  for (let i = 0; i < notes.length; i++) {
                    if (npc_collected.includes(i) === false) {
                      selectedNote = notes[i];

                      all_collected_notes[game.npcName].push(i);
                      break;
                    }
                  }
                }
              } else if (order === "random") {
                //console.log("not implemented");
                if (npc_collected === undefined) {
                  all_collected_notes[game.npcName] = [];
                  npc_collected = [];
                }
                let foundNote = false;
                while (foundNote == false) {
                  const index = Math.floor(Math.random() * notes.length);
                  if (npc_collected.includes(index) === false) {
                    selectedNote = notes[index];

                    all_collected_notes[game.npcName].push(index);
                    foundNote = true;
                  }
                }
              }
              game.registry.set("Notes", all_collected_notes);
            }
          }
        }
      }
      if (selectedNote !== null) {
        game.selectedNote = selectedNote;
        game.registry.set("NewNoteEvent", true);
      }
      dialogHandler(good_response, game);
    } else {
      //failed burger
      const index = Math.floor(
        Math.random() * dialog_dictionary.fail[failure_reason].length
      );
      const bad_response = dialog_dictionary.fail[failure_reason][index];
      if (bad_response.includes("money") || bad_response.includes("refund")) {
        let new_total_globs = current_globs - 9.99; // if response has money they lose money then
        if (
          npc_info.name.includes("Glorb") // if glorb then they lose more money
        ) {
          new_total_globs = current_globs - 19.99;
        }
        new_total_globs += moneyAddition;

        game.registry.set("Globble", new_total_globs.toFixed(2));
        //console.log("Set Globs to:", game.registry.get("Globble"));
      }
      const sound_num = Math.floor(Math.random() * 3) + 1;
      game["spooky_sfx" + sound_num].play();
      dialogHandler(bad_response, game);

      let protectedHealth = 0;

      let savedThisTime = false;

      for (let i = 0; i < chanceOfNoLossLife; i++) {
        protectedHealth = Math.floor(Math.random() * 100) + 1;
        if (protectedHealth == 100) {
          savedThisTime = true;
          break;
        }
      }
      let healthsToBeLost = 0;
      if (!savedThisTime) {
        healthsToBeLost += 1;
        //console.log( "current health after first loss:",game.registry.get("Health"));
      } else {
        modifierAnimation(game, "aqualificprism", true);
      }

      if (game.secretShopperCustomer) {
        // secret shopper fail
        //console.log("secret shopper failed");
        let protectedHealth = 0;

        savedThisTime = false;

        for (let i = 0; i < chanceOfNoLossLife; i++) {
          protectedHealth = Math.floor(Math.random() * 100) + 1;
          if (protectedHealth == 100) {
            savedThisTime = true;
            break;
          }
        }

        if (!savedThisTime) {
          healthsToBeLost += 1;
          //console.log("secret shopper lost life");
          game.time.addEvent({
            delay: 200,
            callback: function () {
              const sound_num = Math.floor(Math.random() * 3) + 1;
              game["spooky_sfx" + sound_num].play();
            },
          });
        } else {
          modifierAnimation(game, "aqualificprism", true);
        }
      }
      if (healthsToBeLost > 0) {
        const current_health = game.registry.get("Health");
        //console.log("current health:", current_health);
        //console.log("healths to be lost:", healthsToBeLost);
        game.registry.set("Health", current_health - healthsToBeLost);
      }
      //game.registry.set("ChangedHealth", true);
      if (npc_info.sprite_sheet) {
        game.npc.play("glob_angry");
      }
    }

    const currentPrecisionStat = parseInt(
      game.registry.get("Average_Precision")
    );
    let precisionToSet = Math.floor(precisionStat);
    if (currentPrecisionStat > 0) {
      precisionToSet = Math.floor((currentPrecisionStat + precisionToSet) / 2);
    }
    game.registry.set("Average_Precision", precisionToSet);

    const currentPresentationStat = parseInt(
      game.registry.get("Average_Presentation")
    );
    let presentationToSet = Math.floor(presentationStat);
    game.registry.set("Current_Presentation", presentationToSet);
    if (currentPresentationStat > 0) {
      presentationToSet = Math.floor(
        (currentPresentationStat + presentationStat) / 2
      );
    }
    game.registry.set("Average_Presentation", presentationToSet);

    const currentPunctualityStat = game.registry.get("Average_Punctuality");
    let punctualityToSet = Math.floor(punctualityStat);

    if (currentPunctualityStat > 0) {
      punctualityToSet = Math.floor(
        (currentPunctualityStat + punctualityStat) / 2
      );
    }
    game.registry.set("Average_Punctuality", punctualityToSet);

    const current_orders = parseInt(game.registry.get("Total_Orders"));
    game.registry.set("Total_Orders", current_orders + 1);
  };

  // MODIFIER VISUAL
  if (event !== "skipEverything") {
    for (let i = 0; i < Math.min(allActivatedMods.length, 100); i++) {
      const modName = allActivatedMods[i];
      modifierAnimation(game, modName);
    }
    game.time.addEvent({
      delay: 3000,
      callback: () => {
        orderResultsHandler(game);
      },
    });
  } else {
    for (let i = 0; i < Math.min(allActivatedMods.length, 100); i++) {
      const modName = allActivatedMods[i];
      modifierAnimation(game, modName, true);
    }
    orderResultsHandler(game);
  }
};

export default OrderSubmittedHandler;
