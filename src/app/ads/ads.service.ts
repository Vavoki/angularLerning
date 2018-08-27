import { Injectable } from '@angular/core';
import { Ads } from './ads.model';
import { Contact } from '../shared/contact.model';
import { Img } from '../shared/img.model';

@Injectable()
export class AdsService {
  private ads: Ads[] = [
    new Ads('PS4', 7000, 'desctiption', [
      new Contact('Vlad', '+380972935418', '23143s111s@gmail.com')
    ],
    [
      new Img('https://psmedia.playstation.com/is/image/psmedia/ps4-slim-jet-black-product-grid-01-au-24jan17?$Icon$'),
      new Img('https://ksassets.timeincuk.net/wp/uploads/sites/54/2018/03/sony-ps4-pro-9-1-1220x686-920x517.jpg')
    ]),
    new Ads('PS4 SLIM', 5000, 'desctiption', [
      new Contact('Vlad', '+380972935418', '23143s111s@gmail.com')
    ],
    [
      new Img('https://psmedia.playstation.com/is/image/psmedia/ps4-slim-jet-black-product-grid-01-au-24jan17?$Icon$'),
      new Img('https://ksassets.timeincuk.net/wp/uploads/sites/54/2018/03/sony-ps4-pro-9-1-1220x686-920x517.jpg')
    ])
  ];
  getAds() {
    return this.ads.slice();
  }
  getAd(id: number) {
    return this.ads[id];
  }
}
