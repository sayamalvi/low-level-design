class BurgerMeal {
  public readonly bunType: string;
  public readonly patty: string;
  public readonly hasCheese: boolean;
  public readonly toppings: string[];
  public readonly side: string | undefined;
  public readonly drink: string | undefined;

  private constructor(builder: InstanceType<typeof BurgerMeal.Builder>) {
    this.bunType = builder.bunType;
    this.patty = builder.patty;
    this.hasCheese = builder.hasCheese;
    this.toppings = [...builder.toppings];
    this.side = builder.side;
    this.drink = builder.drink;
  }

  public toString(): string {
    return [
      `bunType=${this.bunType}`,
      `patty=${this.patty}`,
      `hasCheese=${this.hasCheese}`,
      `toppings=[${this.toppings.join(", ")}]`,
      `side=${this.side ?? "none"}`,
      `drink=${this.drink ?? "none"}`,
    ].join(" | ");
  }

  public static Builder = class BurgerBuilder {
    public readonly bunType: string;
    public readonly patty: string;
    public hasCheese = false;
    public toppings: string[] = [];
    public side?: string;
    public drink?: string;

    constructor(bunType: string, patty: string) {
      if (!bunType.trim()) {
        throw new Error("bunType is required");
      }
      if (!patty.trim()) {
        throw new Error("patty is required");
      }
      this.bunType = bunType;
      this.patty = patty;

    }

    public withCheese(hasCheese = true): this {
      this.hasCheese = hasCheese;
      return this;
    }

    public withToppings(toppings: string[]): this {
      this.toppings = [...toppings];
      return this;
    }

    public addTopping(topping: string): this {
      this.toppings.push(topping);
      return this;
    }

    public withSide(side: string): this {
      this.side = side;
      return this;
    }

    public withDrink(drink: string): this {
      this.drink = drink;
      return this;
    }

    public build(): BurgerMeal {
      return new BurgerMeal(this);
    }
  };
}

const plainBurger = new BurgerMeal.Builder("wheat", "veg").build();
const cheeseBurger = new BurgerMeal.Builder("sesame", "veg")
  .withCheese()
  .build();
const loadedBurger = new BurgerMeal.Builder("multigrain", "chicken")
  .withCheese()
  .withToppings(["lettuce", "onion"])
  .addTopping("jalapeno")
  .withSide("fries")
  .withDrink("coke")
  .build();

console.log(plainBurger);
console.log(cheeseBurger);
console.log(loadedBurger);
