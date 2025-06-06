import { MouseInput } from "../components/mouse-input";
import { BasicCannon } from "../weapons/basic-cannon";

export class Player extends Phaser.GameObjects.Container {
  scene: Phaser.Scene;
  pointerPosition!: Phaser.Math.Vector2;
  mouseComponent!: MouseInput;
  weapon: BasicCannon;

  cannonSprite: Phaser.Physics.Arcade.Sprite;
  cannonBodySprite: Phaser.GameObjects.Image;

  constructor(scene: Phaser.Scene) {
    super(scene, scene.scale.width / 2, scene.scale.height - 50, []);
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);

    this.mouseComponent = new MouseInput(this);
    this.weapon = new BasicCannon(this, this.mouseComponent);

    this.cannonBodySprite = this.scene.add.image(0, 0, 'cannon_body')
    this.cannonSprite = this.scene.physics.add
      .sprite(0, 0, "cannon_1", 0)
      .setOrigin(0.5)

    this.add([this.cannonBodySprite, this.cannonSprite]);

    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    this.once(
      Phaser.GameObjects.Events.DESTROY,
      () => {
        this.scene.events.off(Phaser.Scenes.Events.UPDATE, this.update, this);
      },
      this
    );
  }

  update(_ts: number, dt: number) {
    this.pointerPosition = this.scene.input.activePointer.position;
    const position = { x: this.x, y: this.y };
    const angle = Phaser.Math.Angle.BetweenPoints(
      position,
      this.pointerPosition
    );

    this.cannonSprite.setAngle(Phaser.Math.RadToDeg(angle - 300));

    this.weapon.update(dt);
    this.mouseComponent.update();
  }
}
