import type { EnemyBasicSpawner } from "../../components/spawners/enemy-basic-spawner"
import { BasicSideCannon } from "../../weapons/basic-side-cannon"

export class SideCannonBasic extends Phaser.GameObjects.Container {
  declare scene: Phaser.Scene
  sideWeaponComponent
  sideCannonSprite!: Phaser.Physics.Arcade.Sprite

  constructor(scene: Phaser.Scene, enemy: EnemyBasicSpawner, x, y) {
    super(scene, x, y) 

    this.scene = scene
    this.scene.add.existing(this)
    this.scene.physics.add.existing(this)

    this.sideWeaponComponent = new BasicSideCannon(this, enemy)

    this.sideCannonSprite = this.scene.physics.add.sprite(0, 0, 'cannon_1')
    .setOrigin(0.5, 0.5)
    .setScale(0.5)

    this.add([this.sideCannonSprite])

    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    this.once(
      Phaser.GameObjects.Events.DESTROY,
      () => {
        this.scene.events.off(Phaser.Scenes.Events.UPDATE, this.update, this);
      },
      this
    );
  }

  update(ts, dt) {
    this.sideWeaponComponent.update(ts, dt)
  }
}