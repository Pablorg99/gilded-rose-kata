import { expect } from 'chai';
import { Item, GildedRose } from '../app/gilded-rose';

describe('Gilded Rose', function () {
  it('should construct an empty Gilded Rose if no items are specified', function () {
    const gildedRose = new GildedRose();

    const updatedItems = gildedRose.updateQuality();

    expect(updatedItems).to.eql([]);
  });

  describe('Gilded Rose with general items', () => {
    it('should reduce by 1 the sell in and the quality attributes', function () {
      const generalItem = new Item('Item', 10, 10);
      const expectedItem = new Item('Item', 9, 9);
      const items = [generalItem];
      const gildedRose = new GildedRose(items);

      const updatedItems = gildedRose.updateQuality();

      expect(updatedItems[0]).to.eql(expectedItem);
    });

    it('should reduce by 1 the sell in and the quality attributes of a set of items', function () {
      const firstGeneralItem = new Item('First Item', 10, 10);
      const secondGeneralItem = new Item('Second Item', 1, 1);
      const items = [firstGeneralItem, secondGeneralItem];
      const firstExpectedItem = new Item('First Item', 9, 9);
      const secondExpectedItem = new Item('Second Item', 0, 0);
      const expectedItems = [firstExpectedItem, secondExpectedItem];
      const gildedRose = new GildedRose(items);

      const updatedItems = gildedRose.updateQuality();

      expect(updatedItems).to.eql(expectedItems);
    });

    it('should reduce by 2 the quality if the sellIn is zero or less', function () {
      const firstGeneralItem = new Item('Item', 0, 10);
      const secondGeneralItem = new Item('Item', -2, 10);
      const items = [firstGeneralItem, secondGeneralItem];
      const firstExpectedItem = new Item('Item', -1, 8);
      const secondExpectedItem = new Item('Item', -3, 8);
      const expectedItems = [firstExpectedItem, secondExpectedItem];
      const gildedRose = new GildedRose(items);

      const updatedItems = gildedRose.updateQuality();

      expect(updatedItems).to.eql(expectedItems);
    });

    it('should not reduce the quality of an item to a negative value', () => {
      const generalItem = new Item('Item', 0, 0);
      const expectedItem = new Item('Item', -1, 0);
      const items = [generalItem];
      const gildedRose = new GildedRose(items);

      const updatedItems = gildedRose.updateQuality();

      expect(updatedItems[0]).to.eql(expectedItem);
    });
  });

  describe('Gilded Rose with "Aged Brie" items', () => {
    it('should increase by 1 the quality of an "Aged Brie" item after the update', () => {
      const agedBrieItem = new Item('Aged Brie', 5, 9);
      const expectedItem = new Item('Aged Brie', 4, 10);
      const items = [agedBrieItem];
      const gildedRose = new GildedRose(items);

      const updatedItems = gildedRose.updateQuality();

      expect(updatedItems[0]).to.eql(expectedItem);
    });

    it('should increase by 2 the quality of an "Aged Brie" item if the sell in is zero or less', () => {
      const firstAgedBrieItem = new Item('Aged Brie', 0, 8);
      const secondAgedBrieItem = new Item('Aged Brie', -5, 8);
      const items = [firstAgedBrieItem, secondAgedBrieItem];
      const firstExpectedItem = new Item('Aged Brie', -1, 10);
      const secondExpectedItem = new Item('Aged Brie', -6, 10);
      const expectedItems = [firstExpectedItem, secondExpectedItem];
      const gildedRose = new GildedRose(items);

      const updatedItems = gildedRose.updateQuality();

      expect(updatedItems).to.eql(expectedItems);
    });

    it('should not increase the quality of an "Aged Brie" item when it is over 50', () => {
      const firstAgedBrieItem = new Item('Aged Brie', 5, 50);
      const secondAgedBrieItem = new Item('Aged Brie', -5, 75);
      const items = [firstAgedBrieItem, secondAgedBrieItem];
      const firstExpectedItem = new Item('Aged Brie', 4, 50);
      const secondExpectedItem = new Item('Aged Brie', -6, 75);
      const expectedItems = [firstExpectedItem, secondExpectedItem];
      const gildedRose = new GildedRose(items);

      const updatedItems = gildedRose.updateQuality();

      expect(updatedItems).to.eql(expectedItems);
    });
  });

  describe('Gilded Rose with "Sulfuras, Hand of Ragnaros" items', () => {
    it('should not alter the "Sulfuras, Hand of Ragnaros" item', () => {
      const firstSulfurasItem = new Item('Sulfuras, Hand of Ragnaros', 5, 10);
      const secondSulfurasItem = new Item('Sulfuras, Hand of Ragnaros', -5, 10);
      const items = [firstSulfurasItem, secondSulfurasItem];
      const firstExpectedItem = new Item('Sulfuras, Hand of Ragnaros', 5, 10);
      const secondExpectedItem = new Item('Sulfuras, Hand of Ragnaros', -5, 10);
      const expectedItems = [firstExpectedItem, secondExpectedItem];
      const gildedRose = new GildedRose(items);

      const updatedItems = gildedRose.updateQuality();

      expect(updatedItems).to.eql(expectedItems);
    });
  });

  describe('Gilded Rose with "Backstage passes to a TAFKAL80ETC concert" items', () => {
    const BackstagePassItemName = 'Backstage passes to a TAFKAL80ETC concert';

    it(`should increase by 1 the quality after the update`, () => {
      const backstagePassItem = new Item(BackstagePassItemName, 20, 9);
      const expectedItem = new Item(BackstagePassItemName, 19, 10);
      const items = [backstagePassItem];
      const gildedRose = new GildedRose(items);

      const updatedItems = gildedRose.updateQuality();

      expect(updatedItems[0]).to.eql(expectedItem);
    });

    it(`should increase the quality by 2 if sell in is less than 11 and greater than 5 without going over 50`, () => {
      const firstBackstagePassItem = new Item(BackstagePassItemName, 10, 10);
      const secondBackstagePassItem = new Item(BackstagePassItemName, 10, 49);
      const thirdBackstagePassItem = new Item(BackstagePassItemName, 5, 10);
      const items = [
        firstBackstagePassItem,
        secondBackstagePassItem,
        thirdBackstagePassItem,
      ];
      const firstExpectedItem = new Item(BackstagePassItemName, 9, 12);
      const secondExpectedItem = new Item(BackstagePassItemName, 9, 50);
      const thirdExpectedItem = new Item(BackstagePassItemName, 4, 12);
      const gildedRose = new GildedRose(items);

      const updatedItems = gildedRose.updateQuality();

      expect(updatedItems[0]).to.eql(firstExpectedItem);
      expect(updatedItems[1]).to.eql(secondExpectedItem);
      expect(updatedItems[2]).to.not.eql(thirdExpectedItem);
    });

    it(`should increase the quality by 3 if sell in is less than 6 without going over 50`, () => {
      const firstBackstagePassItem = new Item(BackstagePassItemName, 5, 10);
      const secondBackstagePassItem = new Item(BackstagePassItemName, 5, 48);
      const items = [firstBackstagePassItem, secondBackstagePassItem];
      const firstExpectedItem = new Item(BackstagePassItemName, 4, 13);
      const secondExpectedItem = new Item(BackstagePassItemName, 4, 50);
      const expectedItems = [firstExpectedItem, secondExpectedItem];
      const gildedRose = new GildedRose(items);

      const updatedItems = gildedRose.updateQuality();

      expect(updatedItems).to.eql(expectedItems);
    });

    it(`should not increase the quality when it is over 50`, () => {
      const firstAgedBrieItem = new Item(BackstagePassItemName, 8, 50);
      const secondAgedBrieItem = new Item(BackstagePassItemName, 3, 75);
      const items = [firstAgedBrieItem, secondAgedBrieItem];
      const firstExpectedItem = new Item(BackstagePassItemName, 7, 50);
      const secondExpectedItem = new Item(BackstagePassItemName, 2, 75);
      const expectedItems = [firstExpectedItem, secondExpectedItem];
      const gildedRose = new GildedRose(items);

      const updatedItems = gildedRose.updateQuality();

      expect(updatedItems).to.eql(expectedItems);
    });

    it(`should drop the quality to 0 when the concert is passed`, () => {
      const backstagePassItem = new Item(BackstagePassItemName, 0, 10);
      const expectedItem = new Item(BackstagePassItemName, -1, 0);
      const items = [backstagePassItem];
      const gildedRose = new GildedRose(items);

      const updatedItems = gildedRose.updateQuality();

      expect(updatedItems[0]).to.eql(expectedItem);
    });
  });
});
