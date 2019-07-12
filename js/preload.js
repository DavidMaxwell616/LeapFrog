function preload() {
  game.load.crossOrigin = 'anonymous';

  game.scale.pageAlignHorizontally = true;
  game.scale.pageAlignVertically = true;
  game.scale.refresh();

  game.load.image('background', '../assets/images/background.png');
  game.load.image('overlay', '../assets/images/overlay.png');
  game.load.image('bank', '../assets/images/bank.png');
  game.load.image('rock', '../assets/images/rock.png');
  game.load.image('cattail', '../assets/images/cattail.png');
  game.load.image('grass', '../assets/images/grass.png');
  game.load.spritesheet('leftFrog', '../assets/images/greenFrog.png', 350, 240);
  game.load.spritesheet('rightFrog', '../assets/images/brownFrog.png', 350, 240);
  game.load.image('reset', '../assets/images/reset.png');

}