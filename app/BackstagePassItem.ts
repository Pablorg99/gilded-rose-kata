import UpdatableItem from './UpdatableItem';

export default class BackstagePassItem implements UpdatableItem {
  constructor(
    public name: string,
    public sellIn: number,
    public quality: number
  ) {}

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
    if (this.sellIn < 0) {
      return 0;
    }
    if (this.sellIn <= 10) {
      return this.lowSellInQuality();
    }
    return this.quality + 1;
  }

  private lowSellInQuality(): number {
    if (this.sellIn <= 5) {
      return this.quality + 3;
    }
    return this.quality + 2;
  }
}
