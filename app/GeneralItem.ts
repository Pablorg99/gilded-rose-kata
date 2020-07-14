import UpdatableItem from './UpdatableItem';

export default class GeneralItem implements UpdatableItem {
  constructor(
    public name: string,
    public sellIn: number,
    public quality: number
  ) {}

  update() {
    this.sellIn = this.sellIn - 1;
    this.quality = this.quality - 1;
  }
}
