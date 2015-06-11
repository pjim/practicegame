/**
 *
 * Created by j on 6/11/2015.
 */




var game = new Phaser.Game(800,600,Phaser.Auto,'gamey', {
    preload:preload,create:create,update:update});

var cursors,
    wab,
    gameText,
    player,
    thrustSpeed,
    alienBall,
    fireButton,
    playerBullets,
    bullet,
    bulletDelay = 0
    ;



function preload(){
    //game.Stage.backgroundColor('#F0000');
    game.load.image('sky','./resources/sky1.png');
    game.load.image('wab','./resources/wabbit.png');
    game.load.image('ship','./resources/thrust_ship.png');
    game.load.image('bomb','./resources/xenon2_bomb.png');
    game.load.image('ball','./resources/pangball.png');
    game.load.image('playerBullet','./resources/enemy-bullet.png');

}

function create(){
  game.physics.startSystem(Phaser.Physics.ARCADE);

    game.add.sprite(0,0,'sky');
    scoreText = game.add.text(10,10,'score:',{font:'bold 14px arial'});

    player = game.add.sprite(50,200,'ship');
  //  wab = game.add.sprite(10,10,'wab');

   // game.physics.enable(wab,Phaser.Physics.ARCADE);

    game.physics.arcade.enable(player);
    // wab.body.collideWorldBounds = true;

    player.body.collideWorldBounds = true;

    //friendly bullets
    playerBullets = game.add.group();
    playerBullets.enableBody = true;
    playerBullets.physicsBodyType = Phaser.Physics.ARCADE;
    playerBullets.createMultiple(50,'playerBullet');
    playerBullets.setAll('outOfBoundsKill', true);
    playerBullets.setAll('checkWorldBounds',true);


    //enemies
    alienBall = game.add.group();


    game.physics.arcade.enable(alienBall);

    alienBall.enableBody = true;
    alienBall.physicsBodyType = Phaser.Physics.ARCADE;

   // alienBall.body.collideWorldBounds = true;
   // alienBall.body.immovable = true;

    for(var i = 0; i < 5; i++){
        var ball = alienBall.create(game.world.randomX,game.world.randomY,'ball');
        ball.body.collideWorldBounds = true;
    }

     cursors = game.input.keyboard.createCursorKeys();
     fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    ballTween();
}
function playerCrash(player){
   player.kill();
}
function ballTween(){
   var tween = game.add.tween(alienBall).to({x:game.world.randomX,y:game.world.randomY},5000);
    tween.start();
}

function playerFire(){
    if(game.time.now > bulletDelay) {
        bullet = playerBullets.getFirstExists(false);
        if (bullet) {

            bullet.reset(player.x + 5, player.y);
            bullet.body.velocity.x = 533;
            bulletDelay = game.time.now + 100;
        }
    }
}

function handleCollision(bullet,alien){
    bullet.kill();
    alien.kill();

}
function update(){
    thrustSpeed = 75;
  if(cursors.left.isDown){
      player.body.velocity.x = - thrustSpeed;
  }
    if(cursors.right.isDown){
        player.body.velocity.x = + thrustSpeed;
    }
    if(cursors.down.isDown){
        player.body.velocity.y = thrustSpeed;

    }

    if(cursors.up.isDown){
        player.body.velocity.y = - thrustSpeed;
    }
    if(fireButton.isDown){
        playerFire();
    }

    game.physics.arcade.overlap(playerBullets,alienBall,handleCollision,null,this);
    game.physics.arcade.overlap(player,alienBall,playerCrash);
}
