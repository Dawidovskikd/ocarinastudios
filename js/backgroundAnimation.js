function sprite (options) {

    var that = {},
        frameIndex = 0,
        tickCount = 0,
        ticksPerFrame = options.ticksPerFrame || 1,
        numberOfFrames = options.numberOfFrames || 1;

    // that.oc = document.createElement('canvas');
    // that.octx = that.oc.getContext('2d');

    that.canvas = options.canvas;
    that.context = options.context;
    that.width = options.width;
    that.height = options.height;
    that.image = options.image;
    that.loop = options.loop;

    that.onLastFrame = function () {
        return (frameIndex == numberOfFrames -1);
    };

    that.onFirstFrame = function () {
        return (frameIndex == 0);
    };

    that.render = function () {

        // that.oc.width = (that.image.width/numberOfFrames) * 0.5;
        // that.oc.height = that.image.height * 0.5;

        that.context.clearRect(0, 0, that.canvas.width, that.canvas.height);
        // that.octx.drawImage(that.image , frameIndex * that.width , 0, that.oc.width, that.oc.height);
        // that.octx.drawImage(that.oc , frameIndex * that.width , 0, that.oc.width * 0.5, that.oc.height * 0.5);

        that.context.drawImage(
            that.image,
            frameIndex * that.width ,
            0,
            that.width ,
            that.height,
            0,
            0,
            that.canvas.width  *( (that.width >= that.height) ? 1 : that.width/that.height ) ,
            that.canvas.height *( (that.height >= that.width) ? 1 : that.height/that.width )
        );
    };

    that.update = function (direction) {

        tickCount += 1;

        if (tickCount > ticksPerFrame) {

            tickCount = 0;

            if (direction == 'backward' ){
                if( frameIndex > 0 ){
                    frameIndex -= 1;
                } else if(that.loop) {
                    frameIndex = 0;
                }
            } else if (frameIndex < numberOfFrames - 1) {
                // Go to the next frame
                frameIndex += 1;
            } else if(that.loop) {
                frameIndex = 0;
            }
        }
    };

    return that;
}

//Loading animation
var loadingSprite = sprite({
    width: 330,
    height: 258,
    numberOfFrames: 38,
    ticksPerFrame: 1,
    loop: true
});

var loadingInProgress = true;
function initLoading(img) {
    loadingInProgress = true;
    var canvas = document.getElementById('loading-canvas'),
        ctx = canvas.getContext('2d');

    loadingSprite.canvas = canvas;
    loadingSprite.context = ctx;
    loadingSprite.image = img;
    loadingAnimation();
}
function loadingAnimation() {

    if(loadingInProgress){
        window.requestAnimationFrame(loadingAnimation);
        loadingSprite.render();
        loadingSprite.update();
    }

}


//Background animation

var contentSwapProceeding = false;

var Hexagon = function (ctx ,radius , colorHex , transparency , x , y) {

    var R = hexToR(colorHex),
        G = hexToG(colorHex),
        B = hexToB(colorHex);

    function hexToR(h) {return parseInt((cutHex(h)).substring(0,2),16)}
    function hexToG(h) {return parseInt((cutHex(h)).substring(2,4),16)}
    function hexToB(h) {return parseInt((cutHex(h)).substring(4,6),16)}
    function cutHex(h) {return (h.charAt(0)=="#") ? h.substring(1,7):h}

    return {
        a : (Math.PI * 2)/6,
        ctx : ctx,
        radius: radius,
        colorHex: colorHex,
        transparency : transparency,
        x:x,
        xToWindow: x/window.innerWidth,
        yToWindow: y/window.innerHeight,
        y:y,
        render : function () {
            this.ctx.save();
            this.ctx.fillStyle = "rgba("+R+","+G+","+B+","+transparency+")";
            // this.ctx.fillStyle = "rgba(0, 0, 0, .2)";
            this.ctx.beginPath();
            ctx.translate(this.x,this.y);
            ctx.moveTo(radius,0);
            for (var i = 1; i < 6; i++) {
                ctx.lineTo(this.radius*Math.cos(this.a*i),this.radius*Math.sin(this.a*i));
            }
            this.ctx.closePath();
            this.ctx.fill();
            this.ctx.restore();
        },
        moveY : function ( scrollingDown ) {
            var y = (scrollingDown) ? this.y - this.radius/8 : this.y + this.radius/8 ;
            if ( y < -this.radius){
                y = window.innerHeight + this.radius
            } else if( y > window.innerHeight + this.radius ){
                y = -this.radius;
            }

            this.y = y;
        },
        onResize : function () {
            this.x = this.xToWindow * window.innerWidth;
            this.y = this.yToWindow * window.innerHeight;
            this.render();
        }
    }
};

function backgroundAnimation (hexagons , isScrollingDown) {
    contentSwapProceeding = true;
    animationFrame();
    function animationFrame() {
        if ( contentSwapProceeding ){
            window.requestAnimationFrame(animationFrame);
            hexagons[0].ctx.clearRect(0 , 0 , window.innerWidth , window.innerHeight );
            for( var i = 0 ; i < hexagons.length ; i++ ){
                hexagons[i].moveY(isScrollingDown);
                hexagons[i].render();
            }
        }
    }
}

//------------------------ Sprite icons animation ---------------------------//
var path = './wp-content/themes/ocarinastudios/img/icons/';
var testTubeSpriteIMG = new Image(),
    computerSpriteIMG = new Image(),
    telescopeSpriteIMG = new Image(),
    physicsSpriteIMG = new Image();


