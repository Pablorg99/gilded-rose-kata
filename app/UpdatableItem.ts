export default interface UpdatableItem {
  name: string;
  sellIn: number;
  quality: number;

  update(): void;
}
