class Tutorial extends Phaser.Scene {
    constructor() {
        super("tutorialScene");
    }
    init(data) {
     
    }
    
        create() {
        
            // Display title image centered
            this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'credit')
                .setOrigin(0.5)
                .setDisplaySize(this.cameras.main.width);
        
            
            const startText = this.add.text(this.cameras.main.width / 2, this.cameras.main.height - 200,
                "Press SPACE to leave", 
                { font: "15px Arial", fill: "#ffffff" }
            ).setOrigin(0.5);
            this.add.text(this.cameras.main.width / 2, this.cameras.main.height/2-40  ,
                "Space = Jump (duh)", 
                { font: "15px Arial", fill: "#ffffff" }
            ).setOrigin(0.5);
            this.add.text(this.cameras.main.width / 2, this.cameras.main.height/2-20  ,
                "Right Arrow= increase speed, Left Arrow=Slow down ", 
                { font: "15px Arial", fill: "#ffffff" }
            ).setOrigin(0.5);
            this.add.text(this.cameras.main.width / 2, this.cameras.main.height/2  ,
                "Up=Start backflip, Down= slow down backflip speed, ", 
                { font: "15px Arial", fill: "#ffffff" }
            ).setOrigin(0.5);
            this.add.text(this.cameras.main.width / 2, this.cameras.main.height/2+20  ,
                "Landing backflip gives a score mult landing wrong makes you lose ", 
                { font: "10px Arial", fill: "#ffffff" }
            ).setOrigin(0.5);
        
            // Start game on SPACE key press
            this.input.keyboard.once('keydown-SPACE', () => {
                this.scene.start('menuScene'); 
            });
    
          
        }
        }