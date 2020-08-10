import { Item } from '../Item';
import { ItemName } from '../ItemName';
import { ItemQuality } from '../ItemQuality';
import { ItemSellIn } from '../ItemSellIn';

export class GeneralItem extends Item {
  constructor(name: ItemName, sellIn: ItemSellIn, quality: ItemQuality) {
    super(name, sellIn, quality);
  }

  static fromPrimitives(
    name: string,
    sellIn: number,
    quality: number
  ): GeneralItem {
    return new GeneralItem(
      new ItemName(name),
      new ItemSellIn(sellIn),
      new ItemQuality(quality)
    );
  }

  update(): void {
    this.decreaseSellIn();
    this.updateQuality();
  }

  private updateQuality() {
    this.decreaseQuality();
    if (this.sellInIsLessOrEqualThan(0)) {
      this.decreaseQuality();
    }
  }
}
