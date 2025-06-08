import { SideCannonBasic } from "../objects/side_Cannons/basic-side-cannon";
import { BasicCannon } from "../weapons/basic-cannon";
import { BasicSideCannon } from "../weapons/basic-side-cannon";
import type { EnemyBasicSpawner } from "./spawners/enemy-basic-spawner";

export class SideCannonGroup{
  scene: Phaser.Scene;
  sideCannonGroup;


  sideCannon1
  sideCannon2
  sideCannon3
  sideCannon4

  constructor(scene: Phaser.Scene, enemyGroup) {

      this.sideCannon1 = new SideCannonBasic(scene, enemyGroup,scene.scale.width / 2 - 100,scene.scale.height - 50)
      this.sideCannon2 = new SideCannonBasic(scene, enemyGroup,scene.scale.width / 2 - 200,scene.scale.height - 50)
      this.sideCannon3 = new SideCannonBasic(scene, enemyGroup,scene.scale.width / 2 + 100,scene.scale.height - 50)
      this.sideCannon4 = new SideCannonBasic(scene, enemyGroup,scene.scale.width / 2 + 200,scene.scale.height - 50)


      this.sideCannonGroup = scene.add.group(
        [this.sideCannon1, this.sideCannon2, this.sideCannon3, this.sideCannon4]
      )
  }
}