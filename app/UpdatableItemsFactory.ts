import AgedBrieItem from './AgedBrieItem';
import BackstagePassItem from './BackstagePassItem';
import GeneralItem from './GeneralItem';
import { Item } from './gilded-rose';
import SulfurasItem from './SulfurasItem';
import UpdatableItem from './UpdatableItem';

const agedBrie = 'Aged Brie';
const sulfuras = 'Sulfuras, Hand of Ragnaros';
const backstagePass = 'Backstage passes to a TAFKAL80ETC concert';

export default class UpdatableItemsFactory {
  static fromItemsArray(items: Array<Item>): Array<UpdatableItem> {
    return items.map((item) => this.updatableItemFromItem(item));
  }

  private static updatableItemFromItem(item: Item): UpdatableItem {
    switch (item.name) {
      case agedBrie:
        return new AgedBrieItem(item.name, item.sellIn, item.quality);

      case sulfuras:
        return new SulfurasItem(item.name, item.sellIn, item.quality);

      case backstagePass:
        return new BackstagePassItem(item.name, item.sellIn, item.quality);

      default:
        return new GeneralItem(item.name, item.sellIn, item.quality);
    }
  }
}
