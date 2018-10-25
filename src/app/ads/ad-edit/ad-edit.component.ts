import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AdsService } from '../ads.service';
import { DataStorageService } from '../../shared/data-storage';
import { state, trigger, transition, style, animate } from '@angular/animations';
import { NgxSpinnerComponent, NgxSpinnerService } from 'ngx-spinner';
import { UploadService } from './upload.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
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
  types = this.adsService.types;
  imgArr: any[] = [];
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
    private authService: AuthService,
    private apiService: DataStorageService,
    private spinner: NgxSpinnerService,
    private uploadService: UploadService) { }
  ngOnInit() {
    this.spinner.show();
    this.subscription = this.route.params
    .switchMap((params: Params) => {
      this.id = +params['id'];
      this.editeMode = params['id'] != null;
      return this.apiService.getCurrentAds(this.id);
    })
      .subscribe(
        (data) => {
            this.initForm(data);
            this.spinner.hide();
        },
        (err) => {
            this.initForm();
            this.spinner.hide();
        }
      );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  private initForm(data?: any) {
    let adsName = '';
    let adsDescription = '';
    let adsPrice = 0;
    let type = '';
    const imgs = new FormArray([]);

    if (this.editeMode) {
      adsName = data.title;
      adsDescription = data.description;
      adsPrice = data.price;
      type = data.type;
      this.imgArr = data.imgs;
    }
    this.annoucementForm = new FormGroup({
      'title': new FormControl(adsName, Validators.required),
      'description': new FormControl(adsDescription, Validators.required),
      'price': new FormControl(adsPrice, Validators.required),
      'type': new FormControl('Game Console'),
      'imgs': imgs,
    });
  }
  selectFile(event) {
    this.selectedFiles = event.target.files;
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;
    this.uploadService.pushFileToStorage(file, this.progress);
  }
  onDelete(index: number) {
    const questrion = confirm('Do you really want to delete this image?');
    if (questrion) {
      this.imgArr.splice(index, 1);
    }

  }
  onCancel() {
    this.router.navigate(['../']);
  }
  onSubmit() {
    this.annoucementForm.value.imgs = [ ...this.uploadService.imgListUrl];
    this.uploadService.imgListUrl = [];
    this.uploadService.imgListUrlChanged.next(this.uploadService.imgListUrl);
    if (this.editeMode) {
      this.annoucementForm.value.imgs = this.imgArr.concat(this.annoucementForm.value.imgs);
      this.annoucementForm.value.user = this.authService.user.id;
      this.apiService.updateAdd(this.id, this.annoucementForm.value);
    } else {
      this.annoucementForm.value.user = this.authService.user.id;
      this.apiService.addNewAdd(this.annoucementForm.value);
    }
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
      this.onCancel();
    }, 1500);
  }
}
