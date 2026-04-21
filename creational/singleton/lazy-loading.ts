class LazySingleton {
  private constructor() {}
  private static lazySingleton?: LazySingleton;

  public static getInstance(): LazySingleton {
    if (!this.lazySingleton) {
      this.lazySingleton = new LazySingleton();
    }
    return this.lazySingleton;
  }
}
