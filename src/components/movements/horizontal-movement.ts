export class HorizontalMovement {
  gameObject!: Phaser.Physics.Arcade.Sprite | Phaser.GameObjects.Container
  velocity!: number

  constructor(gameObject: Phaser.Physics.Arcade.Sprite | Phaser.GameObjects.Container) {
    this.gameObject = gameObject;
    this.velocity = 100

  }

  update() {
    this.gameObject.body!.velocity.x = this.velocity
  }

  stopMovement() {
    this.velocity = 0;
    (this.gameObject.body as Phaser.Physics.Arcade.Body).setVelocityX(0);
  }

}