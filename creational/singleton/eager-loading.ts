// Eager Singleton is a singleton pattern where the instance is created at the time of class loading.
class EagerSingleton {
  // Private constructor to prevent instantiation
  private constructor() {}
  private static eagerSingleton = new EagerSingleton();
  // Public static method to get the instance
  public static getInstance(): EagerSingleton {
    // Return the instance
    return this.eagerSingleton;
  }
}

const eagerSingleton = EagerSingleton.getInstance();
const eagerSingleton2 = EagerSingleton.getInstance();
console.log(eagerSingleton);
console.log(eagerSingleton2);
console.log(eagerSingleton === eagerSingleton2);

// (not for node.js/javascript) Its thread safe. Because object initialization happens when class is loaded. Even if multiple threads are created, only one single instance is returned

