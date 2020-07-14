import AgedBrieItem from './AgedBrieItem';
import GeneralItem from './GeneralItem';
import { Item } from './gilded-rose';
import UpdatableItem from './UpdatableItem';

const AgedBrie = 'Aged Brie';

export default class UpdatableItemsFactory {
  static fromItemsArray(items: Array<Item>): Array<UpdatableItem> {
    return items.map((item) => this.updatableItemFromItem(item));
  }

  private static updatableItemFromItem(item: Item): UpdatableItem {
    switch (item.name) {
      case AgedBrie:
        return new AgedBrieItem(item.name, item.sellIn, item.quality);

      default:
        return new GeneralItem(item.name, item.sellIn, item.quality);
    }
  }
}
