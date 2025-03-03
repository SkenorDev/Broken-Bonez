class Play extends Phaser.Scene {
    constructor() {
      super("playScene")
    }
    init() {
      // useful variables
      this.idle=5
      this.maxspeed=200
      this.addedvel=50
      this.count=1
     this.score=0
     this.prevscore=0
  }
    create() {
      
      const map = this.add.tilemap('tilemapJSON');
      const tileset = map.addTilesetImage('tileset', 'tilesetImage')

      map.createLayer('sky', tileset, 0, 0);
      map.createLayer('decorations', tileset, 0, 0)
      const groundLayer = map.createLayer('ground', tileset, 0, 0)
    

      // Enable collision on ground layer
     
      groundLayer.setCollisionByExclusion([-1])
      console.log(groundLayer.layer.collideIndexes)
      // Create bike with physics
      this.bike = this.physics.add.sprite(20, 100, 'bike')
      this.bike.setBodySize(1,16)
      this.bike.setGravityY(150)
      //this.bike.setCollideWorldBounds(true)
      this.bike.setDepth(10000000000000000000)
      // Add collider between bike and ground
      this.physics.add.collider(this.bike, groundLayer)
     
      // Camera settings
      this.cameras.main.setBounds(0, 0, map.widthInPixels/2, map.heightInPixels/2)
      this.cameras.main.startFollow(this.bike, true, 1,1,-90);

      // Debugging (Uncomment to see collision boxes)
       //this.physics.world.createDebugGraphic()
       //groundLayer.renderDebug(this.add.graphics(), { tileColor: null, collidingTileColor: new Phaser.Display.Color(255, 0, 0, 100) })
       this.cursors = this.input.keyboard.createCursorKeys()
       this.bike.setMaxVelocity(this.maxspeed)
       this.bike.setDragX(5)
       this.generatemap()
       this.generatemap()
       this.generatemap()
    }
    update() {
      this.score+=this.bike.body.velocity+this.bike.body.angularAcceleration
      
      this.prevscore=this.score
      if(this.cursors.right.isDown) {
        this.bike.setAccelerationX(this.addedvel)
    }
    if(!this.cursors.right.isDown) {
      this.bike.setAccelerationX(0)
  }
  if(this.cursors.left.isDown) {
    this.bike.setDragX(this.addedvel*2)
}
if(!this.cursors.left.isDown) {
  this.bike.setDragX(40)
}
if(this.cursors.up.isDown && !this.bike.body.blocked.down) {
  this.bike.setAngularVelocity(360);
}


if (this.cursors.down.isDown && !this.bike.body.blocked.down) {
  this.bike.setAngularDrag(200);
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
  this.bike.setAngularDrag(0);
}
if(this.cursors.space.isDown && this.bike.body.blocked.down) {
  this.generatemap()
  //this.bike.y=this.bike.y-3
  this.bike.setVelocityY(-100)
  this.bike.angle=-20
}
if(this.bike.y>256){
  this.scene.start('menuScene')
}

 if(this.bike.body.velocity.x<this.idle){
   this.bike.setVelocityX(this.idle)
 }
 if(this.bike.body.velocity.x==0){
  this.scene.start('menuScene')
}
if(this.bike.body.blocked.right){
  this.scene.start('menuScene')
}
      }
    

      generatemap(){
        const map = this.add.tilemap(`tilemapJSON${Phaser.Math.Between(1,7)}`)
        const tileset = map.addTilesetImage('tileset', 'tilesetImage')
        map.createLayer('sky', tileset,this.count*256, 0);
        map.createLayer('decorations', tileset,this.count*256, 0,)
        const groundLayer = map.createLayer('ground', tileset, this.count*256, 0)
        this.cameras.main.setBounds(0, 0, (this.count + 1) * 256, this.cameras.main.height);
         this.count=this.count+1
         groundLayer.setCollisionByExclusion([-1])
         this.physics.add.collider(this.bike, groundLayer)
      }
  }

  