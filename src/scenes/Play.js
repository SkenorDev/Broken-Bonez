class Play extends Phaser.Scene {
    constructor() {
      super("playScene")
    }
    init() {
      // useful variables
      this.idle=5
      this.maxspeed=200
      this.addedvel=50
     
  }
    create() {
      const map = this.add.tilemap('tilemapJSON');
      const tileset = map.addTilesetImage('tileset', 'tilesetImage')

      map.createLayer('sky', tileset, 0, 0);
      map.createLayer('decorations', tileset, 0, 0)
      const groundLayer = map.createLayer('ground', tileset, 0, 0)
      const deathLayer = map.createLayer('death', tileset, 0, 0)

      // Enable collision on ground layer
     
      groundLayer.setCollisionByExclusion([-1])
      console.log(groundLayer.layer.collideIndexes)
      // Create bike with physics
      this.bike = this.physics.add.sprite(20, 100, 'bike')
      this.bike.setBodySize(1,16)
      this.bike.setGravityY(150)
      //this.bike.setCollideWorldBounds(true)

      // Add collider between bike and ground
      this.physics.add.collider(this.bike, groundLayer)
      this.physics.add.collider(this.bike, deathLayer)
      // Camera settings
      this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
      this.cameras.main.startFollow(this.bike, true, 0.25, 0.25);

      // Debugging (Uncomment to see collision boxes)
       this.physics.world.createDebugGraphic()
       groundLayer.renderDebug(this.add.graphics(), { tileColor: null, collidingTileColor: new Phaser.Display.Color(255, 0, 0, 100) })
       this.cursors = this.input.keyboard.createCursorKeys()
       this.bike.setMaxVelocity(this.maxspeed)
       this.bike.setDragX(5)
    }
    update() {
      if(this.cursors.right.isDown) {
        this.bike.setAccelerationX(this.addedvel)
    }
    if(!this.cursors.right.isDown) {
      this.bike.setAccelerationX(0)
  }
  if(this.cursors.left.isDown) {
    this.bike.setDragX(this.addedvel)
}
if(!this.cursors.left.isDown) {
  this.bike.setDragX(5)
}
if(this.cursors.up.isDown && !this.bike.body.blocked.down) {
  this.bike.setAngularVelocity(360);
}


if (this.cursors.down.isDown && !this.bike.body.blocked.down) {
  this.bike.setAngularVelocity(360);
}
if(this.cursors.space.isDown && this.bike.body.blocked.down) {
  this.bike.setVelocityY(-100);
}
if (this.bike.body.blocked.down) {
  if(this.bike.angle>45){
    this.scene.start('menuScene')
  }
  if(this.bike.angle<-45){
    this.scene.start('menuScene')
  }
  this.bike.setAngularVelocity(0);
  this.bike.setAngle(0);
}
if(this.bike.y>256){
  this.scene.start('menuScene')
}
      }
    
  }

  