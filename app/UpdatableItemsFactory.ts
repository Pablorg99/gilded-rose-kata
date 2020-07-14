import AgedBrieItem from './AgedBrieItem';
import GeneralItem from './GeneralItem';
import { Item } from './gilded-rose';
import SulfurasItem from './SulfurasItem';
import UpdatableItem from './UpdatableItem';

const AgedBrie = 'Aged Brie';
const Sulfuras = 'Sulfuras, Hand of Ragnaros';

export default class UpdatableItemsFactory {
  static fromItemsArray(items: Array<Item>): Array<UpdatableItem> {
    return items.map((item) => this.updatableItemFromItem(item));
  }

  private static updatableItemFromItem(item: Item): UpdatableItem {
    switch (item.name) {
      case AgedBrie:
        return new AgedBrieItem(item.name, item.sellIn, item.quality);

      case Sulfuras:
        return new SulfurasItem(item.name, item.sellIn, item.quality);

      default:
        return new GeneralItem(item.name, item.sellIn, item.quality);
    }
  }
}
