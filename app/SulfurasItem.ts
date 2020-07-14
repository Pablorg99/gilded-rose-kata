import UpdatableItem from './UpdatableItem';

export default class SulfurasItem implements UpdatableItem {
  constructor(
    public name: string,
    public sellIn: number,
    public quality: number
  ) {}

  update() {
    this.quality = 80;
  }
}
