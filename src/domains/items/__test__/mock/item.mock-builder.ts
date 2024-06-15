import { Item } from 'src/domains/_types/item.type';

export class ItemMockBuilder implements Item {
  name: string;
  image: string;

  constructor(itemName: string) {
    this.name = itemName;
    this.image = 'image/url';
  }
}
