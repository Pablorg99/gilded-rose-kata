import UpdatableItem from './UpdatableItem';
import { Item } from './gilded-rose';
import GeneralItem from './GeneralItem';

export default class UpdatableItemsFactory {
  static fromItemsArray(items: Array<Item>): Array<UpdatableItem> {
    return items.map((item) => this.updatableItemFromItem(item));
  }

  private static updatableItemFromItem(item: Item): UpdatableItem {
    return new GeneralItem(item.name, item.sellIn, item.quality);
  }
}
