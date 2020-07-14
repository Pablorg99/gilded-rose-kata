import UpdatableItem from './UpdatableItem';
import UpdatableItemsFactory from './UpdatableItemsFactory';

export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
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
