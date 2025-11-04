import npc_dictionary from "../dictonaries/npcs.json";
import shop_dictionary from "../dictonaries/shop.json";
import note_dictionary from "../dictonaries/notes";
const inputHandler = (game, tab, title, key) => {
  const tabX = tab.x;
  const titleX = title.x;

  const dist = 15;
  tab.on("pointerover", (pointer, gameObject) => {
    game.tweens.add({
      targets: tab,
      x: tabX - dist,
      ease: "Linear",
      duration: 100,
      repeat: 0,
      yoyo: false,
    });
    game.tweens.add({
      targets: title,
      x: titleX - dist,
      ease: "Linear",
      duration: 100,
      repeat: 0,
      yoyo: false,
    });
  });

  tab.on("pointerout", (pointer, gameObject) => {
    game.tweens.add({
      targets: tab,
      x: tabX,
      ease: "Linear",
      duration: 100,
      repeat: 0,
      yoyo: false,
    });
    game.tweens.add({
      targets: title,
      x: titleX,
      ease: "Linear",
      duration: 100,
      repeat: 0,
      yoyo: false,
    });
  });

  tab.on("pointerdown", (pointer, gameObject) => {
    if (game.currentTab !== tab) {
      if (game.currentTab !== null) {
        game.click_sfx.play();

        game.currentTab.setDepth(1);
        game.currentTitle.setDepth(2);
        game.currentTab.setTint(0x2dfa67, 0x076b22);
        if (game.currentTab === game.npcTab) {
          showNPCTab(game, false);
        } else if (game.currentTab === game.modifierTab) {
          showModifierTab(game, false);
        } else if (game.currentTab === game.noteTab) {
          showNoteTab(game, false);
        }
      }
      game.currentTab = tab;
      game.currentTitle = title;
      game.currentTab.setDepth(2);
      game.currentTitle.setDepth(3);
      game.currentTab.setTint(0x0200ff, 0x076b22, 0x076b22, 0x076b22);

      if (game.currentTab === game.npcTab) {
        showNPCTab(game, true);
      } else if (game.currentTab === game.modifierTab) {
        showModifierTab(game, true);
      } else if (game.currentTab === game.noteTab) {
        showNoteTab(game, true);
      }
    }
  });
};

const showNPCTab = (game, shouldShow) => {
  if (shouldShow) {
    game.infoTitle.text = "Customers";
    for (let i = 0; i < game.npcTabItems.length; i++) {
      game.npcTabItems[i].visible = true;
    }
  } else {
    for (let i = 0; i < game.npcTabItems.length; i++) {
      game.npcTabItems[i].visible = false;
    }
    for (let i = 0; i < game.npcInfoFrameAssets.length; i++) {
      game.npcInfoFrameAssets[i].visible = false;
    }
  }
};

const showModifierTab = (game, shouldShow) => {
  if (shouldShow) {
    game.infoTitle.text = "Modifiers";

    for (let i = 0; i < game.modifierAssets.length; i++) {
      game.modifierAssets[i].visible = true;
    }
  } else {
    for (let i = 0; i < game.modifierAssets.length; i++) {
      game.modifierAssets[i].visible = false;
    }
  }
};

const showNoteTab = (game, shouldShow) => {
  if (shouldShow) {
    game.infoTitle.text = "Notes";

     for (let i = 0; i < game.noteAssets.length; i++) {
      game.noteAssets[i].visible = true;
    }
  } else {
    for (let i = 0; i < game.noteAssets.length; i++) {
      game.noteAssets[i].visible = false;
    }
  }
};

const hideInfo = (game) => {
  game.click_sfx.play();
  for (let i = 0; i < game.npcInfoFrameAssets.length; i++) {
    game.npcInfoFrameAssets[i].visible = false;
  }
  game.modInfoImage.visible = false;
  game.note_background.visible = false;
  game.noteInfoTitle.visible=false;
  game.noteInfoText.visible = false;
  game.noteAuthorText.visible=false;
};

