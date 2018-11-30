import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { User, UserService } from '../core';

import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {
  user: User = {} as User;
  settingsForm: FormGroup;
  errors: Object = {};
  isSubmitting = false;
  avatar = "";

  constructor(
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
    public toastr: ToastrManager
  ) {
    // create form group using the form builder
    this.settingsForm = this.fb.group({
      avatar: '',
      email: '',
      password: ''
    });
    // Optional: subscribe to changes on the form
    // this.settingsForm.valueChanges.subscribe(values => this.updateUser(values));
  }

  ngOnInit() {
    // Make a fresh copy of the current user's object to place in editable form fields
    Object.assign(this.user, this.userService.getCurrentUser());
    // Fill the form
    this.settingsForm.patchValue(this.user);
    this.avatar = this.user.avatar;
    
  }

  logout() {
    this.userService.purgeAuth();
    this.router.navigateByUrl('/');
  }

  submitForm() {
    this.isSubmitting = true;

    // update the model
    this.updateUser(this.settingsForm.value);

    this.userService
    .update(this.user)
    .subscribe(
      updatedUser => {
        this.toastr.successToastr('Your profile has been updated successfully.', 'Success!');
      },
      err => {
        this.errors = err;
        this.isSubmitting = false;
        this.toastr.errorToastr('There was an error with your request, try again later!', 'Oops!');
      }
    );
  }

  updateUser(values: Object) {
    Object.assign(this.user, values);
  }

}
