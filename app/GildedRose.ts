import Item from './Item';
import UpdatableItem from './UpdatableItem';
import UpdatableItemsFactory from './UpdatableItemsFactory';

export default class GildedRose {
  items: Array<Item>;
  updatableItems: Array<UpdatableItem>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
    this.updatableItems = UpdatableItemsFactory.fromItemsArray(items);
  }

  updateQuality() {
    this.updatableItems.forEach((item) => item.update());
    return this.updatableItems;
  }
}