const setupNPCTab = (game) => {
  game.npcTabItems = [];

  const npc_list = npc_dictionary.npcs;
  const unlocked_npc_list = game.registry.get("Unlocked_Customers");

  function showNPCInfo(show, target) {
    if (show) {
      game.click_sfx.play();

      let npc_info = npc_dictionary.npcs[target];
      game.npcInfoTitle.text = npc_info.name;
      game.npcInfoImage.x = -50;
      game.npcInfoImage.y = 70;
      if (npc_info.name === "Random") {
        const first_index = Math.floor(
          Math.random() * npc_dictionary.first_names.length
        );
        const last_index = Math.floor(
          Math.random() * npc_dictionary.last_names.length
        );
        const first_name = npc_dictionary.first_names[first_index];
        const last_name = npc_dictionary.last_names[last_index];
        game.npcInfoTitle.text = first_name + " " + last_name;
      }
      game.npcInfoImage.setTexture(npc_info.sprite);
      let infotext = "Desciption: ";
      if (npc_info.description) {
        infotext += npc_info.description;
      } else {
        infotext +=
          "another cog in the machine. another sheep in the flock. another twig in a stream.";
      }
      if (npc_info.standards) {
        infotext += "\n\nStandards:";
        if (npc_info.standards.presentation) {
          infotext +=
            "\n - Presentation: " + npc_info.standards.presentation + "%";
        }
        if (npc_info.standards.punctuality) {
          infotext +=
            "\n - Punctuality: " + npc_info.standards.punctuality + "%";
        }
        if (npc_info.standards.precision) {
          infotext += "\n - Precision: " + npc_info.standards.precision + "%";
        }
        if (npc_info.standards.pleasantry) {
          infotext +=
            "\n - Presentation: " + npc_info.standards.pleasantry + "%";
        }
      }
      game.npcInfoText.text = infotext;
      for (let i = 0; i < infoFrameAssets.length; i++) {
        infoFrameAssets[i].visible = true;
      }
    }
  }
  game.npcInfoFrame = game.add
    .image(500, 500, "order_background")
    .setOrigin(0.5, 0.5)
    .setDepth(6)
    .setTint(0x076b22)
    .setScale(0.95)
    .setInteractive();
  game.npcInfoFrame.on("pointerdown", (pointer, gameObject) => {
    hideInfo(game);
  });
  game.npcInfoTitle = game.add
    .text(500, 280, "Name", {
      fontFamily: "font1",
      fontSize: "50px",
      fill: "black",
    })
    .setOrigin(0.5, 0.5)
    .setDepth(7);
  game.npcInfoImage = game.add
    .image(-50, 70, "guy4")
    .setCrop(25, 10, 950, 980)
    .setOrigin(0, 0)
    .setDepth(7);
  game.npcInfoImage.scale = 0.8;
  game.npcInfoText = game.add
    .text(
      550,
      350,
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      {
        fontFamily: "font1",
        fontSize: "30px",
        wordWrap: { width: 250 },
        fill: "black",
      }
    )
    .setOrigin(0, 0)
    .setDepth(7);
  const infoFrameAssets = [
    game.npcInfoFrame,
    game.npcInfoImage,
    game.npcInfoTitle,
    game.npcInfoText,
  ];

  game.npcInfoFrame.visible = false;
  game.npcInfoImage.visible = false;
  game.npcInfoTitle.visible = false;
  game.npcInfoText.visible = false;

  game.npcInfoFrameAssets = infoFrameAssets;
  game.npc_assets = [];
  const maxInRow = 6;
  const croppedX = 400;
  const croppedY = 95;
  const croppedWidth = 400;
  const croppedHeight = 500;
  let currentRowCount = 0;
  let currentRowY = 220;
  for (let i = 0; i < npc_list.length; i++) {
    if (currentRowCount >= maxInRow) {
      currentRowY += 120;
      currentRowCount = 0;
    }
    currentRowCount += 1;
    let npcAsset = game.add
      .image(currentRowCount * 100 + 25, currentRowY, npc_list[i].sprite)
      .setOrigin(0, 0)
      .setDepth(5);
    npcAsset.setCrop(croppedX, croppedY, croppedWidth, croppedHeight);

    npcAsset.setInteractive(
      new Phaser.Geom.Rectangle(
        croppedX,
        croppedY,
        croppedWidth,
        croppedHeight
      ),
      Phaser.Geom.Rectangle.Contains
    );

    npcAsset.scale = 0.2;
    npcAsset.visible = false;
    game.npcTabItems.push(npcAsset);
    if (!unlocked_npc_list.includes(i)) {
      npcAsset.setTintFill(0x00000);
      game.npc_assets.push([npcAsset, false]);
    } else {
      game.npc_assets.push([npcAsset, true]);
    }

    npcAsset.on("pointerdown", (pointer, gameObject) => {
      if (game.npc_assets[i][1] === true) {
        // is unlocked
        showNPCInfo(true, i);
      }
    });
  }
};

