export class ItemQuality {
  constructor(private _value: number) {
    if (this._value < 0) {
      this._value = 0;
    }

    if (this._value > 50) {
      this._value = 50;
    }
  }

  get value(): number {
    return this._value;
  }

  decrease(): ItemQuality {
    return new ItemQuality((this._value -= 1));
  }

  increase(): ItemQuality {
    return new ItemQuality((this._value += 1));
  }

  decreaseBy(value: number) {
    if (value <= 0) {
      throw new Error('Invalid decrease value');
    }

    return new ItemQuality(this._value - value);
  }
}
