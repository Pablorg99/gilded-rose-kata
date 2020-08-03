import { Item } from '../Item';
import { ItemName } from '../ItemName';
import { ItemQuality } from '../ItemQuality';
import { ItemSellIn } from '../ItemSellIn';

export class SulfurasItem extends Item {
  constructor(name: ItemName, sellIn: ItemSellIn, quality: ItemQuality) {
    super(name, sellIn, quality);
  }

  static fromSellIn(sellIn: number) {
    return new SulfurasItem(
      new ItemName('Sulfuras, Hand of Ragnaros'),
      new ItemSellIn(sellIn),
      new ItemQuality(80)
    );
  }

  update() {}
}
