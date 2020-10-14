
function startGame() {
   
    myGameArea.start();
    road1 = new Background(window.innerWidth, window.innerHeight, "road.png", 0, 0);
    road2 = new Background(window.innerWidth, window.innerHeight, "road.png", 0, -1 * window.innerHeight + 1);
    road3 = new Background(window.innerWidth, window.innerHeight, "road.png", 0, -2 * window.innerHeight + 1);
    road4 = new Background(window.innerWidth, window.innerHeight, "road.png", 0, 0);

    MainVec = new Vechile(window.innerWidth / 9, window.innerHeight / 8.5, "ambulance.png", window.innerWidth / 2.7, (window.innerHeight / 5) * 4);

    car1 = new Vechile(window.innerWidth / 9, window.innerHeight / 8.5, "Rcar1.png", window.innerWidth / 2.7, 0 - window.innerHeight * 2);
    car2 = new Vechile(window.innerWidth / 9, window.innerHeight / 8.5, "Rcar2.png", window.innerWidth / 2.7, -1*(window.innerHeight / 5) * 1 - window.innerHeight * 2);
    car3 = new Vechile(window.innerWidth / 9, window.innerHeight / 8.5, "Rcar2.png", window.innerWidth / 2.7, -1*(window.innerHeight / 5) * 2 - window.innerHeight * 2);
    car4 = new Vechile(window.innerWidth / 9, window.innerHeight / 8.5, "car4.png", window.innerWidth / 2.7, -1*(window.innerHeight / 5) * 3 - window.innerHeight * 2);
    car5 = new Vechile(window.innerWidth / 9, window.innerHeight / 8.5, "car5.png", window.innerWidth / 2.7, -1*(window.innerHeight / 5) * 4 - window.innerHeight * 2);
    car6 = new Vechile(window.innerWidth / 9, window.innerHeight / 8.5, "car6.png", window.innerWidth / 2.7, -1*(window.innerHeight / 5) * 5- window.innerHeight * 2);
    car7 = new Vechile(window.innerWidth / 9, window.innerHeight / 8.5, "car3.png", window.innerWidth / 2.7, -1*(window.innerHeight / 5) * 6 - window.innerHeight * 2);
    truck1 = new Vechile(window.innerWidth / 7.5, window.innerHeight / 3, "Trucks1.png", window.innerWidth / 2.7, -1*(window.innerHeight / 5) * 7 - window.innerHeight * 2);
    Rtruck = new Vechile(window.innerWidth / 7.5, window.innerHeight / 3, "RTrucks1.png", window.innerWidth / 2.7, -1*(window.innerHeight / 5) * 7 - window.innerHeight * 2);

    button = new MoveKeys(window.innerWidth / 1.2, window.innerHeight / 1 / 1, "gone.png", 50, 100);
    text = new componenttext(" Score: " + road1.count, 20, 30);
    gameover = new componenttext2("Game Over", window.innerWidth / 4, window.innerHeight / 2);
    

}

var myGameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.canvas.position = "absolute";
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 4);

        window.addEventListener('touchstart', function (e) {
            var touchobj = e.changedTouches[0];
            startx = parseInt(touchobj.clientX);
            starty = parseInt(touchobj.clientY);
            myGameArea.x = startx;
            myGameArea.y = starty;

        }
        )
        window.addEventListener('touchend', function () {
            startx = false;
            starty = false;

            myGameArea.x = false;
            myGameArea.y = false;

        }
        )

    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop: function () {
        clearInterval(this.interval);

    }
}
function Vechile(width, height, picsrc, x, y) {
    this.image = new Image();
    this.image.src = picsrc;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 1;
    this.health = 100;
    this.score = 0;
    this.x = x;
    this.y = y;
    this.update = function () {
        ctx = myGameArea.context;
        ctx.drawImage(this.image,
            this.x,
            this.y,
            this.width, this.height);
    }
    this.crashWith = function (otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop +10) ||
            (mytop +10 > otherbottom) ||
            (myright   < otherleft +5) ||
            (myleft +5 > otherright )) {
            crash = false;
        }
        return crash;
    }
}

function MoveKeys(width, height, picsrc, x, y) {
    this.image = new Image();
    this.image.src = picsrc;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.x = x;
    this.y = y;
    this.update = function () {
        ctx = myGameArea.context;
        ctx.drawImage(this.image,
            this.x,
            this.y,
            this.width, this.height)
    }
    this.clicked = function () {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var clicked = true;
        if ((mybottom < myGameArea.y) || (mytop > myGameArea.y) || (myright < myGameArea.x) || (myleft > myGameArea.x)) {
            clicked = false;
        }
        return clicked;
    }
}


function Background(width, height, picsrc, x, y) {
    this.image = new Image();
    this.image.src = picsrc;
    this.width = width;
    this.height = height;
    this.speedY = 1;
    this.count = 0;
    this.counter = 0;
    this.x = x;
    this.y = y;

    this.update = function () {
        ctx = myGameArea.context;
        ctx.drawImage(this.image,
            this.x,
            this.y,
            this.width, this.height)
    }
}
function componenttext(text, x, y) {

    this.update = function () {
        ctx = myGameArea.context;
        ctx.font = "21px Showcard Gothic ";
        ctx.fillStyle = "white";
        text = " Score:" + road1.count +"  High:" +highscore();
        this.x = x;
        this.y = y;
        ctx.fillText(text, x, y);
    }
}

