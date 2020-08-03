import { ItemName } from './ItemName';
import { ItemQuality } from './ItemQuality';
import { ItemSellIn } from './ItemSellIn';

export abstract class Item {
  constructor(
    protected readonly _name: ItemName,
    protected _sellIn: ItemSellIn,
    protected _quality: ItemQuality
  ) {}

  get name() {
    return this._name;
  }

  get sellIn() {
    return this._sellIn;
  }

  get quality() {
    return this._quality;
  }

  protected decreaseSellIn() {
    this._sellIn = this._sellIn.decrease();
  }

  protected sellInIsLessOrEqualThan(value: number) {
    return this._sellIn.lessOrEqualThan(value);
  }

  protected increaseQuality() {
    this._quality = this._quality.increase();
  }

  protected decreaseQuality() {
    this._quality = this._quality.decrease();
  }

  protected decreaseQualityBy(value: number) {
    this._quality = this._quality.decreaseBy(value);
  }

  abstract update(): void;
}
