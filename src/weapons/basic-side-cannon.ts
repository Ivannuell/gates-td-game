import type { EnemyBasicSpawner } from "../components/spawners/enemy-basic-spawner";
import type { EnemyBasic } from "../objects/enemy/enemy-basic";

export class BasicSideCannon {
  gameObject:Phaser.GameObjects.Container;
  fireBulletInterval
  bulletGroup
  enemy

  constructor(gameObject: Phaser.GameObjects.Container, enemy: EnemyBasicSpawner) {
    this.gameObject = gameObject
    this.fireBulletInterval = 1000
    this.enemy = enemy

    this.bulletGroup = this.gameObject.scene.physics.add.group({
      name: `side-basic-${Phaser.Math.RND.uuid}`,
      enable: false,
    });
    this.bulletGroup.createMultiple({
      key: "bullet_green",
      quantity: 5,
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

  update(ts, dt) {
    this.fireBulletInterval -= dt;
    if (this.fireBulletInterval > 0) {
      return;
    }

    const bullet: Phaser.Physics.Arcade.Sprite = this.bulletGroup.getFirstDead();
    if (bullet == undefined || bullet == null) {
      return;
    }

    const x = this.gameObject.x
    const y = this.gameObject.y
    bullet.enableBody(true,x,y, true, true)
    bullet.setState(2)
    bullet.setSize(0.3, 0.3)
    bullet.setScale(0.5)
    bullet.setTint(0x00ffff)

    const firstEnemy = this.findNearest(this.gameObject, this.enemy.group)

    if (firstEnemy == undefined || firstEnemy == null){
      return
    } 

    // const firstEnemy: EnemyBasic = this.enemy.group.getFirstAlive()
    // console.log(ts)

    const nextX = firstEnemy.x + firstEnemy.body!.velocity.x * 0.8
    const nextY = firstEnemy.y + firstEnemy.body!.velocity.y * 0.8

    // const futureX = 

    // this.gameObject.scene.physics.moveTo(bullet, 
    //   firstEnemy.x,
    //   firstEnemy.y, 
    //   400)

    this.gameObject.scene.physics.moveTo(bullet, 
      nextX, 
      nextY,
      400)

    this.gameObject.setRotation(Phaser.Math.Angle.BetweenPoints(this.gameObject, firstEnemy) + Math.PI / 2)

    this.fireBulletInterval = 600
    
    
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
        bullet.disableBody(true, true)
        // this.destroyBullet(bullet);
      }

      // if (bullet.y <= -10) {
      //   bullet.disableBody(true, true)
      // }
    });
  }

  destroyBullet(bullet: Phaser.Types.Physics.Arcade.GameObjectWithBody) {
    bullet.setState(0)
  }

  findNearest(source, targets) {
    let closest = null;
    let minDistance = Number.MAX_VALUE;

    // If targets is a Group, get the children array
    const targetObjects = targets.getChildren ? targets.getChildren() : targets;

    for (const target of targetObjects) {
        // Skip checking the object against itself
      if (!target.active){
        return
      }

        if (target === source) {
            continue;
        }

        const distance = Phaser.Math.Distance.Between(source.x, source.y, target.x, target.y);

        if (distance < minDistance) {
            minDistance = distance;
            closest = target;
        }
    }

    return closest;
}
  
}