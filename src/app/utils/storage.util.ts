export class StorageUtil {
  /**
   * This function saves value to session
   *
   * @param key reference-key to read value from
   * @param value currently stored value
   */
  public static storageSave<T>(key: string, value: T): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * This function reads reads from session
   *
   * @param key reference-key to read value from
   * @returns value || null
   */
  public static storageRead<T>(key: string): T | undefined {
    const storedValue = sessionStorage.getItem(key);
    try {
      if (storedValue) return JSON.parse(storedValue) as T;
      return undefined;
    } catch (error) {
      sessionStorage.removeItem(key);
      return undefined;
    }
  }

  /**
   * This function reads reads from session
   *
   * @param key reference-key to read value from
   * @returns value || null
   */
  public static storageRemove(key: string): void {
    sessionStorage.removeItem(key);
    return undefined;
  }
}
