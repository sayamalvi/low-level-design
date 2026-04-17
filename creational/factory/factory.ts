interface Logistics {
  send: () => void;
}
class Road implements Logistics {
  send() {
    console.log(`Sending by road logic`);
  }
}
class Air implements Logistics {
  send() {
    console.log("Sending by air logic");
  }
}

// new mode comes in
class Train implements Logistics {
  send() {
    console.log("Sending by train");
  }
}

// the LogisticsService is doing 2 things: deciding the type of logistics and object creation, violating srp
// if we want to add a new mode, we need to modify the LogisticsService class, violating ocp
// the object creation logic can be shifted to a different class
class LogisticsService {
  send(mode: string) {
    if (mode === "Air") {
      const logistics = new Air();
      logistics.send();
    } else if (mode === "Road") {
      const logistics = new Road();
      logistics.send();
    }
  }
}

// can be easily extended using open closed principle
class LogisticsFactory {
  public static getLogistics(mode: string): Logistics {
    if (mode === "Road") {
      return new Road();
    } else if (mode === "Air") {
      return new Air();
    }
    return new Train();
  }
}

// Core code shouldn't be touched
class LogisticsServiceWithFactory {
  send(mode: string) {
    const logistics = LogisticsFactory.getLogistics(mode);
    logistics.send();
  }
}
