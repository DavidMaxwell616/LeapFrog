const game = new Phaser.Game(800, 500, Phaser.AUTO, 'game', {
  preload,
  create,
  update,
});

var jumpdistance = 0;
var jumpheight = 50;
var XVelocity = 2.8;
var YVelocity = -10;
var gravity = .5;
var jumping;
var shortJump = 40;
var longJump = 80;

function create() {
  //game.stage.backgroundColor = '#001133';
  DrawBackground();
  for (let i = 0; i < 3; i++) {
    leftFrog[i] = game.add.sprite(i * 115, 215, 'leftFrog');
    leftFrog[i].inputEnabled = true;
    leftFrog[i].events.onInputDown.add(listener, this);
    leftFrog[i].scale.x = .4;
    leftFrog[i].scale.y = .4;
    leftFrog[i].id = i;
    leftFrog[i].animations.add('jump');
  }

  for (let i = 4; i < 7; i++) {
    rightFrog[i - 4] = game.add.image(i * 120 + 85, 210, 'rightFrog');
    rightFrog[i - 4].scale.x = -.4;
    rightFrog[i - 4].scale.y = .4;
    rightFrog[i - 4].inputEnabled = true;
    rightFrog[i - 4].events.onInputDown.add(listener, this);
    rightFrog[i - 4].id = i;
    rightFrog[i - 4].animations.add('jump');
  }

}

function DrawBackground() {
  background = game.add.image(0, 0, 'background');
  background.width = game.width;
  background.height = game.height;
  for (let i = -20; i < game.width; i++) {
    let g = game.rnd.integerInRange(1, 100);
    if (g < 15)
      grass[i] = game.add.image(i, 80 + g * 2, 'grass');
  }
  bank = game.add.image(0, 130, 'bank');
  bank.width = game.width + 20;
  for (let i = 0; i < 7; i++) {
    rock[i] = game.add.image(i * 115 + 15, 270, 'rock');
    rock[i].scale.x = 1.2;
    rockTaken.push(true);
  }
  rockTaken[3] = false;

  for (let i = 0; i < 3; i++) {
    cattail[i] = game.add.image(i * 60 + 5, 50, 'cattail');
    cattail[i].scale.x = .5;
    cattail[i].scale.y = .5;
  }
  for (let i = 1.5; i < 3.5; i++) {
    cattail[i] = game.add.image(i * 60 + 5, 100, 'cattail');
    cattail[i].scale.x = -.3;
    cattail[i].scale.y = .3;
  }
  for (let i = 6; i < 8; i++) {
    cattail[i] = game.add.image(i * 60 + 5, 90, 'cattail');
    cattail[i].scale.x = .4;
    cattail[i].scale.y = .4;
  }
  for (let i = 12; i < 14; i++) {
    cattail[i] = game.add.image(i * 60 + 5, 50, 'cattail');
    cattail[i].scale.x = -.5;
    cattail[i].scale.y = .5;
  }
  for (let i = 12.5; i < 14.5; i++) {
    cattail[i] = game.add.image(i * 60 + 5, 90, 'cattail');
    cattail[i].scale.x = -.4;
    cattail[i].scale.y = .4;
  }

  overlay = game.add.image(0, 0, 'overlay');
  overlay.width = game.width;
  overlay.height = game.height;

  reset = game.add.image(20, 420, 'reset');
  reset.inputEnabled = true;
  // reset.events.onInputDown.add(reset, this);
}

function reset(sprite) {

}

function listener(sprite) {
  if (sprite.key === "leftFrog") {
    sprite.jumping = true;
    sprite.animations.play('jump', 10, false);
    // if (sprite.id < 7 && !rockTaken[sprite.id + 1]) {
    //   sprite.jumping = true;
    //   sprite.doubleJump = false;
    //   sprite.animations.play('jump', 10, false);
    // } else if (sprite.id < 6 && !rockTaken[sprite.id + 2]) {
    //   sprite.jumping = true;
    //   sprite.doubleJump = true;
    //   sprite.animations.play('jump', 10, false);
    // }
  } else if (sprite.key == "rightFrog") {
    console.log(sprite.id);
    if (sprite.id > 0 && !rockTaken[sprite.id - 1]) {
      sprite.jumping = true;
      sprite.doubleJump = false;
    } else if (sprite.id > 1 && !rockTaken[sprite.id - 2]) {
      sprite.jumping = true;
      sprite.doubleJump = true;
    }
  }
}

function update() {
  for (let i = 0; i < 3; i++) {
    if (leftFrog[i].jumping) {
      var sprite = leftFrog[i];
      if (jumpdistance < shortJump) {
        sprite.x += XVelocity;
        sprite.y += YVelocity;
        YVelocity += gravity;
        jumpdistance++;
      } else {
        jumpdistance = 0;
        sprite.jumping = false;
        YVelocity = -10;
        sprite.frame = 0;
      }
    }
  }
}
// if (sprite[0].key === "redcircle" &&
//   sprite[1].key === "redcircle" &&
//   sprite[2].key === "redcircle")
//   alert('YOU WIN!!');
//}