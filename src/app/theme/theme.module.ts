import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { UserComponent } from './header/widgets/user.component';
import { FooterComponent } from './footer/footer.component';
import { TranslateComponent } from './header/widgets/translate.component';
import { NotificationComponent } from './header/widgets/notification.component';
import { BrandingComponent } from './header/widgets/branding.component';
import { HeaderComponent } from './header/header.component';
import { TopmenuComponent } from './topmenu/topmenu.component';



@NgModule({
  declarations: [
    AuthLayoutComponent,
    FooterComponent,
    HeaderComponent,
    TopmenuComponent,
    BrandingComponent,
    NotificationComponent,
    TranslateComponent,
    UserComponent
  ],
  imports: [SharedModule],
})
export class ThemeModule {}
