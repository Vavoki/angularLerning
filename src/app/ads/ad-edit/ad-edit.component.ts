import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AdsService } from '../ads.service';
import { DataStorageService } from '../../shared/data-storage';
import { state, trigger, transition, style, animate } from '@angular/animations';
import { NgxSpinnerComponent, NgxSpinnerService } from 'ngx-spinner';
import { UploadService } from './upload.service';
import { BehaviorSubject, Subscription } from 'rxjs';
@Component({
  selector: 'app-ad-edit',
  templateUrl: './ad-edit.component.html',
  styleUrls: ['./ad-edit.component.css'],
  animations: [
    trigger('fade', [
      transition('void <=> *', [
        style({ opacity: 0 }),
        animate(1000, style({opacity: 1}))
      ])
    ]),
    trigger('flyInOut', [
      state('in', style({transform: 'translateX(0)'})),
      transition('void => *', [
        style({transform: 'translateX(-100%)'}),
        animate(1000)
      ])
    ])
  ]
})
export class AdEditComponent implements OnInit, OnDestroy {
  id: number;
  editeMode = false;
  types = [
    {name: 'No type'},
    {name: 'Games Console'},
    {name: 'Games'},
];
  imgArr: any[] = [{imagePath: 'hello'}];
  // imgArrChanged = new BehaviorSubject<any[]>(this.imgArr);
  // public imgsArr$ = this.imgArrChanged.asObservable();
  public myModel = '+';
  public mask = ['+', '(', /\d/, /\d/, /\d/, ')', /[0-9]/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/ ];
  selectedFiles: FileList;
  progress: { percentage: number } = { percentage: 0 };
  annoucementForm: FormGroup;
  subscription: Subscription;
  constructor(private route: ActivatedRoute,
    private adsService: AdsService,
    private router: Router,
    private apiService: DataStorageService,
    private spinner: NgxSpinnerService,
    private uploadService: UploadService) { }
  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          console.log(params);
          this.id = +params['id'];
          this.editeMode = params['id'] != null;
          this.initForm();
        }
      );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
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
      this.imgArr = ad.imgs;
      // this.imgArrChanged.next(this.imgArr);
      console.log('imgArr', this.imgArr);
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
      'type': new FormControl(type.trim()),
      'imgs': imgs,
      'contact': contacts
    });
    if (!this.editeMode) {
      this.onAddContacts();
    }
  }
  selectFile(event) {
    this.selectedFiles = event.target.files;
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;
    this.uploadService.pushFileToStorage(file, this.progress);
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
  onDelete(index: number) {
    console.log(index);
    const questrion = confirm('Do you really want to delete this image?');
    if (questrion) {
      this.imgArr.splice(index, 1);
    }

  }
  onCancel() {
    this.router.navigate(['../']);
  }
  onSubmit() {
    for (let i = 0; i < this.imgArr.length; i++) {
      (<FormArray>this.annoucementForm.get('imgs')).push(
        new FormGroup({
          'imgPath': new FormControl(this.imgArr[i].imgPath),
        })
      );
    }
    for (let i = 0; i < this.uploadService.imgListUrl.length; i++) {
      (<FormArray>this.annoucementForm.get('imgs')).push(
        new FormGroup({
          'imgPath': new FormControl(this.uploadService.imgListUrl[i]),
        })
      );
    }
    this.uploadService.imgListUrl = [];
    this.uploadService.imgListUrlChanged.next(this.uploadService.imgListUrl);
    console.log(this.annoucementForm.value);
    this.annoucementForm.value.type = this.annoucementForm.value.type.replace(/\s/g, '');
    if (this.editeMode) {
      this.adsService.updateAd(this.id, this.annoucementForm.value);
      this.apiService.updateAdd(this.id, this.annoucementForm.value);
    } else {
      const date = Date.now();
      console.log(date);
      this.apiService.addNewAdd(this.annoucementForm.value,  date);
    }
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
      this.onCancel();
    }, 1500);
  }
}
