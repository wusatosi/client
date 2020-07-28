export class TwoDimensionMap<V> {
  private core: Map<number, Map<number, V>> = new Map<number, Map<number, V>>()

  set(aKey: number, anotherKey: number, value: V) {
    const {parentKey, childKey} = TwoDimensionMap.getKeys(aKey, anotherKey);
    const childMap = this.getOrCreateChildMap(parentKey);
    childMap.set(childKey, value);
  }

  get(aKey: number, anotherKey: number): V | undefined {
    const {parentKey, childKey} = TwoDimensionMap.getKeys(aKey, anotherKey)
    const childMap = this.core.get(parentKey);
    if (childMap) {
      return childMap.get(childKey);
    } else {
      return undefined;
    }
  }

  forEach(acceptor: (value: V, aKey: number, anotherKey: number) => void) {
    this.core.forEach((childMap, parentKey) => {
      childMap.forEach((value, childKey) => {
        acceptor(value, parentKey, childKey);
      })
    })
  }

  clear() {
    this.core.clear();
  }

  private static getKeys(aKey: number, anotherKey: number) {
    return {
      parentKey: Math.min(aKey, anotherKey),
      childKey: Math.max(aKey, anotherKey)
    }
  }

  private getOrCreateChildMap(parentKey: number) {
    const childMap = this.core.get(parentKey);
    if (childMap) {
      return childMap;
    } else {
      const newChildMap = new Map<number, V>();
      this.core.set(parentKey, newChildMap)
      return newChildMap;
    }
  }
}