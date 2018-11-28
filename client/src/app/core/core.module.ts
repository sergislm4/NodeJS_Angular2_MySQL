import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpTokenInterceptor } from './interceptors/http.token.interceptor';



//import {HammerLoader} from '';
import {
  ApiService,
  AuthGuard,
  JwtService,
  ProfilesService,
  UserService,
} from './services';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
    ApiService,
    AuthGuard,
    JwtService,
    ProfilesService,
    UserService
  ],
  declarations: []
})
export class CoreModule { }
