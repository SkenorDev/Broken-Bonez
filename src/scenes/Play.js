class Play extends Phaser.Scene {
    constructor() {
      super("playScene")
    }
    init() {
      // useful variables
      this.idle=5
      this.maxspeed=200
      this.addedvel=10
     
  }
    create() {
      const map = this.add.tilemap('tilemapJSON');
      const tileset = map.addTilesetImage('tileset', 'tilesetImage');

      const skyLayer = map.createLayer('sky', tileset, 0, 0);
      const decLayer = map.createLayer('decorations', tileset, 0, 0);
      const groundLayer = map.createLayer('ground', tileset, 0, 0);

      // Enable collision on ground layer
      groundLayer.setCollisionByProperty({ collides: true });
      groundLayer.setCollisionByExclusion([-1]);
      console.log(groundLayer.layer.collideIndexes);
      // Create bike with physics
      this.bike = this.physics.add.sprite(100, 100, 'bike');
      this.bike.setGravityY(150);
      this.bike.setCollideWorldBounds(true);

      // Add collider between bike and ground
      this.physics.add.collider(this.bike, groundLayer);

      // Camera settings
      this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
      this.cameras.main.startFollow(this.bike, true, 0.25, 0.25);

      // Debugging (Uncomment to see collision boxes)
       this.physics.world.createDebugGraphic();
       groundLayer.renderDebug(this.add.graphics(), { tileColor: null, collidingTileColor: new Phaser.Display.Color(255, 0, 0, 100) });
    }
    update() {
        
        
      }
    
  }