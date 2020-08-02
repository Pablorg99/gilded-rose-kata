import Item from './Item';
import UpdatableItem from './UpdatableItem';
import AgedBrieItem from './UpdatableItems/AgedBrieItem';
import BackstagePassItem from './UpdatableItems/BackstagePassItem';
import GeneralItem from './UpdatableItems/GeneralItem';
import SulfurasItem from './UpdatableItems/SulfurasItem';
import ConjuredItem from './UpdatableItems/ConjuredItem';

const agedBrie = 'Aged Brie';
const sulfuras = 'Sulfuras, Hand of Ragnaros';
const backstagePass = 'Backstage passes to a TAFKAL80ETC concert';
const conjured = 'Conjured';

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

      case conjured:
        return new ConjuredItem(item.name, item.sellIn, item.quality);

      default:
        return new GeneralItem(item.name, item.sellIn, item.quality);
    }
  }
}