const NPCUpdater = (game) => {
  const unlocked_npc_list = game.registry.get("Unlocked_Customers");
  for (let i = 0; i < game.npc_assets.length; i++) {
    if (unlocked_npc_list.includes(i)) {
      game.npc_assets[i][1] = true;
      game.npc_assets[i][0].clearTint();
    }
  }
};

const ModifierAsset = (game, modifier, x, y, quantity) => {
  let boxAsset = game.add
    .image(x, y, modifier + "_box")
    .setOrigin(0.5, 0.5)
    .setInteractive()
    .setDepth(5);
  boxAsset.scale = 0.4;
  let boxTitleText = game.add
    .text(x, y + 65, shop_dictionary.purchasables[modifier].title, {
      fontFamily: "font1",
      fontSize: "20px",
      fill: "black",
      wordWrap: { width: 100 },
      align: "center",
    })
    .setOrigin(0.5, 0.5)
    .setDepth(5);
  //0x2dfa67, 0x076b22
  let boxQuantityText = game.add
    .text(x + 35, y - 30, quantity.toString(), {
      fontFamily: "font1",
      fontStyle: "bold",
      fontSize: "20px",
      stroke: "#076b22",
      strokeThickness: 4,
      color: "#2dfa67",
      wordWrap: { width: 100 },
      align: "center",
    })
    .setOrigin(0.5, 0.5)
    .setDepth(5);

  return [boxAsset, boxTitleText, boxQuantityText];
};

const ModUpdater = (game) => {
  //console.log("IN MOD UPDATER");

  for (let i = 0; i < game.modifierAssets.length; i++) {
    game.modifierAssets[i].destroy();
  }

  const modifiers_list = game.lastModifiers || [];
  let modCountList = {};

  for (let i = 0; i < modifiers_list.length; i++) {
    let item = modifiers_list[i];
    let index = modCountList[item];
    if (index) {
      modCountList[item] += 1;
    } else {
      modCountList[item] = 1;
    }
  }

  const maxInRow = 6;
  let currentRowCount = 0;
  let currentRowY = 350;

  Object.keys(modCountList).forEach((item) => {
    if (currentRowCount >= maxInRow) {
      currentRowY += 140;
      currentRowCount = 0;
    }
    currentRowCount += 1;
    let modAssets = ModifierAsset(
      game,
      item,
      currentRowCount * 100 + 150,
      currentRowY,
      modCountList[item]
    );

    for (let i = 0; i < modAssets.length; i++) {
      game.modifierAssets.push(modAssets[i]);
      modAssets[i].visible = false;
    }

    function showModInfo(show, target) {
      if (show) {
        game.click_sfx.play();

        let mod_info = shop_dictionary.purchasables[target];
        game.npcInfoTitle.text = mod_info.title;
        game.modInfoImage.setTexture(mod_info.key);
        let infotext = "Desciption: ";
        if (mod_info.description) {
          infotext += mod_info.description;
        } else {
          infotext += "generic item.";
        }
        game.npcInfoText.text = infotext;
        game.modInfoImage.visible = true;

        for (let i = 0; i < game.npcInfoFrameAssets.length; i++) {
          if (game.npcInfoFrameAssets[i] !== game.npcInfoImage) {
            game.npcInfoFrameAssets[i].visible = true;
          }
        }
      }
    }

    modAssets[0].on("pointerdown", (pointer, gameObject) => {
      showModInfo(true, item);
    });
  });
};

