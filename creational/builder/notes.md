# Builder Pattern

The Builder Pattern is a creational design pattern that separates how an object is constructed from the object itself.  
It helps build complex objects step by step, especially when some fields are required and many are optional.

## Formal Definition

"Builder pattern builds a complex object step by step. It separates the construction of a complex object from its representation, so that the same construction process can create different representations."

## In Simpler Terms

Imagine ordering a custom burger:
- Required: bun, patty
- Optional: cheese, toppings, side, drink

You select options one by one, and the final meal is prepared only when you confirm.  
That is exactly how Builder works in code.

## Real-Life Analogy: Custom Pizza Order

In a pizza app, users pick crust, size, toppings, and sauces step by step.  
Different users follow the same process but get different final pizzas.

---

## Understanding the Problem

Suppose you model `BurgerMeal` using a constructor with many parameters.

```java
import java.util.*;

class BurgerMeal {
    private String bun;
    private String patty;
    private String sides;
    private List<String> toppings;
    private boolean cheese;

    public BurgerMeal(String bun, String patty, String sides, List<String> toppings, boolean cheese) {
        this.bun = bun;
        this.patty = patty;
        this.sides = sides;
        this.toppings = toppings;
        this.cheese = cheese;
    }
}

class Main {
    public static void main(String[] args) {
        BurgerMeal burgerMeal = new BurgerMeal("wheat", "veg", null, null, false);
    }
}
```

### Issues with Constructor-Based Creation

- Hard to read: callers must remember parameter order.
- Null-heavy: optional fields force `null` arguments.
- Error-prone: easy to swap similar parameter types.
- Not scalable: adding fields causes constructor overload explosion.
- Poor expressiveness: does not match natural step-by-step configuration.

---

## Telescoping Constructor Anti-Pattern

To support multiple combinations, people often add many overloaded constructors:

```java
class BurgerMeal {
    public BurgerMeal(String bun, String patty) { ... }
    public BurgerMeal(String bun, String patty, boolean cheese) { ... }
    public BurgerMeal(String bun, String patty, boolean cheese, String side) { ... }
    public BurgerMeal(String bun, String patty, boolean cheese, String side, String drink) { ... }
}
```

This is called the telescoping constructor anti-pattern.

It becomes:
- hard to maintain
- hard to read
- easy to misuse
- difficult to extend cleanly

---

## Builder Pattern Solution (Java)

```java
import java.util.*;

class BurgerMeal {
    private final String bunType;
    private final String patty;
    private final boolean hasCheese;
    private final List<String> toppings;
    private final String side;
    private final String drink;

    private BurgerMeal(BurgerBuilder builder) {
        this.bunType = builder.bunType;
        this.patty = builder.patty;
        this.hasCheese = builder.hasCheese;
        this.toppings = builder.toppings;
        this.side = builder.side;
        this.drink = builder.drink;
    }

    public static class BurgerBuilder {
        private final String bunType;
        private final String patty;
        private boolean hasCheese;
        private List<String> toppings;
        private String side;
        private String drink;

        public BurgerBuilder(String bunType, String patty) {
            this.bunType = bunType;
            this.patty = patty;
        }

        public BurgerBuilder withCheese(boolean hasCheese) {
            this.hasCheese = hasCheese;
            return this;
        }

        public BurgerBuilder withToppings(List<String> toppings) {
            this.toppings = toppings;
            return this;
        }

        public BurgerBuilder withSide(String side) {
            this.side = side;
            return this;
        }

        public BurgerBuilder withDrink(String drink) {
            this.drink = drink;
            return this;
        }

        public BurgerMeal build() {
            return new BurgerMeal(this);
        }
    }
}
```

---

## TypeScript Version (Project-Aligned)

TypeScript supports the same pattern cleanly and works well with fluent APIs.

```ts
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

  public static Builder = class {
    public readonly bunType: string;
    public readonly patty: string;
    public hasCheese = false;
    public toppings: string[] = [];
    public side?: string;
    public drink?: string;

    constructor(bunType: string, patty: string) {
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

const meal = new BurgerMeal.Builder("multigrain", "chicken")
  .withCheese()
  .withToppings(["onion", "lettuce"])
  .withSide("fries")
  .withDrink("coke")
  .build();
```

### Why `return this` in Builder Methods?

Each `withX()` method returns the same builder object, allowing chaining:

```ts
new BurgerMeal.Builder("wheat", "veg").withCheese().withSide("fries").build();
```

### Why `new BurgerMeal(this)` in `build()`?

- `this` inside `build()` is the builder instance containing all selected values.
- `new BurgerMeal(this)` passes that collected state to the private constructor.
- Final product is created in one controlled step.

---

## Constructor vs Builder (Quick Comparison)

| Aspect | Constructor | Builder |
| --- | --- | --- |
| Readability | Low when fields increase | High with fluent methods |
| Optional fields | Awkward (`null`/overloads) | Natural (`withX()` only when needed) |
| Extensibility | Harder | Easier |
| Safety | Parameter order mistakes common | Named step methods reduce mistakes |

---

## When to Use Builder

- Object has many optional fields.
- You need readable object creation.
- You want immutability after build.
- You want validation before final object creation.

## When to Avoid Builder

- Object is tiny (1-2 fields).
- Construction is simple and unlikely to grow.
- Builder boilerplate would outweigh benefits.

---

## Pros and Cons

### Pros

- Avoids constructor telescoping.
- Improves readability and maintainability.
- Supports controlled and validated construction.
- Works well for immutable objects.

### Cons

- More boilerplate initially.
- Extra class/structure to maintain.
- Can be overkill for simple models.

---

## Real-World Usage

### 1) Lombok `@Builder` (Java)

```java
@Builder
public class User {
    private String name;
    private int age;
    private String address;
}
```

```java
User user = User.builder()
            .name("John")
            .age(30)
            .address("NYC")
            .build();
```

### 2) Amazon Cart Configuration

A cart item is not just an item ID; it includes:
- quantity
- size/color
- delivery option
- gift wrap
- save-for-later
- promotional metadata

Builder-like stepwise assembly is ideal for this kind of configurable object.

---

## Conclusion

Builder Pattern is best when object creation is complex or likely to evolve.  
It keeps object construction expressive, safe, and maintainable, and maps naturally to real-world "configure then build" workflows in both Java and TypeScript.