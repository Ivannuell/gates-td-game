export class HealthBasic {
  startLife;
  currentLIfe;
  isDead;

  constructor(life: number) {
    this.startLife = life;
    this.currentLIfe = life;
    this.isDead = false;
  }

  reset() {
    this.currentLIfe = this.startLife;
    this.isDead = false;
  }

  hit(damageInput: number) {
    if (this.isDead) {
      return;
    }

    this.currentLIfe -= damageInput;
    if (this.currentLIfe <= 0) {
      this.isDead = true;
    }
  }

  die() {
    this.currentLIfe = 0;
    this.isDead = true;
  }
}
