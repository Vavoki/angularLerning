import { Contact } from '../shared/contact.model';
import { Img } from '../shared/img.model';

export class Ads {
  public title: string;
  public price: number;
  public description: string;
  public type: string;
  public emailAds: string;
  public contact: Contact[];
  public imgs: Img[];
  public id: number;
  constructor(title: string, price: number, description: string,
    type: string , emailAds: string, contact: Contact[], imgs: Img[], id: number) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.type = type;
    this.emailAds = emailAds;
    this.contact = contact;
    this.imgs = imgs;
    this.id = id;
  }
}
