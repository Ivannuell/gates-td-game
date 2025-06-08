export class PreloadScene extends Phaser.Scene {
  constructor() {
    super('PreloadScene')
  }

  preload() {
    this.load.pack('assets', '/public/assets.json') 
    this.load.json('animations_json', '/public/animation.json')
  }

  create() {
    console.log('ON Preload scene')
    this.createAnimations()
    this.scene.start('GameScene')
  }

  createAnimations() {
    const data = this.cache.json.get('animations_json');
    // console.log(data)
    data.forEach((animation) => {
      const frames = animation.frames
        ? this.anims.generateFrameNumbers(animation.assetKey, { frames: animation.frames })
        : this.anims.generateFrameNumbers(animation.assetKey);

      this.anims.create({
        key: animation.key,
        frames: frames,
        frameRate: animation.frameRate,
        repeat: animation.repeat,
      });
    });
  }
}