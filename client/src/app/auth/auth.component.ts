import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Errors, UserService } from '../core';
import {  FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-auth-page',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {
  authType: String = '';
  title: String = '';
  errors: Errors = {errors: {}};
  isSubmitting = false;
  authForm: FormGroup;
  appointmentsForm: FormGroup;
  selectedTab = 0;
  defaultVat = '0';
  defaultPrice = '0';
  defaultCurrency = 'EUR';
  priceMin10 = true;
  color = 'warn';
  defaultChecked = true;
  expandedIST = false;
  expandedOVS = false;
  expandedF2F = false;
  Tax = true;
  hide = true;
  map = new Map([
    [1, '10'],
    [2, '15'],
    [3, '30'],
    [4, '45'],
    [5, '60'],
    [6, '90'],
    [7, '120']
  ]);
  public uploader: FileUploader = new FileUploader({url:`${environment.api_url}/setAvatar`, itemAlias: 'photo'});

  public changeDefaultChecked = function(){
    (this.defaultChecked) ? this.defaultChecked = false : this.defaultChecked = true;
  }

  public changeDefaultCurrency = function($event){
    this.defaultCurrency = $event.value;
  }

  public changeExpandedIST = function(){
    (this.expandedIST) ? this.expandedIST = false : this.expandedIST = true;
  }

  public changeExpandedOVS = function(){
    (this.expandedOVS) ? this.expandedOVS = false : this.expandedOVS = true;
  }

  public changeExpandedF2F = function(){
    (this.expandedF2F) ? this.expandedF2F = false : this.expandedF2F = true;
  }

  public changeTab = function() {
    this.selectedTab += 1;
    if (this.selectedTab >= 2) this.selectedTab = 0;
  }

  public changeTax = function(){
    (this.Tax) ? this.Tax = false : this.Tax = true;
  }
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
    
  ) {
    // use FormBuilder to create a form group
    this.authForm = this.fb.group({
      'first_name': ['', Validators.required],
      'last_name': ['', Validators.required],
      'email': ['', Validators.required],
      'password': ['', Validators.required],
      'phone': [''],
      'website': [''],
      'currency': ['', Validators.required]
    });

    this.authForm.get('currency').setValue('EUR');
    this.uploader.onAfterAddingFile = (file) => { 
      file.withCredentials = false; 
    };


    // use FormBuilder to create a form group
    this.appointmentsForm = this.fb.group({
      'publicPrices': [''],
      'defaultValues': [''],
      'introductorySessions': [''],
      'introductorySessionsTime': [''],
      'onlineVideoSessions': [''],
      'FaceToFaceSessions': [''],
      'FaceToFaceSessionsCountry': [''],
      'FaceToFaceSessionsZIP': [''],
      'FaceToFaceSessionsCity': [''],
      'FaceToFaceSessionsAddress': [''],
      'VAT': [''],
      'cancellationPolicy': [''],
      'marketingAllowed': [''],
      'terms': ['', Validators.required]
    });

    this.appointmentsForm.get('publicPrices').setValue(true);
    this.appointmentsForm.get('defaultValues').setValue(true);
    this.appointmentsForm.get('introductorySessionsTime').setValue('10');
    this.appointmentsForm.get('cancellationPolicy').setValue('Free');
  }

  ngOnInit() {
    this.route.url.subscribe(data => {
      // Get the last piece of the URL (it's either 'login' or 'register')
      this.authType = data[data.length - 1].path;
      // Set a title for the page accordingly
      this.title = (this.authType === 'login') ? 'Sign in' : 'Sign up';
      // add form control for username if this is the register page
      if (this.authType === 'register') {
        this.authForm.addControl('username', new FormControl());
      }
    });
  }

  submitForm() {
    this.isSubmitting = true;
    this.errors = {errors: {}};
    console.log({authForm: this.authForm.value, appointments: this.appointmentsForm.value});
    
    this.userService
    .attemptAuth(this.authType, this.authForm.value)
    .subscribe(
      data => {
        // Image is uploade after the register
        // That way I can reuse the endpoint at profile to change the avatar
        this.uploader.setOptions({ headers: [{name: 'email', value: data.email}]});
        this.uploader.uploadAll();
        this.router.navigateByUrl('/profile/'+data.user_id)
      },
      err => {
        this.errors = err;
        this.isSubmitting = false;
      }
    );
  }
  
}
