var SettingsState = {
  preload() {

  },

  create() {
    const order_background = this.add.image(0, 0, "order_background").setOrigin(0, 0).setInteractive()
    this.add.text(500, 300, "[Paused]", {
      fontFamily: "font1",
      fontSize: "50px",
      fill: "black",
    }).setOrigin(.5, .5)
    this.add.text(500, 380, "[Statistics]", {
      fontFamily: "font1",
      fontSize: "30px",
      fill: "black",
    }).setOrigin(.5, .5)

    this.day_text = this.add.text(500, 425, "Day: 0", {
      fontFamily: "font1",
      fontSize: "30px",
      fill: "black",
      wordWrap: { width: 300 },
      align: 'center'
    }).setOrigin(.5, 0)

        this.points_text = this.add.text(500, 425+55, "Total Globs: 0", {
      fontFamily: "font1",
      fontSize: "30px",
      fill: "black", //  #F2EBB7  #B7FB8AFF
      align: 'center'
    }).setOrigin(.5, 0)
    //this.points_text.setStroke("black",3) // #294118FF


    this.order_text = this.add.text(500, 480+55, "Total Orders: 0", {
      fontFamily: "font1",
      fontSize: "30px",
      fill: "black",
      wordWrap: { width: 300 },
      align: 'center'
    }).setOrigin(.5, 0)

     this.globs_text = this.add.text(500, 530+55, "Total Correct: 0", {
      fontFamily: "font1",
      fontSize: "30px",
      fill: "black",
      wordWrap: { width: 300 },
      align: 'center'
    }).setOrigin(0.5, 0)

    this.pres_text = this.add.text(320, 640, "Presentation: 0%", {
      fontFamily: "font1",
      fontSize: "30px",
      fill: "black",
      wordWrap: { width: 300 },
      align: 'center'
    }).setOrigin(0.5, 0)

    this.punc_text = this.add.text(680, 640, "Punctuality: 0%", {
      fontFamily: "font1",
      fontSize: "30px",
      fill: "black",
      wordWrap: { width: 300 },
      align: 'center'
    }).setOrigin(0.5, 0)

    this.prec_text = this.add.text(320, 720, "Precision: 0%", {
      fontFamily: "font1",
      fontSize: "30px",
      fill: "black",
      wordWrap: { width: 300 },
      align: 'center'
    }).setOrigin(0.5, 0)

    this.ples_text = this.add.text(680, 720, "Pleasantry: 0%", {
      fontFamily: "font1",
      fontSize: "30px",
      fill: "black",
      wordWrap: { width: 300 },
      align: 'center'
    }).setOrigin(0.5, 0)
  },
  update() {
    if (this.registry.get("Day")) {
      this.day_text.text = "Day: " + this.registry.get("Day")
    }
    if (this.registry.get("Total_Globs")) {
      this.points_text.text = "Total Globs: "+ this.registry.get("Total_Globs")
    }
    if (this.registry.get("Total_Orders")) {
      this.order_text.text = "Total Orders: " + this.registry.get("Total_Orders")
    }
    if (this.registry.get("Total_Correct")) {
      this.globs_text.text = "Total Correct: " + this.registry.get("Total_Correct")
    }
    if (this.registry.get("Average_Presentation")) {
      this.pres_text.text = "Presentation: " + this.registry.get("Average_Presentation") + "%"
    }
    if (this.registry.get("Average_Punctuality")) {
      this.punc_text.text = "Punctuality: " + this.registry.get("Average_Punctuality") + "%"
    }
    if (this.registry.get("Average_Precision")) {
      this.prec_text.text = "Precision: " + this.registry.get("Average_Precision") + "%"
    }
     if (this.registry.get("Average_Pleasantry")) {
      this.ples_text.text = "Pleasantry: " + this.registry.get("Average_Pleasantry") + "%"
    }
  }
};

export default SettingsState;
