import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthComponent } from './auth.component';
import {LoginComponent} from './login.component';
import { NoAuthGuard } from './no-auth-guard.service';
import { SharedModule } from '../shared';
import { AuthRoutingModule } from './auth-routing.module';
import { MatTabsModule, MatInputModule, MatSelectModule, MatSlideToggleModule, MatCheckboxModule } from '@angular/material';
import { DropzoneModule, DropzoneConfigInterface,
  DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  url: '',
  acceptedFiles: 'image/*',
  createImageThumbnails: true
};
@NgModule({
  imports: [
    SharedModule,
    AuthRoutingModule,
    MatTabsModule,
    MatInputModule,
    MatSelectModule,
    DropzoneModule,
    MatSlideToggleModule,
    MatCheckboxModule
  ],
  declarations: [
    AuthComponent,
    LoginComponent
  ],
  providers: [
    NoAuthGuard,
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    }
    
  ]
})
export class AuthModule {}
