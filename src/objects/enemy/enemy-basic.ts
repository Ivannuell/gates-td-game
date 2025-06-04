export class EnemyBasic extends Phaser.GameObjects.Container {
  scene: Phaser.Scene;
  private enemySprite: Phaser.GameObjects.Sprite;

  constructor(scene: Phaser.Scene) {
    super(scene, scene.scale.width / 2, 50, []);

    this.scene = scene;
    this.scene.add.existing(this);

    this.enemySprite = this.scene.add
      .sprite(0, 0, "monster_1", 0)
      .setScale(1.5, 1.5);

    this.add([this.enemySprite]);

  }
}
