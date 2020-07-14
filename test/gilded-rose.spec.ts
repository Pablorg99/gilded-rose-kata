import { expect } from 'chai';

import AgedBrieItem from '../app/AgedBrieItem';
import BackstagePassItem from '../app/BackstagePassItem';
import GeneralItem from '../app/GeneralItem';
import { GildedRose, Item } from '../app/gilded-rose';
import SulfurasItem from '../app/SulfurasItem';

describe('Gilded Rose', function () {
  const sulfurasItemName = 'Sulfuras, Hand of Ragnaros';
  const agedBrieItemName = 'Aged Brie';
  const backstagePassItemName = 'Backstage passes to a TAFKAL80ETC concert';

  it('should construct an empty Gilded Rose if no items are specified', function () {
    const gildedRose = new GildedRose();

    const updatedItems = gildedRose.updateQuality();

    expect(updatedItems).to.eql([]);
  });

  describe('Gilded Rose with general items', () => {
    it('should reduce by 1 the sell in and the quality attributes', function () {
      const generalItem = new Item('Item', 10, 10);
      const expectedItem = new GeneralItem('Item', 9, 9);
      const items = [generalItem];
      const gildedRose = new GildedRose(items);

      const updatedItems = gildedRose.updateQuality();

      expect(updatedItems[0]).to.eql(expectedItem);
    });

    it('should reduce by 1 the sell in and the quality attributes of a set of items', function () {
      const firstGeneralItem = new Item('First Item', 10, 10);
      const secondGeneralItem = new Item('Second Item', 1, 1);
      const items = [firstGeneralItem, secondGeneralItem];
      const firstExpectedItem = new GeneralItem('First Item', 9, 9);
      const secondExpectedItem = new GeneralItem('Second Item', 0, 0);
      const expectedItems = [firstExpectedItem, secondExpectedItem];
      const gildedRose = new GildedRose(items);

      const updatedItems = gildedRose.updateQuality();

      expect(updatedItems).to.eql(expectedItems);
    });

    it('should reduce by 2 the quality if the sellIn is zero or less', function () {
      const firstGeneralItem = new Item('Item', 0, 10);
      const secondGeneralItem = new Item('Item', -2, 10);
      const items = [firstGeneralItem, secondGeneralItem];
      const firstExpectedItem = new GeneralItem('Item', -1, 8);
      const secondExpectedItem = new GeneralItem('Item', -3, 8);
      const expectedItems = [firstExpectedItem, secondExpectedItem];
      const gildedRose = new GildedRose(items);

      const updatedItems = gildedRose.updateQuality();

      expect(updatedItems).to.eql(expectedItems);
    });

    it('should not reduce the quality of an item to a negative value', () => {
      const generalItem = new Item('Item', 0, 0);
      const expectedItem = new GeneralItem('Item', -1, 0);
      const items = [generalItem];
      const gildedRose = new GildedRose(items);

      const updatedItems = gildedRose.updateQuality();

      expect(updatedItems[0]).to.eql(expectedItem);
    });
  });

  describe(`Gilded Rose with ${agedBrieItemName} items`, () => {
    it(`should increase by 1 the quality of an ${agedBrieItemName} item after the update`, () => {
      const agedBrieItem = new Item(agedBrieItemName, 5, 9);
      const expectedItem = new AgedBrieItem(agedBrieItemName, 4, 10);
      const items = [agedBrieItem];
      const gildedRose = new GildedRose(items);

      const updatedItems = gildedRose.updateQuality();

      expect(updatedItems[0]).to.eql(expectedItem);
    });

    it(`should increase by 2 the quality of an ${agedBrieItemName} item if the sell in is zero or less`, () => {
      const firstAgedBrieItem = new Item(agedBrieItemName, 0, 8);
      const secondAgedBrieItem = new Item(agedBrieItemName, -5, 8);
      const items = [firstAgedBrieItem, secondAgedBrieItem];
      const firstExpectedItem = new AgedBrieItem(agedBrieItemName, -1, 10);
      const secondExpectedItem = new AgedBrieItem(agedBrieItemName, -6, 10);
      const expectedItems = [firstExpectedItem, secondExpectedItem];
      const gildedRose = new GildedRose(items);

      const updatedItems = gildedRose.updateQuality();

      expect(updatedItems).to.eql(expectedItems);
    });

    it(`should never increase the quality of an ${agedBrieItemName} item over 50`, () => {
      const firstAgedBrieItem = new Item(agedBrieItemName, 5, 50);
      const secondAgedBrieItem = new Item(agedBrieItemName, -5, 75);
      const items = [firstAgedBrieItem, secondAgedBrieItem];
      const firstExpectedItem = new AgedBrieItem(agedBrieItemName, 4, 50);
      const secondExpectedItem = new AgedBrieItem(agedBrieItemName, -6, 50);
      const expectedItems = [firstExpectedItem, secondExpectedItem];
      const gildedRose = new GildedRose(items);

      const updatedItems = gildedRose.updateQuality();

      expect(updatedItems).to.eql(expectedItems);
    });
  });

  describe(`Gilded Rose with ${sulfurasItemName} items`, () => {
    it(`should not alter the ${sulfurasItemName} item, which value of quality should always be 80`, () => {
      const firstSulfurasItem = new Item(sulfurasItemName, 5, 10);
      const secondSulfurasItem = new Item(sulfurasItemName, -5, 10);
      const items = [firstSulfurasItem, secondSulfurasItem];
      const firstExpectedItem = new SulfurasItem(sulfurasItemName, 5, 80);
      const secondExpectedItem = new SulfurasItem(sulfurasItemName, -5, 80);
      const expectedItems = [firstExpectedItem, secondExpectedItem];
      const gildedRose = new GildedRose(items);

      const updatedItems = gildedRose.updateQuality();

      expect(updatedItems).to.eql(expectedItems);
    });
  });

  describe(`Gilded Rose with ${backstagePassItemName} items`, () => {
    it('should increase by 1 the quality after the update', () => {
      const backstagePassItem = new Item(backstagePassItemName, 20, 9);
      const expectedItem = new BackstagePassItem(backstagePassItemName, 19, 10);
      const items = [backstagePassItem];
      const gildedRose = new GildedRose(items);

      const updatedItems = gildedRose.updateQuality();

      expect(updatedItems[0]).to.eql(expectedItem);
    });

    it('should increase the quality by 2 if sell in is less than 11 and greater than 5 without going over 50', () => {
      const firstBackstagePassItem = new Item(backstagePassItemName, 10, 10);
      const secondBackstagePassItem = new Item(backstagePassItemName, 10, 49);
      const thirdBackstagePassItem = new Item(backstagePassItemName, 5, 10);
      const items = [
        firstBackstagePassItem,
        secondBackstagePassItem,
        thirdBackstagePassItem,
      ];
      const firstExpectedItem = new BackstagePassItem(
        backstagePassItemName,
        9,
        12
      );
      const secondExpectedItem = new BackstagePassItem(
        backstagePassItemName,
        9,
        50
      );
      const thirdExpectedItem = new BackstagePassItem(
        backstagePassItemName,
        4,
        12
      );
      const gildedRose = new GildedRose(items);

      const updatedItems = gildedRose.updateQuality();

      expect(updatedItems[0]).to.eql(firstExpectedItem);
      expect(updatedItems[1]).to.eql(secondExpectedItem);
      expect(updatedItems[2]).to.not.eql(thirdExpectedItem);
    });

    it('should increase the quality by 3 if sell in is less than 6 without going over 50', () => {
      const firstBackstagePassItem = new Item(backstagePassItemName, 5, 10);
      const secondBackstagePassItem = new Item(backstagePassItemName, 5, 48);
      const items = [firstBackstagePassItem, secondBackstagePassItem];
      const firstExpectedItem = new BackstagePassItem(
        backstagePassItemName,
        4,
        13
      );
      const secondExpectedItem = new BackstagePassItem(
        backstagePassItemName,
        4,
        50
      );
      const expectedItems = [firstExpectedItem, secondExpectedItem];
      const gildedRose = new GildedRose(items);

      const updatedItems = gildedRose.updateQuality();

      expect(updatedItems).to.eql(expectedItems);
    });

    it('should never set a quality when over 50', () => {
      const firstAgedBrieItem = new Item(backstagePassItemName, 8, 50);
      const secondAgedBrieItem = new Item(backstagePassItemName, 3, 75);
      const items = [firstAgedBrieItem, secondAgedBrieItem];
      const firstExpectedItem = new BackstagePassItem(
        backstagePassItemName,
        7,
        50
      );
      const secondExpectedItem = new BackstagePassItem(
        backstagePassItemName,
        2,
        50
      );
      const expectedItems = [firstExpectedItem, secondExpectedItem];
      const gildedRose = new GildedRose(items);

      const updatedItems = gildedRose.updateQuality();

      expect(updatedItems).to.eql(expectedItems);
    });

    it('should drop the quality to 0 when the concert is passed', () => {
      const backstagePassItem = new Item(backstagePassItemName, 0, 10);
      const expectedItem = new BackstagePassItem(backstagePassItemName, -1, 0);
      const items = [backstagePassItem];
      const gildedRose = new GildedRose(items);

      const updatedItems = gildedRose.updateQuality();

      expect(updatedItems[0]).to.eql(expectedItem);
    });
  });
});
