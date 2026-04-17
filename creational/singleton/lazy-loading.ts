class LazySingleton {
  private constructor() {}
  private static lazySingleton?: LazySingleton;

  // Instance is not created during class loading time, rather its created during execution time (not thread safe in case of multithreaded languages and with worker threads or pm2 etc. in case of javascript)
  public static getInstance(): LazySingleton {
    if (!this.lazySingleton) {
      this.lazySingleton = new LazySingleton();
    }
    return this.lazySingleton;
  }
}

const lazySingleton = LazySingleton.getInstance();

// Achieving thread safety in multi threaded languages:
// in single threaded language like javascript thread safety is not a concern but in multi threaded languages, in lazy loading singleton thread safety is a concern. Let's say two threads simultaneously call getInstance() for the first time in a lazy-loaded Singleton. If the instance hasn't been created yet, both threads might pass the null check and end up creating two different instances - completely breaking the Singleton guarantee.

// Achieving thread safety in multi threaded languages:
// 1. Synchronized Method (Inefficient because on every call the system will try to sync the threads ):The synchronized keyword ensures that only one thread at a time can execute the getInstance() method. This prevents multiple threads from entering the method simultaneously and creating multiple instances.
// 2. Double checked locking: This is a more efficient way to achieve thread safety. The idea is to check if the instance is null before acquiring the lock. If it is, then we synchronize the block and check again. This reduces the overhead of synchronization after the instance has been created.

// 3. Bill Pugh singleton: This is a highly efficient way to implement the Singleton pattern. It uses a static inner helper class to hold the Singleton instance. The instance is created only when the inner class is loaded, which happens only when getInstance() is called for the first time.