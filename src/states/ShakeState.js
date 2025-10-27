const yMove = 500
const plateOffset = 780
const handsOffset = 50

const shakeEvent = (game, duration, intensity) => {
  game.cameras.main.shake(duration, intensity)
}

var ShakeState = {
  preload() {

  },

  create() {
    const hands = this.add.image(500, handsOffset + yMove, "hands").setOrigin(.5, 0)
    this.eat_sfx = this.sound.add("eat_sfx1");
    this.presentation_sfx = this.sound.add("presentation_sfx1");
    this.presentation_sfx.setVolume(.9);
    this.hands = hands
    this.burgerIngredients = []
  },

  update() {
    if (this.registry.get("Order_Complete") === true) {
      shakeEvent(this, 2000, .002)
      const game = this
      const Burger_Information = this.registry.get("Burger_Information")

      //console.log(Burger_Information)
      const serving_plate = this.add.image(350, plateOffset + yMove, "servingplate").setOrigin(0, 0)
      this.burgerIngredients.push(serving_plate)
      for (let i = 0; i < Burger_Information.length; i++) {
        const object = Burger_Information[i]
        ////console.log(object)
        const food = this.add.image(serving_plate.x - object.xPos, serving_plate.y - object.yPos, object.ingredient_string).setOrigin(0, 0)
        this.burgerIngredients.push(food)
      }

      for (let i = 0; i < game.burgerIngredients.length; i++) {
        ////console.log(game.burgerIngredients)

        game.tweens.add({
          targets: [game.burgerIngredients[i]],
          y: game.burgerIngredients[i].y - yMove,
          ease: 'Power1',
          duration: 2000,
          repeat: 0,
          yoyo: false,
          onComplete: function () {
          }
        })
      }

      // var handsTweenX= this.tweens.add({
      //   targets: [this.hands],
      //   x: this.hands.x+4,
      //   ease: 'Power1',
      //   duration: 50,
      //   repeat: 1000/50,
      //   yoyo: true,
      // })
      game.presentation_sfx.play();
      var handsTweenY = this.tweens.add({
        targets: [this.hands],
        y: this.hands.y - yMove,
        ease: 'Power1',
        duration: 2000,
        repeat: 0,
        yoyo: false,
        onComplete: function () {

          function hideFood() {
            game.eat_sfx.play();
            for (let i = 0; i < game.burgerIngredients.length; i++) {
              game.tweens.add({
                targets: [game.burgerIngredients[i]],
                ease: 'Power1',
                duration: 500,
                alpha: 0,
                repeat: 0,
                yoyo: false,
                onComplete: function () {
                  for (let i = 0; i < game.burgerIngredients.length; i++) {
                    game.burgerIngredients[i].destroy();
                  }
                  game.burgerIngredients = []
                }
              })
            }
          }

          function hideHands() {
            game.hands.y=handsOffset + yMove
            //game.hands.destroy()
            // var tween = game.tweens.add({
            //   targets: [game.hands],
            //   y: game.hands.y + yMove,
            //   ease: 'Power1',
            //   duration: 500,
            //   repeat: 0,
            //   yoyo: false,
            //   onComplete: function () {
            //     for (let i = 0; i < game.burgerIngredients.length; i++) {
            //       game.burgerIngredients[i].destroy();
            //     }
            //     game.burgerIngredients = []
            //   }
            // })

          }

          game.time.addEvent({
            delay: 500,
            callback:
              hideFood,
            callbackScope: game,
            loop: false,
          });
          game.time.addEvent({
            delay: 501,
            callback:
              hideHands,
            callbackScope: game,
            loop: false,
          });
        }
      })

      // function endOfPresentingBurger() {
      //   //this.scene.bringToTop("GameState")
      //   //this.scene.bringToTop("MenuState")
      // }

      // this.time.addEvent({
      //   delay: 3500,
      //   callback:
      //     endOfPresentingBurger,
      //   callbackScope: this,
      //   loop: false,
      // });
    }
  }
};

export default ShakeState;
