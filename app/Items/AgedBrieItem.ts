import { Item } from '../Item';
import { ItemName } from '../ItemName';
import { ItemQuality } from '../ItemQuality';
import { ItemSellIn } from '../ItemSellIn';

export class AgedBrieItem extends Item {
  constructor(name: ItemName, sellIn: ItemSellIn, quality: ItemQuality) {
    super(name, sellIn, quality);
  }

  static fromPrimitives(sellIn: number, quality: number): AgedBrieItem {
    return new AgedBrieItem(
      new ItemName('Aged Brie'),
      new ItemSellIn(sellIn),
      new ItemQuality(quality)
    );
  }

  update() {
    this.decreaseSellIn();
    this.updateQuality();
  }

  private updateQuality() {
    this.increaseQuality();

    if (this.sellInIsLessOrEqualThan(0)) {
      this.increaseQuality();
    }
  }
}
