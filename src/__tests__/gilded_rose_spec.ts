import { Shop, Item } from "../gilded_rose";

describe("Gilded Rose", () => {
  it("should decrease quality and sellIn by one after one day", () => {
    const gildedRose = new Shop([new Item("foo", 2, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toEqual(1);
    expect(items[0].quality).toEqual(9);
  });

  it("should decrease quality by 2 after sell day", () => {
    const gildedRose = new Shop([new Item("foo", 0, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toEqual(-1);
    expect(items[0].quality).toEqual(8);
  });

  it("should not decrease quality below 0", () => {
    const gildedRose = new Shop([new Item("foo", 2, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toEqual(1);
    expect(items[0].quality).toEqual(0);
  });

  describe("Aged brie", () => {
    it("should increase quality", () => {
      const gildedRose = new Shop([new Item("Aged Brie", 2, 0)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toEqual(1);
      expect(items[0].quality).toEqual(1);
    });

    it("quality should no exceed 50", () => {
      const gildedRose = new Shop([new Item("Aged Brie", 2, 50)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toEqual(1);
      expect(items[0].quality).toEqual(50);
    });

    it("quality should increase by two after sell date", () => {
      const gildedRose = new Shop([new Item("Aged Brie", 0, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toEqual(-1);
      expect(items[0].quality).toEqual(12);
    });
  });

  describe("Sulfuras", () => {
    it("should never be have to sold or decreases in Quality", () => {
      const gildedRose = new Shop([
        new Item("Sulfuras, Hand of Ragnaros", 2, 80),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toEqual(2);
      expect(items[0].quality).toEqual(80);
    });
  });

  describe("Backstage passes to a TAFKAL80ETC concert", () => {
    it("should increase in quality if sellIn is more than 10 days", () => {
      const gildedRose = new Shop([
        new Item("Backstage passes to a TAFKAL80ETC concert", 11, 10),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toEqual(10);
      expect(items[0].quality).toEqual(11);
    });

    it("should increase in quality by 2 if sellIn is less than 10 days but more than 5 days", () => {
      const gildedRose = new Shop([
        new Item("Backstage passes to a TAFKAL80ETC concert", 10, 10),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toEqual(9);
      expect(items[0].quality).toEqual(12);
    });

    it("should increase in quality by 3 if sellIn is less than 5 days but more than 0 days", () => {
      const gildedRose = new Shop([
        new Item("Backstage passes to a TAFKAL80ETC concert", 5, 10),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toEqual(4);
      expect(items[0].quality).toEqual(13);
    });

    it("should set quality to 0 sellIn is 0 days or less", () => {
      const gildedRose = new Shop([
        new Item("Backstage passes to a TAFKAL80ETC concert", 0, 10),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toEqual(-1);
      expect(items[0].quality).toEqual(0);
    });
  });
});
