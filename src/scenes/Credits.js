class Credits extends Phaser.Scene {
    constructor() {
        super("creditScene");
    }

    create() {
        
        // Display title image centered
        this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'credit')
            .setOrigin(0.5)
            .setDisplaySize(this.cameras.main.width);
    
        
        const startText = this.add.text(this.cameras.main.width / 2, this.cameras.main.height - 200,
            "Press SPACE to leave", 
            { font: "20px Arial", fill: "#ffffff" }
        ).setOrigin(0.5);
        this.add.text(this.cameras.main.width / 2, this.cameras.main.height/2-40  ,
            "Jump Sound  -  https://freesound.org/people/cabled_mess/sounds/350904/", 
            { font: "10px Arial", fill: "#ffffff" }
        ).setOrigin(0.5);
        this.add.text(this.cameras.main.width / 2, this.cameras.main.height/2-20  ,
            "Music  -  https://www.youtube.com/watch?v=PckLALGzXH8&list=PLVO9-kJCzLJ9Ito4B5ImX9JFBslqhO11z", 
            { font: "8px Arial", fill: "#ffffff" }
        ).setOrigin(0.5);
        this.add.text(this.cameras.main.width / 2, this.cameras.main.height/2  ,
            "Explosion sound  -  https://tokka.itch.io/pixel-explosion-basic-set", 
            { font: "10px Arial", fill: "#ffffff" }
        ).setOrigin(0.5);
    
        // Start game on SPACE key press
        this.input.keyboard.once('keydown-SPACE', () => {
            this.scene.start('menuScene'); 
        });

      
    }
    }