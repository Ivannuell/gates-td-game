import { Player } from "../objects/player.ts"
import { EnemyBasic } from "../objects/enemy/enemy-basic.ts";
import { EnemyBasicSpawner } from "../components/spawners/enemy-basic-spawner.ts";

export class GameScene extends Phaser.Scene {
  enemy!: EnemyBasic;
  player!: Player;
  enemySpawner!: EnemyBasicSpawner;
  
  constructor() {
    super('GameScene') 
  }
  
  create() {
    this.player = new Player(this)
    this.enemySpawner = new EnemyBasicSpawner(this, EnemyBasic)
    // this.enemy = new EnemyBasic(this)

    console.log('On Gamescene')

    this.physics.add.overlap(
      this.player.weapon.bulletGroup,
      this.enemySpawner.group,
      (enemyComponent, bulletComponent) => {
        enemyComponent.healthComponent.hit()
        if (enemyComponent.healthComponent.isDead) {
          (enemyComponent as EnemyBasic).die()
        }
        this.player.weapon.destroyBullet(bulletComponent as Phaser.Types.Physics.Arcade.GameObjectWithBody)
        
      }, () => true
    )

  }

  
}