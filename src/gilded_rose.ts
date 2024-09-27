const BACKSTAGE_PASS = "Backstage passes to a TAFKAL80ETC concert";
const AGED_BRIE = "Aged Brie";
const SULFURAS = "Sulfuras, Hand of Ragnaros";

enum SellInDays {
  ZERO = 0,
  FIVE = 5,
  TEN = 10,
}

export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name: string, sellIn: number, quality: number) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

/** TODO
 * 1. tests for existing functionality
 * 2. refactoring
 *  - items should handle their own update of Quality
 *  - base item, legendary item (sulfuras), cheese (brie), ticket (backstage pass)
 * 3. add conjured item + test
 */

function canQualityIncreased(quality: number) {
  return quality < 50;
}

function canQualityDecreased(quality: number) {
  return quality > 0;
}

function hasExpired(sellIn: number) {
  return sellIn < SellInDays.ZERO;
}

export class Shop {
  items: Item[];

  constructor(items: Item[] = []) {
    this.items = items;
  }

  updateQuality() {
    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i].name === SULFURAS) {
        continue;
      }

      this.items[i].sellIn--;

      if (this.items[i].name == BACKSTAGE_PASS) {
        if (hasExpired(this.items[i].sellIn)) {
          this.items[i].quality = 0;
          continue;
        }
        if (canQualityIncreased(this.items[i].quality)) {
          this.items[i].quality++;
        }
        if (this.items[i].sellIn < SellInDays.TEN) {
          if (canQualityIncreased(this.items[i].quality)) {
            this.items[i].quality++;
          }
        }
        if (this.items[i].sellIn < SellInDays.FIVE) {
          if (canQualityIncreased(this.items[i].quality)) {
            this.items[i].quality++;
          }
        }
        continue;
      }

      if (this.items[i].name === AGED_BRIE) {
        if (canQualityIncreased(this.items[i].quality)) {
          this.items[i].quality++;
        }
        if (
          hasExpired(this.items[i].sellIn) &&
          canQualityIncreased(this.items[i].quality)
        ) {
          this.items[i].quality++;
        }
        continue;
      }

      if (canQualityDecreased(this.items[i].quality)) {
        this.items[i].quality--;
      }

      if (hasExpired(this.items[i].sellIn)) {
        if (canQualityDecreased(this.items[i].quality)) {
          this.items[i].quality--;
        }
      }
    }

    return this.items;
  }
}
