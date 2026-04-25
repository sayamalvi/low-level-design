interface Pizza {
  getDescription(): string;
  getCost(): number;
}

class PlainPizza implements Pizza {
  getDescription(): string {
    return "Plain Pizza";
  }
  getCost(): number {
    return 150;
  }
}
// Concrete Component
class MargheritaPizza implements Pizza {
  getDescription(): string {
    return "Margherita";
  }
  getCost(): number {
    return 200;
  }
}

// Decorator Abstract Class
abstract class PizzaDecorator implements Pizza {
  protected pizza: Pizza;

  constructor(pizza: Pizza) {
    this.pizza = pizza;
  }

  abstract getDescription(): string;
  abstract getCost(): number;
}

class ExtraCheese extends PizzaDecorator {
  constructor(pizza: Pizza) {
    super(pizza);
  }
  getDescription(): string {
    return this.pizza.getDescription() + "Extra Cheese";
  }
  getCost(): number {
    return this.pizza.getCost() + 40;
  }
}

const pizza = new ExtraCheese(new PlainPizza());
console.log(pizza.getCost());

// new Stuffed(new Olive(new Margherita))
// new Stuff(new ExtraCheese(new Margherita()))