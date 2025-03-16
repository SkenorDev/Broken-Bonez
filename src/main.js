
"use strict"
let config = {
  type: Phaser.AUTO,
  render: {
      pixelArt: true
  },
  width:400,
  height: 256,
  physics: {
      default: "arcade",
      arcade: {
          debug: false
      }
  },
  zoom: 2,
    scene: [ Menu, Play, Over, Credits,Tutorial]
  }
  
  let game = new Phaser.Game(config)
  let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3
