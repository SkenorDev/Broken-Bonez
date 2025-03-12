class Over extends Phaser.Scene {
    constructor() {
        super("overScene");
    }
    init(data) {
        // Access the score passed from the previous scene
        this.score = data.score;
    }
    create() {
        
        this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'over')
        .setOrigin(0.5)
        .setDisplaySize(this.cameras.main.width, this.cameras.main.height);

        // Add start text
        const startText = this.add.text(this.cameras.main.width / 2, 50 ,
            `             Your score was: ${this.score} \n Press SPACE to Restart and LEFT for Menu`, 
            { font: "15px Arial", fill: "#55555" }
        ).setOrigin(0.5);
    
        // Start game on SPACE key press
        this.input.keyboard.once('keydown-SPACE', () => {
            this.scene.start('playScene'); // Change 'gameScene' to your actual game scene
        });
        this.input.keyboard.once('keydown-LEFT', () => {
            this.scene.start('creditScene'); // Change 'gameScene' to your actual game scene
        });
    }
    }