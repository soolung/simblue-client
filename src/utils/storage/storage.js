export class Storage {
  static getItem(key) {
    return typeof window !== "undefined" ? localStorage.getItem(key) : null;
  }

  static setItem(key, value) {
    if (typeof window === "undefined") return;
    localStorage.setItem(key, value);
  }
}
