const game = new Phaser.Game(800, 500, Phaser.AUTO, 'game', {
  preload,
  create,
  update,
});

var XVelocity = 2.8;
var YVelocity = -10;
var gravity = 0.5;
var shortJump = 41;
var longJump = 80;
var jumps = 0;
var successText;

function create() {
  DrawBackground();
  InitFrogs();
  successText = game.add.text(150, 150, '', {
    fill: '#ff00ff',
    font: '36pt Impact',
  });
}

function DrawBackground() {
  background = game.add.image(0, 0, 'background');
  background.width = game.width;
  background.height = game.height;
  for (let i = -20; i < game.width; i++) {
    let g = game.rnd.integerInRange(1, 100);
    if (g < 15) grass[i] = game.add.image(i, 80 + g * 2, 'grass');
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
    cattail[i].scale.x = 0.5;
    cattail[i].scale.y = 0.5;
  }
  for (let i = 1.5; i < 3.5; i++) {
    cattail[i] = game.add.image(i * 60 + 5, 100, 'cattail');
    cattail[i].scale.x = -0.3;
    cattail[i].scale.y = 0.3;
  }
  for (let i = 6; i < 8; i++) {
    cattail[i] = game.add.image(i * 60 + 5, 90, 'cattail');
    cattail[i].scale.x = 0.4;
    cattail[i].scale.y = 0.4;
  }
  for (let i = 12; i < 14; i++) {
    cattail[i] = game.add.image(i * 60 + 5, 50, 'cattail');
    cattail[i].scale.x = -0.5;
    cattail[i].scale.y = 0.5;
  }
  for (let i = 12.5; i < 14.5; i++) {
    cattail[i] = game.add.image(i * 60 + 5, 90, 'cattail');
    cattail[i].scale.x = -0.4;
    cattail[i].scale.y = 0.4;
  }

  overlay = game.add.image(0, 0, 'overlay');
  overlay.width = game.width;
  overlay.height = game.height;

  reset = game.add.image(20, 420, 'reset');
  reset.inputEnabled = true;
  reset.events.onInputDown.add(listener, this);
}

function DestroyFrogs() {
  for (let i = 0; i < 7; i++) {
    rockTaken[i] = true;
  }
  rockTaken[3] = false;
  for (let i = 0; i < 3; i++) {
    leftFrog[i].destroy();
  }

  for (let i = 4; i < 7; i++) {
    rightFrog[i - 4].destroy();
  }
}

function InitFrogs() {
  for (let i = 0; i < 3; i++) {
    leftFrog[i] = game.add.sprite(i * 115, 215, 'leftFrog');
    leftFrog[i].inputEnabled = true;
    leftFrog[i].events.onInputDown.add(listener, this);
    leftFrog[i].scale.x = 0.4;
    leftFrog[i].scale.y = 0.4;
    leftFrog[i].id = i;
    leftFrog[i].jumping = false;
    leftFrog[i].jumpdistance = 0;
    leftFrog[i].animations.add('jump');
  }

  for (let i = 4; i < 7; i++) {
    rightFrog[i - 4] = null;
    rightFrog[i - 4] = game.add.image(i * 120 + 85, 210, 'rightFrog');
    rightFrog[i - 4].scale.x = -0.4;
    rightFrog[i - 4].scale.y = 0.4;
    rightFrog[i - 4].inputEnabled = true;
    rightFrog[i - 4].events.onInputDown.add(listener, this);
    rightFrog[i - 4].id = i;
    rightFrog[i - 4].jumping = false;
    rightFrog[i - 4].jumpdistance = 0;
    rightFrog[i - 4].animations.add('jump');
  }
}

function listener(sprite) {
  if (sprite.key === 'leftFrog') {
    if (sprite.id < 7 && !rockTaken[sprite.id + 1]) {
      jumps++;
      sprite.jumping = true;
      sprite.doubleJump = false;
      sprite.animations.play('jump', 10, false);
      rockTaken[sprite.id + 1] = true;
      rockTaken[sprite.id] = false;
      sprite.id++;
    } else if (sprite.id < 6 && !rockTaken[sprite.id + 2]) {
      jumps++;
      sprite.jumping = true;
      sprite.doubleJump = true;
      sprite.animations.play('jump', 10, false);
      rockTaken[sprite.id + 2] = true;
      rockTaken[sprite.id] = false;
      sprite.id += 2;
    }
  } else if (sprite.key == 'rightFrog') {
    if (sprite.id > 0 && !rockTaken[sprite.id - 1]) {
      jumps++;
      sprite.jumping = true;
      sprite.doubleJump = false;
      sprite.animations.play('jump', 10, false);
      rockTaken[sprite.id - 1] = true;
      rockTaken[sprite.id] = false;
      sprite.id--;
    } else if (sprite.id > 1 && !rockTaken[sprite.id - 2]) {
      jumps++;
      sprite.jumping = true;
      sprite.doubleJump = true;
      sprite.animations.play('jump', 10, false);
      rockTaken[sprite.id - 2] = true;
      rockTaken[sprite.id] = false;
      sprite.id -= 2;
    }
  } else if (sprite.key == 'reset') {
    successText.setText('');
    jumps = 0;
    DestroyFrogs();
    InitFrogs();
  }
}

function update() {
  for (let i = 0; i < 3; i++) {
    if (leftFrog[i].jumping) {
      var sprite = leftFrog[i];
      if (sprite.jumpdistance < shortJump) {
        if (sprite.doubleJump) sprite.x += XVelocity * 2;
        else sprite.x += XVelocity;
        sprite.y += YVelocity;
        YVelocity += gravity;
        sprite.jumpdistance++;
      } else {
        sprite.jumpdistance = 0;
        sprite.jumping = false;
        YVelocity = -10;
        sprite.frame = 0;
      }
    } else if (rightFrog[i].jumping) {
      var sprite = rightFrog[i];
      if (sprite.jumpdistance < shortJump) {
        if (sprite.doubleJump) sprite.x -= XVelocity * 2;
        else sprite.x -= XVelocity;
        sprite.y += YVelocity;
        YVelocity += gravity;
        sprite.jumpdistance++;
      } else {
        sprite.jumpdistance = 0;
        sprite.jumping = false;
        YVelocity = -10;
        sprite.frame = 0;
      }
    }
    if (
      leftFrog[0].id === 4 &&
      leftFrog[1].id === 5 &&
      leftFrog[2].id === 6 &&
      rightFrog[0].id === 0 &&
      rightFrog[1].id === 1 &&
      rightFrog[2].id === 2
    ) {
      successText.setText('Solved puzzle in ' + jumps + ' moves!');
    }
  }
}
