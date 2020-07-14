export default interface UpdatableItem {
  readonly name: string;
  readonly sellIn: number;
  readonly quality: number;

  update(): void;
}
