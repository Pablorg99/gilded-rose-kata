import { Item } from '../Item';
import { ItemName } from '../ItemName';
import { ItemQuality } from '../ItemQuality';
import { ItemSellIn } from '../ItemSellIn';

export class ConjuredItem extends Item {
  constructor(name: ItemName, sellIn: ItemSellIn, quality: ItemQuality) {
    super(name, sellIn, quality);
  }

  static fromPrimitives(
    name: string,
    sellIn: number,
    quality: number
  ): ConjuredItem {
    return new ConjuredItem(
      new ItemName('Conjured' + name),
      new ItemSellIn(sellIn),
      new ItemQuality(quality)
    );
  }

  update() {
    this.decreaseSellIn();
    this.updateQuality();
  }

  private updateQuality() {
    this.decreaseQualityBy(2);
    if (this.sellInIsLessOrEqualThan(0)) {
      this.decreaseQualityBy(2);
    }
  }
}
