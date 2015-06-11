/**
 *
 * Created by j on 6/11/2015.
 */




var game = new Phaser.Game(800,600,Phaser.Auto,'gamey', {
    preload:preload,create:create,update:update});

var cursors,
    wab,
    gameText,
    player;



function preload(){
    //game.Stage.backgroundColor('#F0000');
    game.load.image('sky','./resources/sky1.png');
    game.load.image('wab','./resources/wabbit.png');
    game.load.image('ship','./resources/thrust_ship.png');
    game.load.image('bomb','./resources/xenon2_bomb.png');

}

function create(){
  game.physics.startSystem(Phaser.Physics.ARCADE);
    gameText = game.add.text(10,10,'heres text',{font:'bold 14px arial'});

    player = game.add.sprite(50,200,'ship');
    wab = game.add.sprite(10,10,'wab');

    game.physics.enable(wab,Phaser.Physics.ARCADE);

    game.physics.arcade.enable(player);
     wab.body.collideWorldBounds = true;

    player.body.collideWorldBounds = true;

     cursors = game.input.keyboard.createCursorKeys();

}

function update(){
  if(cursors.left.isDown){
      player.body.velocity.x = - 50;
  }
    if(cursors.right.isDown){
        player.body.velocity.x = + 50;
    }
}
