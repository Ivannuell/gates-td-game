export class Player extends Phaser.GameObjects.Container {
  scene: Phaser.Scene;
  private cannonSprite: Phaser.GameObjects.Sprite;
  private pointerPosition!: Phaser.Math.Vector2;

  constructor(scene: Phaser.Scene) {
    super(scene, scene.scale.width / 2, scene.scale.height - 50, []);

    this.scene = scene;
    this.scene.add.existing(this);

    this.cannonSprite = this.scene.add
      .sprite(0, 0, "cannon_1", 0)
      .setScale(1.5, 1.5)
      .setOrigin(0.5);

    this.add([this.cannonSprite]);

    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    this.once(
      Phaser.GameObjects.Events.DESTROY,
      () => {
        this.scene.events.off(Phaser.Scenes.Events.UPDATE, this.update, this);
      },
      this
    );

    

  }

  update() {
    this.pointerPosition = this.scene.input.activePointer.position
    const position = {x: this.x, y: this.y}

    const angle = Phaser.Math.Angle.BetweenPoints(position, this.pointerPosition)

    this.setAngle(Phaser.Math.RadToDeg(angle - 300) )
  }
}
