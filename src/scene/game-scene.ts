import { Player } from "../objects/player.ts"
import { EnemyBasic } from "../objects/enemy/enemy-basic.ts";

export class GameScene extends Phaser.Scene {
  private player!: Player;
  private enemy!: EnemyBasic;

  constructor() {
    super('GameScene') 
  }
  
  create() {
    this.player = new Player(this)
    this.enemy = new EnemyBasic(this)

    console.log('On Gamescene')

  }
}