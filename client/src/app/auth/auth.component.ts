import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DropzoneComponent , DropzoneDirective,
  DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { Errors, UserService } from '../core';

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

  public type: string = 'component';

  public disabled: boolean = false;

  public config: DropzoneConfigInterface = {
    clickable: true,
    maxFiles: 1,
    autoReset: null,
    errorReset: null,
    cancelReset: null
  };

  @ViewChild(DropzoneComponent) componentRef?: DropzoneComponent;
  @ViewChild(DropzoneDirective) directiveRef?: DropzoneDirective;
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
  public onUploadError(args: any): void {
    console.log('onUploadError:', args);
  }

  public onUploadSuccess(args: any): void {
    console.log('onUploadSuccess:', args);
  }


  submitForm() {
    this.isSubmitting = true;
    this.errors = {errors: {}};
    console.log({authForm: this.authForm.value, appointments: this.appointmentsForm.value});
    
    this.userService
    .attemptAuth(this.authType, this.authForm.value)
    .subscribe(
      data => this.router.navigateByUrl('/'),
      err => {
        this.errors = err;
        this.isSubmitting = false;
      }
    );
  }
  
}
