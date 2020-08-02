import UpdatableItem from '../UpdatableItem';

export default class ConjuredItem implements UpdatableItem {
  constructor(
    public name: string,
    public sellIn: number,
    public quality: number
  ) {}

  update() {
    this.decreaseSellIn();
    this.decreaseQuality();
  }

  private decreaseSellIn() {
    this.sellIn = this.sellIn - 1;
  }

  private decreaseQuality() {
    this.quality = this.updatedQuality();
    if (this.quality < 0) {
      this.quality = 0;
    }
  }

  private updatedQuality() {
    if (this.sellIn <= 0) {
      return this.quality - 4;
    }
    return this.quality - 2;
  }
}
