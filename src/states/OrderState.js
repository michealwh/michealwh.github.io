var OrderState = {
  preload() {},

  create() {
    const order_background = this.add
      .image(0, 0, "order_background")
      .setOrigin(0, 0)
      .setInteractive();
    this.add
      .text(500, 300, "Orders", {
        fontFamily: "font1",
        fontSize: "50px",
        fill: "black",
      })
      .setOrigin(0.5, 0.5);
    this.order_text = this.add
      .text(500, 400, "", {
        fontFamily: "font1",
        fontSize: "30px",
        fill: "black",
        wordWrap: { width: 300 },
        align: "center",
      })
      .setOrigin(0.5, 0);
  },

  update() {
    if (this.registry.get("Order_Text")) {
      this.order_text.text =
        " the bottom bun and the top bun and the beefpatty and" +
        this.registry.get("Order_Text");
    }
  },
};

export default OrderState;
