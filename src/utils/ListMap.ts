export class ListMap<KEY, VALUE> {
  private core = new Map<KEY, Array<VALUE>>();

  set(id: KEY, value: VALUE) {
    const valueHoldingArray = this.getOrCreateArray(id);
    valueHoldingArray.push(value);
  }

  get(id: KEY): Array<VALUE> {
    const existing = this.core.get(id);
    if (existing) {
      return existing;
    } else {
      return new Array<VALUE>();
    }
  }

  private getOrCreateArray(id: KEY) {
    const valueHolderArray = this.core.get(id);
    if (valueHolderArray) {
      return valueHolderArray;
    } else {
      const newArray = new Array<VALUE>();
      this.core.set(id, newArray);
      return newArray;
    }
  }

}