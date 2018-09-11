import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AdsService } from '../ads.service';
import { DataStorageService } from '../../shared/data-storage';
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
  public myModel = '+';
  public mask = ['+', '(', /\d/, /\d/, /\d/, ')', /[0-9]/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/ ];

  annoucementForm: FormGroup;
  constructor(private route: ActivatedRoute,
    private adsService: AdsService,
    private router: Router,
    private apiService: DataStorageService) { }
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
      type = ad.type;
      if (ad['imgs']) {
        for (const img of ad.imgs) {
          imgs.push(
            new FormGroup({
              'imgPath': new FormControl(img.imgPath),
            })
          );
        }
      }
      if (ad['contact']) {
        for (const contact of ad.contact) {
          contacts.push(
            new FormGroup({
              'name': new FormControl(contact.name, Validators.required),
              'phone': new FormControl(contact.phone,
                [Validators.required, Validators.pattern(/^\++\(+\d+\d+\d+\)+[1-9]+\d+\d+\d+\d+\d+\d+\d+\d$/)]),
            })
          );
        }
      }
    }
    this.annoucementForm = new FormGroup({
      'title': new FormControl(adsName, Validators.required),
      'description': new FormControl(adsDescription, Validators.required),
      'price': new FormControl(adsPrice, Validators.required),
      'type': new FormControl(type),
      'imgs': imgs,
      'contact': contacts
    });
    if (!this.editeMode) {
      this.onAddImg();
      this.onAddContacts();
    }
  }
  onAddImg() {

   (<FormArray>this.annoucementForm.get('imgs')).push(
      new FormGroup({
        'imgPath': new FormControl(null),
      })
    );
  }
  onAddContacts() {
    (<FormArray>this.annoucementForm.get('contact')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'phone': new FormControl(null, [Validators.required, Validators.pattern(/^\++\(+\d+\d+\d+\)+[1-9]+\d+\d+\d+\d+\d+\d+\d+\d$/)
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
    } else {
      this.apiService.addNewAdd(this.annoucementForm.value,  this.adsService.length + 1);
    }
    this.onCancel();
  }
}
