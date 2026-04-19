class BurgerMeal {
  private bun: string;
  private patty: string;

  constructor(bun: string, patty: string) {
    this.bun = bun;
    this.patty = patty;
  }
}

const burgerMeal = new BurgerMeal("wheat", "veg");

