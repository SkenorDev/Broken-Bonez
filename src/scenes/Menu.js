class Menu extends Phaser.Scene {
  constructor() {
      super("menuScene");
  }
 
  preload() {
      this.load.path = './assets/';
      this.load.image('tilesetImage', 'tileset.png');
      this.load.tilemapTiledJSON('tilemapJSON', 'BB_Start.json');
      this.load.image('bike', 'motorbike.png');
      this.load.image('title', 'title.jpg');
  }

  create() {
    // Display title image centered
    this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'title')
        .setOrigin(0.5)
        .setDisplaySize(this.cameras.main.width, this.cameras.main.height);

    // Add start text
    const startText = this.add.text(this.cameras.main.width / 2, this.cameras.main.height - 100,
        "Press SPACE to Start", 
        { font: "32px Arial", fill: "#ffffff" }
    ).setOrigin(0.5);

    // Start game on SPACE key press
    this.input.keyboard.once('keydown-SPACE', () => {
        this.scene.start('playScene'); // Change 'gameScene' to your actual game scene
    });
}
}