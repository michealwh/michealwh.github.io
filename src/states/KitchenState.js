const physicsObjectHandler = (object, game, currentlyHolding) => {
  object.setInteractive({
    draggable: true,
  });

  object.setFriction(10, 5);
  object.setDamping(true);
  let objectCurrentVelocityX = 0;
  let objectCurrentVelocityY = 0;

  game.active_ingredients.push(object);

  object.setBounce(0.2, 0.2);
  if (object.texture.key.includes("ball")){
    const bounce = Math.random() * (1.2-.5) + .5;
    object.setBounce(bounce);
  }
  object.setCollideWorldBounds(true);

  object.on("dragstart", (pointer, dragX, dragY) => {
    // const diff = Math.floor(Math.random() * 50) * -0.01
    //   game.food_sfx.setRate(1.2+diff);
    game.food_click.play();
    if (game.used_ingredients.includes(object)) {
      game.mealPosition = [object.x, object.y];
    }
  });

  object.on("drag", (pointer, dragX, dragY) => {
    // if (object.body.allowGravity == false){
    //   return
    // }
    game.active_drag_object = object;
    if (game.used_ingredients.includes(object)) {
      const xDif = object.x - dragX;
      const yDif = object.y - dragY;

      for (const i in game.used_ingredients) {
        const currobject = game.used_ingredients[i];
        const targetX = currobject.x - xDif;
        const targetY = currobject.y - yDif;
        if (
          (targetX > 0 &&
            targetX < game.scale.gameSize.width - currobject.width &&
            targetY > 0 &&
            targetY < game.scale.gameSize.height - currobject.height) !== true
        ) {
          return;
        }
      }

      for (const i in game.used_ingredients) {
        const ingredient = game.used_ingredients[i];

        ingredient.x = ingredient.x - xDif;
        ingredient.y = ingredient.y - yDif;
      }

      return;
    }

    object.depth = game.top_ingredient.depth + 1;

    let velocityY = (dragY - object.y) * 10;
    let velocityX = (dragX - object.x) * 10;
    object.body.setAllowGravity(false);
    object.setVelocity(0, 0);
    if (
      dragX > 0 &&
      dragX < game.scale.gameSize.width - object.width){
         object.x = dragX;
         objectCurrentVelocityX = velocityX;
      }
      if (dragY > 0 &&
      dragY < game.scale.gameSize.height - object.height
    ) {
      object.y = dragY;
      objectCurrentVelocityY = velocityY;
    }
  });

  object.on("dragend", (pointer, gameObject, dropped) => {
    game.active_drag_object = null;
    if (game.used_ingredients.includes(object)) {
      const xDif = object.x - game.mealPosition[0];
      const yDif = object.y - game.mealPosition[1];

      for (const i in game.used_ingredients) {
        const ingredient = game.used_ingredients[i];
        ingredient.x = ingredient.x - xDif;
        ingredient.y = ingredient.y - yDif;
      }

      return;
    }
    ////console.log("dragend", dropped);

    object.body.setAllowGravity(true);
    let velocityY = objectCurrentVelocityY;
    let velocityX = objectCurrentVelocityX;
    ////console.log("after dragend: velocityX", velocityX, "velocityY", velocityY);
    object.setVelocity(velocityX, velocityY);
  });
};

const newKitchenItem = (game,image_key) =>{
  const object = game.physics.add
        .image(500, 500, image_key)
        .setOrigin(0, 0);
      object.body.setAllowGravity(true);
      object.scale = 1;
      physicsObjectHandler(object,game,false)
}

const foodButtonHandler = (object, game) => {
  object.scale = 0.5;
  let image_key = object.texture.key;
  if (image_key.includes("Bottle")){
    image_key = image_key.replace("Bottle", "")
  }
  object.on("pointerdown", (pointer, gameObject) => {
    if (
      game.active_ingredients.length < game.max_ingredients &&
      game.objectDragging !== true
    ) {
      game.food_click.play();
      const clone = game.physics.add
        .image(object.x -90, object.y, image_key)
        .setOrigin(0, 0);
      if(clone.x<clone.width/2){
        clone.x=clone.width/2
      }
      game.active_drag_object = clone;
      clone.body.setAllowGravity(false);
      clone.scale = 1;
      game.tweens.add({
        targets: clone,
        scale: 1,
        ease: "Linear",
        duration: 10,
        repeat: 0,
        yoyo: false,
      });
      object.scale=.5;
      game.objectDragging = true;
      physicsObjectHandler(clone, game, true);
    }
    // game.pointer = pointer
    // game.draggedObject = clone
    // game.objectDragging=true
  });

  object.on("pointerover", (pointer, gameObject) => {
    if (
      game.active_ingredients.length < game.max_ingredients &&
      game.objectDragging !== true
    ) {
      game.tweens.add({
        targets: object,
        scale: 0.55,
        ease: "Linear",
        duration: 10,
        repeat: 0,
        yoyo: false,
      });
    }
  });

  object.on("pointerout", (pointer, gameObject) => {
    if (game.active_ingredients.length < game.max_ingredients) {
      game.tweens.add({
        targets: object,
        scale: 0.5,
        ease: "Linear",
        duration: 10,
        repeat: 0,
        yoyo: false,
      });
    }
  });

  // object.on('pointerup', (pointer, gameObject) => {
  //   //console.log("POINTER IS UP THIS SHOULD STOP")
  //   game.objectDragging=false
  //   game.draggedObject=null
  //   });
};

