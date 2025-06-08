import { CUSTOM_EVENTS, EventBusComponent } from "../event-bus-emitter";

export class EnemyBasicSpawner {
  scene: Phaser.Scene;
  spawnAt;
  spawnInterval;
  group;
  disableSpawning;
  eventBus

  constructor(scene, enemyClass, enemyConfig, eventBus: EventBusComponent) {
    this.scene = scene;
    this.eventBus = eventBus

    this.group = this.scene.add.group({
      name: `${enemyClass.constructor.name}-${Phaser.Math.RND.uuid}`,
      classType: enemyClass,
      runChildUpdate: true,
      active: false,
    });

    this.spawnInterval = enemyConfig.spawnInterval;
    this.spawnAt = enemyConfig.spawnAt;
    this.disableSpawning = false;

    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    this.scene.physics.world.on(
      Phaser.Physics.Arcade.Events.WORLD_STEP,
      this.worldStep,
      this
    );

    this.scene.events.once(Phaser.Scenes.Events.DESTROY, () => {
      this.scene.events.off(Phaser.Scenes.Events.UPDATE, this.update, this);
      this.scene.physics.world.off(
        Phaser.Physics.Arcade.Events.WORLD_STEP,
        this.worldStep,
        this
      );
    });
  }

  update(_ts: number, dt: number) {
    if (this.disableSpawning) {
      return;
    }

    this.spawnAt -= dt;
    if (this.spawnAt > 0) {
      return;
    }

    const y = Phaser.Math.RND.between(100, this.scene.scale.height - 150);
    const enemy = this.group.get(-10, y);
    if (enemy) {
      enemy.setActive(true);
      enemy.setPosition(-10, y);
      enemy.setDepth(99)
      // enemy.play('monster_1_walk')

      this.eventBus.emit(CUSTOM_EVENTS.ENEMY_SPAWN)
    }


    this.spawnAt = this.spawnInterval;
  }

  worldStep() {
    this.group.getChildren().forEach((enemy) => {
      if (!enemy.active) {
        return;
      }

      if (enemy.x > this.scene.scale.width + 20) {
        // enemy.setActive(false);
        enemy.die()
      }
    });
  }
}
