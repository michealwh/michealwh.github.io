var SettingsState = {
  preload() {

  },

  create() {
    const order_background = this.add.image(0, 0, "order_background").setOrigin(0, 0).setInteractive()
    this.add.text(500, 300, "Paused", {
      fontFamily: "font1",
      fontSize: "50px",
      fill: "black",
    }).setOrigin(.5, .5)
    this.add.text(500, 380, "[Statistics]", {
      fontFamily: "font1",
      fontSize: "30px",
      fill: "black",
    }).setOrigin(.5, .5)

    this.day_text = this.add.text(500, 430, "Day: 0", {
      fontFamily: "font1",
      fontSize: "30px",
      fill: "black",
      wordWrap: { width: 300 },
      align: 'center'
    }).setOrigin(.5, 0)

    this.order_text = this.add.text(500, 480, "Total Orders: 0", {
      fontFamily: "font1",
      fontSize: "30px",
      fill: "black",
      wordWrap: { width: 300 },
      align: 'center'
    }).setOrigin(.5, 0)

     this.points_text = this.add.text(500, 530, "Total Correct: 0", {
      fontFamily: "font1",
      fontSize: "30px",
      fill: "black",
      wordWrap: { width: 300 },
      align: 'center'
    }).setOrigin(.5, 0)

    this.pres_text = this.add.text(500, 580, "Presentation: 0/100", {
      fontFamily: "font1",
      fontSize: "30px",
      fill: "black",
      wordWrap: { width: 300 },
      align: 'center'
    }).setOrigin(.5, 0)

    this.punc_text = this.add.text(500, 630, "Punctuality: 0/100", {
      fontFamily: "font1",
      fontSize: "30px",
      fill: "black",
      wordWrap: { width: 300 },
      align: 'center'
    }).setOrigin(.5, 0)

    this.prec_text = this.add.text(500, 680, "Precision: 0/100", {
      fontFamily: "font1",
      fontSize: "30px",
      fill: "black",
      wordWrap: { width: 300 },
      align: 'center'
    }).setOrigin(.5, 0)
  },
  update() {
    if (this.registry.get("Day")) {
      this.day_text.text = "Day: " + this.registry.get("Day")
    }
    if (this.registry.get("Total_Orders")) {
      this.order_text.text = "Total Orders: " + this.registry.get("Total_Orders")
    }
    if (this.registry.get("Total_Correct")) {
      this.points_text.text = "Total Correct: " + this.registry.get("Total_Correct")
    }
    if (this.registry.get("Average_Presentation")) {
      this.pres_text.text = "Presentation: " + this.registry.get("Average_Presentation") + "/100"
    }
    if (this.registry.get("Average_Punctuality")) {
      this.punc_text.text = "Punctuality: " + this.registry.get("Average_Punctuality") + "/100"
    }
    if (this.registry.get("Average_Precision")) {
      this.prec_text.text = "Precision: " + this.registry.get("Average_Precision") + "/100"
    }
  }
};

export default SettingsState;
