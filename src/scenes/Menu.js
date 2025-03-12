class Menu extends Phaser.Scene {
  constructor() {
      super("menuScene");
  }
 
  preload() {
      this.load.path = './assets/';
      this.load.image('tilesetImage', 'tileset.png');
      this.load.tilemapTiledJSON('tilemapJSON', 'BB_Start.json');
      this.load.tilemapTiledJSON('tilemapJSON1', 'BB_1.json');
      this.load.tilemapTiledJSON('tilemapJSON2', 'BB_2.json');
      this.load.tilemapTiledJSON('tilemapJSON3', 'BB_3.json');
      this.load.tilemapTiledJSON('tilemapJSON4', 'BB_4.json');
      this.load.tilemapTiledJSON('tilemapJSON5', 'BB_5.json');
      this.load.tilemapTiledJSON('tilemapJSON6', 'BB_6.json');
      this.load.tilemapTiledJSON('tilemapJSON7', 'BB_7.json');
      this.load.audio('explosion', 'boom.wav')
      this.load.audio('jump', 'jump.wav')
      this.load.audio('sfx-motor', 'motorsound.mp3')
      this.load.audio('music', 'music.mp3')
      this.load.image('bike', 'motorbike.png');
      this.load.image('title', 'title.jpg');
      this.load.image('over', 'over.jpg');
      this.load.image('pixel', 'white_pixel.png')
      this.load.image('credit', 'credit.png')
  }

  create() {
    let music = this.sound.get('music'); // Check if music already exists

    if (!music) {
        // Only create and play if it's not already playing
        music = this.sound.add('music', { loop: true, volume: 0.25 });
        music.play();
    }
    // Display title image centered
    this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'title')
        .setOrigin(0.5)
        .setDisplaySize(this.cameras.main.width, this.cameras.main.height);

    // Add start text
    const startText = this.add.text(this.cameras.main.width / 2, this.cameras.main.height - 10,
        "Press SPACE to Start, left arrow for credits, down for tutorial", 
        { font: "13px Arial", fill: "#ffffff" }
    ).setOrigin(0.5);
    this.input.keyboard.once('keydown-LEFT', () => {
        this.scene.start('creditScene'); // Change 'gameScene' to your actual game scene
    });
    this.input.keyboard.once('keydown-DOWN', () => {
        this.scene.start('tutorialScene'); // Change 'gameScene' to your actual game scene
    });
    // Start game on SPACE key press
    this.input.keyboard.once('keydown-SPACE', () => {
        this.scene.start('playScene'); // Change 'gameScene' to your actual game scene
    });
}
}