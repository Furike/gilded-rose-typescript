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

export class Shop {
  items: Item[];

  constructor(items: Item[] = []) {
    this.items = items;
  }

  updateQuality() {
    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i].name === "Sulfuras, Hand of Ragnaros") {
        continue;
      }

      this.items[i].sellIn--;

      if (this.items[i].name == "Backstage passes to a TAFKAL80ETC concert") {
        if (this.items[i].sellIn < 0) {
          this.items[i].quality = 0;
          continue;
        }
        if (canQualityIncreased(this.items[i].quality)) {
          this.items[i].quality++;
        }
        if (this.items[i].sellIn < 10) {
          if (canQualityIncreased(this.items[i].quality)) {
            this.items[i].quality++;
          }
        }
        if (this.items[i].sellIn < 5) {
          if (canQualityIncreased(this.items[i].quality)) {
            this.items[i].quality++;
          }
        }
        continue;
      }

      if (this.items[i].name === "Aged Brie") {
        if (canQualityIncreased(this.items[i].quality)) {
          this.items[i].quality++;
        }
        if (
          this.items[i].sellIn < 0 &&
          canQualityIncreased(this.items[i].quality)
        ) {
          this.items[i].quality++;
        }
        continue;
      }

      if (canQualityDecreased(this.items[i].quality)) {
        this.items[i].quality--;
      }

      if (this.items[i].sellIn < 0) {
        if (canQualityDecreased(this.items[i].quality)) {
          this.items[i].quality--;
        }
      }
    }

    return this.items;
  }
}