const setupNoteTab = (game) => {
  game.note_background = game.add
    .image(0, 0, "order_background")
    .setOrigin(0, 0)
    .setDepth(6).setInteractive();
  game.noteInfoTitle = game.add
    .text(220, 280, "Name", {
      fontFamily: "font1",
      fontSize: "50px",
      fill: "black",
    })
    .setOrigin(0, 0.5)
    .setDepth(7);
  game.noteAuthorText = game.add
    .text(220, 330, "notes", {
      fontFamily: "font1",
      fontSize: "20px",
      fill: "black",
      wordWrap: { width: 500 },
      align: "left",
    }).setOrigin(0,.5)
    .setDepth(7);
  game.noteInfoText = game.add
    .text(220, 400, "notes", {
      fontFamily: "font1",
      lineSpacing: 15,
      fontSize: "35px",
      fill: "black",
      wordWrap: { width: 600 },
      align: "left",
    }).setOrigin(0,0)
    .setDepth(7);
  game.note_background.visible = false;
  game.noteInfoTitle.visible=false;
  game.noteAuthorText.visible=false;
  game.noteInfoText.visible = false;
  
  game.note_background.on("pointerdown", (pointer, gameObject) => {
    hideInfo(game);
  });
};

const NoteAsset = (game, image, title, x, y) => {
  let noteAsset = game.add
    .image(x, y, image)
    .setOrigin(0.5, 0.5)
    .setInteractive()
    .setDepth(5);
  noteAsset.scale = 0.15;
  let noteTitleText = game.add
    .text(x, y + 65, title, {
      fontFamily: "font1",
      fontSize: "15px",
      fill: "black",
      wordWrap: { width: 150 },
      align: "center",
    })
    .setOrigin(0.5, 0.5)
    .setDepth(5);

  noteAsset.visible=false
  noteTitleText.visible=false

  return [noteAsset, noteTitleText];
};

const NoteUpdater = (game) => {
  for (let i = 0; i < game.noteAssets.length; i++) {
    game.noteAssets[i].destroy();
  }
  const newNotes = game.registry.get("Notes");
  const maxInRow = 5;
  let currentRowCount = 0;
  let currentRowY = 350;

  Object.keys(note_dictionary).forEach((item) => {
    let npc_notes = note_dictionary[item].notes;
    let current_npc_notes = newNotes[item];
    if (current_npc_notes) {
      for (let i = 0; i < npc_notes.length; i++) {
        if (current_npc_notes.includes(i)) {
          if (currentRowCount >= maxInRow) {
            currentRowY += 140;
            currentRowCount = 0;
          }
          currentRowCount += 1;
          let noteInfo = note_dictionary[item].notes[i];
          let noteAssets = NoteAsset(
            game,
            "order_background",
            noteInfo.title,
            currentRowCount * 150 + 55,
            currentRowY
          );

          game.noteAssets.push(noteAssets[0]);
          game.noteAssets.push(noteAssets[1]);

          function showNoteInfo(show, npc, note_info) {
            if (show) {
              game.click_sfx.play();
              game.noteInfoTitle.text = note_info.title;
              //game.modInfoImage.setTexture(mod_info.key);
              game.noteAuthorText.text = "By: " + npc
              let infotext = "";
              if (note_info.description) {
                infotext += note_info.description;
              }
              if(note_info.fontSize){
                game.noteInfoText.setFontSize(note_info.fontSize+"px")
              } else {
                game.noteInfoText.setFontSize("35px")
              }
              game.noteInfoText.text = infotext;
              game.noteInfoTitle.visible = true;
              game.noteInfoText.visible = true;
              game.noteAuthorText.visible=true;
              game.note_background.visible = true;
            }
          }

          noteAssets[0].on("pointerdown", (pointer, gameObject) => {
            showNoteInfo(true, item, noteInfo);
          });
        }
      }
    }
  });
};

