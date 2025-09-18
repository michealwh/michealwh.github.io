/* global colors, Phaser */

const debug = false;

const passage = `The Time Traveller (for so it will be convenient to speak of him) was
expounding a recondite matter to us. His pale grey eyes shone and
twinkled, and his usually pale face was flushed and animated. The fire
burnt brightly, and the soft radiance of the incandescent lights in the
lilies of silver caught the bubbles that flashed and passed in our
glasses. Our chairs, being his patents, embraced and caressed us rather
than submitted to be sat upon, and there was that luxurious
after-dinner atmosphere, when thought runs gracefully free of the
trammels of precision. And he put it to us in this way—marking the
globs with a lean forefinger—as we sat and lazily admired his
earnestness over this new paradox (as we thought it) and his fecundity.

“You must follow me carefully. I shall have to controvert one or two
ideas that are almost universally accepted. The geometry, for instance,
they taught you at school is founded on a misconception.”`;

const textStyle = {
  fontSize: 32,
  lineSpacing: 4,
  fontFamily: "serif"
};

function preload() {
  this.load.image("bg", "https://labs.phaser.io/assets/skies/nebula.jpg");
}

function create() {
  this.add.text(32, 32, passage, textStyle).setAlpha(0.25).setVisible(debug);
  const text = this.add.text(32, 32, passage, textStyle);
  const {
    lineHeight,
    lineSpacing,
    lineWidths
  } = Phaser.GameObjects.GetTextSize(
    text,
    text.getTextMetrics(),
    passage.split("\n")
  );
  const totalLineHeight = lineHeight + lineSpacing;
  this.add
    .grid(
      text.x,
      text.y,
      text.width,
      text.height,
      lineHeight,
      totalLineHeight,
      0,
      0,
      0x00ffff,
      0.2
    )
    .setOrigin(0, 0)
    .setVisible(debug);
  const maskImage = this.add
    .graphics({
      fillStyle: { color: 0xff0000, alpha: 0.5 }
    })
    .setVisible(debug);
  const mask = maskImage.createGeometryMask();

  text.setMask(mask);

  const path = new Phaser.Curves.Path();

  for (let i = 0, len = lineWidths.length; i < len; i++) {
    const lineWidth = lineWidths[i];
    const y = text.y + i * totalLineHeight;

    path.moveTo(text.x, y).lineTo(text.x + lineWidth, y);
  }

  const pathDisplay = this.add
    .graphics({ lineStyle: { color: 0xffff00, alpha: 0.5, width: 2 } })
    .setVisible(debug);

  path.draw(pathDisplay);

  this.tweens.addCounter({
    from: 0,
    to: 1,
    duration: 40 * passage.length,
    onUpdate: (counter) => {
      const { x, y } = path.getPoint(counter.getValue());

      maskImage.clear();

      if (y > 0) {
        maskImage.fillRect(text.x, text.y, text.width, y - text.y);
      }

      maskImage.fillRect(text.x, y, x - text.x, totalLineHeight);
    }
  });
}

new Phaser.Game({ scene: { preload, create } });