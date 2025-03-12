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
    this.death=0
    this.mult=1
    this.uponce=0
    this.gameover=false;
  }
    create() {
      let jump = this.sound.get('jump');
      const map = this.add.tilemap('tilemapJSON');
      const tileset = map.addTilesetImage('tileset', 'tilesetImage')

      map.createLayer('sky', tileset, 0, 0);
      map.createLayer('decorations', tileset, 0, 0)
      const groundLayer = map.createLayer('ground', tileset, 0, 0)
    
      this.movingEmitter = this.add.particles(0, 0, 'pixel', {
        speed: 50,
        gravityX: -200,
        gravityY: 200,
        scale: { start: 0.1, end: .5 },
        alpha: { start: 1, end: 0 },
        // higher steps value = more time to go btwn min/max
        
    })
      // Enable collision on ground layer
     
      groundLayer.setCollisionByExclusion([-1])
      console.log(groundLayer.layer.collideIndexes)
      // Create bike with physics
      this.bike = this.physics.add.sprite(20, 100, 'bike')
      this.bike.setBodySize(1,16)
      this.bike.setGravityY(150)
      //this.movingEmitter.startFollow(this.bike, -20, 10, false)
      //this.bike.setCollideWorldBounds(true)
      this.bike.setDepth(10000000000000000000)
      // Add collider between bike and ground
      this.physics.add.collider(this.bike, groundLayer)
     
      // Camera settings
      this.cameras.main.setBounds(0, 0, 200, 128)
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
       this.scoreText = this.add.text(30, 20, 'Score: 0', {
        fontSize: '16px',
        fill: '#ffffff',
        fontFamily: 'Arial',
      }).setScrollFactor(0);
      this.scoreText.setDepth(10000000000000000001)
    }
    update() {
      this.score = Math.floor((this.bike.x-20)*this.mult)
      this.scoreText.setText(`Score: ${this.score}`)
      this.movingEmitter.setPosition(this.bike.x - 20, this.bike.y + 10);
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
if(this.cursors.up.isDown && !this.bike.body.blocked.down&&this.uponce<1) {
  this.bike.setAngularVelocity(360);
  this.mult=this.mult+1
  this.uponce++
}


if (this.cursors.down.isDown && !this.bike.body.blocked.down) {
  this.bike.setAngularDrag(200);
}

if (this.bike.body.blocked.down) {
  if(this.bike.angle>46){
    console.log("angle")
    this.sound.play('explosion')
    this.scene.start('overScene', { score: this.score })
  }
  if(this.bike.angle<-46){
    console.log("angle")
    this.sound.play('explosion')
    this.scene.start('overScene', { score: this.score })
  }
  this.bike.setAngularVelocity(0);
  this.bike.setAngle(0);
  this.bike.setAngularDrag(0);
  this.uponce=0
}

if(this.bike.y>256){
  this.sound.play('explosion')
  this.scene.start('overScene', { score: this.score })
  console.log("fall")
}

 if(this.bike.body.velocity.x<this.count){
   this.bike.setVelocityX(this.count)
 }

if(this.bike.body.blocked.right){
  console.log(this.score)
  console.log("wall")
  
  this.death++
  if(this.death>3){
    this.sound.play('explosion')
    this.scene.start('overScene', { score: this.score })
  }
}
else{
this.death=0
}
if (Phaser.Input.Keyboard.JustDown(this.cursors.space) && this.bike.body.blocked.down) {
  this.generatemap()
  
  this.bike.y=this.bike.y-3
  this.bike.setVelocityY(-100)
  
  
  if (this.uponce==0) {
    this.uponce = 1
    this.sound.play('jump')
    console.log("sick")
   
  }
}
if(this.cursors.space.isDown && this.bike.body.blocked.down) {
this.bike.setAngle(-20)
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

  
