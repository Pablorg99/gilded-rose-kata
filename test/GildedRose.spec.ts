import { expect } from 'chai';

import { GildedRose } from '../app/GildedRose';
import { AgedBrieItem } from '../app/Items/AgedBrieItem';
import { BackstagePassItem } from '../app/Items/BackstagePassItem';
import { ConjuredItem } from '../app/Items/ConjuredItem';
import { GeneralItem } from '../app/Items/GeneralItem';
import { SulfurasItem } from '../app/Items/SulfurasItem';

describe('Gilded Rose', function () {
  describe('with general items', () => {
    it('should reduce by 1 the sell in and the quality attributes', function () {
      const generalItems = [GeneralItem.fromPrimitives('Item', 10, 10)];
      const expectedItems = [GeneralItem.fromPrimitives('Item', 9, 9)];
      const gildedRose = new GildedRose(generalItems);

      gildedRose.updateItems();

      expect(gildedRose.items).to.deep.equal(expectedItems);
    });

    it('should reduce by 1 the sell in and the quality attributes of a set of items', function () {
      const generalItems = [
        GeneralItem.fromPrimitives('Item A', 10, 10),
        GeneralItem.fromPrimitives('Item B', 1, 1),
      ];
      const expectedItems = [
        GeneralItem.fromPrimitives('Item A', 9, 9),
        GeneralItem.fromPrimitives('Item B', 0, 0),
      ];
      const gildedRose = new GildedRose(generalItems);

      gildedRose.updateItems();

      expect(gildedRose.items).to.deep.equal(expectedItems);
    });

    it('should reduce by 2 the quality if the sellIn is zero or less', function () {
      const generalItems = [
        GeneralItem.fromPrimitives('Item A', 0, 10),
        GeneralItem.fromPrimitives('Item B', -2, 10),
      ];
      const expectedItems = [
        GeneralItem.fromPrimitives('Item A', -1, 8),
        GeneralItem.fromPrimitives('Item B', -3, 8),
      ];
      const gildedRose = new GildedRose(generalItems);

      gildedRose.updateItems();

      expect(gildedRose.items).to.deep.equal(expectedItems);
    });

    it('should not reduce the quality of an item to a negative value', () => {
      const generalItems = [GeneralItem.fromPrimitives('Item', 0, 0)];
      const expectedItems = [GeneralItem.fromPrimitives('Item', -1, 0)];
      const gildedRose = new GildedRose(generalItems);

      gildedRose.updateItems();

      expect(gildedRose.items).to.deep.equal(expectedItems);
    });
  });

  describe('with Aged Brie items', () => {
    it('should increase by 1 the quality of the item after the update', () => {
      const items = [AgedBrieItem.fromPrimitives(5, 9)];
      const expectedItems = [AgedBrieItem.fromPrimitives(4, 10)];
      const gildedRose = new GildedRose(items);

      gildedRose.updateItems();

      expect(gildedRose.items).to.eql(expectedItems);
    });

    it('should increase by 2 the quality of the item if the sell in is zero or less', () => {
      const items = [AgedBrieItem.fromPrimitives(0, 8), AgedBrieItem.fromPrimitives(-5, 8)];
      const expectedItems = [
        AgedBrieItem.fromPrimitives(-1, 10),
        AgedBrieItem.fromPrimitives(-6, 10),
      ];
      const gildedRose = new GildedRose(items);

      gildedRose.updateItems();

      expect(gildedRose.items).to.eql(expectedItems);
    });

    it('should never increase the quality of the item over 50', () => {
      const items = [AgedBrieItem.fromPrimitives(5, 50), AgedBrieItem.fromPrimitives(-5, 75)];
      const expectedItems = [
        AgedBrieItem.fromPrimitives(4, 50),
        AgedBrieItem.fromPrimitives(-6, 50),
      ];
      const gildedRose = new GildedRose(items);

      gildedRose.updateItems();

      expect(gildedRose.items).to.eql(expectedItems);
    });
  });

  describe('with Sulfuras items', () => {
    it('should not alter the item, which quality should always be 80', () => {
      const items = [SulfurasItem.fromSellIn(5)];
      const gildedRose = new GildedRose(items);

      gildedRose.updateItems();
      const updatedItem = gildedRose.items[0];

      expect(updatedItem.quality.value).to.equal(80);
      expect(updatedItem.sellIn.value).to.equal(5);
    });
  });

  describe('with Backstage Pass items', () => {
    it('should increase by 1 the quality after the update', () => {
      const items = [BackstagePassItem.fromPrimitives('Supertrump Concert', 20, 9)];
      const expectedItems = [BackstagePassItem.fromPrimitives('Supertrump Concert', 19, 10)];
      const gildedRose = new GildedRose(items);

      gildedRose.updateItems();

      expect(gildedRose.items).to.eql(expectedItems);
    });

    it('should increase the quality by 2 if sell in is less than 11 and greater than 5 without going over 50', () => {
      const items = [
        BackstagePassItem.fromPrimitives('Supertrump Concert', 10, 10),
        BackstagePassItem.fromPrimitives('Supertrump Concert', 10, 49),
        BackstagePassItem.fromPrimitives('Supertrump Concert', 7, 10),
      ];
      const expectedItems = [
        BackstagePassItem.fromPrimitives('Supertrump Concert', 9, 12),
        BackstagePassItem.fromPrimitives('Supertrump Concert', 9, 50),
        BackstagePassItem.fromPrimitives('Supertrump Concert', 6, 12),
      ];

      const gildedRose = new GildedRose(items);

      gildedRose.updateItems();

      expect(gildedRose.items).to.eql(expectedItems);
    });

    it('should increase the quality by 3 if sell in is less than 6 without going over 50', () => {
      const items = [
        BackstagePassItem.fromPrimitives('Supertrump Concert', 5, 10),
        BackstagePassItem.fromPrimitives('Supertrump Concert', 5, 48),
      ];
      const expectedItems = [
        BackstagePassItem.fromPrimitives('Supertrump Concert', 4, 13),
        BackstagePassItem.fromPrimitives('Supertrump Concert', 4, 50),
      ];

      const gildedRose = new GildedRose(items);

      gildedRose.updateItems();

      expect(gildedRose.items).to.eql(expectedItems);
    });

    it('should never set a quality when over 50', () => {
      const items = [
        BackstagePassItem.fromPrimitives('Supertrump Concert', 8, 50),
        BackstagePassItem.fromPrimitives('Supertrump Concert', 3, 75),
      ];
      const expectedItems = [
        BackstagePassItem.fromPrimitives('Supertrump Concert', 7, 50),
        BackstagePassItem.fromPrimitives('Supertrump Concert', 2, 50),
      ];

      const gildedRose = new GildedRose(items);

      gildedRose.updateItems();

      expect(gildedRose.items).to.eql(expectedItems);
    });

    it('should drop the quality to 0 when the concert is passed', () => {
      const items = [BackstagePassItem.fromPrimitives('Supertrump Concert', 0, 10)];
      const expectedItems = [BackstagePassItem.fromPrimitives('Supertrump Concert', -1, 0)];
      const gildedRose = new GildedRose(items);

      gildedRose.updateItems();

      expect(gildedRose.items).to.eql(expectedItems);
    });
  });

  describe('GildedRose with conjured items', () => {
    it('should reduce by 1 the sell in and by 2 the quality attributes', function () {
      const items = [ConjuredItem.fromPrimitives('Potion', 10, 10)];
      const expectedItems = [ConjuredItem.fromPrimitives('Potion', 9, 8)];
      const gildedRose = new GildedRose(items);

      gildedRose.updateItems();

      expect(gildedRose.items).to.eql(expectedItems);
    });

    it('should reduce by 4 the quality if the sellIn is zero or less', function () {
      const items = [
        ConjuredItem.fromPrimitives('Potion', 0, 10),
        ConjuredItem.fromPrimitives('Potion', -2, 10),
      ];
      const expectedItems = [
        ConjuredItem.fromPrimitives('Potion', -1, 6),
        ConjuredItem.fromPrimitives('Potion', -3, 6),
      ];
      const gildedRose = new GildedRose(items);

      gildedRose.updateItems();

      expect(gildedRose.items).to.eql(expectedItems);
    });

    it('should not reduce the quality of an item to a negative value', () => {
      const items = [ConjuredItem.fromPrimitives('Potion', 0, 0)];
      const expectedItems = [ConjuredItem.fromPrimitives('Potion', -1, 0)];
      const gildedRose = new GildedRose(items);

      gildedRose.updateItems();

      expect(gildedRose.items).to.eql(expectedItems);
    });
  });
});
