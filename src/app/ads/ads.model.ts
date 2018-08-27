import { Contact } from '../shared/contact.model';
import { Img } from '../shared/img.model';

export class Ads {
  public title: string;
  public price: number;
  public description: string;
  public type: string;
  public contact: Contact[];
  public imgs: Img[];
  constructor(title: string, price: number, description: string, type: string , contact: Contact[], imgs: Img[]) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.type = type;
    this.contact = contact;
    this.imgs = imgs;
  }
}
