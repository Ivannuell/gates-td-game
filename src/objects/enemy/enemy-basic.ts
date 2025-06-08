import { HealthBasic } from "../../components/health/health-basic";
import { HorizontalMovement } from "../../components/movements/horizontal-movement";

export class EnemyBasic extends Phaser.GameObjects.Container {
  scene: Phaser.Scene;
  enemySprite: Phaser.Physics.Arcade.Sprite;
  horizontalMovementComponent!: HorizontalMovement;
  destroyed!: boolean
  healthComponent!: HealthBasic

  constructor(scene: Phaser.Scene) {
    super(scene, 50, scene.scale.height / 2 - 100, []);

    this.destroyed = false

    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);

    (this.body as Phaser.Physics.Arcade.Body)
      .setSize(32, 20)
      .setOffset(-12, -12);

    this.enemySprite = this.scene.physics.add
      .sprite(0, 0, "monster_1", 0)
      // .setAngle(270) 
      .setScale(1.5, 1.5)
      .setFlipX(true);

    this.enemySprite.play('monster_1_walk', true)

    this.add([this.enemySprite]);

    this.horizontalMovementComponent = new HorizontalMovement(this, 20);
    this.healthComponent = new HealthBasic(2)
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    this.once(
      Phaser.GameObjects.Events.DESTROY,
      () => {
        this.scene.events.off(Phaser.Scenes.Events.UPDATE, this.update, this);
        this.destroyed = true
      },
      this
    );
  }

  update() {
    if (this.destroyed) {
      return 
    }

    if (this.healthComponent.isDead) {
      this.die()
    }

    this.horizontalMovementComponent.update();
  }

  die() {
    this.horizontalMovementComponent.stopMovement();
    this.destroy()
  }
}