$(document).ready(function () {
    var testTubeCanvas =    document.getElementById("test-tube-canvas"),
        testTubeCanvas2 =   document.getElementById("test-tube-canvas-2"),
        computerCanvas =    document.getElementById("computer-canvas"),
        computerCanvas2 =   document.getElementById("computer-canvas-2"),
        telescopeCanvas =   document.getElementById("telescope-canvas"),
        telescopeCanvas2 =  document.getElementById("telescope-canvas-2"),
        physicsCanvas =     document.getElementById("physics-canvas"),
        physicsCanvas2 =    document.getElementById("physics-canvas-2");

    if (testTubeCanvas && computerCanvas && telescopeCanvas && physicsCanvas){
        var testTubeSprite = sprite({
            canvas: testTubeCanvas,
            context: testTubeCanvas.getContext("2d"),
            width: 66,
            height: 300,
            image: testTubeSpriteIMG,
            numberOfFrames: 179,
            ticksPerFrame: 2,
            loop: true
        }),testTubeSprite2 = sprite({
            canvas: testTubeCanvas2,
            context: testTubeCanvas2.getContext("2d"),
            width: 66,
            height: 300,
            image: testTubeSpriteIMG,
            numberOfFrames: 179,
            ticksPerFrame: 2,
            loop: true
        }),computerSprite = sprite({
            canvas: computerCanvas,
            context: computerCanvas.getContext("2d"),
            width: 200,
            height: 233,
            image: computerSpriteIMG,
            numberOfFrames: 2,
            ticksPerFrame: 60,
            loop: true
        }),computerSprite2 = sprite({
            canvas: computerCanvas2,
            context: computerCanvas2.getContext("2d"),
            width: 200,
            height: 233,
            image: computerSpriteIMG,
            numberOfFrames: 2,
            ticksPerFrame: 60,
            loop: true
        }),telescopeSprite = sprite({
            canvas: telescopeCanvas,
            context: telescopeCanvas.getContext("2d"),
            width: 297,
            height: 300,
            image: telescopeSpriteIMG,
            numberOfFrames: 60,
            ticksPerFrame: 2,
            loop: true
        }),telescopeSprite2 = sprite({
            canvas: telescopeCanvas2,
            context: telescopeCanvas2.getContext("2d"),
            width: 297,
            height: 300,
            image: telescopeSpriteIMG,
            numberOfFrames: 60,
            ticksPerFrame: 2,
            loop: true
        }),physicsSprite = sprite({
            canvas: physicsCanvas,
            context: physicsCanvas.getContext("2d"),
            width: 209,
            height: 200,
            image: physicsSpriteIMG,
            numberOfFrames: 107,
            ticksPerFrame: 1,
            loop: true
        }),physicsSprite2 = sprite({
            canvas: physicsCanvas2,
            context: physicsCanvas2.getContext("2d"),
            width: 209,
            height: 200,
            image: physicsSpriteIMG,
            numberOfFrames: 107,
            ticksPerFrame: 1,
            loop: true
        });


        $(testTubeSpriteIMG).on('error' , function () {
        });
        $(computerSpriteIMG).on('error' , function () {
        });
        $(telescopeSpriteIMG).on('error' , function () {
        });
        $(physicsSpriteIMG).on('error' , function () {
        });

        testTubeSpriteIMG.src = path + "test-tube-sprite.png";
        computerSpriteIMG.src = path + "computer-sprite.png";
        telescopeSpriteIMG.src = path + "telescope-sprite.png";
        physicsSpriteIMG.src = path + "physics-sprite.png";

        if(testTubeSpriteIMG.complete){
            testTubeSprite.render();
            testTubeSprite2.render();
            if (!isMobile()){
                testTubeAnimation();
            }
        }else{
            $(testTubeSpriteIMG).on('load' , function(){
                testTubeSprite.render();
                testTubeSprite2.render();
                if (!isMobile()){
                    testTubeAnimation();
                }
            });
        }

        if(computerSpriteIMG.complete){
            computerSprite.render();
            computerSprite2.render();
            if (!isMobile()){
                computerAnimation();
            }
        }else{
            $(computerSpriteIMG).on('load' , function(){
                computerSprite.render();
                computerSprite2.render();
                if (!isMobile()){
                    computerAnimation();
                }
            });
        }

        if(telescopeSpriteIMG.complete){
            telescopeSprite.render();
            telescopeSprite2.render();
            if (!isMobile()){
                telescopeAnimation();
            }
        }else{
            $(telescopeSpriteIMG).on('load' , function(){
                telescopeSprite.render();
                telescopeSprite2.render();
                if (!isMobile()){
                    telescopeAnimation();
                }
            });
        }

        if(physicsSpriteIMG.complete){
            physicsSprite.render();
            physicsSprite2.render();
            if (!isMobile()){
                physicsAnimation();
            }
        }else{
            $(physicsSpriteIMG).on('load' , function(){
                physicsSprite.render();
                physicsSprite2.render();
                if (!isMobile()){
                    physicsAnimation();
                }
            });
        }
    }

    function testTubeAnimation() {
        window.requestAnimationFrame(testTubeAnimation);
        testTubeSprite.update();
        testTubeSprite2.update();
        testTubeSprite.render();
        testTubeSprite2.render();
    }
    function computerAnimation() {
        window.requestAnimationFrame(computerAnimation);
        computerSprite.update();
        computerSprite.render();
        computerSprite2.update();
        computerSprite2.render();
    }
    function telescopeAnimation() {
        window.requestAnimationFrame(telescopeAnimation);
        telescopeSprite.update();
        telescopeSprite.render();
        telescopeSprite2.update();
        telescopeSprite2.render();
    }
    function physicsAnimation() {

        window.requestAnimationFrame(physicsAnimation);
        physicsSprite.update();
        physicsSprite.render();
        physicsSprite2.update();
        physicsSprite2.render();
    }
    function isMobile() {
        // return /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent);
        return window.innerWidth < 768;
    }
});