const submitButtonhandler = (object, game) => {
  object.scale = 0.2;
  object.on("pointerdown", (pointer, gameObject) => {
    if (game.used_ingredients.length >= 1 && game.registry.get("DayOver") == false) {
      if (game.scene.isActive("KitchenState") && game.submitDebounce !== true) {
        game.submitDebounce = true;

        let Burger_Ingredients = [];
        let distOff = 0;

        const removeIngredient = (i) => {
          game.used_ingredients[i].destroy();
        };

        for (let i = 0; i < game.used_ingredients.length; i++) {
          if (i + 1 < game.used_ingredients.length) {
            distOff += Math.abs(
              game.used_ingredients[i].x - game.used_ingredients[i + 1].x
            );
          }
          Burger_Ingredients.push(game.used_ingredients[i].texture.key);
          game.time.addEvent({
            delay: 310,
            callback: function () {
              removeIngredient(i);
            },
            callbackScope: game,
            loop: false,
          });
        }
        ////console.log(distOff / Burger_Ingredients.length);
        ////console.log(Math.min(50, distOff / Burger_Ingredients.length));
        const presentationStat = Math.min(
          100,
          (50 - Math.min(50, distOff / Burger_Ingredients.length - 1)) * 2 + 5
        ); // 5 is perfect 10 is good 50 is cut off for bad
        //console.log("Presentation stat", presentationStat);

        let presentationToSet = Math.floor(presentationStat);
        game.registry.set("Current_Presentation", presentationToSet);
        game.click_sfx.play();

        game.tweens.add({
          targets: object,
          scale: 0.15,
          rotation: 0,
          ease: "Linear",
          duration: 100,
          repeat: 0,
          yoyo: true,
          onComplete: function () {
            const submitOrder = () => {
              //game.registry.set("Average_Presentation", presentationToSet);
              game.top_ingredient = game.servingplate;
              game.used_ingredients = [];
              game.registry.set("Burger", Burger_Ingredients);
              game.submitDebounce = false;
              game.scene.pause("KitchenState").run("GameState");
              game.scene.bringToTop("GameState");
              game.scene.bringToTop("MenuState");
              game.registry.set("Order_Complete", true);
            };

            game.time.addEvent({
              delay: 200,
              callback: submitOrder,
              callbackScope: game,
              loop: false,
            });
          },
        });
      }
    }
  });
};
var KitchenState = {
  preload() {},

  create() {
    // this.bgMusic = this.sound.add("bgMusic")
    // this.bgMusic.setLoop(true);
    // this.bgMusic.volume = 0.1;
    // this.bgMusic.play()

    this.max_ingredients = 10;

    this.active_ingredients = [];

    this.used_ingredients = [];
    this.adding_items=false;
    this.registry.set("Burger", this.used_ingredients);

    this.food_sfx = this.sound.add("food_sfx1");
    this.food_sfx.setVolume(0.9);
    this.click_sfx = this.sound.add("submit_click");
    this.trash_sfx = this.sound.add("trash_sfx");
    this.food_click = this.sound.add("food_click");

    this.add.image(0, 0, "kitchen").setOrigin(0, 0);

    const bottomBunBtn = this.physics.add
      .image(10 + 70, 685 + 25, "bottomBun")
      .setOrigin(0.5, 0.5)
      .setInteractive();

    bottomBunBtn.body.setAllowGravity(false);
    foodButtonHandler(bottomBunBtn, this);

    const topBunBtn = this.physics.add
      .image(150 + 70, 675 + 25, "topBun")
      .setOrigin(0.5, 0.5)
      .setInteractive();

    topBunBtn.body.setAllowGravity(false);
    foodButtonHandler(topBunBtn, this);

    const beefpattyBtn = this.physics.add
      .image(300 + 70, 700 + 10, "beefpatty")
      .setOrigin(0.5, 0.5)
      .setInteractive();

    beefpattyBtn.body.setAllowGravity(false);
    foodButtonHandler(beefpattyBtn, this);

    const lettuceBtn = this.physics.add
      .image(450 + 70, 700 + 10, "lettuce")
      .setOrigin(0.5, 0.5)
      .setInteractive();

    lettuceBtn.body.setAllowGravity(false);
    foodButtonHandler(lettuceBtn, this);
    const onionBtn = this.physics.add
      .image(20 + 70, 545 + 5, "onion")
      .setOrigin(0.5, 0.5)
      .setInteractive();

    onionBtn.body.setAllowGravity(false);
    foodButtonHandler(onionBtn, this);
    const tomatoBtn = this.physics.add
      .image(160 + 70, 545 + 5, "tomato")
      .setOrigin(0.5, 0.5)
      .setInteractive();

    tomatoBtn.body.setAllowGravity(false);
    foodButtonHandler(tomatoBtn, this);
    const ketchupBtn = this.physics.add
      .image(30 + 60, 305 + 20, "ketchupBottle")
      .setOrigin(0.5, 0.5)
      .setInteractive();
    ketchupBtn.body.setAllowGravity(false);
    foodButtonHandler(ketchupBtn, this);
    const mustardBtn = this.physics.add
      .image(120 + 60, 305 + 20, "mustardBottle")
      .setOrigin(0.5, 0.5)
      .setInteractive();
    mustardBtn.body.setAllowGravity(false);
    foodButtonHandler(mustardBtn, this);
    const bbqBtn = this.physics.add
      .image(210 + 60, 305 + 20, "bbqBottle")
      .setOrigin(0.5, 0.5)
      .setInteractive();
    bbqBtn.body.setAllowGravity(false);
    foodButtonHandler(bbqBtn, this);
    const ranchBtn = this.physics.add
      .image(300 + 60, 305 + 20, "ranchBottle")
      .setOrigin(0.5, 0.5)
      .setInteractive();
    ranchBtn.body.setAllowGravity(false);
    foodButtonHandler(ranchBtn, this);

    const submitBtn = this.add
      .image(735 + 70, 940 + 10, "submit_button")
      .setOrigin(0.5, 0.5)
      .setInteractive();
    submitButtonhandler(submitBtn, this);

    this.trashcan = this.physics.add
      .image(100, 850, "trashcan")
      .setOrigin(0, 0);
    this.trashcan.body.setAllowGravity(false);
    this.trashcan.body.setSize(
      this.trashcan.width / 2,
      this.trashcan.height / 4,
      this.trashcan.width / 4,
      this.trashcan.height / 4
    );

    this.servingplate = this.physics.add
      .image(650, 850, "servingplate")
      .setOrigin(0, 0);
    this.servingplate.body.setAllowGravity(false);
    this.servingplate.body.setSize(
      this.servingplate.width / 2,
      this.servingplate.height / 8,
      this.servingplate.width / 4,
      -this.servingplate.height
    );

    this.top_ingredient = this.servingplate;

    const objectDragCheck = (pointer) => {
      const savedPointer = pointer;
      if (this.objectDragging === true && this.active_drag_object != undefined) {
        this.objectDragging = false;
        const object = this.active_drag_object;
        this.active_drag_object.body.setAllowGravity(true);
        const prevPosition = savedPointer.prevPosition;
        const velocityX = (this.active_drag_object.x-prevPosition.x)/4; // might need change to match force of normal drag
        const velocityY = (this.active_drag_object.y-prevPosition.y)/4;
        object.setVelocity(velocityX, velocityY);
        this.active_drag_object = null;
      }
    }
    this.input.on(Phaser.Input.Events.POINTER_UP, (pointer) => {
      objectDragCheck(pointer);
    });

    this.input.on(Phaser.Input.Events.POINTER_UP_OUTSIDE, function(pointer) {
      objectDragCheck(pointer);
});
  },
  update() {


    if(this.registry.get("NewKitchenItemEvent").length>0 && this.adding_items==false){
      this.adding_items = true
      const itemList = this.registry.get("NewKitchenItemEvent")
      
      for (let i = 0; i < itemList.length; i++){
        newKitchenItem(this,itemList[i],"specialitem");
      }
      this.registry.set("NewKitchenItemEvent",[]);
      this.adding_items = false
    }

    if (this.objectDragging === true && this.active_drag_object) {
      const mouseX =
        this.input.mousePointer.x -
        (this.active_drag_object.width * this.active_drag_object.scale) / 2;
      const mouseY =
        this.input.mousePointer.y -
        (this.active_drag_object.height * this.active_drag_object.scale) / 2;
      const object = this.active_drag_object;
      if (mouseX > 0 && mouseX < this.scale.gameSize.width - object.width) {
        object.depth = this.top_ingredient.depth + 1;
        object.x = mouseX;
      } else {
        object.x = Math.min(
          Math.max(mouseX, 0),
          this.scale.gameSize.width - object.width
        );
      }
      if (mouseY > 0 && mouseY < this.scale.gameSize.height - object.height) {
        object.depth = this.top_ingredient.depth + 1;

        object.y = mouseY;
      } else {
        object.y = Math.min(
          Math.max(mouseY, 0),
          this.scale.gameSize.height - object.height
        );
      }
    }

    if (this.active_ingredients.length > 0) {
      for (let i = 0; i < this.active_ingredients.length; i++) {
        const objectTrashed = (object, trashcan) => {
          if(object.texture.key.includes("ball")){
            return
          }
          if (object === this.active_drag_object) {
            this.objectDragging = false;
          }
          this.trash_sfx.play();
          this.active_ingredients.splice(i, 1);
          const game = this;
          this.tweens.add({
            targets: object,
            x: this.trashcan.x + this.trashcan.width / 2,
            y: this.trashcan.y + this.trashcan.height / 2,
            scale: 0,
            rotation: 180 * (Math.PI / 180),
            ease: "Power1",
            duration: 500,
            repeat: 0,
            yoyo: false,
            onComplete: function () {
              object.destroy();
            },
          });
        };

        const ingredientAdded = (object, top_ingredient) => {
          if (
            this.active_drag_object !== object &&
            (object.y < this.top_ingredient.y ||
              (object.height < 40 && object.y < this.top_ingredient.y + 30))
          ) {
            const diff = Math.floor(Math.random() * 50) * -0.01;
            this.food_sfx.setRate(1.2 + diff);
            this.food_sfx.play();
            object.body.setAllowGravity(false);
            object.setVelocity(0, 0);
            this.top_ingredient = object;
            this.used_ingredients.push(object);
            let Burger_Ingredients = [];
            let Burger_Information = [];
            for (let i = 0; i < this.used_ingredients.length; i++) {
              let ingredient_string = this.used_ingredients[i].texture.key;
              let xPos = this.servingplate.x - this.used_ingredients[i].x;
              let yPos = this.servingplate.y - this.used_ingredients[i].y;
              const ingredient_object = { xPos, yPos, ingredient_string };
              Burger_Information.push(ingredient_object);
              Burger_Ingredients.push(ingredient_string);
            }

            this.registry.set("Burger_Information", Burger_Information);
            this.registry.set("Burger", Burger_Ingredients);

            const index = this.active_ingredients.indexOf(object);
            this.active_ingredients.splice(index, 1);
            object.body.setSize(
              this.top_ingredient.width / 4,
              object.height / 2,
              object.width / 2.5,
              object.height / 2
            );
            object.body.setOffset(object.width / 2.5, object.height / 2);
          }
        };

        this.physics.overlap(
          this.active_ingredients[i],
          this.trashcan,
          objectTrashed,
          null,
          this
        );
        if (this.active_ingredients[i]) {
          this.physics.overlap(
            this.active_ingredients[i],
            this.top_ingredient,
            ingredientAdded,
            null,
            this
          );
        }
      }
    }
    if (this.used_ingredients.length > 0) {
      for (let i = 0; i < this.used_ingredients.length; i++) {
        const objectTrashed = (object, trashcan) => {
          //console.log("USED INGREDIENTS GETTING TRASHED");
          if (this.top_ingredient == this.servingplate) {
            return;
          }
          this.top_ingredient = this.servingplate;
          this.trash_sfx.play();
          for (let z = 0; z < this.used_ingredients.length; z++) {
            const zObject = this.used_ingredients[z];
            this.tweens.add({
              targets: zObject,
              x: this.trashcan.x + this.trashcan.width / 2,
              y: this.trashcan.y + this.trashcan.height / 2,
              scale: 0,
              rotation: 180 * (Math.PI / 180),
              ease: "Power1",
              duration: 500,
              repeat: 0,
              yoyo: false,
              onComplete: function () {
                zObject.destroy();
              },
            });
          }
          this.used_ingredients = [];
        };

        this.physics.overlap(
          this.used_ingredients[i],
          this.trashcan,
          objectTrashed,
          null,
          this
        );
      }
    }
  },
};

export default KitchenState;
