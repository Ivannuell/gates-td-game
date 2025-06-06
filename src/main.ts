import Phaser from "phaser";
import { GameScene } from "./scene/game-scene";
import { PreloadScene } from "./scene/preload-scene";


const game = new Phaser.Game({
  type: Phaser.CANVAS,
  roundPixels: true,
  pixelArt: true,
  scale: {
    parent: 'game-container',
    width: 840,
    height: 480,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    // mode: Phaser.Scale.HEIGHT_CONTROLS_WIDTH,
  },
  backgroundColor: '#000000',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0, x: 0 },
      debug: false,
    },
  },
});

game.scene.add('GameScene', GameScene)
game.scene.add('PreloadScene', PreloadScene)
game.scene.start('PreloadScene')