function componenttext2(text, x, y) {

    this.update = function () {
        ctx = myGameArea.context;
        ctx.font = "bold 40px Segoe UI ";
        ctx.fillStyle = "white";
        this.x = x;
        this.y = y;
        ctx.fillText(text, x, y);
    }
}



function updateGameArea() {
    myGameArea.clear();

    Roads();
    text.update();
    CarsRight();
    MainVec.update();
    Movement();
    gameOver();

}

function Roads() {
    road1.speedY = 2;
    road1.y += road1.speedY;
    road2.y += road1.speedY;
    road3.y += road1.speedY;

    if (road1.y >= window.innerHeight * 2) {
        road1.y = -1 * window.innerHeight + 1;
    }
    if (road2.y >= window.innerHeight * 2) {
        road2.y = -1 * window.innerHeight + 1;
    }
    if (road3.y >= window.innerHeight * 2) {
        road3.y = -1 * window.innerHeight + 1;
    }
    road1.counter++;
    if (road1.counter == 100) {
        road1.count++;
        road1.counter = 0;
    }

    road4.update();
    road1.update();
    road2.update();
    road3.update();

}

function CarsRight() {
    truck1.speedY = 1.3;
    car1.speedY = 2.8;
    car2.speedY = 2.8;
    car3.speedY = 2.8;
    Rtruck.speedY = 2.2;

    car1.y += car1.speedY;
    car2.y += car2.speedY;
    car3.y += car3.speedY;
    car4.y += car4.speedY;
    car5.y += car5.speedY;
    car6.y += car6.speedY;
    car7.y += car7.speedY;
    truck1.y += truck1.speedY;
    Rtruck.y += Rtruck.speedY;

    car1.x = window.innerWidth / 4.7;
    car2.x =  window.innerWidth / 2.7;
    car3.x =  window.innerWidth / 2.7;
    Rtruck.x = window.innerWidth / 4.7;

    car4.x = window.innerWidth / 1.9;
    car5.x = window.innerWidth / 1.9;
    car6.x = window.innerWidth / 1.49;
    car7.x = window.innerWidth / 1.49;
    truck1.x = window.innerWidth / 1.49;

    if (car7.y >= window.innerHeight) {
        serit = Math.floor(Math.random() * 4) + 1;
        if (serit == 1) {
            car1.y = -1 * (window.innerHeight / 5) * 2;
            car2.y = -1 * (window.innerHeight / 5) * 3;
            car3.y = -1 * (window.innerHeight / 5) * 7;
            car4.y = -1 * (window.innerHeight / 5) * 1;
            car5.y = -1 * (window.innerHeight / 5) * 5;
            car6.y = -1 * (window.innerHeight / 5) * 3;
            car7.y = -1 * (window.innerHeight / 5) * 7;
        }
        else if (serit == 2) {
            Rtruck.y = -1 * (window.innerHeight / 5) * 6;
            car2.y = -1 * (window.innerHeight / 5) * 6;
            car5.y = -1 * (window.innerHeight / 5) * 5;
            truck1.y = -1 * (window.innerHeight / 5) * 2;
            car7.y = -1 * (window.innerHeight / 5) * 7;
            car4.y = -1 * (window.innerHeight / 5) * 3;
        }
        else if (serit == 3) {
            car1.y = -1 * (window.innerHeight / 5) * 2;
            car2.y = -1 * (window.innerHeight / 5) * 4;
            car3.y = -1 * (window.innerHeight / 5) * 7;
            car4.y = -1 * (window.innerHeight / 5) * 1;
            car6.y = -1 * (window.innerHeight / 5) * 5;
            car5.y = -1 * (window.innerHeight / 5) * 3;
            car7.y = -1 * (window.innerHeight / 5) * 7;
        }
        else {

            car4.y = -1 * (window.innerHeight / 5) * 3;
            car5.y = -1 * (window.innerHeight / 5) * 5;
            car6.y = -1 * (window.innerHeight / 5) * 4;
            car7.y = -1 * (window.innerHeight / 5) * 7;
        }


    }


    car1.update();
    car2.update();
    car3.update();
    car4.update();
    car5.update();
    car6.update();
    car7.update();
    truck1.update();
    Rtruck.update();
}

function Movement() {


    if (button.clicked()) {
        MainVec.x += 0.5;
    
    }
    else {
        MainVec.x -= 0.5;
       
    }


    button.update();

}

function gameOver() {

    if (MainVec.crashWith(car1) || MainVec.crashWith(car2) || MainVec.crashWith(car3) || MainVec.crashWith(car4) ||
        MainVec.crashWith(car5) || MainVec.crashWith(car6) || MainVec.crashWith(car7) || MainVec.crashWith(truck1) ||
        MainVec.crashWith(Rtruck) || MainVec.x < window.innerWidth/8.5 || MainVec.x > 7.5* window.innerWidth/10  ) {

            
        
        gameover.update();
        myGameArea.stop();
    }
}

function highscore(){
    var score=0;

    if( localStorage.getItem("key") !== null){
        if (road1.count > localStorage.getItem("key")) {
            localStorage.setItem("key", road1.count );
        }
    }
    else{
        localStorage.setItem("key", score);
    }
    return localStorage.getItem("key");
}
