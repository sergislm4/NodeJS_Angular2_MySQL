import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Errors, UserService } from '../core';

@Component({
  selector: 'app-auth-page',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  authType: String = '';
  errors: Errors = {errors: {}};
  isSubmitting = false;
  authForm: FormGroup;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
    
  ) {
    // use FormBuilder to create a form group
    this.authForm = this.fb.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    });

  }
  ngOnInit() {
    this.route.url.subscribe(data => {
      // Get the last piece of the URL (it's either 'login' or 'register')
      this.authType = data[data.length - 1].path;
    });
  }

  submitForm() {
    this.isSubmitting = true;
    this.errors = {errors: {}};
    console.log({authForm: this.authForm.value});
    
    this.userService
    .attemptAuth(this.authType, this.authForm.value)
    .subscribe(
      data => this.router.navigateByUrl('/settings'),
      err => {
        this.errors = err;
        this.isSubmitting = false;
      }
    );
  }
  
}