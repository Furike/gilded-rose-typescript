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

export class Shop {
  items: Item[];

  constructor(items: Item[] = []) {
    this.items = items;
  }

  updateQuality() {
    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i].name == "Backstage passes to a TAFKAL80ETC concert") {
        this.items[i].quality++;
        if (canQualityIncreased(this.items[i].quality)) {
          this.items[i].quality++;
        }
        if (this.items[i].sellIn < 11) {
          if (canQualityIncreased(this.items[i].quality)) {
            this.items[i].quality++;
          }
        }
        if (this.items[i].sellIn < 6) {
          if (canQualityIncreased(this.items[i].quality)) {
            this.items[i].quality++;
          }
        }
      }

      if (this.items[i].name === "Aged Brie") {
        if (canQualityIncreased(this.items[i].quality)) {
          this.items[i].quality++;
        }
      } else {
        if (this.items[i].quality > 0) {
          if (this.items[i].name != "Sulfuras, Hand of Ragnaros") {
            this.items[i].quality--;
          }
        }
      }

      if (this.items[i].name != "Sulfuras, Hand of Ragnaros") {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }

      if (this.items[i].sellIn < 0) {
        if (this.items[i].name != "Aged Brie") {
          if (
            this.items[i].name != "Backstage passes to a TAFKAL80ETC concert"
          ) {
            if (this.items[i].quality > 0) {
              if (this.items[i].name != "Sulfuras, Hand of Ragnaros") {
                this.items[i].quality--;
              }
            }
          } else {
            this.items[i].quality =
              this.items[i].quality - this.items[i].quality;
          }
        } else {
          if (canQualityIncreased(this.items[i].quality)) {
            this.items[i].quality++;
          }
        }
      }
    }

    return this.items;
  }
}
