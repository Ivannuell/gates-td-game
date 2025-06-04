export class PreloadScene extends Phaser.Scene {
  constructor() {
    super('PreloadScene')
  }

  preload() {
    this.load.pack('assets', 'public/assets.json') 
  }

  create() {
    console.log('ON Preload scene')
    this.scene.start('GameScene')
  }
}