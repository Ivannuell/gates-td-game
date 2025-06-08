export const CUSTOM_EVENTS = {
  ENEMY_SPAWN: "ENEMY_SPAWN"
}


export class EventBusComponent extends Phaser.Events.EventEmitter {
  constructor() {
    super()
  }
}