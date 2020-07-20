import UpdatableItem from '../UpdatableItem';

export default class AgedBrieItem implements UpdatableItem {
  constructor(public name: string, public sellIn: number, public quality: number) {}

  update() {
    this.decreaseSellIn();
    this.increaseQuality();
  }

  private decreaseSellIn() {
    this.sellIn = this.sellIn - 1;
  }

  private increaseQuality() {
    this.quality = this.updatedQuality();
    if (this.quality > 50) {
      this.quality = 50;
    }
  }

  private updatedQuality(): number {
    if (this.sellIn <= 0) {
      return this.quality + 2;
    }

    return this.quality + 1;
  }
}
