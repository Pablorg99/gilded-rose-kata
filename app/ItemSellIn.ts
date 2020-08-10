export class ItemSellIn {
  constructor(private _value: number) {}

  get value(): number {
    return this._value;
  }

  decrease(): ItemSellIn {
    return new ItemSellIn(this._value - 1);
  }

  lessOrEqualThan(value: number): boolean {
    if (this._value <= value) {
      return true;
    }

    return false;
  }
}
