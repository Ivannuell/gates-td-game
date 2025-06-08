export class HorizontalMovement {
  gameObject!: Phaser.Physics.Arcade.Sprite | Phaser.GameObjects.Container
  velocity!: number

  constructor(gameObject: Phaser.Physics.Arcade.Sprite | Phaser.GameObjects.Container, velocity: number) {
    this.gameObject = gameObject;
    this.velocity = velocity

  }

  update() {
    this.gameObject.body!.velocity.x = this.velocity
  }

  stopMovement() {
    this.velocity = 0;
    (this.gameObject.body as Phaser.Physics.Arcade.Body).setVelocityX(0);
  }

}