import { Item } from './Item';

export class GildedRose {
  constructor(private _items: Array<Item>) {}

  updateItems() {
    this._items.forEach((item) => item.update());
  }

  get items(): Array<Item> {
    return this._items;
  }
}
