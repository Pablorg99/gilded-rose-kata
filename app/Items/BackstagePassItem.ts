import { Item } from '../Item';
import { ItemName } from '../ItemName';
import { ItemQuality } from '../ItemQuality';
import { ItemSellIn } from '../ItemSellIn';

export class BackstagePassItem extends Item {
  constructor(name: ItemName, sellIn: ItemSellIn, quality: ItemQuality) {
    super(name, sellIn, quality);
  }

  static fromPrimitives(
    name: string,
    sellIn: number,
    quality: number
  ): BackstagePassItem {
    return new BackstagePassItem(
      new ItemName('Backstage Pass to' + name),
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

    if (this.sellInIsLessOrEqualThan(10)) {
      this.increaseQuality();
    }

    if (this.sellInIsLessOrEqualThan(5)) {
      this.increaseQuality();
    }

    if (this.sellInIsLessOrEqualThan(0)) {
      this.decreaseQualityBy(this.quality.value);
    }
  }
}
