import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { AuthLayoutComponent } from './auth-layout/auth-layout.component';

import { TopmenuComponent } from './topmenu/topmenu.component';



@NgModule({
  declarations: [
    AuthLayoutComponent,
    TopmenuComponent
  ],
  imports: [SharedModule],
})
export class ThemeModule {}
