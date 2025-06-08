import { Player } from "../objects/player.ts";
import { EnemyBasic } from "../objects/enemy/enemy-basic.ts";
import { EnemyBasicSpawner } from "../components/spawners/enemy-basic-spawner.ts";
import { SideCannonGroup } from "../components/side-cannon-group.ts";
import { EnemyTough } from "../objects/enemy/enemy-tough.ts";
import {
  CUSTOM_EVENTS,
  EventBusComponent,
} from "../components/event-bus-emitter.ts";

export class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }

  create() {
    const eventBus = new EventBusComponent();
    const player = new Player(this);

    const enemySpawner = new EnemyBasicSpawner(
      this,
      EnemyBasic,
      {
        spawnInterval: 9999,
        spawnAt: 1000,
      },
      eventBus
    );

    const toughSpawner = new EnemyBasicSpawner(
      this,
      EnemyTough,
      {
        spawnInterval: 10000,
        spawnAt: 3000,
      },
      eventBus
    );

    const enemyGroup = this.add.group();

    enemyGroup.add(enemySpawner.group);
    enemyGroup.add(toughSpawner.group);

    const sideCannons = new SideCannonGroup(this, [enemySpawner, toughSpawner]);

    const playerOverlap = this.physics.add.overlap(
      player.weapon.bulletGroup,
      enemySpawner.group,
      (enemyComponent, bulletComponent) => {
        enemyComponent.healthComponent.hit(2);
        if (enemyComponent.healthComponent.isDead) {
          (enemyComponent as EnemyBasic).die();
        }
        player.weapon.peirced += 1;
        if (player.weapon.peirced >= player.weapon.peirceAmmount) {
          player.weapon.destroyBullet(bulletComponent);
          player.weapon.peirced = 0;
        }
      },
      () => true
    );

    this.physics.add.overlap(
      player.weapon.bulletGroup,
      toughSpawner.group,
      (enemyComponent, bulletComponent) => {
        enemyComponent.healthComponent.hit(2);
        if (enemyComponent.healthComponent.isDead) {
          (enemyComponent as EnemyBasic).die();
        }
        // player.weapon.destroyBullet(bulletComponent as Phaser.Types.Physics.Arcade.GameObjectWithBody)
        player.weapon.peirced += 1;
        if (player.weapon.peirced >= player.weapon.peirceAmmount) {
          player.weapon.destroyBullet(bulletComponent);
          player.weapon.peirced = 0;
        }
      },
      () => true
    );

    const EachSideCannon = sideCannons.sideCannonGroup.getChildren();
    const bulletGroups = [];

    EachSideCannon.forEach((side) => {
      bulletGroups.push(side.sideWeaponComponent.bulletGroup);
    });

    this.physics.add.overlap(
      bulletGroups,
      toughSpawner.group,
      (enemyComponent, bulletComponent) => {
        enemyComponent.healthComponent.hit(0.5);
        if (enemyComponent.healthComponent.isDead) {
          (enemyComponent as EnemyBasic).die();
        }
        // bulletComponent.destroyBullet(bulletComponent as Phaser.Types.Physics.Arcade.GameObjectWithBody)
        // console.log(bulletComponent)
        EachSideCannon.forEach((sideCannon) => {
          sideCannon.sideWeaponComponent.destroyBullet(bulletComponent);
        });
      },
      () => true
    );

    eventBus.on(CUSTOM_EVENTS.ENEMY_SPAWN, () => {
      this.physics.add.overlap(
        bulletGroups,
        enemySpawner.group,
        (enemyComponent, bulletComponent) => {
          enemyComponent.healthComponent.hit(0.5);
          if (enemyComponent.healthComponent.isDead) {
            (enemyComponent as EnemyBasic).die();
          }
          // bulletComponent.destroyBullet(bulletComponent as Phaser.Types.Physics.Arcade.GameObjectWithBody)
          // console.log(bulletComponent)
          EachSideCannon.forEach((sideCannon) => {
            sideCannon.sideWeaponComponent.destroyBullet(bulletComponent);
          });
        },
        () => true
      );
    });
  }
}
