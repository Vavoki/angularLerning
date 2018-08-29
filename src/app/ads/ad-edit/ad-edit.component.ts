import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AdsService } from '../ads.service';
import { Ads } from '../ads.model';
import { types } from '../../shared/type-array';

@Component({
  selector: 'app-ad-edit',
  templateUrl: './ad-edit.component.html',
  styleUrls: ['./ad-edit.component.css']
})
export class AdEditComponent implements OnInit {
  id: number;
  editeMode = false;
  types = [
    {name: 'No type'},
    {name: 'Games Console'},
    {name: 'Games'},
];
  annoucementForm: FormGroup;
  constructor(private route: ActivatedRoute,
    private adsService: AdsService,
    private router: Router) { }
  ngOnInit() {
    console.log(this.types);
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editeMode = params['id'] != null;
          this.initForm();
        }
      );
  }
  private initForm() {
    let adsName = '';
    let adsDescription = '';
    let adsPrice = 0;
    let type = '';
    const imgs = new FormArray([]);
    const contacts = new FormArray([]);

    if (this.editeMode) {
      const ad = this.adsService.getAd(this.id);
      adsName = ad.title;
      adsDescription = ad.description;
      adsPrice = ad.price;
      console.log('typ', ad.title);
      type = ad.type;
      if (ad['imgs']) {
        for (const img of ad.imgs) {
          imgs.push(
            new FormGroup({
              'imgPath': new FormControl(img.imgPath, Validators.required),
            })
          );
        }
      }
      if (ad['contact']) {
        for (const contact of ad.contact) {
          contacts.push(
            new FormGroup({
              'name': new FormControl(contact.name, Validators.required),
              'phone': new FormControl(contact.phone, Validators.required),
            })
          );
        }
      }
    }
    this.annoucementForm = new FormGroup({
      'title': new FormControl(adsName, Validators.required),
      'description': new FormControl(adsDescription, Validators.required),
      'price': new FormControl(adsPrice, Validators.required),
      'type': new FormControl(type, Validators.required),
      'imgs': imgs,
      'contact': contacts
    });
    if (!this.editeMode) {
      this.onAddImg();
      this.onAddContacts();
    }
    console.log('THISISFORM1', this.annoucementForm);
  }
  onAddImg() {
    console.log(event);
   (<FormArray>this.annoucementForm.get('imgs')).push(
      new FormGroup({
        'imgPath': new FormControl(null, Validators.required),
      })
    );
  }
  onAddContacts() {
    (<FormArray>this.annoucementForm.get('contact')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'phone': new FormControl(null,  [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)
      ]),
      })
    );
  }
  onCancel() {
    this.router.navigate(['../']);
  }
  onSubmit() {
    if (this.editeMode) {
      this.adsService.updateAd(this.id, this.annoucementForm.value);
      console.log(this.annoucementForm.value);
    } else {
      this.adsService.newAd(this.annoucementForm.value);
    }
    console.log('THISISFORM2', this.annoucementForm);
    this.onCancel();
  }
}
