const game = {

    config : {
        COLUMNS : 10,
        ROWS : 16,
        CELL_SIZE : 47,
        DIFFICULTY : 1,
        MOVE_BUFFER : 120,
        MOVE_STEP : 85,
        GRAVITY_STEP : 750,
        LOCK_DELAY : 500,
        MAX_LOCK_RESETS : 10,
        FPS : 60
    },

    state : {
        board : [],
        score : 0,
        combo : 0,
        playingTime : 0,
        deltaTime : 0,
        paused : false,
        restarting : false,
        gameIsOver : false,
        gameOverAlreadyShown : false,
        canvas : null,
        canvasCtx : null,

    },

    activePiece : {
        x : 5,
        y : 3,
        rotation : 0,
        movedThisFrame : false,
        shapeId : 0,
        blockMap : [],
        ghostPiece : []

    },

    //Input is tracked in ms pressed
    input : {
        left : 0,

        right : 0,

        down : 0,

        rotate : 0,

        drop : 0
    },

    ui : {
        // Buttons
        pauseButton : document.getElementById("pauseButton"),
        pauseLabel : pauseButton.querySelector(".label"),
        pauseIcon : pauseButton.querySelector(".icon"),

        restartButton : document.getElementById("restartButton"),

        // Stats
        timeDisplay : document.getElementById("timeDisplay"),
        scoreDisplay : document.getElementById("scoreDisplay"),
        growingScore : 0, // The score that is displayed, not the actual internal score
        comboDisplay : document.getElementById("comboDisplay")
    },

    assets : {
        // O L T J I Z
        BEANS_SOURCE : ["images/red-beans.jpg",
                        "images/green-peas.jpg",
                        "images/black-beans.jpg", 
                        "images/tomato-beans.jpg", 
                        "images/chick-peas.jpg", 
                        "images/lentils.png",
                        "images/pinto-beans.jpg"],
                        
        BEANS : [],
        dryFartSound : new Audio("sounds/dry-fart.mp3"),
        youLostPayitoSound : new Audio("sounds/you-lost-payito.mp3")
    }

};