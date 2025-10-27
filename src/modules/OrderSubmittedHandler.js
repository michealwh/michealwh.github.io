import dialog_dictionary from "../dictonaries/dialog.json";
import npc_dictionary from "../dictonaries/npcs.json";
import notes_dictionary from "../dictonaries/notes.jsx";
import weeks from "../dictonaries/weeks.jsx";

const OrderSubmittedHandler = (game, dialogHandler) => {

  const recieved_order = game.registry.get("Burger");
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
  let pleasantryStat = parseInt(game.registry.get("Average_Pleasantry"));

  const current_globs = game.registry.get("Globs");
  const current_total_globs = game.registry.get("Total_Globs");

  let npc_info = npc_dictionary.npcs[game.current_customer_index];
  if (game.secretShopperCustomer) {
    npc_info = npc_dictionary.secretshoppers[game.current_customer_index];
  }
  let has_passed = true;
  let failure_reason = "general";

  if (
    (recieved_order.length <= 0 && ingredients_missed.length === 0) === false
  ) {
    // check precision
    --console.log(
      "failed from precision",
      recieved_order.length,
      ingredients_missed.length
    );
    has_passed = false;
  }

  let presentationChance = Math.floor(Math.random() * game.defaultPresentationStandard); // for normal
  let punctualityChance = Math.floor(Math.random() * game.defaultPunctualityStandard);
  let pleasantryChance = Math.floor(Math.random() * game.defaultPleasantryStandard);
  let precisionChance = Math.floor(Math.random() * game.defaultPrecisionStandard);

  if (game.secretShopperCustomer) {
    presentationChance = game.secretshopperPresentationStandard;
    punctualityChance = game.secretshopperPunctualityStandard;
    pleasantryChance = game.secretshopperPleasantryStandard;
    precisionChance = game.secretshopperPrecisionStandard;
  }
  //--console.log("pres:",presentationChance,presentationStat)
  //--console.log("punc:",punctualityChance,punctualityStat)

  const CurrentDay = game.registry.get("Day");
  const Total_Orders = game.registry.get("Total_Orders");

  const Modifiers = game.registry.get("Modifiers");

  let tipMod = 0;

  let chanceOfNoLossLife = 0;

  for (let i = 0; i < Modifiers.length; i++) {
    switch (Modifiers[i]) {
      case "magicdirt":
        if ((Total_Orders + 1) % 5 == 0) {
          let chance = Math.floor(Math.random() * 2) + 1;
          if (chance == 1) {
            pleasantryStat = 90;
            presentationStat = 90;
            punctualityStat = 90;
          }
        }
        break;
      case "stevenswish":
        if (CurrentDay % 2 == 0) {
          tipMod += 0.5;
        }
        break;
      case "burgerpolish":
        --console.log("incrementing burgerpolish");
        presentationStat += 1.5;
        break;
      case "pragmaticparty":
        presentationStat += 1;
        punctualityStat += 1;
        precisionStat += 1;
        //pleasantryStat += 1;
        break;
      case "thewhisk": {
        let chance = Math.floor(Math.random() * 5) + 1;
        if (chance == 1) {
          let totalStandards = 100;
          if (npc_info.standards && npc_info.standards.presentation) {
            totalStandards += npc_info.standards.presentation;
          } else {
            if(game.secretShopperCustomer) {
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
          let newAmount = (totalStandards / 3) * 2;
          tipMod += Math.floor(newAmount);
        }
        break;
      }
      case "aqualificprism": {
        chanceOfNoLossLife += 1;
        break;
      }
      default:
        break;
    }
  }

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

  if (has_passed === true) {
    // burger success
    const index = Math.floor(Math.random() * dialog_dictionary.success.length);
    const good_response = dialog_dictionary.success[index];
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
    //--console.log("GLOBS EARNED:", glob_change);
    if (npc_info.name.includes("Glorb")) {
      tipMod += 1;
    }
    glob_change += parseFloat(glob_change) * tipMod;
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
    game.registry.set("Globs", new_total_globs.toFixed(2));
    game.registry.set("Total_Globs", new_total_points.toFixed(2));
    const current_correct = parseInt(game.registry.get("Total_Correct")) || 0;
    game.registry.set("Total_Correct", current_correct + 1);
    game.success_sfx1.play();

    // NOTE SECTION
    const defaultStartDay = 5; // for notes
    let selectedNote = null;
    if (notes_dictionary[game.npcName]) {
      let notes_info = notes_dictionary[game.npcName];
      --console.log(notes_info.startday, CurrentDay);
      if (
        (notes_info.startday && CurrentDay >= notes_info.startday) ||
        (CurrentDay >= defaultStartDay && !notes_info.startday)
      ) {
        let all_collected_notes = game.registry.get("Notes");
        let npc_collected = all_collected_notes[game.npcName];
        let notes = notes_info.notes;
        let order = notes_info.order;
        if (!(npc_collected && npc_collected.length >= notes.length)) {
          let noteSuccess = Math.floor(
            Math.random() * notes_dictionary[game.npcName].chance
          );
          --console.log("note success:", noteSuccess);
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
              --console.log("not implemented")
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

      game.registry.set("Globs", new_total_globs.toFixed(2));
    }
    const sound_num = Math.floor(Math.random() * 3) + 1;
    game["spooky_sfx" + sound_num].play();
    dialogHandler(bad_response, game);

    let protectedHealth = Math.floor(Math.random() * 100) + 1;

    let savedThisTime = false;

    if (protectedHealth <= chanceOfNoLossLife) {
      savedThisTime = true;
    }
    let healthsToBeLost = 0;
    if (!savedThisTime) {
       healthsToBeLost += 1;
      // const current_health = game.registry.get("Health");
      // --console.log("current health:", current_health);
      // game.registry.set("Health", current_health - 1);
      --console.log("current health after first loss:", game.registry.get("Health"));
    }

    if (
      game.secretShopperCustomer
    ) {
      // secret shopper fail
      --console.log("secret shopper failed");
      let protectedHealth = Math.floor(Math.random() * 100) + 1;

      let savedThisTime = false;

      if (protectedHealth <= chanceOfNoLossLife) {
        savedThisTime = true;
      }

      if (!savedThisTime) {
        healthsToBeLost += 1;
        --console.log("secret shopper lost life");
        game.time.addEvent({
        delay: 200,
        callback: function () {
          // const current_health = game.registry.get("Health");
          // --console.log("current health:", current_health);
          // game.registry.set("Health", current_health - 1);
          // --console.log("current health after secret shopper loss:", game.registry.get("Health"));
          const sound_num = Math.floor(Math.random() * 3) + 1;
          game["spooky_sfx" + sound_num].play();
        }
      });
      }
    }
    if (healthsToBeLost > 0) {
      const current_health = game.registry.get("Health");
      --console.log("current health:", current_health);
      --console.log("healths to be lost:", healthsToBeLost);
      game.registry.set("Health", current_health - healthsToBeLost);
    }
    //game.registry.set("ChangedHealth", true);
    if (npc_info.sprite_sheet) {
      game.npc.play("glob_angry");
    }
  }

  const currentPrecisionStat = parseInt(game.registry.get("Average_Precision"));
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

export default OrderSubmittedHandler;
