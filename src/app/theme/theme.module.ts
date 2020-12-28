import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UserComponent } from './header/widgets/user.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { AccordionDirective } from './sidemenu/accordion.directive';
import { AccordionItemDirective } from './sidemenu/accordionItem.directive';
import { AccordionAnchorDirective } from './sidemenu/accordionanchor.directive';
import { FooterComponent } from './footer/footer.component';
import { TranslateComponent } from './header/widgets/translate.component';
import { NotificationComponent } from './header/widgets/notification.component';
import { BrandingComponent } from './header/widgets/branding.component';
import { HeaderComponent } from './header/header.component';
import { TopmenuComponent } from './topmenu/topmenu.component';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    AuthLayoutComponent,
    SidebarComponent,
    SidemenuComponent,
    AccordionDirective,
    AccordionItemDirective,
    AccordionAnchorDirective,
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
