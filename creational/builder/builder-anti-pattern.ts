class BurgerMeal {
  private bunType: string;
  private patty: string;
  private hasCheese: boolean;

  constructor(bunType: string, patty: string);
  constructor(bunType: string, patty: string, hasCheese: boolean);
  constructor(bunType: string, patty: string, hasCheese = false) {
    this.bunType = bunType;
    this.patty = patty;
    this.hasCheese = hasCheese;
  }
}
