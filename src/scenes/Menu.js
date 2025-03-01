class Menu extends Phaser.Scene {
    constructor() {
      super("menuScene")
    }
    preload() {
        // load images/tile sprites
         this.load.path = './assets/'
         this.load.image('tilesetImage','tileset.png')
         this.load.tilemapTiledJSON('tilemapJSON','BB_Start.json')
         this.load.image('bike','motorbike.png')
      }
    create() {
      const map=this.add.tilemap('tilemapJSON')
      const tileset = map.addTilesetImage('tileset','tilesetImage')
     
      
      const skyLayer =map.createLayer('sky',tileset,0,0)
      const decLayer =map.createLayer('decorations',tileset,0,0)
      const groundLayer =map.createLayer('ground',tileset,0,0)
      this.bike = this.physics.add.sprite(100, 100, 'bike', 0)
      groundLayer.setCollisionByProperty({collides:true})
      //this.physics.world.setBounds(0,0,map.widthInPixels,map.heightInPixels)
      this.cameras.main.setBounds(0,0,map.widthInPixels,map.heightInPixels)
      this.cameras.main.startFollow(this.bike,true,0.25,0.25)
//groundLayer.setCollisionByProperty({collides:true})
this.physics.add.collider(this.bike,groundLayer)
this.bike.setGravityY(100)
this.bike.body.setCollideWorldBounds(true)

      }


      update() {
         
      }
      
    }
  