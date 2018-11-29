import { Component, OnInit, ViewChild } from '@angular/core';
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
  selected = 'EUR';
  defaultVat = '0';
  priceMin10 = true;
  defaultChecked = true;
  hide = true;
  public uploader: FileUploader = new FileUploader({url:`${environment.api_url}/setAvatar`, itemAlias: 'photo'});

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

    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };


    // use FormBuilder to create a form group
    this.appointmentsForm = this.fb.group({
      'publicPrices': [''],
      'defaultValues': [''],
      'introductorySessions': [''],
      'introductorySessionsTime': [''],
      'onlineVideoSessions': [''],
      'onlineVideoSessions10MinPrice': [''],
      'onlineVideoSessions15MinPrice': [''],
      'onlineVideoSessions30MinPrice': [''],
      'onlineVideoSessions45MinPrice': [''],
      'onlineVideoSessions60MinPrice': [''],
      'onlineVideoSessions90MinPrice': [''],
      'onlineVideoSessions120MinPrice': [''],
      'onlineVideoSessionsDayPrice': [''],
      'FaceToFaceSessions': [''],
      'FaceToFaceSessions10MinPrice': [''],
      'FaceToFaceSessions15MinPrice': [''],
      'FaceToFaceSessions30MinPrice': [''],
      'FaceToFaceSessions45MinPrice': [''],
      'FaceToFaceSessions60MinPrice': [''],
      'FaceToFaceSessions90MinPrice': [''],
      'FaceToFaceSessions120MinPrice': [''],
      'FaceToFaceSessionsDayPrice': [''],
      'FaceToFaceSessionsCountry': [''],
      'FaceToFaceSessionsZIP': [''],
      'FaceToFaceSessionsCity': [''],
      'FaceToFaceSessionsAddress': [''],
      'VAT': [''],
      'cancellationPolicy': [''],
      'marketingAllowed': [''],
      'terms': ['', Validators.required]
    });
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
        this.uploader.uploadAll();
        this.router.navigateByUrl('/settings')
      },
      err => {
        this.errors = err;
        this.isSubmitting = false;
      }
    );
  }
  
}
