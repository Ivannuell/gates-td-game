export class MouseInput {
  isClicked: boolean
  angleFromObject!: number
  gameObject: Phaser.GameObjects.Container
  
  constructor(gameObject: Phaser.GameObjects.Container) {
    this.isClicked = false
    this.gameObject = gameObject
  }


  update() {
    this.isClicked = this.gameObject.scene.input.activePointer.leftButtonDown()
    this.angleFromObject = Phaser.Math.Angle.Between(this.gameObject.x, this.gameObject.y, this.gameObject.scene.input.activePointer.position.x, this.gameObject.scene.input.activePointer.position.y )
  }


}