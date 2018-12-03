import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthComponent } from './auth.component';
import { LoginComponent } from './login.component';
import { NoAuthGuard } from './no-auth-guard.service';
import { SharedModule } from '../shared';
import { AuthRoutingModule } from './auth-routing.module';
import { FileSelectDirective } from 'ng2-file-upload';
import { MatTabsModule, MatInputModule, MatSelectModule, MatSlideToggleModule, MatCheckboxModule, MatIconModule } from '@angular/material';

@NgModule({
  imports: [
    SharedModule,
    AuthRoutingModule,
    MatTabsModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatIconModule
  ],
  declarations: [
    AuthComponent,
    LoginComponent,
    FileSelectDirective
  ],
  providers: [
    NoAuthGuard
  ]
})
export class AuthModule {}
