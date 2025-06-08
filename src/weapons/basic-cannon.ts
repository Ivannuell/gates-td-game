import type { MouseInput } from "../components/mouse-input";

export class BasicCannon {
  gameObject!: Phaser.GameObjects.Container;
  fireBulletInterval!: number;
  bulletGroup!: Phaser.GameObjects.Group;
  buttonClicked!: MouseInput;
  damageOutput!: number;
  peirced!: number;
  peirceAmmount!: number;

  constructor(
    gameObject: Phaser.GameObjects.Container,
    buttonClicked: MouseInput
  ) {
    this.gameObject = gameObject;
    this.fireBulletInterval = 0;
    this.damageOutput = 2;
    this.buttonClicked = buttonClicked;
    this.peirceAmmount = 3
    this.peirced = 0

    this.bulletGroup = this.gameObject.scene.physics.add.group({
      name: `basic-${Phaser.Math.RND.uuid}`,
      enable: false,
    });
    this.bulletGroup.createMultiple({
      key: "bullet_red",
      quantity: 3,
      active: false,
      visible: false,
    });

    this.gameObject.scene.physics.world.on(
      Phaser.Physics.Arcade.Events.WORLD_STEP,
      this.worldStep,
      this
    );

    this.gameObject.once(
      Phaser.GameObjects.Events.DESTROY,
      () => {
        this.gameObject.scene.physics.world.off(
          Phaser.Physics.Arcade.Events.WORLD_STEP,
          this.worldStep,
          this
        );
      },
      this
    );
  }

  update(dt: number) {
    this.fireBulletInterval -= dt;
    if (this.fireBulletInterval > 0) {
      return;
    }

    if (this.buttonClicked.isClicked) {
      const bullet = this.bulletGroup.getFirstDead();
      // const bullet = this.bulletGroup.get();
      if (bullet == undefined || bullet == null) {
        return;
      }

      const x = this.gameObject.x;
      const y = this.gameObject.y;
      bullet.setSize(0.7);
      bullet.enableBody(true, x, y, true, true);
      bullet.setBelow(this.gameObject);
      bullet.setState(5);

      this.gameObject.scene.physics.moveTo(
        bullet,
        this.gameObject.scene.input.activePointer.position.x,
        this.gameObject.scene.input.activePointer.position.y,
        800
      );

      this.fireBulletInterval = 2000;

      
    }
  }

  worldStep(delta: number) {
    this.bulletGroup.getChildren().forEach((bullet) => {
      if (!bullet.active) {
        return;
      }

      (bullet.state as number) -= delta;
      if (
        (bullet.state as number) <= 0 ||
        bullet.y <= -10 ||
        bullet.x <= -10 ||
        bullet.x >= this.gameObject.scene.scale.width + 10
      ) {
        bullet.disableBody(true, true);
        this.peirced = 0;
      }

      // if (bullet.y <= -10) {
      //   bullet.disableBody(true, true)
      // }
    });
  }

  destroyBullet(bullet: Phaser.Types.Physics.Arcade.GameObjectWithBody) {
    bullet.setState(0);
    // bullet.disableBody(true, true);
  }
}