var GalleryState = {
  preload() {},

  create() {
    this.currentTab = null;

    this.lastUnlockedCustomers = this.registry
      .get("Unlocked_Customers")
      .slice();

    //console.log("SETTING LAST MODIFIER IN CREATE");
    this.lastModifiers = this.registry.get("Modifiers").slice();

    this.modifierAssets = [];
    this.noteAssets = [];

    this.click_sfx = this.sound.add("food_click");

    this.background = this.add
      .image(500, 500, "order_background")
      .setOrigin(0.5, 0.5)
      .setTint(0x2dfa67, 0x076b22)
      .setDepth(3);
    this.background.scale = 1.2;

    this.infoTitle = this.add
      .text(500, 250, "Gallery", {
        fontFamily: "font1",
        fontSize: "50px",
        fill: "black",
      })
      .setOrigin(0.5, 0.5)
      .setDepth(4);
    this.infotext = this.add
      .text(500, 400, "", {
        fontFamily: "font1",
        fontSize: "30px",
        fill: "black",
        wordWrap: { width: 300 },
        align: "center",
      })
      .setDepth(4);

    this.npcTab = this.add
      .image(40, 215, "tab_frame")
      .setOrigin(0, 0)
      .setDepth(1)
      .setTint(0x2dfa67, 0x076b22)
      .setInteractive();

    this.npcTab.scale = 0.5;
    this.npcTitle = this.add
      .text(50, 322, "customers", {
        fontFamily: "font1",
        fontSize: "22px",
        fill: "black",
        wordWrap: { width: 300 },
        align: "center",
      })
      .setOrigin(0, 0)
      .setDepth(2);
    this.npcTitle.angle = -90;

    this.modifierTab = this.add
      .image(40, 315, "tab_frame")
      .setOrigin(0, 0)
      .setDepth(1)
      .setTint(0x2dfa67, 0x076b22)
      .setInteractive();
    this.modifierTab.scale = 0.5;
    this.modifierTitle = this.add
      .text(50, 418, "modifiers", {
        fontFamily: "font1",
        fontSize: "22px",
        fill: "black",
        wordWrap: { width: 300 },
        align: "center",
      })
      .setOrigin(0, 0)
      .setDepth(2);
    this.modifierTitle.angle = -90;

    this.noteTab = this.add
      .image(40, 415, "tab_frame")
      .setOrigin(0, 0)
      .setDepth(1)
      .setTint(0x2dfa67, 0x076b22)
      .setInteractive();
    this.noteTab.scale = 0.5;
    this.noteTitle = this.add
      .text(50, 500, "notes", {
        fontFamily: "font1",
        fontSize: "22px",
        fill: "black",
        wordWrap: { width: 300 },
        align: "center",
      })
      .setOrigin(0, 0)
      .setDepth(2);
    this.noteTitle.angle = -90;

    this.modInfoImage = this.add
      .image(300, 330, "chair1")
      .setOrigin(0, 0)
      .setDepth(7);

    this.modInfoImage.rotation = Phaser.Math.DegToRad(15);
    this.modInfoImage.scale = 0.8;
    this.modInfoImage.visible = false;

    setupNPCTab(this);
    setupNoteTab(this);
    ModUpdater(this);
    inputHandler(this, this.npcTab, this.npcTitle);
    inputHandler(this, this.modifierTab, this.modifierTitle);
    inputHandler(this, this.noteTab, this.noteTitle);

    this.currentTab = this.npcTab;
    this.currentTitle = this.npcTitle;
    this.currentTab.setDepth(2);
    this.currentTitle.setDepth(3);
    this.currentTab.setTint(0x0200ff, 0x076b22, 0x076b22, 0x076b22);
    showNPCTab(this, true);

    NoteUpdater(this);
  },

  update() {
    if (
      this.registry.get("Unlocked_Customers").length !==
      this.lastUnlockedCustomers.length
    ) {
      this.lastUnlockedCustomers = this.registry
        .get("Unlocked_Customers")
        .slice();
      NPCUpdater(this);
    }
    if (this.registry.get("Modifiers").length !== this.lastModifiers.length) {
      this.lastModifiers = this.registry.get("Modifiers").slice();
      //console.log("just set last mod");
      ModUpdater(this);
    }
    if(this.registry.get("NewNoteEvent") === true){
      this.registry.set("NewNoteEvent",false)
      NoteUpdater(this)
    }
  },
};

export default GalleryState;
